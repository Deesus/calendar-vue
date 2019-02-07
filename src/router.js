import Vue from 'vue';
import Router from 'vue-router';
import CDayView from './components/TheDayView.vue';



Vue.use (Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        // home route:
        {
            path: '/',
            name: 'home'
        },

        // day view route:
        {
            path: '/day/:timeStamp',    // the `timeStamp` params is set in `CMonthViewDay.vue`
            name: 'day-view',
            component: CDayView,
        },

        // default route:
        {
            path: '*',
            redirect: { name: 'home' }
        }
    ]
});
