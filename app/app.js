'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.view1',
  'issueTrackingSystem.view2',
  'issueTrackingSystem.navbar',
  'issueTrackingSystem.home',
  'issueTrackingSystem.dashboard',
  'issueTrackingSystem.users.logout',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.projects.project',
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: sessionStorage.access_token ? 'app/dashboard/dashboard.html' : 'app/home/home.html',
            controller: sessionStorage.access_token ? 'DashboardController' : 'HomeController'
        });

        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/projects/project.html',
            controller: 'ProjectController'
        });

        $routeProvider.when('/logout', {
            template: '',
            controller: 'LogoutController'
        });

        $routeProvider.when('/profile/password', {
            template: 'password-change/password-change.html',
            controller: 'PasswordChangeController'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
