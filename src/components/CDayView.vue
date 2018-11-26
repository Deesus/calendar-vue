<template>
    <div class="c-day-view">

        <!-- ---------- header: ---------- -->
        <div class="c-day-view__heading">
            <div>{{ formattedFullDate }}</div>
            <router-link :to="{name: 'month-view' }">back to month view</router-link>
        </div>
        <div>
            <!-- TODO: replace with svg icon: -->
            <span @click="toggleShowEventControlsClicked">+</span>
        </div>

        <!-- ---------- add event: ---------- -->
        <div v-if="shouldShowEventControls">
            <span>Start time:</span>
            <c-time-picker v-on:timePickerUpdated="updateStartTimeData"></c-time-picker>
            <button typeof="button" @click="btnAddEventClicked">Add Event</button>
        </div>

        <!-- ---------- list of events: ---------- -->
        <ul>
            <li v-for="(event, index) in eventsInDay" :key="index">
                {{ event.startTime.format('h:mma') }}
                {{ event.name }}
            </li>
        </ul>

    </div>
</template>


<script>
    import { createMomentObjectFromYearMonthDay,
             createMomentObjectFromYearMonthDayHoursMinutesMeridiem } from '../utils/utilsTimeAndDates';
    import CTimePicker from './CTimePicker.vue';

    export default {
        name: 'CDayView',


        data() {
            return {
                // TODO: replace dummy event name, and event label:
                newEventName: 'Test event' + Math.random(),
                newEventLabel: 'yellow',

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

            btnAddEventClicked() {
                let momentObj = createMomentObjectFromYearMonthDayHoursMinutesMeridiem(this.$store.state.selectedYear,
                                                                                       this.$store.state.selectedMonth,
                                                                                       this.$store.state.selectedDay,
                                                                                       this.newEventStartTime.hours,
                                                                                       this.newEventStartTime.minutes,
                                                                                       this.newEventStartTime.meridiem);

                // TODO: should change from mutation to action:
                this.$store.commit('addEventToCalendar', {
                    name:       this.newEventName,
                    startTime:  momentObj,
                    endTime:    momentObj,
                    label:      this.newEventLabel
                });
            },

            toggleShowEventControlsClicked() {
                // n.b. once we show the 'add event' controls, it is always shown until user leaves day-view:
                this.shouldShowEventControls = true;
            }
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
</style>
