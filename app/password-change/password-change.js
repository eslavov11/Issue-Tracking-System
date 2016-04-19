'use strict';

angular.module('issueTrackingSystem.passwordChange', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('PasswordChangeController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window , authentication) {
            $scope.changePassword = function (changePasswordData) {
                if (changePasswordData.NewPassword !== changePasswordData.ConfirmPassword) {
                    // TODO: ERROR
                    alert('Passwords do not match');
                } else if (changePasswordData.OldPassword === changePasswordData.NewPassword) {
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