// N.b. we can use CommonJS/Node-style modules (`require`) instead of ES6 modules as well:
import './styles/app.scss';
import moment   from 'moment-timezone';
import Vue      from 'vue';
import App      from './App.vue';
import store    from './store';
import router   from './router';
import { formatDateTimeISOToHoursMinutesMeridiem } from './utils/formattingFilters';



// -------------------- global Vue definitions: --------------------

// by defining a getter property (`$moment`) and then passing it as a `data` property in the Vue instance below,
// we can use `$moment` in all of our components:
Object.defineProperty(Vue.prototype,
                      '$moment',
                      {
                          get() { return this.$root.moment; }
                      });

// add text formatting filter(s):
Vue.filter('toHoursMinutesMeridiem', formatDateTimeISOToHoursMinutesMeridiem);



// -------------------- vue instance: --------------------
new Vue({

    router,

    store,

    data: {
        moment
    },

    render: h => h(App)

}).$mount('#app');
