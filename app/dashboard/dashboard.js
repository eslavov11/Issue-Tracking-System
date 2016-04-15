'use strict';

angular.module('issueTrackingSystem.dashboard', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'])

    .controller('DashboardController', [
        '$scope',
        '$window',
        function($scope, $window) {
            $scope.username = sessionStorage.username;
        }]);