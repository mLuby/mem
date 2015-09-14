module.exports = {
  help: 'Add a task.',
  example: 'mem add "Do laundry"',
  command: add
}

var hat = require('hat')

function add (tasks, taskName) {
  var timestamp = new Date()
  task = {
    name: taskName,
    createdAt: timestamp,
    updatedAt: timestamp,
    status: 'incomplete'
  }
  tasks = {}
  tasks[hat()] = task
  return tasks
}
