'use strict';

angular.module('issueTrackingSystem.common.issueService', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function loginUser(user) {
                var data = "grant_type=password&username=" + user.username + "&password=" + user.password,
                    config = {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }};

                var deferred = $q.defer();

                $http.post(BASE_URL + 'Token', data, config)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logoutUser(access_token) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Account/Logout', {})
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                loginUser: loginUser,
                registerUser: registerUser,
                logoutUser: logoutUser,
            }
        }]);