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
                    delete localStorage.access_token;
                    delete localStorage.username;
                    delete localStorage.userId;
                    delete localStorage.isAdmin;

                    window.location.reload();
                    //TODO: notify user
                }, function (error) {
                    console.log(error);
                });
        }]);