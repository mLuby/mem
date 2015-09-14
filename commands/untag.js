module.exports = {
  help: 'Remove a task tag.',
  example: 'mem untag project_x',
  command: untag
}

function untag (tasks, tagName) {
  for (var id in tasks) {
    if (tasks[id].tags && tasks[id].tags.hasOwnProperty(tagName))
    delete tasks[id].tags[tagName]
  }
  return tasks
}
