'use strict';

angular.module('issueTrackingSystem.issues.service', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getProjectIssuesById(userAuth, id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id + '/Issues', userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueById(userAuth, id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // GET] Issues/?pageSize={pageSize}&pageNumber={pageNumber}&{filter}={value}
            // "http://softuni-issue-tracker.azurewebsites.net/issues/
            // ?filter=Priority.Name == \"In Progress\" or DueDate.Day == 21&pageSize=2&pageNumber=1"
            function getIssuesByFilter(userAuth, params) {
                var deferred = $q.defer();

                // TODO: test
                //params = params || {};
                //params.pageSize = params.pageSize || 10;
                //params.pageNumber = params.pageNumber || 1;
                //params.filter = 'Project.Id == 1';
                // **********

                $http.get(BASE_URL + 'issues/?filter=' +
                    params.filter +
                    '&pageSize=' +
                    params.pageSize +
                    '&pageNumber=' +
                    params.pageNumber,
                    userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getUserIssues(userAuth, params) {
                var deferred = $q.defer();

                // TODO: test
                //params = params || {};
                //params.pageSize = 2;
                //params.pageNumber = 1;
                //params.orderBy = 'Project.Name desc, IssueKey';
                // **********

                $http.get(BASE_URL + 'issues/me?orderBy=' + params.orderBy +
                        '&pageSize=' + params.pageSize +
                        '&pageNumber=' + params.pageNumber,
                    userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssue(userAuth, issueData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/', issueData, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssue(userAuth, issueData) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + issueData.Id, issueData, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssueStatus(userAuth, issueId, statusId) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId, {}, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueCommentsById(userAuth, id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id + '/comments', userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssueComment(userAuth, issueId, commentText) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/' + issueId + '/comments', commentText, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectIssuesById: getProjectIssuesById,
                getIssueById: getIssueById,
                getIssuesByFilter: getIssuesByFilter,
                getUserIssues: getUserIssues,
                addIssue: addIssue,
                editIssue: editIssue,
                editIssueStatus: editIssueStatus,
                getIssueCommentsById: getIssueCommentsById,
                addIssueComment: addIssueComment
            }
        }]);