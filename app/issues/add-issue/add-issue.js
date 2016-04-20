'use strict';

angular.module('issueTrackingSystem.issues.addIssue', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects.service',
        'issueTrackingSystem.issues.service'])

    .controller('AddIssueController', [
        '$scope',
        '$location',
        'projectService',
        'issueService',
        'authentication',
        function($scope, $location, projectService, issueService, authentication) {
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

                                issueData.Labels.split(",").forEach(function(l) {
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
                        }, function (error) {
                            console.log(error);
                        })

                }, function (error) {
                    console.log(error);
                });
        }]);

//"data": [
//    {
//        "key": "Title",
//        "value": "new title for issuee",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "Description",
//        "value": "blablablabla lorem",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "DueDate",
//        "value": "2016-5-25",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "AssigneeId",
//        "value": "e980a9d8-53e5-4f6b-b8ae-1efec2e58938",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "PriorityId",
//        "value": "3",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "Labels[0].Name",
//        "value": "NewLabel",
//        "type": "text",
//        "enabled": true
//    },
//    {
//        "key": "Labels[1].Name",
//        "value": "Label5",
//        "type": "text",
//        "enabled": true
//    }
//],