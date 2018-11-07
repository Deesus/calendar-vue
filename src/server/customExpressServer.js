// if we wanted to use ES6 modules, we would do this instead:
// import Express from 'express';
// import path from 'path';

const path = require('path');
const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.dev.js');

const staticMiddleware = Express.static('dist');
const compiler = webpack(webpackConfig);

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    webpackConfig.devServer
);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

// n.b. the order of `server.use` statements is important:
const server = Express();
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

const PORT_NUMBER = 8080;
server.listen(PORT_NUMBER, () => {
    console.log(`\nSrver is listening to http://localhost:${PORT_NUMBER}\n`);
});
