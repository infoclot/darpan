'use strict';

const D3 = require('d3');
const Maps = require('../components/map');
const Pack = require('../components/pack');
const DataLoader = require('../lib/data_loader');


function initHome() {
    D3.json('/data/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            var mapData = DataLoader(data, 'state_code', 'valx');
            Maps.india('#map');
            Pack.circles('#bubble');
        });
}
if (window.location.pathname === '/') {
    initHome();
}
