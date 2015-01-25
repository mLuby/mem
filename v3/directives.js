var app = angular.module('Memory');
/*
task
  has buttons and fields
  has 'new' variant
*/
app.directive('task', function(){
  return {
    restrict:'E',
    template:'<tr class="task" ng-controller="taskController as task">
                <td><button ng-click="task.add()">Add</button></td>
                <td><input ng-model="task.name" placeholder="name" /></td>
                <td><input ng-model="task.description" placeholder="description" /></td>
                <td><input ng-model="task.duration" placeholder="duration" /></td>
                <td><input ng-model="task.dueBy" placeholder="dueBy" /></td>
                <td><button ng-click="task.clear()">Cancel</button></td>
              </tr>',
    scope: {
      details: '=details'
    },
    link: function(){
      console.log('details',details);
    }
  };
});


/*
field
  placeholder
  value
  on-blur: update
*/
// app.directive('field');