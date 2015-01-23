angular.module('Memory')
.service('tasksService', ['$http', function($http) {
  // this.saveTask = function(task) {
  //   console.log('saved task='+task);
  //   return 'saved task='+task;
  //   // return $http.post('/Tasks', task);
  // };
  // this.searchTasks = function(query) {
  //   console.log('queried for'+query);
  //   return 'queried for'+query;
  //   // return $http.get('/Tasks/search/' + query);
  // };
  this.getTasks = function() {
    return {data:[{name: 'Buy Milk'},{name: 'Meet Tom'},{name: 'Learn React'}]};
    // return $http.get('/Tasks');
  };
  // this.getTask = function(name) {
  //   console.log('task w name='+name);
  //   return 'task w name='+name;
  //   // return $http.get('/task/' + name);
  // };
}]);