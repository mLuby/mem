(function(){
  'use strict';

  // Initialize localStorage.
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.storage');
  }
  var storage = localStorage;

  var Firebaseio = require("firebase");

  var getCurrentTask = function(){
    return getTaskByID(storage.getItem('current'));
  };

  var setCurrentTask = function(task){
    storage.setItem('current', task.id);
  };

  var getTaskByID = function(id){
    return storage.getItem(id) ? JSON.parse(storage.getItem(id)) : null;
  }

  var setTaskToID = function(task, id){
    storage.setItem(id, JSON.stringify(task));
  }

  var taskNameToID = function(taskName){
    var emptyID;
    var taskCount = storage.length;
    for(var id = 0; id < taskCount; id++){
      var task = getTaskByID(id);
      if(!task){
        emptyID = id;
      } else if (task.name === taskName){
        return task.id;
      }
    }
    return emptyID || taskCount;
  };

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
  };

  var test = function(){
  };

  var addTask = function(taskName){
    var task = getTaskByName(taskName);
    if(!task){
      var id = taskNameToID(taskName);
      var task = {name: taskName, id: id};
      setTaskToID(task, id);
    }
    setCurrentTask(task);
    return task;
  };

  var getTask = function(taskNameOrID){
    if (taskNameOrID){
      var task = isNaN(Number(taskNameOrID)) ? getTaskByName(taskNameOrID) : getTaskByID(taskNameOrID);
      setCurrentTask(task);
    } else {
      var task = getCurrentTask();
    }
    return task;
  };

  var listTasks = function(){
    return storage.keys
      .filter(function(id){
        // filter out non-numeric ids
        return !isNaN(id); })
      .sort(function(id1, id2){
        return id1 - id2; })
      .map(function(id){
        return getTaskByID(id); });
  };

  var examineAttribute = function(attr){
    return getCurrentTask()[attr];
  };

  var showTasks = function(searchString){
    var isNegated = searchString[0]==='^';
    if( isNegated ){ searchString = searchString.slice(1); }
    return listTasks().filter(function(task){
      for(var key in task){
        // for each task obj, look at each key/value pair
        // if not negating, only need one match to return true.
        // if negating, must be no matches to return true.
        var value = task[key];
        if( typeof value === 'string' && value.indexOf(searchString) > -1 ){
          return !isNegated;
        } else if ( Array.isArray(value) && value.indexOf(searchString) > -1 ){
          return !isNegated;
        }
      }
      return isNegated;
    });
  };

  var removeTask = function(taskNameOrID){
    if( taskNameOrID === 'current' ){
      var currentTask = getCurrentTask();
      storage.removeItem( currentTask.id );
      currentTask.id = 'deleted';
      return currentTask;
    }
  };

  var syncCloudAndLocalStorage = function(syncTarget){
    if( syncTarget === 'cloud' ){
      var localData = localStorage.keys.reduce(function(obj, key){
        obj[key] = isNaN(Number(key)) ? localStorage.getItem(key) : getTaskByID(key);
        return obj;
      }, {});
      console.log('Syncing...');
      // Initialize cloud storage (note Firebase will not auto-terminate)
      var firebase = new Firebaseio("https://mem-storage.firebaseio.com/");
      firebase.set(localData, function(){
        console.log('Sync succeeded.');
        // Kills open Firebase connection;
        // Consider using REST API instead
        process.exit(0);
      });
    } else {
      console.log('Sync failed.');
    }
  };

  module.exports = {
    add: function(taskName){ addTask(taskName); return getCurrentTask(); },
    get: getTask,
    list: listTasks,
    examine: examineAttribute,
    tag: function(tagName){ setAttribute('tags', '['+tagName+']'); return getCurrentTask(); },
    untag: function(tagName){ removeFromArray('tags', tagName); return getCurrentTask(); },
    show: showTasks,
    edit: function(attr, value){ setAttribute(attr, value); return getCurrentTask(); },
    remove: function(taskNameOrID){ return removeTask(taskNameOrID); },
    sync: syncCloudAndLocalStorage
  };

})();

/*
tags = examine tags
tag [tag] = set tags [examine tags + tag]
due [date] = set due [date]
requires [task] = [current] tag requires-[task]; [task] tag blocks-[current];
blocks [task]   = [task] tag requires-[current]; [current] tag blocks-[task];
*/
