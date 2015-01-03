var app = angular.module('Memory', []);

app.value('Tasks', [
      {title:'laundry',   completed:false}
     ,{title:'dishes',    completed:true}
     ,{title:'groceries', completed:false}
]);

app.controller('MemoryController', function($scope, Tasks){
  $scope.tasks = Tasks
  $scope.listTasks = function(){
    console.log(Tasks);
  }
});

app.controller('TaskController', function($scope){
  $scope.toggleCompletion = function(){
    this.task.completed = !this.task.completed;
  }
});