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

        // n.b. if we were more concerned about performance, we should replace the events array with an object/hash
        // so that we select and delete at O(1) instead of doing Array.filter:
        eventsInCalendar: [
            // TODO: replace dummy data:
            // TODO: need to validate start/end dates
            { id: 484371, name: 'vacation', startTime: moment(), endTime: moment().add(5, 'days'), label: 'yellow' },
            { id: 18358328, name: 'vacation 2', startTime: moment(), endTime: moment().add(5, 'days'), label: 'red' },
            { id: 852202, name: 'meeting',  startTime: moment().subtract(8, 'days').add(3, 'hours'), endTime: moment().subtract(8, 'days').add(6, 'hours'), label: 'green' },
            { id: 3473275, name: 'one more', startTime: moment().subtract(8, 'days').add(5, 'hours'), endTime: moment().subtract(8, 'days').add(10, 'hours'), label: 'blue' }
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

        addEventToCalendar(state, event) {
            state.eventsInCalendar.push(event);
        },

        removeEventFromCalendar(state, idToRemove) {
            state.eventsInCalendar = state.eventsInCalendar.filter( (event)=> {
                return event.id !== idToRemove;
            });
        }
    },


    actions: {

    }
});
