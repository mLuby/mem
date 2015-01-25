var app = angular.module('LocalStorage',[]);

app.service('storage', function(){
  this.set = function(key, value){
    localStorage[key] = JSON.stringify(value);
  };
  this.get = function(key){
    if(localStorage.hasOwnProperty(key)){
      return JSON.parse(localStorage[key]);
    }
  };
  this.add = function(key, value){
    var array = this.get(key) || [];
    array.push(value); // remember push returns index not array.
    this.set(key, array );
  };
  this.delete = function(key, index){
    var array = this.get(key);
    var previousValue = array[index];
    array.splice(index, 1);
    this.set(key, array);
    return previousValue;
  }
  this.deleteAll = function(key){
    var previousValue = this.get(key);
    localStorage.removeItem(key);
    return previousValue;
  }
});