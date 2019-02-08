import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase/app';
import 'firebase/database';
import firebaseSecrets from '../../SECRETS.FIREBASE';
import moment from 'moment-timezone';
import { createMomentObjectFromYearMonthDay } from '../utils/utils';
import * as MUTATION from './typesMutations';
import * as ACTION from './typesActions';
import * as CONST from '../appConstants';


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
    fbInstance:                     null,

    // n.b. if we were more concerned about performance, we should replace the events array with an object/hash
    // so that we select and delete at O(1) instead of doing Array.filter:
    eventsInCalendar: []
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
     * @returns {Object}: moment object
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
    [MUTATION.SET_CURRENT_DAY](state, selectedDay) {
        state.selectedDay = selectedDay;
    },

    [MUTATION.SET_CURRENT_MONTH](state, selectedMonth) {
        state.selectedMonth = selectedMonth;
    },

    [MUTATION.SET_CURRENT_YEAR](state, selectedYear) {
        state.selectedYear = selectedYear;
    },

    [MUTATION.ADD_EVENT](state, event) {
        state.eventsInCalendar.push(event);
    },

    [MUTATION.EDIT_EVENT](state, updatedEvent) {
        const arr = [...state.eventsInCalendar];

        // modify only the event whose object we updated:
        state.eventsInCalendar = arr.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent;
            }
            else {
                return event;
            }
        });
    },

    [MUTATION.DELETE_EVENT](state, idToRemove) {
        state.eventsInCalendar = state.eventsInCalendar.filter( (event)=> {
            return event.id !== idToRemove;
        });
    },

    [MUTATION.SELECT_EVENT_ID](state, eventId) {
        state.selectedEventId = eventId;
    },

    [MUTATION.SHOW_CONFIRM_MODAL](state, shouldShowModal) {
        state.shouldShowConfirmModal = shouldShowModal;
    },

    [MUTATION.SHOW_MONTH_VIEW_BG_OVERLAY](state, shouldShowOverlay) {
        state.shouldShowMonthViewBgOverlay = shouldShowOverlay;
    },

    [MUTATION.UPDATE_ALL_EVENTS](state, eventsInCalendar) {
        state.eventsInCalendar = eventsInCalendar;
    },

    [MUTATION.INSTANTIATE_FIREBASE](state, fbInstance) {
        state.fbInstance = fbInstance;
    }
};



export const actions = {
    /**
     * Gets all events in calendar.
     * Typically this is best used when app is initially loaded/mounted.
     *
     * @param commit
     * @param state
     */
    [ACTION.GET_INITIAL_DATA]({ commit, state }) {
        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .once('value')
            .then((snapshot) => {
                const calendarDataJSON = snapshot.val();

                // convert data to array of entries (removing the redundant, top-level id/key from resulting array):
                const arr = [];
                for (const [key, val] of Object.entries(calendarDataJSON)) {
                    arr.push(val);
                }

                commit(MUTATION.UPDATE_ALL_EVENTS, arr);
            })
            .catch((error) => {
                // TODO: gracefully handle error
            });
    },

    /**
     * Instantiates connection to Firebase realtime database.
     *
     * @param commit
     * @param state
     */
    [ACTION.INSTANTIATE_FIREBASE]({ commit, state }) {
        const fb = Firebase.initializeApp(firebaseSecrets)
                           .database();

        commit(MUTATION.INSTANTIATE_FIREBASE, fb);
    },

    /**
     * Saves new events to Firebase store then pushes to event list (Vuex).
     *
     * @param commit
     * @param state
     * @param postData {Object}: Event object containing all the properties needed for a calendar event
     */
    [ACTION.ADD_EVENT]({ commit, state }, postData) {
        // the Firebase key for new/existing post is the event's id:
        const postKey = postData.id;

        state.fbInstance
             .ref(CONST.FIREBASE.REFERENCE_NODE)
             .child(postKey)
             .update(postData)
             // after successful Firebase update, push event to event list (in Vuex):
             // TODO: perhaps we should ensure that Vuex and Firebase are synced: re-fetch data?
             .then(() => {
                commit(MUTATION.ADD_EVENT, postData);
             })
             .catch((error) => {
                // TODO: gracefully handle error
             });
    },


    /**
     * Updates an exiting event in Firebase.
     *
     * @param commit
     * @param state
     * @param postData {Object}: Event object containing updated properties
     */
    [ACTION.EDIT_EVENT]({ commit, state }, postData) {
        // the Firebase key for new/existing post is the event's id:
        const postKey = postData.id;

        state.fbInstance
             .ref(CONST.FIREBASE.REFERENCE_NODE)
             .child(postKey)
             .update(postData)
             .then(() => {
                commit(MUTATION.EDIT_EVENT, postData);
             })
             .catch((error) => {
                // TODO: gracefully handle error
             });
    },

    /**
     * Deletes event from Firebase as well as Vuex's list of events.
     *
     * @param commit
     * @param state
     * @param eventId {Number}: event's id property; the event to be deleted
     * TODO: change method signature to reference event object rather than the event's id directly.
     */
    [ACTION.DELETE_EVENT]({ commit, state }, eventId) {
        state.fbInstance
             .ref(CONST.FIREBASE.REFERENCE_NODE)
             .child(eventId)
             .remove()
             // after successful removal of event from Firebase, remove event from Vuex store as well:
             .then(() => {
                commit(MUTATION.DELETE_EVENT, eventId);
             })
             .catch((error) => {
                // TODO: gracefully handle error
             });
    }
};



// -------------------- default exports: --------------------
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
