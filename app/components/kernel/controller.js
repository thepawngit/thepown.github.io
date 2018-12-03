(function() {
    'use strict';

    angular
        .module('app')
        .controller('kernelController', kernelController);

    kernelController.$inject = ["$scope","homeService","kernelService","$state","modals"];

    function kernelController($scope, homeService, kernelService,$state,modals) {
        var that = this
        that.title = "hola mundo"
        that.kernel_records = []
        that.loaded = false
        that.initial_date = moment().format("YYYY-MM-DD")
        that.getUtilizacionCPU = getUtilizacionCPU
        that.get_object_table_order = get_object_table_order
        that.order_field_visible = false
        that.goToDetail = goToDetail
        that.enviarTablaExcel = enviarTablaExcel

        /*****************************************************************************************/
        // Paginador de bootstrap configuración
        /*****************************************************************************************/
        that.filter_len = 0;
        that.total_items = 0
        that.currentPage = 1;
        that.itemsPerPage = 20;
        that.maxSize = 5; //Number of pager buttons to show

        that.setPage = function(pageNo) {
            that.currentPage = pageNo;
        };

        that.pageChanged = function() {};

        that.setItemsPerPage = function(num) {
            that.itemsPerPage = num;
            that.currentPage = 1; //reset to first paghe
        }

        getUtilizacionCPU()
        function getUtilizacionCPU(){
            var params = {
                pFecha: that.initial_date
            }
            that.loaded = false
            kernelService.getUtilizacionCPU(params).then(function(response){
                that.kernel_records = response;
                that.total_items = that.kernel_records.length
                console.log(that.kernel_records)
                that.loaded = true
            },function(error){
                console.log(error)
                that.loaded = true
            })
        }


        function get_object_table_order(object, number) {
            console.log(object)
            console.log(number)
            that.order_field = ''
            switch (number) {
                case 1:
                    that.order_field = '-' + object
                    that.order_field_visible = false
                    console.log(that.order_field)
                    break;
                case 2:
                    that.order_field = object
                    that.order_field_visible = true
                    console.log(that.order_field)
                    break;
            }
        }

        function goToDetail(record){
            homeService.data_detail = record
            openPopup('basemap-options')
        }

        that.tableMPTS = true
        function enviarTablaExcel() {
            if (that.tableMPTS == true) {
                try {
                    $('#records').table2excel({
                        exclude: "",
                        name: "Documento Kernel",
                        filename: "Documento Excel de Kernel"
                    });
                    alert('Exportación realizada correctamente')
                } catch (error) {
                    alert('Se presento error durante la exportación a Excel' + ' ' + 'El error es: ' + '  ' + error.message);
                }
            } else {
                alert('No hay datos para exportar')
            }
        }
        function openPopup(id){
            modals.open(id,myfunction)
        }

        function myfunction(){
            alert("hola mundo")
        }

    }
})();