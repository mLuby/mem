angular.module('Memory')
.controller('tasksController', ['$state', 'tasksService', 'tasks',
  function($state, tasksService, tasks) {
    // this.task = task.data;
    // this.taskQuery = $state.params.query;
    this.tasks = tasks.data;
    // this.saveTask = function() {
    //   tasksService.saveTask(this.task).then(function() {
    //     $state.go('tasks');
    //   });
    // };
    // this.searchTasks = function(query) {
    //   if (!query.length) return $state.go('tasks');
    //   $state.go('search', {query: query});
    // };
  }
]);