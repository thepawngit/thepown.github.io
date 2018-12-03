(function(){
    'use strict';
    angular
        .module('app')
        .service('homeService', homeService)

    homeService.$inject = []

    function homeService(){
        var that = this;
        that.data_detail = {}
        that.CONFIG = {
            //BASE_URL:'https://www.easysales.com.co/ServiciosEasyGestionDiacoTest',
            BASE_URL:'https://www.easysales.com.co/ServiciosEasyNetKernel/servicios',
                                                    
        }
        
    }
})();