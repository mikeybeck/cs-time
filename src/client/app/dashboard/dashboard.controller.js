(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', '$filter', '$interval'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger, $filter, $interval) {
        var vm = this;
        vm.news = {
            title: 'Time Entries',
            subtitle: 'cool stuff',
            description: 'All kinds of useful stuff goes here'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.projects = [];
        vm.clients = [];
        vm.timeEntries = [];
        vm.title = 'Dashboard';
        vm.showType = '';
        vm.sortBy = 'status';
        vm.todayString = $filter('date')(Date.now(), 'yyyy-MM-dd');
        vm.currentTimeEntry = {};
        vm.newClientId = 0;

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), getProjects(), getTimeEntries(), getClients(), getTimelineEvents()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        vm.sort = function(sortBy) {
            vm.sortBy = sortBy;
        };

        vm.editTimeEntry = function(entryId) {
            vm.currentTimeEntry = $filter('filter')(vm.timeEntries, {
                id: entryId
            })[0];
            logger.warning('edit: ' + entryId);
        };

        vm.viewTimeEntry = function(entryId) {
            vm.currentTimeEntry = $filter('filter')(vm.timeEntries, {
                id: entryId
            })[0];
            logger.warning(vm.currentTimeEntry.client);
        };

        vm.newTimeEntry = function(entryId) {
            vm.currentTimeEntry = {};
            logger.warning(vm.currentTimeEntry.client);
        };

        

        function getMessageCount() {
            return dataservice.getMessageCount().then(function(data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function(data) {
                vm.people = data;
                return vm.people;
            });
        }

        function getClients() {
            return dataservice.getClients().then(function(data) {
                vm.clients = data;
                return vm.clients;
            });
        }

        function getProjects() {
            return dataservice.getProjects().then(function(data) {
                vm.projects = data;
                return vm.projects;
            });
        }

        function getTimeEntries() {
            return dataservice.getTimeEntries().then(function(data) {
                vm.timeEntries = data;
                console.log('time', vm.timeEntries);
                return vm.projects;
            });
        }

        var container = document.getElementById('timeline');


        

        function getTimelineEvents() {
            return dataservice.getTimelineEvents().then(function(data) {
                vm.timelineEvents = data;
                
                
                // Configuration for the Timeline
                var options = {};

                // Create a Timeline
                var timeline = new vis.Timeline(
                    container,
                    vm.timelineEvents,
                    options
                );
                return vm.timelineEvents;
            });
        }

        

        
    }
})();
