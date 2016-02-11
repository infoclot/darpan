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

            var h = Meta.screen().canvasHeight;
            var w = Meta.screen().canvasWidth;

            var mapData = Parser.base({
                data: data,
                base: 'State',
                variance: 'Training target',
                type: 'object',
                filter: Meta.query()
            });

            Maps.india({
                data: mapData,
                target: '#map',
                height: h,
                width: w,
                scale: h > w ? w * 1.5 : h * 1.5,
                onClick: function(d) {
                    var filter = Meta.query();
                    filter.State = d.properties.state_name;
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
                    window.location = '/center.html?State=' + d.properties.state_name + '&Sector=' + Meta.query().Sector;
                }
            });

        });
};
