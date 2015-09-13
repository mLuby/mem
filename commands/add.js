module.exports = {
  help: 'Add a task.',
  example: 'mem add "Do laundry"',
  command: add
}

var hat = require('hat')

function add (tasks, taskName) {
  var timestamp = new Date()
  task = {
    name: taskName
  }
  tasks[hat()] = task
  return tasks
}
