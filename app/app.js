(function() {
    'use strict';

    angular.module('app', [
            'app.routes',
            'angularSoap',
        ])
        .filter('sumFilter', function() {
            return function(visits, field) {

                var Total = 0;
                for (var i = 0; visits && i < visits.length; i++) {
                    var value = (visits[i][field] != null) ? parseFloat(visits[i][field].replace(/,/g, "")) : 0
                    Total = Total + value;
                };
                return Total;
            };
        })
        .filter('sumFilterNumbers', function() {
            return function(visits, field) {

                var Total = 0;
                for (var i = 0; visits && i < visits.length; i++) {
                    var value = (visits[i][field] != null) ? parseFloat(visits[i][field]) : 0
                    Total = Total + value;
                };
                return Total;
            };
        })
        .filter('filterHours', function() {
            return function(data, hour) {
                var array = []
                if (data && hour) {
                    data.forEach(function(d, index) {
                        var diference = ""
                        if (index - 1 > 0) {
                            var startTime = moment(data[index - 1].HORA_FIN, 'hh:mm:ss a');
                            var endTime = moment(d.HORA_FIN, 'hh:mm:ss a');
                            diference = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH:mm:ss")
                        } else {
                            diference = "00:00:00"
                        }
                        d['duration'] = diference
                        var h = moment(d.HORA_FIN).format('HH')
                        if (parseInt(h) == hour) {
                            array.push(d)
                        }
                    })
                }
                return array;
            };
        })
        .filter('sumTime', function() {
            return function(visits, field) {
                var Total = 0;
                var total_hours = 0;
                var total_minutes = 0;
                var total_seconds = 0;
                for (var i = 0; visits && i < visits.length; i++) {
                    var time = (visits[i][field] != null && visits[i][field] != "--:--:--") ? visits[i][field].split(":") : null
                    if (time) {
                        total_hours += parseInt(time[0])
                        total_minutes += parseInt(time[1])
                        total_seconds += parseInt(time[2])
                    }
                };
                if (total_seconds >= 60) {
                    total_minutes += parseInt(Math.floor(total_seconds / 60));
                    total_seconds = (total_seconds % 60)
                }
                if (total_minutes >= 60) {
                    total_hours += parseInt(Math.floor(total_minutes / 60));
                    total_minutes = (total_minutes % 60)
                }
                total_hours = (total_hours < 10) ? "0" + total_hours : total_hours
                total_minutes = (total_minutes < 10) ? "0" + total_minutes : total_minutes
                total_seconds = (total_seconds < 10) ? "0" + total_seconds : total_seconds
                Total = total_hours + ":" + total_minutes + ":" + total_seconds;
                return Total;
            };
        }).filter('formatTime', function() {
            return function(time) {

                return moment(time).format("HH:mm:ss")
            };
        })
        .filter('filter_table_config', function() {
            return function(data, id) {
                if (id != '') {
                    var array_id = id.split(';')
                } else {
                    return data
                }
                if (array_id.length > 0) {
                    var array = []
                    for (var g in data) {
                        for (var f in array_id) {
                            if (data[g].Id_user == array_id[f]) {
                                array.push(data[g])
                            }
                        }
                    }
                    return array
                } else {
                    return data
                }
            };
        })
        .filter('filter_table_config_periodo', function() {
            return function(data, id) {
                var array = []
                data.forEach(function(item, index) {
                    if (item.Id_user == id) {
                        array.push(item)
                    }
                })
                return array
            };
        });
    angular.module('app.routes', ['ui.router']);
})();