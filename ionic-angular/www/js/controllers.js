var module = angular.module('controllers', ['tasks']);

module.controller('AppController', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

module.controller('TasksController', function($scope, Tasks) {
  $scope.tasks = Tasks;
  $scope.reorderTask = function(task, fromIndex, toIndex) {
    // todo maybe modify Tasks directly?
    $scope.tasks.splice(fromIndex, 1);
    $scope.tasks.splice(toIndex, 0, task);
  };
  $scope.toggle = function(task){
    if(task.status === 'complete'){
      task.status = 'incomplete';
    } else if(task.status === 'incomplete'){
      task.status = 'pending';
    } else if (task.status === 'pending'){
      task.status = 'complete';
    }
  }
})

module.controller('TaskController', function($scope, $stateParams) {
  // todo should probably handle toggleTask here rather than in parent.
});
