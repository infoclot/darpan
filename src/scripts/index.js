'use strict';

const Home = require('./modules/home');
const State = require('./modules/state');
const Sector = require('./modules/sector');
const Center = require('./modules/center');


if (window.location.pathname === '/') {
    Home.init();
}

if (window.location.pathname === '/state.html') {
    State.init();
}

if (window.location.pathname === '/sector.html') {
    Sector.init();
}

if (window.location.pathname === '/center.html') {
    Center.init();
}
