module.exports = {
  help: 'Show task',
  example: 'mem show',
  command: show
}

var moment = require('moment')

function show (tasks) {
  for (var id in tasks) {
    var t = tasks[id]
    console.log(id+': `'+t.name+'` '+displayTime(t.due))
  }
  console.log('') // new line for UI separation
  return tasks
}

function displayTime (timestamp) {
  if (timestamp) {
    var now = moment()
    if (timestamp > now) {
      return 'due '+moment(timestamp).toNow()+' '
    } else {
      return 'due '+moment(timestamp).fromNow()+' '
    }
  } else {
    return ''
  }
}
