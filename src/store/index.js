import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';
import { createMomentObjectFromYearMonthDay } from '../utils/utils';
import { ADD_EVENT_TO_CALENDAR_MUTATION,
         EDIT_EVENT_IN_CALENDAR_MUTATION,
         REMOVE_EVENT_FROM_CALENDAR_MUTATION,
         SELECT_EVENT_ID_MUTATION,
         SET_CURRENT_DAY_MUTATION,
         SET_CURRENT_MONTH_MUTATION,
         SET_CURRENT_YEAR_MUTATION,
         SHOW_CONFIRM_MODAL_MUTATION,
         SHOW_MONTH_VIEW_BG_OVERLAY
       } from './mutation-types';


export default new Vuex.Store({

    // ==================== state: ====================
    state: {
        // n.b. these are numbers:
        selectedYear:   moment().year(),
        selectedMonth:  moment().month(),     // n.b. month is 0-indexed
        selectedDay:    moment().date(),
        selectedEventId: null,
        shouldShowConfirmModal: false,
        shouldShowMonthViewBgOverlay: false,

        // n.b. if we were more concerned about performance, we should replace the events array with an object/hash
        // so that we select and delete at O(1) instead of doing Array.filter:
        eventsInCalendar: [
            // TODO: replace dummy data before deploying to production:
            // TODO: need to validate start/end dates
            {
                id: 484371,
                name: 'Vacation',
                startTime: moment().add(34, 'minutes'),
                endTime: moment().add(34, 'minutes'),
                notes: 'First day of vacation. Enjoy!',
                label: 'yellow'
            },
            {
                id: 3428574,
                name: 'Vacation',
                startTime: moment().add(1, 'days'),
                endTime: moment().add(1, 'days'),
                notes: '',
                label: 'yellow'
            },
            {
                id: 242973,
                name: 'Vacation',
                startTime: moment().add(2, 'days'),
                endTime: moment().add(2, 'days'),
                notes: 'Last day of vacation.',
                label: 'yellow'
            },
            {
                id: 18358328,
                name: 'Pick up laptop',
                startTime: moment().add(5, 'days').add(12, 'hours').add(10, 'minutes'),
                endTime: moment().add(5, 'days').add(12, 'hours').add(10, 'minutes'),
                notes: 'Pick up repaired laptop from Galeria Mall.',
                label: 'red'
            },
            {
                id: 852202,
                name: 'Meeting with Yana',
                startTime: moment().subtract(14, 'days').add(3, 'hours'),
                endTime: moment().subtract(14, 'days').add(6, 'hours'),
                notes: 'At the coffee shop on 14/3 Nevsky Prospect.',
                label: 'green'
            },
            {
                id: 3473275,
                name: 'Dentist appointment',
                startTime: moment().subtract(5, 'days').add(5, 'hours').add(23, 'minutes'),
                endTime: moment().subtract(5, 'days').add(5, 'hours').add(23, 'minutes'),
                notes: 'Plan to leave at least 30 minutes ahead to avoid traffic.',
                label: 'blue'
            }
        ]
    },


    // ==================== mutations: ====================
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
        /**
         * Adds event to list of events (`eventsInCalendar`)
         *
         * @param state
         * @param event: e
         */
        [ADD_EVENT_TO_CALENDAR_MUTATION](state, event) {
            state.eventsInCalendar.push(event);
        },

        /**
         * Edit an event in the list of events (`eventsInCalendar`)
         *
         * @param state
         * @param editedEvent: event to edit
         */
        [EDIT_EVENT_IN_CALENDAR_MUTATION](state, editedEvent) {
            let indexOfEvent = state.eventsInCalendar.findIndex( (item) => item.id === editedEvent.id);
            state.eventsInCalendar.splice(indexOfEvent, 1, editedEvent);
        },

        // TODO: this should be an async Vuex action:
        // TODO: make the parameters the same as the
        /**
         * Deletes an event from the list of events (`eventsInCalendar`)
         *
         * @param state
         * @param idToRemove {Number}: id of event to delete
         */
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
        },

        [SHOW_MONTH_VIEW_BG_OVERLAY](state, shouldShowOverlay) {
            state.shouldShowMonthViewBgOverlay = shouldShowOverlay;
        }
    },


    // ==================== getters: ====================
    getters: {
        /**
         * Creates a moment object given the selected year-month-day
         *
         * @param state
         * @returns {moment}: moment object
         */
        getMomentObjectFromSelectedDate(state) {
            return createMomentObjectFromYearMonthDay(state.selectedYear, state.selectedMonth, state.selectedDay);
        }
    },


    // ==================== actions: ====================
    actions: {}
});
