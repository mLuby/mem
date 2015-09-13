module.exports = {
  help: 'Delete a task permanently.',
  example: 'mem match st delete',
  command: deleteTask
}

function deleteTask (tasks) {
  for (var id in tasks) {
    tasks[id] = null
  }

  return tasks
}
