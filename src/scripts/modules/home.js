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

            var mapData = Parser({
                data: data,
                base: 'State',
                variance: 'Training target',
                type: 'object'
            });

            Maps.india('#map', mapData, {
                height: Meta.screen().canvasHeight,
                width: Meta.screen().canvasWidth,
                scale: Meta.screen().canvasHeight * 1.5,
                onClick: function(d) {
                    window.location = '/state.html?State=' + d.properties.state_name;
                }
            });

            // var sectorData = Parser(data, 'Sector', 'Training target', true);
            // Charts.bubblek('#bubble', sectorData, {
            //     onClick: function(d) {
            //         window.location = '/sector.html?Sector=' + d.className;
            //     }
            // });
        });


};
