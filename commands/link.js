module.exports = {
  help: 'Set a link on a task.',
  example: 'mem link mLuby.com',
  command: link
}

function link (tasks, url) {
  for (var id in tasks) {
    tasks[id].link = url
  }
  return tasks
}
