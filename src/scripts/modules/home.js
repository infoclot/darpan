'use strict';

const D3 = require('d3');
const Maps = require('../components/maps');
const Charts = require('../components/charts');
const Parser = require('../lib/parser');


function initHome() {
    D3.json('/data/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            var mapData = Parser(data, 'State', 'Training target', false);
            Maps.india('#map', mapData, {
                onClick: function(d) {
                    window.location = '/state.html?State=' + d.properties.state_name;
                }
            });

            var sectorData = Parser(data, 'Sector', 'Training target', true);
            Charts.bubblek('#bubble', sectorData, {
                onClick: function(d) {
                    window.location = '/sector.html?Sector=' + d.className;
                }
            });
        });
}
if (window.location.pathname === '/') {
    initHome();
}
