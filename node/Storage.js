/*************************/
/* Handles data storage. */
/*************************/

// Initialize localStorage.
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./.storage');
}

var createTask = function(name, dueBy, duration){
  localStorage.setItem(name, JSON.stringify({name: name, dueBy: dueBy, duration: duration}));
};

var completeTask = function(key){
  var task = localStorage.getItem(key);
  console.log('task',task);
  task.status = 'done';
  localStorage.setItem(key, JSON.stringify(task));
};

var list = function(){
  var results = [];
  for(var i=0; i<localStorage.length; i++){
    results.push(
        localStorage.getItem(
          localStorage.key(i)
        )
    );
  }
  return results;
};

module.exports = {
  add: createTask,
  edit: createTask,
  done: completeTask,
  delete: localStorage.removeItem,
  list: list
};