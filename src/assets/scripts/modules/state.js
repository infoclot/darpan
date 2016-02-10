'use strict';

const D3 = require('d3');
const Maps = require('../components/map');
const Pack = require('../components/pack');
const DataLoader = require('../lib/data_loader');
const QueryString = require('../lib/query_string');


function initState() {
    D3.json('/data/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            D3.select('#state_name').text(QueryString().State);

            var sectorData = DataLoader(data, 'Sector', 'Training target', true, QueryString());
            Pack.circles('#bubble', sectorData);

        });
}
if (window.location.pathname === '/state.html') {
    initState();
}
