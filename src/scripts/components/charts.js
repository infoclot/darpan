'use strict';

const d3 = require('d3');

exports.bubble = function(options) {

    const defaults = {
        diameter: 750,
        padding: 8,
        colors: ['#aaa', '#999', '#666', '#51368F'],
    };
    if (!options) options = {};
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    var data = options.data;
    var root = {
        'name': 'root',
        'children': data
    };

    const format = d3.format(',d');
    const bounds = ([3, 4, 6, 100]);
    const color = d3.scale.threshold().domain(bounds).range(options.colors);

    var svg = d3.select(options.target).append('svg')
        .attr('width', options.diameter)
        .attr('height', options.diameter)
        .attr('class', 'bubble');

    var bubble = d3.layout.pack()
        .sort(null)
        .size([options.diameter, options.diameter])
        .padding(options.padding);

    var node = svg.selectAll('.node')
        .data(bubble.nodes(classes(root))
            .filter(function(d) {
                return !d.children;
            }))
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

    node.append('circle')
        .attr('r', function(d) {
            return d.r;
        })
        .style('fill', function(d) {
            return color(d.value);
        })
        .style('cursor', 'pointer')
        .on('mouseover', function(d) {})
        .on('mouseout', function(d) {})
        .on('click', options.onClick)
        .on('dblclick', options.onDbClick);

    node.append('title')
        .text(function(d) {
            return d.className + ': ' + format(d.value);
        });


    node.append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .text(function(d) {
            return d.className.substring(0, d.r / 4);
        });


    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
        var classes = [];

        function recurse(name, node) {
            if (node.children) node.children.forEach(function(child) {
                recurse(node.name, child);
            });
            else classes.push({
                packageName: name,
                className: node.Sector,
                value: node.value
            });
        }

        recurse(null, root);
        return {
            children: classes
        };
    }


};
