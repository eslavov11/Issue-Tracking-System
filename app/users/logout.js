'use strict';

angular.module('issueTrackingSystem.users.logout', [
        'issueTrackingSystem.users.authentication'])

    .controller('LogoutController', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location, authentication) {
            //TODO: call server
            authentication.logoutUser({access_token: localStorage.access_token})
                .then(function () {
                    localStorage.access_token = '';
                    localStorage.username = '';
                    window.location.reload();
                    //TODO: notify user
                }, function (error) {
                    console.log(error);
                });
        }]);