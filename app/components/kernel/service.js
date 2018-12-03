(function(){
    'use strict';
    angular
        .module('app')
        .factory('kernelService', kernelService)

    kernelService.$inject = ["$soap","homeService"]

    function kernelService($soap,homeService){
        var that = this;
        that.url = homeService.CONFIG.BASE_URL + "/wsEasyNetKernel.asmx"
        return {
            getUtilizacionCPU: getUtilizacionCPU,
        };

        function getUtilizacionCPU(params){
            return $soap.post(that.url,'getUtilizacionCPU',params)
        }
        
    }
})();