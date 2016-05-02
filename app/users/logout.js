'use strict';

angular.module('issueTrackingSystem.users.logout', [
        'issueTrackingSystem.users.authentication'])

    .controller('LogoutController', [
        '$scope',
        '$location',
        'authentication',
        'toastr',
        function($scope, $location, authentication, toastr) {
            authentication.logoutUser({access_token: localStorage.access_token})
                .then(function () {
                    delete localStorage.access_token;
                    delete localStorage.username;
                    delete localStorage.userId;
                    delete localStorage.isAdmin;

                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                    toastr.info('Successfully logged out.');
                }, function (error) {
                    console.log(error);
                });
        }]);