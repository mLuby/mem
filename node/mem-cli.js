(function(){
  'use strict';
  var command = process.argv[2];
  var args = process.argv.slice(3);
  var mem = require('./mem.js');

  switch(command){
    case 'add':
      mem.add(args[0]);
      break;
    case 'get':
      mem.get(args[0]);
      break;
    case 'id':
      mem.id(args[0]);
      break;
    case 'list':
      mem.list().forEach(function(task){
        displayTask(task);
      });
      break;
    case 'examine':
      mem.examine(args[0]);
      break;
    case 'set':
      mem.set(args[0], args[1], args[2]);
      break;
    case 'tag':
      mem.tag(args[0], args[1]);
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

  function displayTask(task){
    // Text console.log formatting: https://github.com/sindresorhus/chalk/blob/master/readme.md
    var chalk = require('chalk');
    var format = {
      'id': chalk.red,
      'name': chalk.white,
      'tags': {
        'default': chalk.bgYellow.black,
        'done': chalk.inverse,
        'meta': chalk.bgBlue.grey,
        'v2': chalk.bgGreen.black
      },
      'incomplete': chalk.green,
      'complete': function(){ return chalk.grey.dim(chalk.stripColor.apply(null, arguments));},
      'other': chalk.grey
    };
    var taskString = ''+format.id(task.id)+format.other(': ')+format.name(task.name);
    var status = format.incomplete;
    if(task.tags){
      status = task.tags.indexOf('done') > -1 ? format.complete : format.incomplete;
      var tagsString = task.tags.reduce(function(sum, item){
        var color = format.tags.hasOwnProperty(item) ? format.tags[item] :format.tags.default
        return (sum.length>0?sum+' ':sum) + color(item);
      }, '');
      taskString += format.other(' ')+tagsString;
    }
    taskString = status(taskString);
    console.log(taskString);
  };
})();