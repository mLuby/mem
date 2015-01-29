/*************************/
/* Handles data storage. */
/*************************/

// Initialize localStorage.
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./.storage');
}

var createTask = function(args){
  saveTaskByID(localStorage.length, {name:args[0], dueBy:args[1], duration:args[2]});
};

var saveTaskByID = function(id, task){
  localStorage.setItem(id, JSON.stringify(task));
};

var getTaskByID = function(id){
  return JSON.parse(localStorage.getItem(localStorage.key(id)));
}

var idOrKey = function(keyOrID){
  if(keyOrID.match(/^[0-9]+$/)){
    return localStorage.key(keyOrID);
  } else {
    return Number(keyOrID);
  }
}

var completeTask = function(id){
  var task = getTaskByID(id);
  task.status = 'done';
  saveTaskByID(id, task);
};

var list = function(){
  var results = [];
  for(var i=0; i<localStorage.length; i++){
    results.push(localStorage.getItem(localStorage.key(i)));
  }
  return results;
};

var editAttribute = function(key, attr, value){
  var task = getTask(key);
  task[attr] = value;
  saveTask(key, task);
};

var deleteTaskByID = function(id){
  localStorage.removeItem(localStorage.key(id));
};

module.exports = {
  add: createTask,
  done: completeTask,
  delete: deleteTaskByID,
  list: list,
  test: idOrKey
};