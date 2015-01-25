var app = angular.module('Memory');

app.controller('tasksController', ['tasks', function(tasks){
  tasks.getTasks();
  this.list = tasks.tasks;
  this.clearTasks = tasks.clearTasks;
}]);

app.controller('taskController', ['tasks', function(tasks){
  this.start = function(task){
    console.log('Starting',task);
  };
  this.delete = function(task){
    console.log('Deleting', task);
    tasks.deleteTask(task);
  };
}]);

app.controller('newTaskController', ['tasks', function(tasks){
  this.add = function(name, duration, dueBy){
    tasks.addTask({name: name, duration: duration, dueBy: dueBy});
    this.clear();
  };
  this.clear = function(){
    this.name = null;
    this.duration = null;
    this.dueBy = null;
  };
}]);