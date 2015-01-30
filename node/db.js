(function(){
  'use strict';
  // Initialize localStorage.
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.storage');
  }
  var _storage = localStorage;
  var _current;

  var _setTaskToID = function(task, id){
    _storage.setItem(id, JSON.stringify(task));
  }
  var _getTaskByID = function(id){
    return JSON.parse(_storage.getItem(_storage.key(id)));
  }
  var _taskNameToID = function(taskName){
    var previousKey = _storage.keys.filter(function(id){ return _getTaskByID(id).name===taskName; });
    return previousKey || _storage.length;
  }
  var _getTaskByName = function(taskName){
    return _getTaskByID(_taskNameToID(taskName)) || null;
  };
  var listTasks = function(){
    _storage.keys.forEach(function(id){ _logTask(_getTaskByID(id)); });
  }

  var _setCurrentTask = function(task){
    _current = task;
  };

  var _logTask = function(task){
    console.log(task);
  };

  var addTask = function(taskName){
    var task = _getTaskByName(taskName);
    if(task === null){
      var id = _taskNameToID(taskName);
      var task = {name: taskName, id: id};
      _setTaskToID(task, id);
    }
    _setCurrentTask(task);
    _logTask(task);
  }
  var getTask = function(taskName){
    var task = _getTaskByName(taskName);
    _setCurrentTask(task);
    _logTask(task);
  }

  module.exports = {
    add: addTask,
    get: getTask,
    list: listTasks
  };

})();