'use strict';
const D3 = require('d3');

exports.table = function(options) {

    const defaults = {
        target: '#info',
    };
    // Merge options
    if (!options) options = {};
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }
    if (!options.target) console.log('No target is present');

    var data = options.data;
    // create the table header
    var thead = D3.select('#info thead').selectAll('th')
        .data(D3.keys(data[0]))
        .enter().append('th').text(function(d) {
            return d;
        });
    // fill the table
    // create rows
    D3.select('#info tbody').selectAll('tr').remove();
    var tr = D3.select('#info tbody').selectAll('tr')
        .remove()
        .data(data).enter().append('tr');
    // cells
    var td = tr.selectAll('td')
        .data(function(d) {
            return D3.values(d);
        })
        .enter().append('td')
        .text(function(d) {
            return d;
        });

};
