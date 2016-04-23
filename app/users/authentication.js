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
                                successData.userId = personalData.data.Id;

                                localStorage.access_token = successData.data.access_token;
                                localStorage.username = successData.data.userName;
                                localStorage.userId = successData.userId;
                                localStorage.isAdmin = successData.isAdmin;

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
                    access_token: localStorage.access_token
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
                return !!localStorage.access_token;
            }

            function isAdmin() {
                return ('true' === localStorage.isAdmin);
            }

            function getUsername() {
                return localStorage.username;
            }

            function getUserId() {
                return localStorage.userId;
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
                getUsername: getUsername,
                getUserId: getUserId
            }
    }]);