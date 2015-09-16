module.exports = {
  help: 'Show task',
  example: 'mem show',
  command: show
}

var moment = require('moment')

function show (tasks) {
  for (var id in tasks) {
    var t = tasks[id]
    console.log(id.slice(0,6)+':'+displayStatus(t.status)+displayName(t.name)+displayDue(t.due)+displayTime(t.time)+displayTags(t.tags)+displayLink(t.link))
  }
  console.log('') // new line for UI separation
  return tasks
}

function displayStatus (status) {
  switch (status) {
    case 'incomplete': return ' [ ]'; break;
    case 'pending': return ' […]'; break;
    case 'done': return ' [√]'; break;
  }
}

function displayName (name) {
  return ' '+name
}

function displayDue (timestamp) {
  if (timestamp) {
    var now = moment()
    if (timestamp > now) {
      return ' due:'+moment(timestamp).toNow()
    } else {
      return ' due:'+moment(timestamp).fromNow()
    }
  } else {
    return ''
  }
}

function displayTime (timestamp) {
  if (timestamp) {
    return ' time:'+moment.duration(timestamp).humanize()
  } else {
    return ''
  }
}

function displayTags (tags) {
  if (tags && typeof tags === 'object') {
    return ' tags:'+Object.keys(tags)
  } else {
    return ''
  }
}

function displayLink (link) {
  if (link) {
    return ' '+link
  } else {
    return ''
  }
}