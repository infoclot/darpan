'use strict';

const Home = require('./modules/home');
// require('./modules/state');
// require('./modules/sector');


if (window.location.pathname === '/') {
    Home.init();
}
