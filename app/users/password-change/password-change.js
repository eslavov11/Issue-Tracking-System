'use strict';

angular.module('issueTrackingSystem.users.passwordChange', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('PasswordChangeController', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location , authentication) {
            $scope.changePasswordData = {};

            $scope.changePassword = function () {
                var changePasswordData = $scope.changePasswordData;
                if (!validateData(changePasswordData)) {
                    return;
                }

                authentication.changePassword(changePasswordData)
                    .then(function (success) {
                        $location.path('/');
                    }, function (error) {
                        alert('Change password error ' + error);
                        console.log(error);
                    });
            };

            function validateData(changePasswordData) {
                if (!changePasswordData.OldPassword || !changePasswordData.NewPassword || !changePasswordData.ConfirmPassword) {
                    return false;
                } else if (changePasswordData.OldPassword.length < 6 ||
                    changePasswordData.NewPassword.length < 6 ||
                    changePasswordData.ConfirmPassword.length < 6) {
                    return false;
                } else if (changePasswordData.NewPassword !== changePasswordData.ConfirmPassword) {
                    // TODO: ERROR
                    alert('Passwords do not match');
                    return false;
                } else if (changePasswordData.OldPassword === changePasswordData.NewPassword) {
                    // TODO: ERROR
                    alert('Old password cannot be new password... SHOULD I BE HANDLED BEFORE OR AFTER REST??');
                    return false;
                }

                return true;
            }
        }]);