'use strict';

const D3 = require('d3');
const Maps = require('../components/map');
const Pack = require('../components/pack');
const DataLoader = require('../lib/data_loader');
const QueryString = require('../lib/query_string');


function initSector() {
    D3.json('/data/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            var mapData = DataLoader(data, 'State', 'Training target', false, QueryString());
            Maps.india('#map', mapData);

        });
}
if (window.location.pathname === '/sector.html') {
    initSector();
}
