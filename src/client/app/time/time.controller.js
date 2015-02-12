(function () {
    'use strict';

    angular
        .module('app.time')
        .controller('TimeController', TimeController);

    TimeController.$inject = ['logger'];
    /* @ngInject */
    function TimeController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
