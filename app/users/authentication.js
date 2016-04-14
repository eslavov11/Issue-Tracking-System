angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [function () {
        function loginUser(user) {
            console.log(55);
            console.log(user);
        }

        function registerUser(user) {

        }

        function logoutUser() {

        }

        return {
            loginUser: loginUser,
            registerUser: registerUser,
            logoutUser: logoutUser,
        }
    }]);