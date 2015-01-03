var app = angular.module('memory', []);

app.controller('memoryController', function($scope){
  $scope.tasks = [
      {title:'laundry',   completed:false}
     ,{title:'dishes',    completed:true}
     ,{title:'groceries', completed:false}
  ]
});

app.controller('taskController', function($scope){
  $scope.toggleCompletion = function(){
    this.task.completed = !this.task.completed;
  }
});