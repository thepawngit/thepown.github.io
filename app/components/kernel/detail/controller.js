(function() {
    'use strict';

    angular
        .module('app')
        .controller('kernelDetailController', kernelDetailController);

    kernelDetailController.$inject = ["$scope","homeService","$stateParams"];

    function kernelDetailController($scope, homeService,$stateParams) {
        var that = this
        console.log(homeService.data_detail)
        homeService.data_detail.id = 0
    }
})();