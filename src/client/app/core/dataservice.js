(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q','logger'];
    /* @ngInject */
    function dataservice($q, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getProjects: getProjects,
            getClients: getClients,
            getTimers: getTimers,
            getTimeEntries: getTimeEntries
        };

        return service;

        function getMessageCount() { return $q.when(99); }

        function getPeople() {
            var people = [
                {firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
                {firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
                {firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
                {firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
                {firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
                {firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
                {firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'}
            ];
            return $q.when(people);
        }

        function getProjects() {

            return getClients().then(function(clients){

                var projects = [   
                    {client: clients[2].name,  bucket:clients[2].buckets[0], hours: 250, used: 100, complete: 50},
                    {client: clients[2].name,  bucket:'Health Development', hours: 150, used: 100, complete: 10},
                    {client: clients[1].name,  bucket:'Filemaker Support', hours: 200, used: 100, complete: 90},
                    {client: clients[3].name,  bucket:'Maintenance', hours: 350, used: 100, complete: 30},
                    {client: clients[0].name,  bucket:'Maintenance', hours: 350, used: 100, complete: 10}
                ];
                return $q.when(projects);
            });
            
            
        }


        function getClients() {
            var clients = [
                
                {   
                    id: 0, 
                    name: 'CodeScience',
                    buckets: ['timetracker development','internal tools']
                },
                {
                    id: 1, 
                    name: 'Apple',
                    buckets: ['filemaker discovery','filemaker development', 'filemaker maintenance']
                },
                {
                    id: 2, 
                    name: 'Salesforce',
                    buckets: ['Health discovery','Health Development', 'Health Maintenance']
                },
                {
                    id: 3, 
                    name: 'MailChimp',
                    buckets: ['Discovery','Development', 'Maintenance']
                }
                
            ];
            console.log(clients);
            return $q.when(clients);
        }

        function getTimers() {
            var timers = [
                
                {   
                    id: 0, 
                    name: 'CodeScience',
                    buckets: ['timetracker development','internal tools']
                },
                {
                    id: 1, 
                    name: 'Apple',
                    buckets: ['filemaker discovery','filemaker development', 'filemaker maintenance']
                }
            ];
            console.log(timers);
            return $q.when(timers);
        }

        function getTimeEntries() {
            var timeEntries = [
                
                {   
                    id: 0, 
                    date: moment(),
                    client : 'Salesforce',
                    bucket: 'Health Development',
                    hours: 5,
                    status: 'approved'
                },
                {
                    id: 1, 
                    date: moment(),
                    client : 'CodeScience',
                    bucket : 'timetracker development',
                    hours: 6,
                    status: 'pending'
                },
                {
                    id: 1, 
                    date: moment(),
                    client : 'CodeScience',
                    bucket : 'timetracker development',
                    hours: 6,
                    status: 'rejected'
                }
            ];
            console.log(timeEntries);
            return $q.when(timeEntries);
        }
    }
})();
