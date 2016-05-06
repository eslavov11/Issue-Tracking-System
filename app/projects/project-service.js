'use strict';

angular.module('issueTrackingSystem.projects.service', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getProjectById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsForUser(params) {
                //projects?filter=Lead.Id=\"77dc87c7-150a-4148-b71c-f3fb1be7b2ce\"&pageSize=4&pageNumber=1"
                var deferred = $q.defer();

                $http.get(BASE_URL +
                    'Projects/?filter=Lead.Id=\"' +
                    params.leadId +
                    '\"&pageSize=' +
                    params.pageSize +
                    '&pageNumber=' +
                    params.pageNumber)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/')
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsPage(params) {
                //projects?filter=&pageSize=4&pageNumber=1"
                var deferred = $q.defer();

                $http.get(BASE_URL +
                        'Projects/?filter=&pageSize=' +
                        params.pageSize +
                        '&pageNumber=' +
                        params.pageNumber)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }


            function addProject(projectData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Projects/', projectData)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editProject(projectData) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + projectData.Id, projectData)
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