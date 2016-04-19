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

                $http.put(BASE_URL + 'Projects/', projectData, userAuth)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectById: getProjectById,
                getAllProjects: getAllProjects,
                addProject: addProject,
                editProject: editProject
            }
        }]);