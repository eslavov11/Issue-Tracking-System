'use strict';

angular.module('issueTrackingSystem.passwordChange', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('PasswordChangeController', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location , authentication) {
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
                        $location.path('/');
                    }, function (error) {
                        alert('Change password error ' + error);
                        console.log(error);
                    });
            };
        }]);