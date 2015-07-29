function add (current_task, all_tasks, argument) {
  console.log('add current_task', current_task, 'argument', argument);
}

module.exports = {
  command:add,
  help: 'name of task to add. task becomes current_task'
};
