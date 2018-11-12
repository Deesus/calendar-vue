import CMonthView from './components/CMonthView.vue';
import CDayView from './components/CDayView.vue';


export default [
    {
        path: '/',
        name: 'month-view',
        component: CMonthView,
    },
    {
        path: '/day/:timeStamp',    // the `timeStamp` params is set in `CMonthViewDay.vue`
        name: 'day-view',
        component: CDayView,
    },
    // default redirect if no url paths match:
    {
        path: '*',
        redirect: { name: 'month-view' }
    }
];
