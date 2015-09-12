module.exports = {
  help: 'Add a task.',
  example: 'mem add "Do laundry"',
  command: command
}

var connection = require('./connect.js').connect()

function command (taskName) {
  // connect to db
  // add task
  var timestamp = new Date()
  task = {
    name: taskName,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  // use numberic id
  // var taskCount;
  // tasks.once("value", function(data) {
  //   taskCount = Object.keys(data.val()).length
  //   console.log("tasks length", taskCount)
  //   var taskRef = tasks.child(taskCount)
  //   taskRef.update(task, end)
  // });

  connection.tasksRef().push(task, connection.end) // doesn't add createdAt, updatedAt
}

// require('./commands/add.js').command('testing')
