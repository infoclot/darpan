'use strict';

module.exports = function(target, options) {

    const defaults = {
        zoom: 5,
        center: new google.maps.LatLng(21.0000, 78.0000) ,
        styles: [{
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [{
                'color': '#3AA2D5'
            }]
        }, {
            'featureType': 'administrative.province',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'all',
            'elementType': 'all',
            'stylers': [{
                'hue': '#3AA2D5'
            }, {
                'saturation': -22
            }]
        }, {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#f7f7f7'
            }, {
                'saturation': 10
            }, {
                'lightness': 76
            }]
        }, {
            'featureType': 'landscape.natural',
            'elementType': 'all',
            'stylers': [{
                'color': '#f7f7f7'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [{
                'color': '#8b9dc3'
            }]
        }, {
            'featureType': 'administrative.country',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'visibility': 'simplified'
            }, {
                'color': '#3AA2D5'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#8b9dc3'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'simplified'
            }, {
                'color': '#8b9dc3'
            }]
        }, {
            'featureType': 'transit.line',
            'elementType': 'all',
            'stylers': [{
                'invert_lightness': false
            }, {
                'color': '#ffffff'
            }, {
                'weight': 0.43
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#8b9dc3'
            }]
        }, {
            'featureType': 'administrative',
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#3AA2D5'
            }]
        }]
    };
    if (!options) options = {};
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }
    console.log(options.center.lat());



    return new google.maps.Map(document.getElementById(target), options);
};
