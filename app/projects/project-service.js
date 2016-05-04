'use strict';

angular.module('issueTrackingSystem.projects.service', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getProjectById(userAuth, id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsForUser(userAuth, params) {
                //projects?filter=Lead.Id=\"77dc87c7-150a-4148-b71c-f3fb1be7b2ce\"&pageSize=4&pageNumber=1"
                var deferred = $q.defer();

                $http.get(BASE_URL +
                    'Projects/?filter=Lead.Id=\"' +
                    params.leadId +
                    '\"&pageSize=' +
                    params.pageSize +
                    '&pageNumber=' +
                    params.pageNumber, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllProjects(userAuth) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/', userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsPage(userAuth, params) {
                //projects?filter=&pageSize=4&pageNumber=1"
                var deferred = $q.defer();

                $http.get(BASE_URL +
                        'Projects/?filter=&pageSize=' +
                        params.pageSize +
                        '&pageNumber=' +
                        params.pageNumber, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }


            function addProject(userAuth, projectData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Projects/', projectData, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editProject(userAuth, projectData) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + projectData.Id, projectData, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectById: getProjectById,
                getProjectsForUser: getProjectsForUser,
                getProjectsPage: getProjectsPage,
                getAllProjects: getAllProjects,
                addProject: addProject,
                editProject: editProject
            }
        }]);