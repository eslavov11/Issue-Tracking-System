'use strict';

angular.module('issueTrackingSystem.navbar', [
        'issueTrackingSystem.users.authentication'])

    .controller('NavbarController', [
        '$scope',
        '$window',
        'authentication',
        function($scope, $window, authentication) {
            $scope.show = !!sessionStorage.access_token;

            $scope.username = sessionStorage.username;
        }]);