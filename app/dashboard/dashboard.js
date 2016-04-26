'use strict';

angular.module('issueTrackingSystem.dashboard', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.issues.service',
        'issueTrackingSystem.projects.service'])

    .controller('DashboardController', [
        '$scope',
        '$location',
        'authentication',
        'issueService',
        'projectService',
        function($scope, $location, authentication, issueService, projectService) {
            $scope.username = localStorage.username;
            $scope.isAdmin = authentication.isAdmin();

            $scope.predicate = 'DueDate';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.addNewProject = function() {
                $location.path("/projects/add");
            };

            $scope.listAllProjects = function() {
                $location.path("/projects");
            };

            var issuesParams = {
                pageSize: 5,
                pageNumber: 1,
                orderBy: 'DueDate desc'
            }, projectsParams = {
                pageSize: 5,
                pageNumber: 1,
                leadId: authentication.getUserId()
            };

            issueService.getUserIssues(authentication.getAuthHeaders(), issuesParams)
                .then(function (issues) {
                    $scope.issues = issues.data.Issues;

                    var issueProjects = [];

                    issues.data.Issues.forEach(function (issue) {
                        if (!checkForDuplicates(issue.Project.Name, issueProjects)) {
                            issueProjects.push(issue.Project);
                        }
                    });

                    $scope.issueProjects = issueProjects;

                    $scope.editIssue = function (id) {
                        $location.path("issues/" + id + '/edit');
                    };

                    $scope.openIssue = function (id) {
                        $location.path("issues/" + id);
                    };
                }, function (error) {
                    console.log(error);
                });

            projectService.getProjectsForUser(authentication.getAuthHeaders(), projectsParams)
                .then(function (response) {
                    $scope.projects = response.data.Projects;
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });

            function checkForDuplicates(name, array) {
                var found = false;
                for(var i = 0; i < array.length; i++) {
                    if (array[i].Name === name) {
                        found = true;
                        break;
                    }
                }

                return found;
            }
        }]);

//[GET] Projects/?pageSize={pageSize}&pageNumber={pageNumber}&{filter}={value}
//•	Purpose: Gets projects by a given filter
//•	Security: Logged In
//•	Url parameters:
//    o	filter (String): the filters which you want the projects to be filtered by
//	Supports every projects property with equals, less (or equal) than, greater (or equal) than comparators
// (for example “Name == “SIT Project””)
//	Supports child properties (for example: “Lead.Id == “e980a9d8-53e5-4f6b-b8ae-1efec2e58938””)
//	Supports multiple criterias using “and” and “or” in between them
// (for example “Lead.Username == "admin@softuni.bg" or Description.Contains("test"))
//o	pageSize (Int, Required): how many elements do you want the system to return
//o	pageNumber (Int, Required): from which page to start (take the first pageSize * pageNumber elements)
//•	Returns: The projects with their leaders


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


