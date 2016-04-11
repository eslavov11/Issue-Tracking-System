'use strict';

angular.module('issueTrackingSystem.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'user/user.html',
    controller: 'UserController'
  });
}])

.controller('UserController', [function() {

}]);