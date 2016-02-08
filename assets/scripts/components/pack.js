'use strict';

const d3 = require('d3');

exports.circles = function(target, options) {
    //  Sample Data
    var root = {
        'name': 'root',
        'children': [{
            'name': 'analytics',
            'size': 1640
        }, {
            'name': 'Visualization',
            'size': 16540
        }, {
            'name': 'iuonkj',
            'size': 3640
        }, {
            'name': 'iuonkj',
            'size': 3640
        }, {
            'name': 'iuonkj',
            'size': 340
        }, {
            'name': 'iuonkj',
            'size': 4640
        }, {
            'name': 'iuonkj',
            'size': 360
        }]
    };

    const defaults = {
        diameter: 560,
        padding: 8
    };
    options = defaults;

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
        });

    node.append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .text(function(d) {
            return d.className.substring(0, d.r / 3);
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
                className: node.name,
                value: node.size
            });
        }

        recurse(null, root);
        return {
            children: classes
        };
    }


};
