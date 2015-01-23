var app = angular.module('Memory');

app.service('tasksService', ['tasks',
  function(tasks){
    this.getTasks = function(){
      return tasks;
    };
    this.addTask = function(task){
      tasks.push(task)
    };
    this.findTaskIndex = function(task){
      return tasks.map(function(task){return task.name;}).indexOf(task.name);
    }
    this.deleteTask = function(task){
      var taskIndex = this.findTaskIndex(task);
      tasks.splice(taskIndex, 1);
    };
  }
]);