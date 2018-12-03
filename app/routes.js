(function(){

    'use strict';

    angular
        .module('app.routes')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider']

    function config($stateProvider, $urlRouterProvider,$state){
        // any unknown URLS go to 404
        $urlRouterProvider.otherwise('/');

        // no route goes to index
        $urlRouterProvider.when('', '/');

        // use a state provider for routing
        $stateProvider
            
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/view.html',
                controller :'homeController',
                controllerAs : 'homeCtrl'
            })
            .state('home.kernel', {
                url: 'kernel/',
                views:{
                    'content':{
                        templateUrl: 'app/components/kernel/view.html',
                        controller :'kernelController',
                        controllerAs : 'kernelCtrl'
                    }
                }
            })
            .state('home.kernel_detail', {
                url: 'detalle_kernel/',
                views:{
                    'content':{
                        templateUrl: 'app/components/kernel/detail/view.html',
                        controller :'kernelDetailController',
                        controllerAs : 'kDetailCtrl'
                    }
                },
                
            })
            

    }
})()