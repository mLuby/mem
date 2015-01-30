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
    return _storage.key(id) ? JSON.parse(_storage.getItem(_storage.key(id))) : null;
  }
  var _taskNameToID = function(taskName){
    var previousKey = _storage.keys.filter(function(id){ return _getTaskByID(id).name===taskName; })[0];
    return previousKey || _storage.length;
  }
  var _getTaskByName = function(taskName){
    return _getTaskByID(_taskNameToID(taskName));
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

  var getTaskByID = function(id){
    var task = _getTaskByID(id);
    _setCurrentTask(task);
    _logTask(task);
  }

  var examineAttribute = function(attr){
    _current = _getTaskByID(0);
    console.log(_current[attr]);
  };

  var setAttribute = function(attr, value, id){ //todo shouldn't need id arg when _current persists.
    _current = _getTaskByID(id);
    if(value[0]==='[' && value[value.length-1]===']'){
      // Don't erase existing array, but create a new one if needed.
      _current[attr] = Array.isArray(_current[attr]) ? _current[attr] : [];
      // Get the inner value of the array string, eg 'meta' from '[meta]'.
      value = value.slice(1,value.length-1);
    }
    if(value && Array.isArray(_current[attr]) ){
     _current[attr].push(value)
    } else {
      _current[attr] = value;
    }
    _setTaskToID(_current, id);
  };

  module.exports = {
    id: getTaskByID,
    add: addTask,
    get: getTask,
    list: listTasks,
    examine: examineAttribute,
    set: setAttribute,
    tag: function(tagName, id){ setAttribute('tags', '['+tagName+']', id); }
  };

})();

/*
tags = examine tags
tag [tag] = set tags [examine tags + tag]
due [date] = set due [date]
requires [task] = [current] tag requires-[task]; [task] tag blocks-[current];
blocks [task]   = [task] tag requires-[current]; [current] tag blocks-[task];
*/