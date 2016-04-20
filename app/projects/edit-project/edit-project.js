'use strict';

angular.module('issueTrackingSystem.projects.editProject', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects'])

    .controller('EditProjectController', [
        '$scope',
        '$location',
        '$route',
        'projectService',
        'authentication',
        function($scope, $location, $route, projectService , authentication) {
            authentication.getAllUsers()
                .then(function (users) {
                    $scope.users = users.data.sort(function(a, b) {
                        return a.Username.localeCompare(b.Username);
                    });

                    projectService.getProjectById(authentication.getAuthHeaders(), $route.current.params.id)
                        .then(function (response) {
                            var labels = [],
                                priorities = [];

                            $scope.projectData = response.data;
                            $scope.projectData.Priorities.forEach(function (priority) {
                                labels.push(priority.Name)
                            });

                            $scope.projectData.Labels.forEach(function (label) {
                                priorities.push(label.Name)
                            });

                            $scope.projectData.Priorities = priorities;
                            $scope.projectData.Labels = labels;

                            $scope.editProject = function (projectData) {
                                var requestData = {
                                    Id: projectData.Id,
                                    Priorities: [],
                                    Labels: [],
                                    LeadId: projectData.Leader.Id,
                                    Name: projectData.Name,
                                    Description: projectData.Description
                                };

                                projectData.Labels.toString().split(",").forEach(function(l) {
                                    if (l.trim()) {
                                        requestData.Labels.push({ Name: l.trim() });
                                    }
                                });

                                projectData.Priorities.toString().split(",").forEach(function(p) {
                                    if (p.trim()) {
                                        requestData.Priorities.push({ Name: p.trim() });
                                    }
                                });

                                projectService.editProject(authentication.getAuthHeaders(), requestData)
                                    .then(function (success) {
                                        console.log(success);
                                        $location.path("projects/" + success.data.Id);
                                    }, function (error) {
                                        console.log(error);
                                    })
                            };
                        }, function (error) {
                            console.log(error);
                        });

                }, function (error) {
                    console.log(error);
                });
        }]);