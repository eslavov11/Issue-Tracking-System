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

                                    $scope.issueData = response.data;
                                    renderContent();
                                }, function (error) {
                                    console.log(error);
                                })
                        }, function (error) {
                            console.log(error);
                        })

                }, function (error) {
                    console.log(error);
                });

            function renderContent() {
                $scope.isProjectLead = $scope.issueData.Author.Id === authentication.getUserId();

                var labels = [];

                $scope.issueData.Labels.forEach(function (label) {
                    labels.push(label.Name)
                });
                $scope.issueData.Labels = labels.join(', ');
                $scope.issueData.DueDate = new Date($scope.issueData.DueDate.slice(0,10));

                $scope.issueData.Assignee = $scope.users.filter(function (user) {
                    return user.Id === $scope.issueData.Assignee.Id;
                })[0];

                $scope.issueData.Project = $scope.projects.filter(function (p) {
                    return p.Id === $scope.issueData.Project.Id;
                })[0];

                $scope.issueData.Priority = $scope.issueData.Project.Priorities[0];

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
                
                $scope.changeStatus = function (statusId) {
                    issueService.editIssueStatus(authentication.getAuthHeaders(), $scope.issueData.Id,statusId)
                        .then(function (response) {
                            // TODO: add notification for changing status!!!!!
                            console.log(response);
                            $route.reload();
                        }, function (error) {
                            console.log(error);
                        })
                }
            }
        }]);
