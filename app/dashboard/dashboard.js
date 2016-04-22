'use strict';

angular.module('issueTrackingSystem.dashboard', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.issues.service'])

    .controller('DashboardController', [
        '$scope',
        '$location',
        'authentication',
        'issueService',
        function($scope, $location, authentication, issueService) {
            $scope.username = localStorage.username;
            $scope.isAdmin = authentication.isAdmin();

            $scope.addNewProject = function() {
                $location.path("/projects/add");
            };

            $scope.listAllProjects = function() {
                $location.path("/projects");
            };

            issueService.getUserIssues(authentication.getAuthHeaders())
                .then(function (issues) {
                    console.log(issues);

                    $scope.issues = JSON.stringify(issues.data.Issues);
                }, function (error) {
                    console.log(error);
                })
        }]);

//
//•	User Dashboard
//o	Route: #/
//o	Includes the user’s assigned issues, ordered by due date in
//descending order and a panel with all the projects that you are associated
//with (you have an assigned issue in them or you are a project leader)


//[GET] Issues/me?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
//•	Purpose: Gets the user’s currently assigned issues ordered by a given criteria
//•	Security: Logged in
//•	Url parameters:
//    o	orderBy (String): the property of the issue which you want the issues to be sorted by
//	Supports all issue’s properties (for example Project, IssueKey, DueDate)
//	Supports child properties (for example Project.Name will sort the issues by the name of their project)
//	Supports descending sorting, just add “desc” after the property (for example “IssueKey desc”)
//	Supports multiple criteria using comma separated syntax (for example “Project.Name desc, IssueKey, Priority.Name desc”)
//o	pageSize (Int, Required): how many elements do you want the system to return
//o	pageNumber (Int, Required): from which page to start (take the first pageSize * pageNumber elements)
//•	Returns: The user’s issues with their available statuses


