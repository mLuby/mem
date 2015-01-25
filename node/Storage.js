/*************************/
/* Handles data storage. */
/*************************/

// Initialize localStorage.
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./.storage');
}


localStorage.setItem('myFirstKey', 'myFirstValue');
console.log(localStorage.getItem('myFirstKey'));


module.exports = {
  add: create,
  get: localStorage.get('myFirstKey'),
  edit: update,
  delete: destroy
};