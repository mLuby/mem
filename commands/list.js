module.exports = {
  help: 'List all task',
  example: 'mem list',
  command: command
}

var connection = require('./connect.js').connect()

function command () {
  connection.tasksRef().once('value', function(data) {
    var taskList = data.val()
    var index = 0
    Object.keys(taskList).map(taskFromKey).forEach(printTask)
    connection.end()

    function taskFromKey (taskKey) { var task = taskList[taskKey]; task.key = taskKey; return task }
    function printTask (task) {
      console.log(index+': `'+task.name+'`')
      index += 1
    }
  })
}

// require('./commands/list.js').command()
