(function () {
    'use strict';

    angular
        .module('app.time')
        .controller('TimeController', TimeController)
        

    TimeController.$inject = ['logger','$scope','$q', 'dataservice'];
    /* @ngInject */
    function TimeController(logger, $scope, $q, dataservice) {
        var vm = this;
        vm.title = 'Time';
        vm.projects = [];
        var container = document.getElementById('timeline'); 

        activate();

        function activate() {
            var promises = [getProjects(),getTimelineEvents()];
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

        function getTimelineEvents() {
            return dataservice.getAllTimelineEvents().then(function(data) {
                
                vm.timelineEvents = data;
                
                // Configuration for the Timeline
                var options = {};

                var groups = [
                  {
                    id: 1,
                    style: 'color: white; background-color: orange;',
                    content: 'CodeScience <li> Timeline Prototyping'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 2,
                    style: 'color: white; background-color: lightblue;',
                    content: 'Salesforce <li> Health Discovery <li>Health Development<li>SFUniversity'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 3,
                    style: 'color: white; background-color: lightgreen;',
                    content: 'Apple <li> Filemaker Maintenance'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 4,
                    style: 'color: white; background-color: pink;',
                    content: 'Greenway Medical <li> Support'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 5,
                    style: 'color: white; background-color: violet;',
                    content: 'GenTux <li> Expert Services'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 6,
                    style: 'color: white; background-color: tan;',
                    content: 'Salesforce <li> Health Development'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 7,
                    style: 'color: white; background-color: gray;',
                    content: 'Salesforce <li> Health Development'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 8,
                    style: 'color: white; background-color: steelblue;',
                    content: 'Salesforce <li> Health Development'
                    // Optional: a field 'className', 'style'
                  },
                  {
                    id: 9,
                    style: 'color: white; background-color: purple;',
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

            });
        }
    }
})();
