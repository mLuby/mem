var app = angular.module('Memory');

app.controller('tasksController', ['tasks', function(tasks){
  this.list = tasks.list;
  this.clearTasks = tasks.deleteAll;
  // init
  tasks.load();
}]);

app.controller('taskController', ['tasks', function(tasks){
  this.start = tasks.start;
  this.update = tasks.update;
  this.delete = tasks.delete;
}]);

app.controller('newTaskController', ['tasks', function(tasks){
  this.add = function(name, duration, dueBy){
    tasks.add({name: name, duration: duration, dueBy: dueBy});
    this.clear();
  };
  this.clear = function(){
    this.name = null;
    this.duration = null;
    this.dueBy = null;
  };
}]);