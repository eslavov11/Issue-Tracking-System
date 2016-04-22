'use strict';

angular.module('issueTrackingSystem.home', [
    'ngRoute',
    'issueTrackingSystem.users.authentication'])

    .controller('HomeController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window , authentication) {
            $scope.logUser = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        localStorage.access_token = loggedUser.data.access_token;
                        localStorage.username = loggedUser.data.userName;
                        localStorage.isAdmin = loggedUser.isAdmin;
                        window.location.reload();
                        console.log(loggedUser);
                    }, function (error) {
                        alert('Login error ' + error);
                        console.log(error);
                    });
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        var userData = {
                            username: user.email,
                            password: user.password
                        };

                        $scope.logUser(userData);
                    }, function (error) {
                        alert('Register error' + error);
                        console.log(error);
                    });
            };
    }]);