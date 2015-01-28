var storage = require('./Storage.js');

var command = process.argv[2];
/*
add
list
done
edit
delete
*/
var args = process.argv.slice(3);
// 'task name' 'due by' 'duration'
// console.log('args', args);
if(command==='add'){
  storage.add(args);
}
if(command==='done'){
  storage.done(args[0]);
}
if(command==='list'){
  storage.list().forEach(function(task){
    console.log(typeof task === 'object' ? JSON.parse(task) : task);
  });
}