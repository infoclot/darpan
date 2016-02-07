'use strict';

const states_cens = require('../data/states_topo')();
const d3 = require('d3');
const topojson = require('topojson');


exports.india = function(target, options) {

    const defaults = {
        width: 600,
        height: 600,
        colors: ['#FDE3A7', '#F9BF3B', '#F5AB35', '#F89406'],
        scale: 1000
    };
    // Merge options instead of overwrite
    options = defaults;
    if (!target) console.log('No target is present');

    const bounds = ([20, 40, 80, 100]);
    const color = d3.scale.threshold().domain(bounds).range(options.colors);
    const svg = d3.select(target).append('svg')
        .attr('width', options.width)
        .attr('height', options.height);

    const projection = d3.geo.mercator()
        .center([81.8718, 23.3])
        .scale(options.scale)
        .translate([options.width / 2, options.height / 2]);

    const path = d3.geo.path()
        .projection(projection);

    // Add states
    const states = svg.selectAll('.state')
        .data(topojson.feature(states_cens, states_cens.objects.states).features)
        .enter().append('path')
        .attr('d', path)
        .style('fill', function(d, i) {
            return color(d.properties.state_id) || '#FDE3A7';
        })
        .attr('class', 'state')
        .attr('id', function(d, i) {
            return d.properties.state_id;
        })
        .attr('state-name', function(d, i) {
            return d.properties.state_name;
        })
        .attr('state-id', function(d, i) {
            return d.properties.state_id;
        })
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            d3.select(this).style('fill-opacity', 0.95);
        })
        .on('mouseout', function() {
            d3.select(this).style('fill-opacity', 1);
        });

    // Add state boundries
    svg.append('path')
        .datum(topojson.mesh(states_cens, states_cens.objects.states, function(a, b) {
            return a !== b;
        }))
        .attr('d', path)
        .attr('class', 'state-boundary')
        .style('fill', 'none')
        // .style('stroke', '#000')
        .style('stroke-width', '1px')
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('pointer-events', 'none');




};
