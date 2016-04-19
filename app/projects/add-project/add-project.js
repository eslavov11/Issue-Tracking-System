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
            $scope.addNewProject = function (projectData) {
                //projectService.addProject(authentication.getAuthHeaders(), projectData)
                //    .then(function (success) {
                //        console.log(success);
                //    }, function (error) {
                //        console.log(error);
                //    })
            };
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
