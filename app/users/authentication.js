'use strict';

angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getAllUsers() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users/', getAuthHeaders())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var data = "grant_type=password&username=" + user.username + "&password=" + user.password,
                    config = {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }};

                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', data, config)
                    .then(function (successData) {
                        var headers = {
                            headers: {
                                Authorization: 'Bearer ' + successData.data.access_token
                            }
                        };

                        $http.get(BASE_URL + 'users/me', headers)
                            .then(function (personalData) {
                                successData.isAdmin = personalData.data.isAdmin;
                                deferred.resolve(successData);
                            }, function () {
                                // TODO: Handle error
                            });
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logoutUser() {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Logout',{} , getAuthHeaders())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function changePassword(passwordData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword',passwordData , getAuthHeaders())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAuthHeaders() {
                var headers = {};
                var currentUser = {
                    access_token: sessionStorage.access_token
                };

                if (currentUser) {
                    headers = {
                        headers: {
                            Authorization: 'Bearer ' + currentUser.access_token
                        }
                    };
                }

                return headers;
            }

            function isLoggedIn() {
                return !!sessionStorage.access_token;
            }

            function isAdmin() {
                return ('true' === sessionStorage.isAdmin);
            }

            return {
                getAllUsers: getAllUsers,
                loginUser: loginUser,
                registerUser: registerUser,
                logoutUser: logoutUser,
                changePassword: changePassword,
                getAuthHeaders: getAuthHeaders,
                isLoggedIn: isLoggedIn,
                isAdmin: isAdmin,
            }
    }]);