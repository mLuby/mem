var app = angular.module('Memory');

app.controller('tasksController', ['tasks', function(tasks){
  this.list = tasks;
  this.start = function(task){
    console.log('Starting',task);
  };
  this.delete = function(task){
    console.log('Deleting',task);
  };
}]);

app.controller('taskController', ['tasks', function(tasks){
  this.add = function(name, duration, dueBy){
    newTask = {name: name, duration: duration, dueBy: dueBy};
    console.log('newTask', newTask);
  };
  this.cancel = function(){
    this.name = null;
    this.duration = null;
    this.dueBy = null;
  };
}]);

app.controller('newTaskController', ['tasks', function(tasks){
  this.add = function(name, duration, dueBy){
    tasks.push({name: name, duration: duration, dueBy: dueBy});
    this.clear();
  };
  this.clear = function(){
    this.name = null;
    this.duration = null;
    this.dueBy = null;
  };
}]);