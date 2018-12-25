import CDayView from '../components/CDayView.vue';


export default [
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
];
