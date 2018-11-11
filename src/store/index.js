import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';

export default new Vuex.Store({
    state: {
        // n.b. these are numbers:
        selectedYear:   moment().year(),
        selectedMonth:  moment().month(),     // n.b. month is 0-indexed
        selectedDay:    moment().date()
    },

    mutations: {
        setCurrentMonth(state, payload) {
            state.selectedMonth = payload;
        },

        setCurrentYear(state, payload) {
            state.selectedYear = payload;
        },

        setCurrentDay(state, payload) {
            state.selectedDay = payload;
        }
    }
});
