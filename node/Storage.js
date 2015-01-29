/*************************/
/* Handles data storage. */
/*************************/

// Initialize localStorage.
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./.storage');
}

var create = function(args){
  console.log('Adding task', args);
  save(localStorage.length, args);
};

var save = function(id, task){
  localStorage.setItem(id, JSON.stringify(task));
};

var get = function(id){
  return JSON.parse(localStorage.getItem(localStorage.key(id)));
}

var idOrKey = function(keyOrID){
  if(keyOrID.match(/^[0-9]+$/)){
    return localStorage.key(keyOrID);
  } else {
    return Number(keyOrID);
  }
}

var list = function(){
  console.log('Listing tasks...');
  var results = [];
  for(var id=0; id<localStorage.length; id++){
    results.push(JSON.stringify(get(id)));
  }
  return results;
};

var mark = function(id, key, value){
  var task = get(id);
  task[key] = value;
  save(id, task);
};

var remove = function(id){
  console.log('deleting task #',id);
  localStorage.removeItem(localStorage.key(id));
};

var requires = function(id, reqID){
  console.log('\''+get(id).name+'\' requires \''+get(reqID).name+'\'');
  mark(id, 'requires', get(reqID));
}

module.exports = {
  add: create,
  mark: mark,
  delete: remove,
  list: list,
  requires: requires
};