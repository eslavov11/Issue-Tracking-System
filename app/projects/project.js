'use strict';

angular.module('issueTrackingSystem.project.project', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.projectService'])

    .controller('ProjectController', [
        '$scope',
        '$route',
        'projectService',
        'authentication',
        function($scope, projectService , authentication) {
            var projectId = {
                id: $route.current.params.id
            };

            projectService.getProjectById(authentication.getAuthHeaders(), projectId)
                .then(function (project) {
                    console.log(project);
                }, function (error) {
                    console.log(error);
                });

            $scope.logUser = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        sessionStorage.access_token = loggedUser.data.access_token;
                        sessionStorage.username = loggedUser.data.userName;
                        sessionStorage.isAdmin = loggedUser.isAdmin;
                        $window.location.href = '/';
                        console.log(loggedUser);
                    }, function (error) {
                        alert('Login error ' + error);
                        console.log(error);
                    });
            };
        }]);


//•	Project Page
//o	Route: #/projects/:id
//o	Includes all the project info and all of its issues. If the user is the project’s leader he can add new issues.
