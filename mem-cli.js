var path = require('path');
var fs = require('fs');

var commands = loadCommands('./commands');
executeCommand();

function loadCommands (dir_path) {
  var fileNames = fs
    .readdirSync(dir_path)
    .filter(function(fileName){ return fileName !== '.DS_Store'; })
  var commands = fileNames.reduce(function(commands, fileName){
    var command = path.basename(fileName, '.js');
    commands[command] = require('./commands/'+fileName).command;
    return commands;
  }, {});
  return commands;
}

function executeCommand (parameters) {
  if(parameters){
    var command = parameters[0];
    var args = parameters.slice(1);
  } else {
    var command = process.argv[2];
    var args = process.argv.slice(3);
  }
  if( commands.hasOwnProperty(command) ){
    // assuming 1 arg per command
    commands[command](args.shift());
    // allows chaining commands
    if(args.length > 0){
      executeCommand(args);
    }
  } else {
    commands['help']();
  }
}
