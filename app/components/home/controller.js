(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ["$scope","homeService"];

    function homeController($scope, homeService) {
        var that = this
        that.title = "hola mundo"
    }
})();