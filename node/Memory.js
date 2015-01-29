var storage = require('./Storage.js');
var randomTask = require('./randomTask.js');
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
  if(args.length === 0){
    console.log(randomTask.new());
  }
  storage.add(args);
}
if(command==='list'){
  console.log('Listing tasks...');
  storage.list().forEach(function(task, index){
    console.log(index+': '+task);
  });
}
if(command==='done'){
  console.log('Completing task \''+args[0]+'\'');
  storage.done(args[0]);
}
if(command==='delete'){
  console.log('deleting task \''+args[0]+'\'');
  storage.delete(args[0]);
}
if(command==='test'){
  console.log(storage.test(args[0]));
}
