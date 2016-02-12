'use strict';

const D3 = require('d3');
const Parser = require('../lib/parser');
const Meta = require('../lib/meta');
const Maps = require('../components/maps');
const Charts = require('../components/charts');

exports.init = function(basePath) {

    D3.json(basePath + '/store/glance.json')
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            var h = Meta.screen().canvasHeight;
            var w = Meta.screen().canvasWidth;

            loadViz(data, 'Training target', h, w);

            D3.selectAll('#variance-control').on('change', function() {
                var variance = D3.event.target.value;
                loadViz(data, variance, h, w);
            });


        });

    function loadViz(data, variance, h, w) {
        var mapData = Parser.base({
            data: data,
            base: 'State',
            variance: variance,
            type: 'object'
        });

        Maps.india({
            data: mapData,
            target: '#map',
            height: h,
            width: w,
            scale: h > w ? w * 1.5 : h * 1.5,
            onClick: function(d) {
                window.location = 'state.html?State=' + d.properties.state_name;
            }
        });

        var sectorData = Parser.base({
            data: data,
            base: 'Sector',
            variance: variance,
            type: 'array'
        });

        Charts.bubble({
            target: '#bubble',
            data: sectorData,
            diameter: h > w ? w : h,
            onClick: function(d) {
                window.location = 'sector.html?Sector=' + d.className;
            }
        });
    }


};
