(function(){
  'use strict';
  var db = require('./db.js');

  var command = process.argv[2];
  var args = process.argv.slice(3);

  switch(command){
    case 'add':
      db.add(args[0]);
      break;
    case 'get':
      db.get(args[0]);
      break;
    case 'id':
      db.id(args[0]);
      break;
    case 'list':
      db.list();
      break;
    case 'examine':
      db.examine(args[0]);
      break;
    case 'set':
      db.set(args[0], args[1], args[2]);
      break;
    case 'tag':
      db.tag(args[0], args[1]);
      break;
    default:
      console.log('  Commands:\n'
        +'    add [taskName]\n'
        +'    get [taskName]\n'
        +'    examine [property]\n'
        +'    list all|[tagName]\n'
        +'    set [property] [value]\n'
        +'    tag [tagName]');
  }
})();