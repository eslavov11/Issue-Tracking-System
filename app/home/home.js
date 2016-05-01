'use strict';

angular.module('issueTrackingSystem.home', [
    'ngRoute',
    'issueTrackingSystem.common.notyService',
    'issueTrackingSystem.users.authentication'])

    .controller('HomeController', [
        '$scope',
        '$window',
        'authentication',
        'notyService',
        function($scope, $window , authentication, notyService) {
            $scope.logUser = function (user) {
                if (user.password.toString().length < 6) {
                    return;
                }

                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        window.location.reload();
                        notyService.successMessage('You have successfully logged in.');
                    }, function (error) {
                        alert('Login error ' + error);
                        console.log(error);
                    });
            };

            $scope.registerUser = function (user) {
                if (user.password.toString().length < 6 || user.confirmPassword.toString().length < 6) {
                    return;
                } else if (user.password.toString() !== user.confirmPassword.toString().length) {
                    // TODO: NOTY passwordss do not match
                    alert('Passwords do not match. Try again.');
                    return;
                }

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