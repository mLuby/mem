module.exports = {
  help: 'Set a task estimated time duration.',
  example: 'mem time 30m',
  command: time
}

var moment = require('moment')

function time (tasks, timeString) {
  var time = parseTime(timeString)
  for (var id in tasks) {
    tasks[id].time = time.toJSON()
  }

  return tasks
}

function parseTime(time) {
  var relativeTime = time.match(/([0-9]+)([yQMwdhms])/)
  return moment.duration(Number(relativeTime[1]),relativeTime[2])
}
