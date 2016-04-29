'use strict';

angular.module('issueTrackingSystem.issues.addIssue', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service',
        'issueTrackingSystem.issues.service',
        'issueTrackingSystem.labels.service'])

    .controller('AddIssueController', [
        '$scope',
        '$location',
        'authentication',
        'projectService',
        'issueService',
        'labelService',
        function($scope, $location, authentication, projectService, issueService, labelService) {
            authentication.getAllUsers()
                .then(function (users) {
                    $scope.users = users.data.sort(function(a, b) {
                        return a.Username.localeCompare(b.Username);
                    });
                }, function (error) {
                    console.log(error);
                });

            projectService.getAllProjects(authentication.getAuthHeaders())
                .then(function (projects) {
                    $scope.projects = projects.data.sort(function(a, b) {
                        return a.Name.localeCompare(b.Name);
                    });
                }, function (error) {
                    console.log(error);
                });

            $scope.addNewIssue = function (issueData) {
                var requestData = {
                    PriorityId: issueData.Priority.Id,
                    Labels: [],
                    DueDate: new Date(issueData.Due).toISOString().slice(0,10),
                    AssigneeId: issueData.Assignee.Id,
                    ProjectId: issueData.Project.Id,
                    Title: issueData.Title,
                    Description: issueData.Description
                };

                issueData.LabelsText.split(",").forEach(function(l) {
                    if (l.trim()) {
                        requestData.Labels.push({ Name: l.trim() });
                    }
                });

                issueService.addIssue(authentication.getAuthHeaders(), requestData)
                    .then(function (success) {
                        console.log(success);
                        $location.path("issues/" + success.data.Id);
                    }, function (error) {
                        console.log(error);
                    })
            };

            $scope.getLabels = function() {
                var stringFilter = $scope.issueData.LabelsText;
                if (stringFilter) {
                    var allFilters = stringFilter.split(',');
                    var lastFilter = allFilters[allFilters.length - 1].trim();

                    if (lastFilter.length >= 2) {
                        labelService.getLabels(authentication.getAuthHeaders(), lastFilter)
                            .then(function success(response) {
                                $scope.labels = response.data;
                            }, function error(err) {
                                console.log(error);
                                //notifyService.showError("Failed loading data...", err);
                            });
                    } else {
                        $scope.labels = [];
                    }
                }
            };

            $scope.addLabel = function (label) {
                var lastComma = $scope.issueData.LabelsText.lastIndexOf(',');
                if (lastComma !== -1) {
                    $scope.issueData.LabelsText = $scope.issueData.LabelsText.slice(0, lastComma) + ', ';
                } else {
                    $scope.issueData.LabelsText = '';
                }

                $scope.issueData.LabelsText += label.Name + ', ';
                $scope.labels = [];

                $scope.labelSelected = true;
            }
        }]);