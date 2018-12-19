// N.b. we can use Node-style modules (`require`) instead of ES6 modules as well:
// TODO: clean up imports - do we even need some of these (e.g. index.html import)?
import './styles/app.less';
import './index.html';

import moment       from 'moment-timezone';
import Vue          from 'vue';
import App          from './App.vue';
import store        from './store';
import VueRouter    from 'vue-router';
Vue.use (VueRouter);

import routes from './router/routes';
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

// TODO: we could use `<script defer>` in `index.html` so that Vue can find the #app element to mount onto (otherwise the new Vue instance would have to be wrapped in an onload/DOMContentLoaded handler:
window.onload = function() {
    new Vue({
        el: '#app',

        data: {
            moment
        },

        store,

        router,

        render(h) {
            return h(App);
        }
    });
};
