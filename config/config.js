module.exports = {
  get: get,
  set: set
}

// var config = require('../config.js')
// var db = config.get('db')
// db.prop = 'value'
// config.set('db', db)

// note there's local config for things on the local system
// and global config, stored in the db

var fs = require('fs');

function get (configFile) {
  return JSON.parse(fs.readFileSync('config/'+configFile+'.json', 'utf8'))
}

function set (configFile, object) {
  fs.writeFileSync('config/'+configFile+'.json', JSON.stringify(object, null, 2))
}
