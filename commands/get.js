module.exports = {
  help: 'Get a task by id.',
  example: 'mem get a960ff205ba620b2e6c78efba40580e1',
  command: get
}

function get (tasks, getId) {
  var result = {}
  for (var id in tasks) {
    if (id.indexOf(getId) === 0) {
      var result = {}
      result[id] = tasks[id]
    }
  }
  if (Object.keys(result).length !== 1) {
    console.log('Error: didn`t get exactly 1 task')
  } else {
    return result
  }
}
