import CMonthView from '../components/CMonthView.vue';
import CDayView from '../components/CDayView.vue';


export default [
    {
        path: '/day/:timeStamp',    // the `timeStamp` params is set in `CMonthViewDay.vue`
        name: 'day-view',
        component: CDayView,
    }
    // TODO: add default redirect if no url paths match
];
