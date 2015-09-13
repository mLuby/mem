module.exports = {
  help: 'match tasks that do not include the match string.',
  example: 'mem match argle',
  command: match
}

function match (tasks, matchText) {
  var matched = {}
  for (var id in tasks) {
    var task = tasks[id]
    if (matchText[0] === '^'){
      var inverseMatchText = matchText.slice(1)
      if (!~task.name.indexOf(inverseMatchText)) {
        matched[id] = task
      }
    } else {
      if (~task.name.indexOf(matchText)) {
        matched[id] = task
      }
    }
  }
  return matched
}
