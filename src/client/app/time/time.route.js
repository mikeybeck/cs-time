(function() {
    'use strict';

    angular
        .module('app.time')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'time',
                config: {
                    url: '/time',
                    templateUrl: 'app/time/time.html',
                    controller: 'TimeController',
                    controllerAs: 'vm',
                    title: 'Timeline',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-clock-o"></i> Timeline'
                    }
                }
            }
        ];
    }
})();
