(function(){
  'use strict';
  // Initialize localStorage.
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.storage');
  }
  var storage = localStorage;
  var getCurrentTask = function(){
    return getTaskByID(storage.getItem('.current'));
  };
  var setCurrentTask = function(task){
    storage.setItem('.current', task.id);
  };
  var getTaskByID = function(id){
    return storage.getItem(id) ? JSON.parse(storage.getItem(id)) : null;
  }
  var setTaskToID = function(task, id){
    storage.setItem(id, JSON.stringify(task));
  }
  var taskNameToID = function(taskName){
    var previousKey = storage.keys.filter(function(id){
      var task = getTaskByID(id);
      return task ? task.name===taskName : false;
    })[0];
    return previousKey || storage.length;
  }
  var getTaskByName = function(taskName){
    return getTaskByID(taskNameToID(taskName));
  };
  var setAttribute = function(attr, value){
    var current = getCurrentTask();
    if(value[0]==='[' && value[value.length-1]===']'){
      // Don't erase existing array, but create a new one if needed.
      current[attr] = Array.isArray(current[attr]) ? current[attr] : [];
      // Get the inner value of the array string, eg 'meta' from '[meta]'.
      value = value.slice(1,value.length-1);
    }
    if(value && Array.isArray(current[attr]) ){
     current[attr].push(value)
    } else {
      current[attr] = value;
    }
    setTaskToID(current, current.id);
  };

  var setAttribute = function(attr, value){
    var current = getCurrentTask();
    if(value[0]==='[' && value[value.length-1]===']'){
      // Don't erase existing array, but create a new one if needed.
      current[attr] = Array.isArray(current[attr]) ? current[attr] : [];
      // Get the inner value of the array string, eg 'meta' from '[meta]'.
      value = value.slice(1,value.length-1);
    }
    if(value && Array.isArray(current[attr]) ){
     current[attr].push(value)
    } else if ( attr !== 'id'){
      current[attr] = value;
    } else {
      return null;
    }
    setTaskToID(current, current.id);
  };

  var removeFromArray = function(attr, value){
    var current = getCurrentTask();
    var array = current[attr];
    array.splice(array.indexOf(value), 1);
    setTaskToID(current, current.id);
  }

  var addTask = function(taskName){
    var task = getTaskByName(taskName);
    if(task === null){
      var id = taskNameToID(taskName);
      var task = {name: taskName, id: id};
      setTaskToID(task, id);
    }
    setCurrentTask(task);
    return task;
  }

  var getTask = function(taskNameOrID){
    if (taskNameOrID){
      var task = isNaN(Number(taskNameOrID)) ? getTaskByName(taskNameOrID) : getTaskByID(taskNameOrID);
      setCurrentTask(task);
    } else {
      var task = getCurrentTask();
    }
    return task;
  }

  var listTasks = function(){
    return storage.keys.filter(function(id){return !isNaN(id);}).map(function(id){ return getTaskByID(id); });
  }

  var examineAttribute = function(attr){
    return getCurrentTask()[attr];
  };

  var findTask = function(searchString){
    return listTasks().filter(function(task){
      for(var key in task){
        var value = task[key];
        if( typeof value === 'number' ){
          // Intentionally using fuzzy equality.
          if( value == searchString ){
            return true;
          }
        } else if( typeof value === 'string' ){
          if( value.indexOf( searchString )>=0 ){
            return true;
          }
        } else if( Array.isArray(value) ){
          if( value.indexOf( searchString )>=0 ){
            return true;
          }
        } else {
          return false;
        }
      }
    });
  }

  var removeTask = function(taskNameOrID){
    if( taskNameOrID === 'current' ){
      var currentTask = getCurrentTask();
      storage.removeItem( currentTask.id );
      currentTask.id = 'deleted';
      return currentTask;
    }
  };

  module.exports = {
    add: function(taskName){ addTask(taskName); return getCurrentTask(); },
    get: getTask,
    list: listTasks,
    examine: examineAttribute,
    tag: function(tagName){ setAttribute('tags', '['+tagName+']'); return getCurrentTask(); },
    untag: function(tagName){ removeFromArray('tags', tagName); return getCurrentTask(); },
    find: findTask,
    edit: function(attr, value){ setAttribute(attr, value); return getCurrentTask(); },
    remove: function(taskNameOrID){ return removeTask(taskNameOrID); }
  };

})();

/*
tags = examine tags
tag [tag] = set tags [examine tags + tag]
due [date] = set due [date]
requires [task] = [current] tag requires-[task]; [task] tag blocks-[current];
blocks [task]   = [task] tag requires-[current]; [current] tag blocks-[task];
*/