var app = angular.module('Memory');

app.controller('tasksController', ['tasksService', function(tasksService){
  this.list = tasksService.getTasks();
}]);

app.controller('taskController', ['tasksService', function(tasksService){
  this.start = function(task){
    console.log('Starting',task);
  };
  this.delete = function(task){
    console.log('Deleting', task);
    tasksService.deleteTask(task);
  };
}]);

app.controller('newTaskController', ['tasksService', function(tasksService){
  this.add = function(name, duration, dueBy){
    tasksService.addTask({name: name, duration: duration, dueBy: dueBy});
    this.clear();
  };
  this.clear = function(){
    this.name = null;
    this.duration = null;
    this.dueBy = null;
  };
}]);