module.exports = {
  help: 'Get a task by id.',
  example: 'mem get a960ff205ba620b2e6c78efba40580e1',
  command: get
}

function get (tasks, getId) {
  for (var id in tasks) {
    if (id.indexOf(getId) === 0) {
      var result = {}
      result[id] = tasks[id]
      return result
    }
  }
  return {}
}
