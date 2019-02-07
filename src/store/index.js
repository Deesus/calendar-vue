import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';
import { createMomentObjectFromYearMonthDay } from '../utils/utils';
import * as MUTATION from './typesMutation';


Vue.use(Vuex);



// We have both named exports and default exports in order to properly mock Vuex for unit testing. See Vuex docs.
// -------------------- named exports: --------------------
export const state = {
    // n.b. these are numbers:
    selectedYear:                   moment().year(),
    selectedMonth:                  moment().month(),   // n.b. month is 0-indexed
    selectedDay:                    moment().date(),
    selectedEventId:                null,
    shouldShowConfirmModal:         false,
    shouldShowMonthViewBgOverlay:   false,              // (Boolean) Determines if background overlay should be shown (e.g. for modals)

    // n.b. if we were more concerned about performance, we should replace the events array with an object/hash
    // so that we select and delete at O(1) instead of doing Array.filter:
    eventsInCalendar: [
        // TODO: need to validate start/end dates
        {
            id: 484371,
            name: 'Vacation',
            startTime: "2019-02-06T06:33:08.402Z",
            endTime: "2019-02-06T06:33:08.402Z",
            notes: 'First day of vacation. Enjoy!',
            label: 'yellow'
        },
        {
            id: 3428574,
            name: 'Vacation',
            startTime: "2019-02-07T06:33:08.404Z",
            endTime: "2019-02-07T06:33:08.404Z",
            notes: '',
            label: 'yellow'
        },
        {
            id: 242973,
            name: 'Vacation',
            startTime: "2019-02-08T06:33:08.404Z",
            endTime: "2019-02-08T06:33:08.404Z",
            notes: 'Last day of vacation.',
            label: 'yellow'
        },
        {
            id: 18358328,
            name: 'Pick up laptop',
            startTime: "2019-02-12T18:09:08.404Z",
            endTime: "2019-02-12T18:09:08.404Z",
            notes: 'Pick up repaired laptop from Galeria Mall.',
            label: 'red'
        },
        {
            id: 852202,
            name: 'Meeting with Yana',
            startTime: "2019-01-24T08:59:08.405Z",
            endTime: "2019-01-24T08:59:08.405Z",
            notes: 'At the coffee shop on 14/3 Nevsky Prospect.',
            label: 'green'
        },
        {
            id: 3473275,
            name: 'Dentist appointment',
            startTime: "2019-02-02T11:22:08.405Z",
            endTime: "2019-02-02T11:22:08.405Z",
            notes: 'Plan to leave at least 30 minutes ahead to avoid traffic.',
            label: 'blue'
        }
    ]
};


export const getters = {
    /**
     * Filters the Vuex store's event list for only the events in the selected day
     *
     * @returns {Array}: list of events on the selected date
     */
    eventsInDay(state, getters) {
        const listOfEvents = state.eventsInCalendar;
        const selectedDate = getters.getMomentObjectFromSelectedDate;

        return listOfEvents.filter((event) => {
            return (selectedDate.isSameOrAfter(event.startTime, 'day')) &&
                   (selectedDate.isSameOrBefore(event.endTime,  'day'));
        });
    },

    /**
     * Creates a moment object given the selected year-month-day
     *
     * @returns {moment}: moment object
     */
    getMomentObjectFromSelectedDate(state) {
        return createMomentObjectFromYearMonthDay(state.selectedYear, state.selectedMonth, state.selectedDay);
    },

    /**
     * Gets formatted selected month text from Vuex store
     *
     * @returns {String}: formatted month text
     */
    getFullMonthText(state, getters) {
        return getters.getMomentObjectFromSelectedDate.format('MMMM');
    },

    /**
     * Gets formatted selected year text from Vuex store
     *
     * @returns {String}: formatted year text
     */
    getFullYearText(state, getters) {
        return getters.getMomentObjectFromSelectedDate.format('YYYY');
    },

    /**
     * Gets formatted selected day-of-week text from Vuex store
     *
     * @returns {String}: formatted day-of-week text
     */
    getDayOfWeekAndMonthText(state, getters) {
        return getters.getMomentObjectFromSelectedDate.format('dd D');
    }
};


export const mutations = {
    [MUTATION.SET_CURRENT_DAY_MUTATION](state, selectedDay) {
        state.selectedDay = selectedDay;
    },

    [MUTATION.SET_CURRENT_MONTH_MUTATION](state, selectedMonth) {
        state.selectedMonth = selectedMonth;
    },

    [MUTATION.SET_CURRENT_YEAR_MUTATION](state, selectedYear) {
        state.selectedYear = selectedYear;
    },

    // TODO: this should be an async Vuex action:
    /**
     * Adds event to list of events (`eventsInCalendar`)
     *
     * @param state
     * @param event: e
     */
    [MUTATION.ADD_EVENT_TO_CALENDAR_MUTATION](state, event) {
        state.eventsInCalendar.push(event);
    },

    /**
     * Edit an event in the list of events (`eventsInCalendar`)
     *
     * @param state
     * @param editedEvent: event to edit
     */
    [MUTATION.EDIT_EVENT_IN_CALENDAR_MUTATION](state, editedEvent) {
        let indexOfEvent = state.eventsInCalendar.findIndex( (item) => item.id === editedEvent.id);
        state.eventsInCalendar.splice(indexOfEvent, 1, editedEvent);
    },

    // TODO: this should be an async Vuex action:
    /**
     * Deletes an event from the list of events (`eventsInCalendar`)
     *
     * @param state
     * @param idToRemove {Number}: id of event to delete
     */
    [MUTATION.REMOVE_EVENT_FROM_CALENDAR_MUTATION](state, idToRemove) {
        state.eventsInCalendar = state.eventsInCalendar.filter( (event)=> {
            return event.id !== idToRemove;
        });
    },

    [MUTATION.SELECT_EVENT_ID_MUTATION](state, eventId) {
        state.selectedEventId = eventId;
    },

    [MUTATION.SHOW_CONFIRM_MODAL_MUTATION](state, shouldShowModal) {
        state.shouldShowConfirmModal = shouldShowModal;
    },

    [MUTATION.SHOW_MONTH_VIEW_BG_OVERLAY](state, shouldShowOverlay) {
        state.shouldShowMonthViewBgOverlay = shouldShowOverlay;
    }
};


export const actions = {

};



// -------------------- default exports: --------------------
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
