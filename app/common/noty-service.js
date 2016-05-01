'use strict';

angular.module('issueTrackingSystem.common.notyService', [])
    .factory('notyService', [
        function () {
            function successMessage(msg) {
                noty({
                    theme: 'relax',
                    text: msg,
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }

            function infoMessage(msg) {
                noty({
                    theme: 'relax',
                    text: msg,
                    type: 'info',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }

            function errorMessage(msg) {
                noty({
                    theme: 'relax',
                    text: msg,
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }

            return {
                successMessage: successMessage,
                infoMessage: infoMessage,
                errorMessage: errorMessage
            }
        }]);
