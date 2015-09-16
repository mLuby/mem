var path = require('path')
var fs = require('fs')

var commands = loadCommands('./commands')
var connection = require('./commands/connect.js').connect()

// get tasks from firebase and parse params
connection.tasksRef().once('value', function(data) {
  // get tasks
  var tasks = data.val() || {}
  // execute commands
  var resultingTasks = executeCommand(tasks, process.argv.slice(2))
  // merge changes
  for (var id in resultingTasks) {
    tasks[id] = resultingTasks[id]
  }
  // overwrite tasks
  if (!tasks || !Object.keys(tasks).length) {
    console.log('Error–was going to erase tasks with:', tasks)
  } else {
    connection.tasksRef().set(tasks, connection.end)
  }
})

function executeCommand (tasks, params) {
  if (params.length === 0) {
    commands.help()
  } else {
    var commandName = params[0]
    var command = commands[commandName]
    var args = [tasks]
    Array.prototype.push.apply(args, params.slice(1, command.length))
    var remainingParams = params.slice(command.length)
    var resultingTasks = command.apply(null, args)
    if (commandName !== 'show' && commandName !== 'examine' && commandName !== 'delete') {
      commands.show(resultingTasks) // show results after every command
    }
    if (remainingParams.length) {
      return executeCommand(resultingTasks, remainingParams)
    } else {
      return resultingTasks
    }
  }
}

function loadCommands (dir_path) {
  var fileNames = fs
    .readdirSync(dir_path)
    .filter(onlyJsFiles)
  var commands = fileNames.reduce(function(commands, fileName){
    var command = path.basename(fileName, '.js')
    commands[command] = require('./commands/'+fileName).command
    return commands
  }, {})
  return commands
}

function onlyJsFiles (fileName) { return ~fileName.indexOf('.js') }
