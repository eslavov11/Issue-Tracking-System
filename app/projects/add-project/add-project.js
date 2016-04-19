'use strict';

angular.module('issueTrackingSystem.projects.addProject', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects'])

    .controller('AddProjectController', [
        '$scope',
        '$route',
        'projectService',
        'authentication',
        function($scope, $route, projectService , authentication) {
            authentication.getAllUsers()
                .then(function (users) {
                    $scope.users = users.data.sort(function(a, b) {
                        return a.Username.localeCompare(b.Username);
                    });

                    $scope.addNewProject = function (projectData) {
                        var requestData = {
                            Priorities: [],
                            Labels: [],
                            LeadId: projectData.Leader.Id,
                            ProjectKey: projectData.ProjectKey,
                            Name: projectData.Name,
                            Description: projectData.Description
                        };

                        projectData.Labels.split(",").forEach(function(l) {
                            if (l.trim()) {
                                requestData.Labels.push({ Name: l.trim() });
                            }
                        });

                        projectData.Priorities.split(",").forEach(function(p) {
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
                }, function (error) {
                    console.log(error);
                });
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
