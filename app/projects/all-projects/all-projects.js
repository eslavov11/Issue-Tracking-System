'use strict';

angular.module('issueTrackingSystem.projects.allProjects', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service'])

    .controller('AllProjectsController', [
        '$scope',
        '$route',
        '$location',
        'projectService',
        'authentication',
        function($scope, $route, $location, projectService , authentication) {
            var projectId = $route.current.params.id;

            projectService.getAllProjects(authentication.getAuthHeaders())
                .then(function (response) {
                    $scope.projects = response.data;

                    $scope.addProject = function () {
                        $location.path("projects/add");
                    };

                    $scope.editProject = function (id) {
                        $location.path("projects/" + id + '/edit');
                    };

                    $scope.openProject = function (id) {
                        $location.path("projects/" + id);
                    };

                    $scope.addIssue = function (id) {
                        $location.path("projects/" + id + '/add-issue');
                    };
                }, function (error) {
                    console.log(error);
                });
        }]);
