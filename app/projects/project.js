'use strict';

angular.module('issueTrackingSystem.projects', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service'])

    .controller('ProjectController', [
        '$scope',
        '$route',
        '$location',
        'projectService',
        'issueService',
        'authentication',
        function($scope, $route, $location, projectService, issueService, authentication) {
            var projectId = $route.current.params.id;

            projectService.getProjectById(authentication.getAuthHeaders(), projectId)
                .then(function (project) {
                    $scope.isLeader = project.data.Lead.Username === authentication.getUsername();

                    $scope.project = project.data;
                    $scope.prioritiesString = $scope.project.Priorities.map(function(pr){
                        return pr.Name;
                    }).join(", ");

                    $scope.labelsString = $scope.project.Labels.map(function(lbl){
                        return lbl.Name;
                    }).join(", ");

                    $scope.editProject = function () {
                        $location.path("projects/" + $route.current.params.id + '/edit');
                    };

                    $scope.addIssue = function () {
                        $location.path("projects/" + $route.current.params.id + '/add-issue');
                    };
                }, function (error) {
                    console.log(error);
                });


            var issuesParams = {
                pageSize: 10,
                pageNumber: 1,
                filter: 'Project.Id == ' + projectId + ' and Assignee.Username == \"' + authentication.getUsername() + '\"'
            };

            issueService.getIssuesByFilter(authentication.getAuthHeaders(), issuesParams)
                .then(function (response) {
                    $scope.issues = response.data.Issues;
                }, function (error) {
                    console.log(error);
                })
        }]);