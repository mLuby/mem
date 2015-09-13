module.exports = {
  help: 'match tasks that do not include the match string.',
  example: 'mem match name:argle',
  command: match
}

function match (tasks, matchText) {
  var matched = {}
  var i = matchText.indexOf(':')
  var prop = matchText.slice(0,i)
  var match = matchText.slice(i+1)
  for (var id in tasks) {
    var task = tasks[id]
    if (match[0] === '^'){
      var inverseMatch = match.slice(1)
      if (!~task[prop].indexOf(inverseMatch)) {
        matched[id] = task
      }
    } else {
      if (~task.name.indexOf(match)) {
        matched[id] = task
      }
    }
  }
  return matched
}
