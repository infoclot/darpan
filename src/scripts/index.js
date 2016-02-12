'use strict';

const Home = require('./modules/home');
const State = require('./modules/state');
const Sector = require('./modules/sector');
const Center = require('./modules/center');


var basePath = '/darpan';


if (window.location.pathname === basePath + '/' || window.location.pathname === basePath + '/index.html') {
    Home.init(basePath);
}

if (window.location.pathname === basePath + '/state.html') {
    State.init(basePath);
}

if (window.location.pathname === basePath + '/sector.html') {
    Sector.init(basePath);
}

if (window.location.pathname === basePath + '/center.html') {
    Center.init(basePath);
}
