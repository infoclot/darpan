'use strict';

var D3 = require('d3');
var Gmap = require('../components/gmap');
var Parser = require('../lib/parser');
var Meta = require('../lib/meta');


exports.init = function(basePath) {

    google.maps.event.addDomListener(window, 'load', function() {

        D3.json(basePath + '/store/centers.json')
            .on('progress', function() {
                console.info('progress', D3.event.loaded);
            })
            .get(function(error, data) {

                var map = Gmap('widget-map', {});

                var infowindow = new google.maps.InfoWindow();
                var centers = Parser.center({
                    data: data,
                    filter: Meta.query()
                });
                centers.forEach(function(center) {

                    var marker = new google.maps.Marker({
                        position: {
                            lat: center['Latitude of TC'],
                            lng: center['Longitude of TC']
                        },
                        map: map,
                        title: center['Name of PIA']
                    });

                    function infoString() {
                        var content = '';
                        for (var key in center) {
                            content += '<li><span>' + key + ' - </span> ' + center[key] + '</li>';
                        }
                        return content;
                    }

                    var contentString = '<div class="map_content">' +
                        '<h5 class="map_heading">' + center['Name of PIA'] + '</h5>' +
                        '<ul>' + infoString() + '</ul>' +
                        '</div>';

                    marker.addListener('click', function() {
                        infowindow.close();
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    });


                });






            });
    });
};
