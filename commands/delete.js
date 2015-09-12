module.exports = {
  help: 'Delete a task permanently.',
  example: 'mem delete 2',
  command: command
}

var connection = require('./connect.js').connect()

function command (keyToDelete) {
  var tasksRef = connection.tasksRef()
  console.log(keyToDelete, typeof keyToDelete)
  if(!isNaN(Number(keyToDelete))){
    var index = keyToDelete
    tasksRef.once('value', function(data) {
      var taskList = data.val()
      keyToDelete = Object.keys(taskList)[index]
      console.log('delete by index', index ,'rather than key', keyToDelete)
      tasksRef.child(keyToDelete).remove(connection.end)
    })
  } else {
    tasksRef.child(keyToDelete).remove(connection.end)
  }
}

// require('./commands/delete.js').command(0)
