'use strict';

angular.module('issueTrackingSystem.issues.editIssue', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service',
        'issueTrackingSystem.issues.service'])

    .controller('EditIssueController', [
        '$scope',
        '$location',
        '$route',
        'projectService',
        'issueService',
        'authentication',
        function($scope, $location, $route, projectService, issueService, authentication) {
            $scope.contentLoaded = false;

            authentication.getAllUsers()
                .then(function (users) {
                    $scope.users = users.data.sort(function(a, b) {
                        return a.Username.localeCompare(b.Username);
                    });

                    projectService.getAllProjects(authentication.getAuthHeaders())
                        .then(function (projects) {
                            $scope.projects = projects.data.sort(function(a, b) {
                                return a.Name.localeCompare(b.Name);
                            });

                            issueService.getIssueById(authentication.getAuthHeaders(), $route.current.params.id)
                                .then(function (response) {
                                    // redirecting to home if user is not lead or assignee
                                    if (response.data.Author.Id !== authentication.getUserId() &&
                                        response.data.Assignee.Id !== authentication.getUserId()) {
                                        $location.path("/");
                                    }

                                    $scope.contentLoaded = true;

                                    renderContent(response);
                                }, function (error) {
                                    console.log(error);
                                })
                        }, function (error) {
                            console.log(error);
                        })

                }, function (error) {
                    console.log(error);
                });

            function renderContent(response) {
                var labels = [];
                $scope.issueData = response.data;
                $scope.issueData.Labels.forEach(function (label) {
                    labels.push(label.Name)
                });
                $scope.issueData.Labels = labels;
                $scope.issueData.DueDate = new Date($scope.issueData.DueDate.slice(0,10));

                $scope.editIssue = function (issueData) {
                    var requestData = {
                        Id: issueData.Id,
                        PriorityId: issueData.Priority.Id,
                        Labels: [],
                        DueDate: new Date(issueData.DueDate).toISOString().slice(0,10),
                        AssigneeId: issueData.Assignee.Id,
                        ProjectId: issueData.Project.Id,
                        Title: issueData.Title,
                        Description: issueData.Description
                    };

                    issueData.Labels.toString().split(",").forEach(function(l) {
                        if (l.trim()) {
                            requestData.Labels.push({ Name: l.trim() });
                        }
                    });

                    issueService.editIssue(authentication.getAuthHeaders(), requestData)
                        .then(function (success) {
                            $location.path("issues/" + success.data.Id);
                        }, function (error) {
                            console.log(error);
                        })
                };
            }
        }]);