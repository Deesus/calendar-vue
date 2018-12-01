import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';
import { createMomentObjectFromYearMonthDay } from '../utils/utils';

import { ADD_EVENT_TO_CALENDAR_MUTATION,
         REMOVE_EVENT_FROM_CALENDAR_MUTATION,
         SELECT_EVENT_ID_MUTATION,
         SET_CURRENT_DAY_MUTATION,
         SET_CURRENT_MONTH_MUTATION,
         SET_CURRENT_YEAR_MUTATION,
         SHOW_CONFIRM_MODAL_MUTATION
       } from './mutation-types';


export default new Vuex.Store({

    state: {
        // n.b. these are numbers:
        selectedYear:   moment().year(),
        selectedMonth:  moment().month(),     // n.b. month is 0-indexed
        selectedDay:    moment().date(),
        selectedEventId: null,
        shouldShowConfirmModal: false,

        // n.b. if we were more concerned about performance, we should replace the events array with an object/hash
        // so that we select and delete at O(1) instead of doing Array.filter:
        eventsInCalendar: [
            // TODO: replace dummy data:
            // TODO: need to validate start/end dates
            { id: 484371, name: 'vacation', startTime: moment(), endTime: moment().add(5, 'days'), notes: '', label: 'yellow' },
            { id: 18358328, name: 'Molestias aperiam sit veniam asperiores quis. Minima aliquid autem sed fugit voluptatibus nisi temporibus quae', startTime: moment(), endTime: moment().add(3, 'days'), notes: '', label: 'red' },
            { id: 852202, name: 'meeting',  startTime: moment().subtract(8, 'days').add(3, 'hours'), endTime: moment().subtract(8, 'days').add(6, 'hours'), notes: '', label: 'green' },
            { id: 3473275, name: 'one more', startTime: moment().subtract(8, 'days').add(5, 'hours'), endTime: moment().subtract(8, 'days').add(10, 'hours'), notes: '', label: 'blue' }
        ]
    },


    mutations: {
        [SET_CURRENT_DAY_MUTATION](state, payload) {
            state.selectedDay = payload;
        },

        [SET_CURRENT_MONTH_MUTATION](state, payload) {
            state.selectedMonth = payload;
        },

        [SET_CURRENT_YEAR_MUTATION](state, payload) {
            state.selectedYear = payload;
        },

        // TODO: this should be an async Vuex action:
        [ADD_EVENT_TO_CALENDAR_MUTATION](state, event) {
            state.eventsInCalendar.push(event);
        },

        // TODO: this should be an async Vuex action:
        [REMOVE_EVENT_FROM_CALENDAR_MUTATION](state, idToRemove) {
            state.eventsInCalendar = state.eventsInCalendar.filter( (event)=> {
                return event.id !== idToRemove;
            });
        },

        [SELECT_EVENT_ID_MUTATION](state, payload) {
            state.selectedEventId = payload;
        },

        [SHOW_CONFIRM_MODAL_MUTATION](state, shouldShowModal) {
            state.shouldShowConfirmModal = shouldShowModal;
        }
    },


    getters: {
        getMomentObjectFromSelectedDate(state) {
            return createMomentObjectFromYearMonthDay(state.selectedYear, state.selectedMonth, state.selectedDay);
        }
    },


    actions: {

    }
});
