/**
 * Simple Express.js server
 *
 * n.b. the order of `server.use` statements in this module is important
 */


// if we wanted to use ES6 modules, we would do this instead:
// import Express from 'express';
// import path from 'path';
const path      = require('path');
const Express   = require('express');
const server    = Express();

const isProduction = process.env.NODE_ENV === 'production';


// --------------------------------------------------
// if development mode:
// --------------------------------------------------
if (!isProduction) {
    const webpack       = require('webpack');
    const webpackConfig = require('../../config/webpack.dev.js');
    const compiler      = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        webpackConfig.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(
        compiler,
        webpackConfig.devServer
    );

    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);
}


// --------------------------------------------------
// shared dev and production:
// --------------------------------------------------
const staticMiddleware = Express.static('dist');
server.use(staticMiddleware);

const PORT_NUMBER = process.env.PORT || 8080;
server.listen(PORT_NUMBER, () => {
    console.log(`\nServer is listening to http://localhost:${PORT_NUMBER}\n`);
});
