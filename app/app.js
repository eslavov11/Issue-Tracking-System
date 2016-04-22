'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngResource',
  'issueTrackingSystem.view1',
  'issueTrackingSystem.view2',
  'issueTrackingSystem.navbar',
  'issueTrackingSystem.home',
  'issueTrackingSystem.dashboard',
  'issueTrackingSystem.users.logout',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.projects',
  'issueTrackingSystem.projects.addProject',
  'issueTrackingSystem.projects.editProject',
  'issueTrackingSystem.issues',
  'issueTrackingSystem.issues.addIssue',
  'issueTrackingSystem.issues.editIssue',
  'issueTrackingSystem.passwordChange'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: localStorage.access_token ? 'app/dashboard/dashboard.html' : 'app/home/home.html',
            controller: localStorage.access_token ? 'DashboardController' : 'HomeController',
            access: {
                requiresLogin: !!localStorage.access_token
            }
        });

        $routeProvider.when('/projects/add', {
            templateUrl: 'app/projects/add-project/add-project.html',
            controller: 'AddProjectController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'app/projects/edit-project/edit-project.html',
            controller: 'EditProjectController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'app/issues/add-issue/add-issue.html',
            controller: 'AddIssueController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/projects/project.html',
            controller: 'ProjectController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'app/issues/edit-issue/edit-issue.html',
            controller: 'EditIssueController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/issues/issue.html',
            controller: 'IssueController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/logout', {
            template: '',
            controller: 'LogoutController',
            access: {
                requiresLogin: true
            }
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/password-change/password-change.html',
            controller: 'PasswordChangeController',
            access: {
                requiresLogin: true
            }
        });

       $routeProvider.otherwise({
           redirectTo: '/'
       });
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')



    .run(function ($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            //if (next.access.requiresAnonymous && authService.isLoggedIn()) {
            //    $location.path('/');
            //}

            if (!authentication.isLoggedIn() && next.access.requiresLogin) {
                $location.path('/');
            }

            //if (next.access.requiresAdmin && !authService.isAdmin()) {
            //    $location.path('/');
            //}
        });
    });


//.run(function ($rootScope, $location, authentication) {
//    $rootScope.$on('$locationChangeStart', function (event, requestPath, currentPath) {
//        if (authentication.access.requiresLogin && authentication.isLoggedIn()) {
//            $location.path('/');
//        }
//        var newPath = requestPath.toString().substring(currentPath.toString().length, requestPath.toString().length);
//
//        var l = authentication.isLoggedIn();
//
//        if (!authentication.isLoggedIn() && newPath !== '') {
//            $location.path('/');
//        }
//
//        //if (requestPath.access.requiresAdmin && !authService.isAdmin()) {
//        //    $location.path('/');
//        //}
//    }); })