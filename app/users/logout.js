'use strict';

angular.module('issueTrackingSystem.users.logout', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('LogoutController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window, authentication) {

            //TODO: call server
            authentication.logoutUser({access_token: sessionStorage.access_token})
                .then(function () {
                    sessionStorage.access_token = '';
                    sessionStorage.username = '';
                    $window.location.href = '/';
                    //TODO: notify user
                }, function (error) {
                    console.log(error);
                });
        }]);