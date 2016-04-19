'use strict';

angular.module('issueTrackingSystem.projects', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service'])

    .controller('ProjectController', [
        '$scope',
        '$route',
        'projectService',
        'authentication',
        function($scope, $route, projectService , authentication) {
            var projectId = $route.current.params.id;

            projectService.getProjectById(authentication.getAuthHeaders(), projectId)
                .then(function (project) {
                    $scope.project = JSON.stringify(project.data);
                    console.log(project);
                }, function (error) {
                    console.log(error);
                });
        }]);


//•	Project Page
//o	Route: #/projects/:id
//o	Includes all the project info and all of its issues. If the user is the project’s leader he can add new issues.
