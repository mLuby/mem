var app = angular.module('Memory');

app.service('tasks', ['storage', function(storage){
  var _tasks = [];
  var _getTasks = function(){
    angular.copy(storage.get('tasks'), _tasks);
  };
  var _addTask = function(task){
    storage.add('tasks', task);
    _getTasks();
  };
  var _findTaskIndex = function(task){
    return _tasks.map(function(task){return task.name;}).indexOf(task.name);
  }
  var _deleteTask = function(task){
    storage.delete('tasks', _findTaskIndex(task));
    _getTasks();
  };
  var _deleteAllTasks = function(){
    // Copy tasks because delete>getTasks changes tasks' indexes.
    var tasksCopy = _tasks.map(function(t){ return t;});
    tasksCopy.forEach(function(task){ _deleteTask(task); });
  };
  this.start = function(task){
    console.log('Starting',task);
  };
  this.update = function(task){
    storage.update('tasks', _findTaskIndex(task), task);
    _getTasks();
  };
  this.list = _tasks;
  this.load = _getTasks;
  this.add = _addTask;
  this.delete = _deleteTask;
  this.deleteAll = _deleteAllTasks;
}]);