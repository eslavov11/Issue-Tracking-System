'use strict';

angular.module('issueTrackingSystem.navbar', [
        'issueTrackingSystem.users.authentication'])

    .controller('NavbarController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window, authentication) {
            $scope.show = !!localStorage.access_token;

            $scope.username = localStorage.username;
        }]);