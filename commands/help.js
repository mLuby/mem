module.exports = {
  help: 'Displays help for commands',
  example: 'mem help',
  command: command,
}

var fs = require('fs')

// get list of files in commands directory
// for each file, require it and get help text
function command (tasks, commandName) {
  var commandNames = []
  if(commandName){
    commandNames.push(commandName)
  } else {
    commandNames = fs.readdirSync('./commands').filter(onlyJsFiles)
  }
  commandNames.forEach(printHelpForCommand)
  console.log('') // new line for UI separation
  return tasks
}

function onlyJsFiles (fileName) { return ~fileName.indexOf('.js') }

function printHelpForCommand (commandName) {
  console.log(commandName.replace('.js',''), require('./'+commandName).help)
}
