// N.b. we can use Node-style modules (`require`) instead of ES6 modules as well:
// TODO: clean up imports - do we even need some of these (e.g. index.html import)?
import 'babel-runtime/regenerator';
import 'webpack-hot-middleware/client?reload=true';         // creates websocket connection (and reloading on change)
import './styles/normalize.css';
import './styles/resets.css';
import './index.html';

import Vue from 'vue';
import App from './App.vue';

// ==================================================
// vue instance:
// ==================================================
new Vue({
    el: '#app',

    render(h) {
        return h(App);
    }
});
