(function(){
  'use strict';
  var mem = require('./mem.js');
  var chalk = require('chalk');
  var style = {
    mem: chalk.grey.dim,
    cmd: chalk.yellow,
    arg: chalk.cyan
  }
  var switchObj = {
    'add': function(taskName){ displayTask(mem.add(taskName)); },
    'remove': function(taskName){ displayTask(mem.remove(taskName)); },
    'get': function(taskNameOrID){ displayTask(mem.get(taskNameOrID)); },
    'list': function(){ mem.list().forEach(function(task){
                          displayTask(task);
                        }); },
    'tag':  function(tagName){ displayTask(mem.tag(tagName)); },
    'untag':  function(tagName){ displayTask(mem.untag(tagName)); },
    'examine': function(attr){ console.log(attr+': '+mem.examine(attr)); },
    'find': function(searchString){ mem.find(arguments[0]).forEach(function(task){
                                displayTask(task);
                              }); },
    'edit': function(attrValuePair){
      var attr = attrValuePair.split(':')[0];
      var value = attrValuePair.split(':')[1];
      displayTask(mem.edit(attr, value)); },
    'sync': function(arg){ mem.sync(arg); }
  }

  var doCommand = function(parameters){
    var command;
    var args;
    if(parameters){
      var command = parameters[0];
      var args = parameters.slice(1);
    } else {
      var command = process.argv[2];
      var args = process.argv.slice(3);
    }

    if( switchObj.hasOwnProperty(command) ){
      // assuming 1 arg per command
      switchObj[command](args.shift());
      // allows chaining commands
      if(args.length > 0){
        doCommand(args);
      }
    } else {
      showHelp();
    }
  }

  var displayTask = function(task){
    // Text console.log formatting: https://github.com/sindresorhus/chalk/blob/master/readme.md
    var format = {
      'id': chalk.red,
      'name': chalk.white,
      'tags': {
        'default': chalk.bgYellow.black,
        'done': chalk.inverse,
        'meta': chalk.bgBlue.grey,
        'v2': chalk.bgGreen.black,
        'bug': chalk.bgRed.black,
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

  var showHelp = function(){
    console.log(' '+chalk.underline('Commands:\n')
      +style.mem(' mem ')+style.cmd('add ')+style.arg('\'task name\'\n')
      +style.mem(' mem ')+style.cmd('get ')+style.arg('[id|\'task name\']\n')
      +style.mem(' mem ')+style.cmd('examine ')+style.arg('property\n')
      +style.mem(' mem ')+style.cmd('list\n')
      +style.mem(' mem ')+style.cmd('tag ')+style.arg('tagName\n')
      +style.mem(' mem ')+style.cmd('untag ')+style.arg('tagName\n')
      +style.mem(' mem ')+style.cmd('find ')+style.arg('\'search string\'\n')
      +style.mem(' mem ')+style.cmd('remove ')+style.arg('current\n')
      +style.mem(' mem ')+style.cmd('sync ')+style.arg('cloud\n')
    );
  };

  doCommand();
})();