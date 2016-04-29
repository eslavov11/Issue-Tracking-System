'use strict';

angular.module('issueTrackingSystem.projects.addProject', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.labels.service'])

    .controller('AddProjectController', [
        '$scope',
        '$route',
        '$location',
        'projectService',
        'authentication',
        'labelService',
        function($scope, $route, $location, projectService , authentication, labelService) {
            authentication.getAllUsers()
                .then(function (users) {
                    $scope.users = users.data.sort(function(a, b) {
                        return a.Username.localeCompare(b.Username);
                    });
                }, function (error) {
                    console.log(error);
                });

            $scope.addNewProject = function () {
                var leader = $scope.users.filter(function (user) {
                    return user.Username === $scope.projectData.Leader;
                })[0];

                var requestData = {
                    Priorities: [],
                    Labels: [],
                    LeadId: leader.Id,
                    ProjectKey: $scope.projectData.ProjectKey,
                    Name: $scope.projectData.Name,
                    Description: $scope.projectData.Description
                };

                $scope.projectData.LabelsText.split(",").forEach(function(l) {
                    if (l.trim()) {
                        requestData.Labels.push({ Name: l.trim() });
                    }
                });

                $scope.projectData.Priorities.split(",").forEach(function(p) {
                    if (p.trim()) {
                        requestData.Priorities.push({ Name: p.trim() });
                    }
                });

                projectService.addProject(authentication.getAuthHeaders(), requestData)
                    .then(function (success) {
                        console.log(success);
                        $location.path("projects/" + success.data.Id);
                    }, function (error) {
                        console.log(error);
                    })
            };

            $scope.getLabels = function() {
                var stringFilter = $scope.projectData.LabelsText;
                if (stringFilter) {
                    var allFilters = stringFilter.split(',');
                    var lastFilter = allFilters[allFilters.length - 1].trim();

                    if (lastFilter.length >= 2) {
                        labelService.getLabels(authentication.getAuthHeaders(), lastFilter)
                            .then(function success(response) {
                                $scope.labels = response.data;
                            }, function error(err) {
                                console.log(err);
                                //notifyService.showError("Failed loading data...", err);
                            });
                    } else {
                        $scope.labels = [];
                    }
                }
            };

            $scope.addLabel = function (label) {
                var lastComma = $scope.projectData.LabelsText.lastIndexOf(',');
                if (lastComma !== -1) {
                    $scope.projectData.LabelsText = $scope.projectData.LabelsText.slice(0, lastComma) + ', ';
                } else {
                    $scope.projectData.LabelsText = '';
                }

                $scope.projectData.LabelsText += label.Name + ', ';
                $scope.labels = [];

                $scope.labelSelected = true;
            };

            $scope.getUsersByFilter = function() {
                var stringFilter = $scope.projectData.Leader;
                if (stringFilter) {
                    if (stringFilter.length >= 2) {
                        authentication.getUsersByFilter(stringFilter)
                            .then(function success(response) {
                                $scope.filteredUsers = response.data;
                            }, function error(err) {
                                console.log(err);
                                //notifyService.showError("Failed loading data...", err);
                            });
                    } else {
                        $scope.filteredUsers = [];
                    }
                }
            };

            $scope.setLeader = function (leader) {
                $scope.projectData.Leader = leader.Username;
                $scope.filteredUsers = [];

                $scope.userSelected = true;
            }
        }]);


//•	Add Project
//o	Route: #/projects/add
//o	A modal dialog with a form for creating a new project. The form consists of:
//    	Leader (Drop-down with all available users)
//	Project Key (Text-box)
//	Priorities (Text-box)
//	Label (Text-box, which suggests already created labels by typing a substring. If the label does not exist – creates it)
//	Name (Text-box)
//	Description (Textarea)
//	Create Project (Button)
