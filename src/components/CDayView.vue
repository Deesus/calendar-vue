<template>
    <div class="c-day-view">
        <div class="c-day-view__heading">
            <div>{{ formattedFullDate }}</div>
            <router-link :to="{name: 'month-view' }">back to month view</router-link>
        </div>

        <ul>
            <li v-for="(event, index) in eventsInDay" :key="index">
                {{ event.startDate.format('h:mma') }}
                {{ event.name }}
            </li>
        </ul>
    </div>
</template>


<script>
    import { createMomentObjectFromYearMonthDay } from '../utils/utilsTimeAndDates';

    export default {
        name: 'CDayView',

        data() {
            return {

            }
        },

        methods: {
            // TODO: fill out click event: open modal, enter time
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
                    return (selectedDate.isSameOrAfter(event.startDate, 'day')) &&
                           (selectedDate.isSameOrBefore(event.endDate, 'day'));
                });
            },

            formattedFullDate() {
                return `${this.$store.state.selectedDay}/${this.$store.state.selectedMonth+1}/${this.$store.state.selectedYear}`;
            }
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
