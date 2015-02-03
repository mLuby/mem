(function(){
  'use strict';
  // Initialize localStorage.
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.storage');
  }
  var _storage = localStorage;
  var _getCurrentTask = function(){
    return _getTaskByID(_storage.getItem('.current'));
  };
  var _setCurrentTask = function(task){
    _storage.setItem('.current', task.id);
  };
  var _getTaskByID = function(id){
    return _storage.key(id) ? JSON.parse(_storage.getItem(id)) : null;
  }
  var _setTaskToID = function(task, id){
    _storage.setItem(id, JSON.stringify(task));
  }
  var _taskNameToID = function(taskName){
    var previousKey = _storage.keys.filter(function(id){
      var task = _getTaskByID(id);
      return task ? task.name===taskName : false;
    })[0];
    return previousKey || _storage.length;
  }
  var _getTaskByName = function(taskName){
    return _getTaskByID(_taskNameToID(taskName));
  };
  var _setAttribute = function(attr, value){
    var _current = _getCurrentTask();
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
    _setTaskToID(_current, _current.id);
  };

  var addTask = function(taskName){
    var task = _getTaskByName(taskName);
    if(task === null){
      var id = _taskNameToID(taskName);
      var task = {name: taskName, id: id};
      _setTaskToID(task, id);
    }
    _setCurrentTask(task);
    return task;
  }

  var getTask = function(taskNameOrID){
    if (taskNameOrID){
      var task = isNaN(Number(taskNameOrID)) ? _getTaskByName(taskNameOrID) : _getTaskByID(taskNameOrID);
      _setCurrentTask(task);
    } else {
      var task = _getCurrentTask();
    }
    return task;
  }

  var listTasks = function(){
    return _storage.keys.filter(function(id){return !isNaN(id);}).map(function(id){ return _getTaskByID(id); });
  }

  var examineAttribute = function(attr){
    return _getCurrentTask()[attr];
  };

  module.exports = {
    add: addTask,
    get: getTask,
    list: listTasks,
    examine: examineAttribute,
    current: _getCurrentTask,
    tag: function(tagName, id){ _setAttribute('tags', '['+tagName+']'); }
  };

})();

/*
tags = examine tags
tag [tag] = set tags [examine tags + tag]
due [date] = set due [date]
requires [task] = [current] tag requires-[task]; [task] tag blocks-[current];
blocks [task]   = [task] tag requires-[current]; [current] tag blocks-[task];
*/