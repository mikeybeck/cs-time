(function () {
    'use strict';

    angular
        .module('app.time')
        .controller('TimeController', TimeController);

    TimeController.$inject = ['logger','$scope','$q', 'dataservice'];
    /* @ngInject */
    function TimeController(logger, $scope, $q, dataservice) {
        var vm = this;
        vm.title = 'Time';
        vm.projects = [];

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getProjects() {

            return dataservice.getProjects().then(function (data) {

                vm.projects = data;
                console.log('got data:', vm.projects);
                return vm.projects;
            });
        }
    }
})();
