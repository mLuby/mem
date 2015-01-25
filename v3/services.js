var app = angular.module('Memory');

app.service('tasks', ['storage',
  function(storage){
    this.tasks = [];
    this.getTasks = function(){
      this.tasks = storage.get('tasks');
      return this.tasks;
    };
    this.addTask = function(task){
      storage.add('tasks', task);
      return this.getTasks();
    };
    this.findTaskIndex = function(task){
      return this.tasks.map(function(task){return task.name;}).indexOf(task.name);
    }
    this.deleteTask = function(task){
      return storage.delete('tasks', this.findTaskIndex(task));
    };
    this.clearTasks = function(){
      console.log('cleared', storage.deleteAll('tasks') );
    };
  }
]);