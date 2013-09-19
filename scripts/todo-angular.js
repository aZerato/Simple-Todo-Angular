var todoApp = angular.module('todoApp', []);

/*
 * Prototype Object Todo
 */
var Todo = (function() {
	function Todo() {
		this.id = 1;
		this.content = 'content';
		this.state = false;
	}

	return Todo;
})();

/*
 * Filter
 */
todoApp.filter('removeTodo', function() {
	return function(array, id) {
		for (var i = 0; i < array.length; i++) {
			if(array[i].id == id) {
				array.splice(i, 1);
				return;
			}
		}
	}
});

/*
 * Controller
 */
function todoController($scope, $filter) {

	// Array : collection of Todo object
	$scope.todos = [];

	$scope.addTodo = function() {
		var todo = new Todo();
		todo.id = $scope.todos.length == 0 ? 1 : $scope.todos[$scope.todos.length-1].id+1;
		$scope.todos.push(todo);
	};

	$scope.loadTodos = function() {
		var ltodos = localStorage.getItem("todos");
		if(ltodos == null) {
			alert('Nothing in the localStorage !');
			return;
		}
		$scope.todos = JSON.parse(ltodos);
	};

	$scope.saveTodos = function() {
		localStorage.setItem("todos", JSON.stringify($scope.todos));
	};

	$scope.clearTodos = function() {
		localStorage.clear();
	};

	$scope.removeTodo = function(id) {
		var filter = $filter('removeTodo');
		filter($scope.todos, id);
	};
}

/*
 * Dependency
 */
todoController.$inject = ['$scope', '$filter'];