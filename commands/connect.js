module.exports = {
  help: 'Connect to database with a user key.',
  example: 'mem connect "test tasks"',
  command: command,
  connect: connect,
  end: end
}

var config = require('../config.js')

function command (userKey) {
  var db = config.get('db')
  db.userKey = userKey
  config.set('db', db)
  end()
}

function connect () {
  var Firebase = require('firebase')
  var config = require('../config.js')
  var connection = new Firebase('https://mem-storage.firebaseio.com/users/'+config.get('db').userKey)
  module.exports.tasksRef = connection.child('tasks')
  return {
    tasksRef: function(){ return connection.child('tasks') },
    end: end
  }
}

function end () { process.exit(0) }
