import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';

export default new Vuex.Store({
    state: {
        // n.b. these are numbers:
        selectedYear:   moment().year(),
        selectedMonth:  moment().month(),     // n.b. month is 0-indexed
        selectedDay:    moment().date(),
        eventsInCalendar: [
            // TODO: replace dummy data:
            // TODO: need to validate start/end dates
            { name: 'vacation', startDate: moment(), endDate: moment().add(5, 'days'), label: 'yellow' },
            { name: 'vacation 2', startDate: moment(), endDate: moment().add(5, 'days'), label: 'red' },
            { name: 'meeting',  startDate: moment().subtract(8, 'days').add(3, 'hours'), endDate: moment().subtract(8, 'days').add(6, 'hours'), label: 'green' },
            { name: 'one more', startDate: moment().subtract(8, 'days').add(5, 'hours'), endDate: moment().subtract(8, 'days').add(10, 'hours'), label: 'blue' }
        ]
    },

    mutations: {
        setCurrentDay(state, payload) {
            state.selectedDay = payload;
        },

        setCurrentMonth(state, payload) {
            state.selectedMonth = payload;
        },

        setCurrentYear(state, payload) {
            state.selectedYear = payload;
        },

        addEventToCalendar(state, payload) {
            state.eventsInCalendar = payload;
        }
    }
});
