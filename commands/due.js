module.exports = {
  help: 'Set a task due datetime.',
  example: 'mem due 9/14 4:30; mem due Thursday',
  command: due
}

var moment = require('moment')
var formats = [
  'MM-DD-YYYY HH:mm',
  'MM/DD/YYYY HH:mm',
  'MM/DD HH:mm',
  'HH:mm'
]

function due (tasks, dueString) {
  var time = moment(dueString, formats)
  if (time.isValid()) {
    for (var id in tasks) {
      tasks[id].due = time.format()
    }
  } else {
    console.log('invalid datetime', dueString)
  }

  return tasks
}
