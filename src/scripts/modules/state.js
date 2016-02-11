'use strict';

const D3 = require('d3');
const Parser = require('../lib/parser');
const Meta = require('../lib/meta');
const Maps = require('../components/maps');
const Charts = require('../components/charts');
const Info = require('../components/info');


exports.init = function() {
    D3.json('/store/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            D3.select('#state_name').text(Meta.query().State);

            var h = Meta.screen().canvasHeight;
            var w = Meta.screen().canvasWidth;

            var sectorData = Parser.base({
                data: data,
                base: 'Sector',
                variance: 'Training target',
                type: 'array',
                filter: Meta.query()
            });

            Charts.bubble({
                target: '#bubble',
                data: sectorData,
                diameter: h > w ? w : h,
                onClick: function(d) {

                    var filter = Meta.query();
                    filter.Sector = d.className;
                    var infoData = Parser.info({
                        data: data,
                        filter: filter
                    });
                    Info.table({
                        target: '#info',
                        data: infoData
                    });
                },
                onDbClick: function(d) {
                    window.location = '/center.html?State=' + Meta.query().State + '&Sector=' + d.className;
                }
            });

        });
};
