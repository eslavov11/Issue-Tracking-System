'use strict';

angular.module('issueTrackingSystem.issues', [
        'ngRoute',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.issues.service'])

    .controller('IssueController', [
        '$scope',
        '$route',
        '$location',
        'issueService',
        'authentication',
        function($scope, $route, $location, issueService , authentication) {
            var issueId = $route.current.params.id;

            issueService.getIssueById(authentication.getAuthHeaders(), issueId)
                .then(function (response) {
                    $scope.isAssignee = response.data.Assignee.Username === authentication.getUsername();
                    $scope.isLeader = response.data.Author.Username === authentication.getUsername();

                    $scope.issue = JSON.stringify(response.data);

                    $scope.editIssue = function () {
                        $location.path("issues/" + $route.current.params.id + '/edit');
                    }
                }, function (error) {
                    console.log(error);
                });
        }]);

//•	Issue page
//o	Route: #/issues/:id
//o	Displays the information about the issue
//o	If the user is the assignee, they can see a button for changing the status using an available status (e.g. Open -> Closed).
//    o	If the user is the issue’s project leader they can see the edit issue button.