'use strict';

const d3 = require('d3');

exports.bubble = function(target, data, options) {
    //  Sample Data
    var root = {
        'name': 'root',
        'children': data
    };
    const defaults = {
        diameter: 750,
        padding: 8
    };
    if (!options) options = {};
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    const format = d3.format(',d'),
        color = d3.scale.category10();


    var svg = d3.select(target).append('svg')
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
        .on('click', options.onClick);

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
