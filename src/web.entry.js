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
import store from './store/store.calendar';
import VueRouter from 'vue-router';
Vue.use (VueRouter);

import routes from './vueRoutes';
const router = new VueRouter({
   routes
});

// by defining a getter property (`$moment`) and then passing it as a `data` property in the Vue instance below,
// we can use `$moment` in all of our components:
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

        data: {
            moment
        },

        store: store,

        router: router,

        render(h) {
            return h(App);
        }
    });
};
