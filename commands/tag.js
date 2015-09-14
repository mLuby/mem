module.exports = {
  help: 'Set a task tag.',
  example: 'mem tag project_x',
  command: tag
}

function tag (tasks, tagName) {
  for (var id in tasks) {
    tasks[id].tags = tasks[id].tags || {}
    tasks[id].tags[tagName] = true
  }
  return tasks
}
