'use strict';

module.exports = function(data, base, variance, returnArr, filters) {
    console.log(filters);
    var varianceTotal = 0;
    var Data = [];
    var hist = {};
    var result = [];
    // Group by base and reduce by variance
    data.map(function(row) {

        var query = true;
        if (filters) {
            for (var filterkey in filters) {
                if (row[filterkey] !== filters[filterkey]) {
                    query = false;
                }
            }
        }
        if (query) {
            if (row[base] in hist) {
                varianceTotal += row[variance];
                hist[row[base]][variance] += row[variance];

            } else {
                varianceTotal += row[variance];
                hist[row[base]] = row;
            }
        }
    });
    // Prepare array from object

    for (var key in hist) {
        hist[key].value = (hist[key][variance] / varianceTotal) * 100;
        result.push(hist[key]);
    }
    return returnArr ? result : hist;
};
