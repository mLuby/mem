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
  if(args.length === 1){
    for(var i = 0; i < args[0]; i++){
      storage.add( randomTask.new() );
    }
  } else {
   storage.add(args);
  }
}
if(command==='list'){
  storage.list().forEach(function(task, index){
    console.log(index+': '+task);
  });
}
if(command==='mark'){
  storage.mark(args[0], args[1]);
}
if(command==='del' || command==='delete'){
  storage.delete(args[0]);
}
if(command==='test'){
  console.log(storage.test(args[0]));
}
if(process.argv[3]==='requires'){
  storage.requires(process.argv[2], process.argv[4]);
}
