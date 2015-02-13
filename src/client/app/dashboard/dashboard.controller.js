(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'Time Entries',
            subtitle : 'cool stuff',
            description: 'All kinds of useful stuff goes here'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.projects = [];
        vm.timeEntries = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), getProjects(), getTimeEntries()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }

        function getProjects() {
            return dataservice.getProjects().then(function (data) {
                vm.projects = data;
                return vm.projects;
            });
        }

        function getTimeEntries() {
            return dataservice.getTimeEntries().then(function (data) {
                vm.timeEntries = data;
                console.log('time',vm.timeEntries)
                return vm.projects;
            });
        }
    }
})();
