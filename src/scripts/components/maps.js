'use strict';

const states_cens = require('../lib/india')();
const d3 = require('d3');
const topojson = require('topojson');


exports.india = function(options) {
    const defaults = {
        width: 650,
        height: 750,
        colors: ['#aaa', '#888', '#666', '#333'],
        scale: 1100
    };
    // Merge options
    if (!options) options = {};
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }
    if (!options.target) console.log('No options.target is present');

    var data = options.data;
    const bounds = ([3, 5, 10, 100]);
    const color = d3.scale.threshold().domain(bounds).range(options.colors);

    if (d3.select(options.target + ' svg')) d3.select(options.target + ' svg').remove();

    const svg = d3.select(options.target).append('svg')
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
            return data[d.properties.state_name] ? color(data[d.properties.state_name].value) : '#ccc';
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
        .on('mouseover', function(d) {
            d3.select(this).style('fill-opacity', 0.95);
            d3.select('#tooltip')
                .style('opacity', 0)
                .style('display', 'block')
                .style('left', d3.mouse(d3.select('body')[0][0])[0] - 40 + 'px')
                .style('top', d3.mouse(d3.select('body')[0][0])[1] - 60 + 'px')
                .transition()
                .style('opacity', 1).duration(200);
            d3.select('#tiptext').html(d.properties.state_name + ': ' + d3.format('.2f')(data[d.properties.state_name].value) + ' %');
        })
        .on('mouseout', function() {
            d3.select(this).style('fill-opacity', 1);
            d3.select('#tooltip')
                .style('display', 'none');
        })
        .on('click', options.onClick)
        .on('dblclick', options.onDbClick);

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
