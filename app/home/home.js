'use strict';

angular.module('issueTrackingSystem.home', [
    'ngRoute',
    'issueTrackingSystem.users.authentication'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [
        '$scope',
        'authentication',
        function($scope, authentication) {
            $scope.logUser = function (user) {
                console.log(user);
                authentication.loginUser(user);
            };

            $scope.registerUser = function (user) {
                console.log(user);
                authentication.registerUser(user);
            };
    }]);