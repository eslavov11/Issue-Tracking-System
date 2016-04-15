'use strict';

angular.module('issueTrackingSystem.home', [
    'ngRoute',
    'issueTrackingSystem.users.authentication'])
    //.config(['$routeProvider', function($routeProvider) {
    //    $routeProvider.when('/', {
    //        templateUrl: 'app/home/home.html',
    //        controller: 'HomeController'
    //    });
    //}])

    .controller('HomeController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window , authentication) {
            $scope.logUser = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        sessionStorage.access_token = loggedUser.data.access_token;
                        sessionStorage.username = loggedUser.data.userName;
                        $window.location.href = '/';
                        console.log(loggedUser);
                    }, function (error) {
                        alert('Login error ' + error);
                        console.log(error);
                    });
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(5555);
                        console.log(registeredUser);
                        console.log(5555);
                    }, function (error) {
                        alert('Register error' + error);
                        console.log(error);
                    });
            };
    }]);