'use strict';

const D3 = require('d3');
const Parser = require('../lib/parser');
const Meta = require('../lib/meta');
const Maps = require('../components/maps');
const Charts = require('../components/charts');

exports.init = function() {

    D3.json('/store/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            var h = Meta.screen().canvasHeight;
            var w = Meta.screen().canvasWidth;

            var mapData = Parser({
                data: data,
                base: 'State',
                variance: 'Training target',
                type: 'object'
            });

            Maps.india({
                data: mapData,
                target: '#map',
                height: h,
                width: w,
                scale: h > w ? w * 1.5 : h * 1.5,
                onClick: function(d) {
                    window.location = '/state.html?State=' + d.properties.state_name;
                }
            });

            var sectorData = Parser({
                data: data,
                base: 'Sector',
                variance: 'Training target',
                type: 'array'
            });

            Charts.bubble({
                target: '#bubble',
                data: sectorData,
                diameter: h > w ? w : h,
                onClick: function(d) {
                    window.location = '/sector.html?Sector=' + d.className;
                }
            });

        });

};
