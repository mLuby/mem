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
  console.log('Adding task...');
  storage.add(args);
}
if(command==='done'){
  console.log('Completing task...');
  storage.done(args[0]);
}
if(command==='list'){
  console.log('Listing tasks...');
  storage.list().forEach(function(task){
    console.log(task);
    // console.log(typeof task === 'object' ? JSON.parse(task) : task);
  });
}
