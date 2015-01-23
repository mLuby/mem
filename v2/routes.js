angular.module('Memory')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // List tasks state
  $urlRouterProvider.otherwise('/tasks');
  // List tasks state
  var stateProvider = $stateProvider;
  stateProvider.state('tasks', {
    url: '/tasks',
    resolve: {
      tasks: ['tasksService',
        function(tasksService) {
          return tasksService.getTasks();
        }
      ]
      // ,task: function() { return {}; }
    },
    templateUrl: 'partials_tasks.html',
    controller: 'tasksController',
    controllerAs: 'tasks'
  });
  // // Search tasks state
  // stateProvider.state('search', {
  //   url: '/tasks/search/:query',
  //   resolve: {
  //     tasks: ['$stateParams', 'tasksService',
  //       function($stateParams, tasksService) {
  //         return tasksService.searchTasks($stateParams.query);
  //       }
  //     ],
  //     task: function() { return {}; }
  //   },
  //   templateUrl: 'partials_search.html',
  //   controller: 'tasksController',
  //   controllerAs: 'tasks'
  // });
  // // Edit task state
  // stateProvider.state('task', {
  //   url: '/tasks/:name',
  //   resolve: {
  //     tasks: function() { return [] },
  //     task: ['$stateParams', 'tasksService',
  //       function($stateParams, tasksService) {
  //         return tasksService.getTask($stateParams.name);
  //       }
  //     ]
  //   },
  //   templateUrl: 'partials_edit.html',
  //   controller: 'tasksController',
  //   controllerAs: 'tasks'
  // });
}]);