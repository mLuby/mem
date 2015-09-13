module.exports = {
  help: 'Examine task details',
  example: 'mem examine',
  command: examine
}

function examine (tasks) {
  for (var id in tasks) {
    console.log(id+': '+JSON.stringify(tasks[id]))
  }
  console.log('') // new line for UI separation
  return tasks
}
