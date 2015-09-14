module.exports = {
  help: 'Show task',
  example: 'mem show',
  command: show
}

var moment = require('moment')

function show (tasks) {
  for (var id in tasks) {
    var t = tasks[id]
    console.log(id.slice(0,6)+':'+displayStatus(t.status)+displayName(t.name)+displayTime(t.due))
  }
  console.log('') // new line for UI separation
  return tasks
}

function displayStatus (status) {
  switch (status) {
    case 'incomplete': return ' [ ]'; break;
    case 'pending': return ' […]'; break;
    case 'done': return ' [√]'; break;
  }
}

function displayName (name) {
  return ' '+name
}

function displayTime (timestamp) {
  if (timestamp) {
    var now = moment()
    if (timestamp > now) {
      return ' due:'+moment(timestamp).toNow()
    } else {
      return ' due:'+moment(timestamp).fromNow()
    }
  } else {
    return ''
  }
}