- Each command takes 1 argument
- help task shows other tasks' help text
- fetchCommand(command)(current_task, argument);
- config helps interact with config .json files


mem show filter done=false
mem show filter !done
mem show filter /[^(done)]/
mem get 12 tag done save

mem (gets array of tasks)
filter (regex)

save (set to firebase)

mem show

mem get 12 tag done save


list -> [1,2,3]
add 'check email' -> [1,2,3,4]
save -> [1,2,3,4] (update/set)

list -> [1,2,3]
filter != 2 -> [1,3]
delete 1,3
save -> [2] (set)

list -> [1,2,3]
filter != 2 -> [1,3]
tag 'odd' -> [1`,3`]
save -> [1`,2,3`] (update/set)
