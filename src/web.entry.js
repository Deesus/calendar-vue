// N.b. we can use Node-style modules (`require`) instead of ES6 modules as well:
// TODO: clean up imports - do we even need some of these (e.g. index.html import)?
import 'babel-runtime/regenerator';
import 'webpack-hot-middleware/client?reload=true';         // creates websocket connection (and reloading on change)
import './styles/normalize.css';
import './styles/resets.css';
import './index.html';

import moment from 'moment-timezone';

import Vue from 'vue';
import App from './App.vue';

Object.defineProperty(Vue.prototype,
                      '$moment',
                      {
                          get() { return this.$root.moment; }
                      } );

// ==================================================
// vue instance:
// ==================================================

// TODO: we get `[Vue warn]: Cannot find element: #app' unless we use `window.onload`; need to fix something in Webpack
window.onload = function() {
    new Vue({
        el: '#app',

        render(h) {
            return h(App);
        }
    });
};
