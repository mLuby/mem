module.exports = {
  help: 'Show task',
  example: 'mem show',
  command: show
}

function show (tasks) {
  for (var id in tasks) {
    console.log(id+': `'+tasks[id].name+'`')
  }
  console.log('') // new line for UI separation
  return tasks
}
