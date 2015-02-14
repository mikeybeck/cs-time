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
            var promises = [getMessageCount(), getPeople(), getProjects(), getTimeEntries(), getClients(), getTimelineEvents(),getUtilization()];
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
        var utilization = document.getElementById('utilization'); 

        function getTimelineEvents() {
            return dataservice.getTimelineEvents().then(function(data) {
                
                vm.timelineEvents = data;
                
                // Configuration for the Timeline
                var options = {};

                var groups = [
                  {
                    id: 1,
                    style: "color: white; background-color: orange;",
                    content: 'CodeScience <li> Timeline Prototyping'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 2,
                    style: "color: white; background-color: lightblue;",
                    content: 'Salesforce <li> Health Development'
                    // Optional: a field 'className', 'style'
                  }
                  // more groups...
                ];

                // Create a Timeline
                var timeline = new vis.Timeline(
                    container,
                    vm.timelineEvents,
                    groups,
                    options
                );

                // var utilizationTimeline = new vis.Timeline(
                //     utilization,
                //     vm.timelineEvents,
                //     groups,
                //     options
                // );
            });
        }

        function getUtilization() {
            var container = document.getElementById('utilization');
            var groups = new vis.DataSet();
            groups.add({id: 0, content: "group0"})
            groups.add({id: 1, content: "group1"})
            groups.add({id: 2, content: "group2"})
            var items = [
                {x: '2014-06-11', y: 10, group:0},
                {x: '2014-06-12', y: 25, group:0},
                {x: '2014-06-13', y: 30, group:0},
                {x: '2014-06-14', y: 10, group:0},
                {x: '2014-06-15', y: 15, group:0},
                {x: '2014-06-16', y: 30, group:0},
                {x: '2014-06-11', y: 12, group:1},
                {x: '2014-06-12', y: 15, group:1},
                {x: '2014-06-13', y: 34, group:1},
                {x: '2014-06-14', y: 24, group:1},
                {x: '2014-06-15', y: 5, group:1},
                {x: '2014-06-16', y: 12, group:1},
                {x: '2014-06-11', y: 22, group:2},
                {x: '2014-06-12', y: 14, group:2},
                {x: '2014-06-13', y: 24, group:2},
                {x: '2014-06-14', y: 21, group:2},
                {x: '2014-06-15', y: 30, group:2},
                {x: '2014-06-16', y: 18, group:2}
            ];
            var dataset = new vis.DataSet(items);
            var options = {
                style:'bar',
                barChart: {width:50, align:'center', handleOverlap:'sideBySide'}, // align: left, center, right
                drawPoints: false,
                dataAxis: {
                    icons:true
                },
                orientation:'top',
                start: '2014-06-10',
                end: '2014-06-18'
            };
            var graph2d = new vis.Graph2d(container, items, groups, options);

        }
  
    }
})();
