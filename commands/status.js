module.exports = {
  help: 'Set task status [incomplete done pending].',
  example: 'mem status done',
  command: status
}

function status (tasks, statusString) {
  for (var id in tasks) {
    tasks[id].status = statusString
  }

  return tasks
}
