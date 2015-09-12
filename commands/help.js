module.exports = {
  help: 'Displays help for commands',
  example: 'mem help',
  command: command,
}

var fs = require('fs')

// get list of files in commands directory
// for each file, require it and get help text
function command (commandName) {
  var commandNames = []
  if(commandName){
    commandNames.push(commandName)
  } else {
    commandNames = fs.readdirSync('./commands').filter(onlyJsFiles)
  }
  commandNames.forEach(printHelpForCommand)
}

function onlyJsFiles (fileName) { return ~fileName.indexOf('.js') }

function printHelpForCommand (commandName) {
  console.log(commandName.replace('.js',''), require('./'+commandName).help)
}

// require('./commands/help.js').command()
