var module = angular.module('tasks', []);

module.value('Tasks', [
    { title: 'dishes', id: 1, status: 'complete' }
    ,{ title: 'laundry', id: 2, status: 'pending' }
    ,{ title: 'make lunch', id: 3, status: 'incomplete' }
    ,{ title: 'buy present', id: 4, status: 'incomplete' }
    ,{ title: 'call office', id: 5, status: 'complete' }
    ,{ title: 'save the world', id: 6, status: 'pending' }
]);
