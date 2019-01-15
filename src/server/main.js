/**
 * In order to use ES6 imports, we use `babel-register` to transform all our (server-side) ES6 imports
 */

// transforms everything after this import according to babel rules
// see <https://babeljs.io/docs/en/babel-register/>
require('babel-register');
require('./expressServer');
