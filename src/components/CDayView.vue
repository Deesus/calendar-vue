<template>
    <div class="c-day-view">

        <!-- ---------- header: ---------- -->
        <div class="c-day-view__heading">
            <div>{{ formattedFullDate }}</div>
            <router-link :to="{name: 'month-view' }" @click.native="returnToMonthViewLinkClicked">back to month view</router-link>
        </div>
        <div>
            <!-- TODO: replace with svg icon: -->
            <span @click="toggleShowEventControlsClicked">+</span>
        </div>

        <!-- ---------- add event: ---------- -->
        <form v-if="shouldShowEventControls">
            <div>
                <label :for="addEventNameElementId">Name:</label>
                <input id="addEventNameElementId" :name="addEventNameElementId" type="text" v-model.trim="newEventName">
            </div>
            <div>
                <label>Start time:</label>
                <c-time-picker v-on:timePickerUpdated="updateStartTimeData"></c-time-picker>
                <button type="button" @click="addEventSubmitted" :disabled="isFormValid === false">Add Event</button>
            </div>
            <div>
                <label :for="addEventNotesElementId">Notes:</label>
                <textarea :id="addEventNotesElementId" :name="addEventNotesElementId" v-model.trim="newEventNotes"></textarea>
            </div>
        </form>

        <!-- ---------- list of events: ---------- -->
        <ul>
            <li v-for="event in eventsInDay" :key="event.id">
                <div>
                    <div>
                        {{ event.startTime.format('h:mma') }}
                        {{ event.name }}

                        <!-- TODO: replace with svg icon: -->
                        <i class="icon icon--close" @click="deleteEventClicked(event.id)">X</i>
                    </div>
                    <div>
                        {{ event.notes }}
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>


<script>
    import { createMomentObjectFromYearMonthDay,
             createMomentObjectFromYearMonthDayHoursMinutesMeridiem,
             createUniqueId
           } from '../utils/utilsTimeAndDates';

    import { ADD_EVENT_TO_CALENDAR_MUTATION, REMOVE_EVENT_FROM_CALENDAR_MUTATION } from '../store/mutation-types';

    import CTimePicker from './CTimePicker.vue';

    export default {
        name: 'CDayView',


        data() {
            return {
                addEventNameElementId:  'add-event-name',
                addEventNotesElementId: 'add-notes-textarea',

                // TODO: replace dummy event name, and event label:
                newEventLabel: 'yellow',
                newEventName: '',
                newEventNotes: '',

                // n.b. default values get updated as soon as the time-picker component has mounted:
                newEventStartTime: {
                    hours:      null,
                    minutes:    null,
                    meridiem:   null
                },
                shouldShowEventControls: false
            }
        },


        methods: {
            /* when time-picker updates its internal state (e.g. onblur), we update the CDayView's data */
            updateStartTimeData(payload) {
                this.newEventStartTime.hours    = payload.hoursInput;
                this.newEventStartTime.minutes  = payload.minutesInput;
                this.newEventStartTime.meridiem = payload.meridiemValue;
            },

            addEventSubmitted() {

                // check if form fields are valid:
                if (this.isFormValid === false) {
                    return;
                }

                let momentObj = createMomentObjectFromYearMonthDayHoursMinutesMeridiem(this.$store.state.selectedYear,
                                                                                       this.$store.state.selectedMonth,
                                                                                       this.$store.state.selectedDay,
                                                                                       this.newEventStartTime.hours,
                                                                                       this.newEventStartTime.minutes,
                                                                                       this.newEventStartTime.meridiem);

                // TODO: should change from mutation to action:
                this.$store.commit(ADD_EVENT_TO_CALENDAR_MUTATION, {
                    id:         createUniqueId(),
                    name:       this.newEventName,
                    startTime:  momentObj,
                    endTime:    momentObj,
                    notes:      this.newEventNotes,
                    label:      this.newEventLabel
                });
            },

            toggleShowEventControlsClicked() {
                // n.b. once we show the 'add event' controls, it is always shown until user leaves day-view:
                this.shouldShowEventControls = true;
            },

            returnToMonthViewLinkClicked() {
                // n.b. this is a placeholder in case we need to extend the functionality of the component
            },

            deleteEventClicked(id) {
                this.$store.commit(REMOVE_EVENT_FROM_CALENDAR_MUTATION, id);
            },
        },


        computed: {
            /**
             * Filters the Vuex store's event list for only the events in the selected day
             *
             * @returns {Array}: list of events on the selected date
             */
            eventsInDay() {

                let listOfEvents = this.$store.state.eventsInCalendar;
                let selectedDate = createMomentObjectFromYearMonthDay(this.$store.state.selectedYear,
                                                                      this.$store.state.selectedMonth,
                                                                      this.$store.state.selectedDay);

                return listOfEvents.filter((event) => {
                    return (selectedDate.isSameOrAfter(event.startTime, 'day')) &&
                           (selectedDate.isSameOrBefore(event.endTime,  'day'));
                });
            },

            formattedFullDate() {
                return `${this.$store.state.selectedDay}/${this.$store.state.selectedMonth+1}/${this.$store.state.selectedYear}`;
            },

            isFormValid() {
                let validationErrors = [];

                // check various form fields:
                // n.b. right now, this error list doesn't do much; but we'll need it if we want to extend the validation (e.g. add error styles to inputs):
                if (this.newEventName === '') {
                    validationErrors.push(this.addEventNameElementId);
                }

                // form is valid if # of errors is zero:
                return validationErrors.length === 0;
            }
        },


        components: {
            CTimePicker
        }
    }
</script>


<style scoped>
    ul {
        list-style: none;
    }

    li {
        border-top: 1px solid silver;
        margin: 0;
        padding: 12px 0;
    }

    .icon--close {
        cursor: pointer;
    }
</style>
