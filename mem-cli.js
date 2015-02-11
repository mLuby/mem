(function(){
  'use strict';
  var command = process.argv[2];
  var args = process.argv.slice(3);
  var mem = require('./mem.js');
  var chalk = require('chalk');
  var style = {
    mem: chalk.grey.dim,
    cmd: chalk.yellow,
    arg: chalk.cyan
  }


  switch(command){
    case 'add':
      displayTask(mem.add(args[0]));
      break;
    case 'get':
      displayTask(mem.get(args[0]));
      break;
    case 'list':
      mem.list().forEach(function(task){
        displayTask(task);
      });
      break;
    case 'examine':
      console.log(args[0]+': '+mem.examine(args[0]));
      break;
    case 'tag':
      displayTask(mem.tag(args[0]));
      break;
    case 'untag':
      displayTask(mem.untag(args[0]));
      break;
    case 'find':
      mem.find(args[0]).forEach(function(task){
        displayTask(task);
      });
      break;
    default:
      console.log(' '+chalk.underline('Commands:\n')
        +style.mem(' mem ')+style.cmd('add ')+style.arg('\'taskName\'\n')
        +style.mem(' mem ')+style.cmd('get ')+style.arg('taskName\n')
        +style.mem(' mem ')+style.cmd('examine ')+style.arg('property\n')
        +style.mem(' mem ')+style.cmd('list\n')
        +style.mem(' mem ')+style.cmd('tag ')+style.arg('tagName\n')
        +style.mem(' mem ')+style.cmd('untag ')+style.arg('tagName\n')
        +style.mem(' mem ')+style.cmd('find ')+style.arg('\'search string\''));
  }

  function displayTask(task){
    // Text console.log formatting: https://github.com/sindresorhus/chalk/blob/master/readme.md
    var format = {
      'id': chalk.red,
      'name': chalk.white,
      'tags': {
        'default': chalk.bgYellow.black,
        'done': chalk.inverse,
        'meta': chalk.bgBlue.grey,
        'v2': chalk.bgGreen.black,
        'housing': chalk.bgRed.black
      },
      'incomplete': chalk.green,
      'complete': function(){ return chalk.grey.dim(chalk.stripColor.apply(null, arguments));},
      'other': chalk.grey
    };
    var taskString = ' '+format.id(task.id)+format.other(': ')+format.name(task.name);
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