module.exports = {
  help: 'Get unfinished tasks.',
  example: 'mem list',
  command: list
}

var match = require('./match.js').command

function list (tasks) {
  return match(tasks, 'status:^done')
}
