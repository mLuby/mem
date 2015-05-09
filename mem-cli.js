#!/usr/bin/env node

(function(){
  'use strict';
  var mem = require('./mem.js');
  var style = require('./config.js').styles
  var switchObj = {
    'add': function(taskName){ displayTask(mem.add(taskName)); },
    'delete': function(taskName){ displayTask(mem.remove(taskName)); },
    'get': function(taskNameOrID){ displayTask(mem.get(taskNameOrID)); },
    'list': function(){ mem.list().forEach(function(task){
                          displayTask(task);
                        }); },
    'tag':  function(tagName){ displayTask(mem.tag(tagName)); },
    'untag':  function(tagName){ displayTask(mem.untag(tagName)); },
    'examine': function(attr){ console.log(attr+': '+mem.examine(attr)); },
    'show': function(searchString){ mem.show(arguments[0]).forEach(function(task){
                                displayTask(task);
                              }); },
    'edit': function(attrValuePair){
      var attr = attrValuePair.split(':')[0];
      var value = attrValuePair.split(':')[1];
      displayTask(mem.edit(attr, value)); },
    'sync': function(arg){ mem.sync(arg); },
    'test': function(){ mem.test(); },
    'config': function(){ mem.config(); }
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
    var taskString = ' '+style.id(task.id)+style.other(': ')+style.name(task.name);
    var status = style.incomplete;
    if(task.tags){
      status = task.tags.indexOf('done') > -1 ? style.complete : style.incomplete;
      var tagsString = task.tags.reduce(function(sum, item){
        var color = style.tags.hasOwnProperty(item) ? style.tags[item] :style.tags.default
        return (sum.length>0?sum+' ':sum) + color(item);
      }, '');
      taskString += style.other(' ')+tagsString;
    }
    taskString = status(taskString);
    console.log(taskString);
  };

  var showHelp = function(){
    console.log(' '+style.underline('Commands:\n')
      +style.mem(' installed in /usr/local/lib/node_modules/mem2/\n')
      +style.mem(' mem ')+style.cmd('add ')+style.arg('\'task name\'\n')
      +style.mem(' mem ')+style.cmd('get ')+style.arg('id|\'task name\'\n')
      +style.mem(' mem ')+style.cmd('examine ')+style.arg('property\n')
      +style.mem(' mem ')+style.cmd('list\n')
      +style.mem(' mem ')+style.cmd('tag ')+style.arg('tagName\n')
      +style.mem(' mem ')+style.cmd('untag ')+style.arg('tagName\n')
      +style.mem(' mem ')+style.cmd('show ')+style.arg('regex\n')
      +style.mem(' mem ')+style.cmd('delete ')+style.fixedArg('\'current\'\n')
      +style.mem(' mem ')+style.cmd('sync ')+style.fixedArg('\'cloud\'\n')
      +style.mem(' mem ')+style.cmd('config')
    );
  };

  doCommand();
})();
