'use strict';

angular.module('issueTrackingSystem.password-change', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('HomeController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window , authentication) {
            $scope.changePassword = function (changePasswordData) {
                if (changePasswordData.newPassword !== changePasswordData.newPasswordConfirm) {
                    // TODO: ERROR
                    alert('Passwords do not match');
                } else if (changePasswordData.oldPassword === changePasswordData.newPassword) {
                    // TODO: ERROR
                    alert('Old password cannot be new password... SHOULD I BE HANDLED BEFORE OR AFTER REST??');
                }

                authentication.changePassword(changePasswordData)
                    .then(function (success) {
                        $window.location.href = '/';
                    }, function (error) {
                        alert('Change password error ' + error);
                        console.log(error);
                    });
            };
        }]);