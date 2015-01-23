var app = angular.module('Memory', []);

app.value('tasks', [
    {name:'Buy milk', duration:'30m', dueBy:'Tomorrow', blocking:'4h'}
    ,{name:'Fix watch', duration:'1d', dueBy:'Next week', blocking:'10m'}
    ,{name:'Meet Tom', duration:'1.5h', dueBy:'Today', blocking:''}
  ]);