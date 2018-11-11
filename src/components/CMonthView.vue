<template>
    <div class="c-month-view">

        <div class="c-month-view__heading">
            {{ formattedSelectedMonth }} {{ formattedSelectedYear }}
        </div>
        <br>

        <div class="c-month-view__controls">
            <button @click="previousMonthHandler" type="button">&lt;</button>
            <button @click="nextMonthHandler" type="button">&gt;</button>
        </div>
        <br>

        <div class="c-week-heading">
            <div class="c-week-heading__day">Sun</div>
            <div class="c-week-heading__day">Mon</div>
            <div class="c-week-heading__day">Tue</div>
            <div class="c-week-heading__day">Wed</div>
            <div class="c-week-heading__day">Thu</div>
            <div class="c-week-heading__day">Fri</div>
            <div class="c-week-heading__day">Sat</div>
        </div>

        <div class="c-week" v-for="week in weeksInMonth">
            <!-- TODO: see: https://vuejs.org/guide/list.html#key -->
            <c-month-view-day v-for="day in week" :day="day" :key="day.id"></c-month-view-day>
        </div>

    </div>
</template>



<script>
    import { createMomentObjectFromYearMonthDay } from '../utils/utilsTimeAndDates';
    import { DATE_ENUM } from '../appConstants';
    import CMonthViewDay from './CMonthViewDay.vue';

    export default {
        name: 'CMonthView',


        data() {
            return { };
        },


        methods: {
            // TODO: can we replace `this.$store.state` and `this.$store.commit` with aliases?

            previousMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.JANUARY) {
                    this.$store.commit('setCurrentMonth', DATE_ENUM.DECEMBER);
                    this.$store.commit('setCurrentYear', this.$store.state.selectedYear - 1);
                }
                else {
                    this.$store.commit('setCurrentMonth', this.$store.state.selectedMonth - 1);
                }
            },

            nextMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.DECEMBER) {
                    this.$store.commit('setCurrentMonth', DATE_ENUM.JANUARY);
                    this.$store.commit('setCurrentYear', this.$store.state.selectedYear + 1);
                }
                else {
                    this.$store.commit('setCurrentMonth', this.$store.state.selectedMonth + 1);
                }
            }
        },


        computed: {
            /**
             * Generates a list of weeks in month-view for the selected (currently viewing) month
             *
             * @returns {Array}
             */
            weeksInMonth() {
                // there should be 5 rows/weeks for every month
                let days = this.daysInMonth;
                let weeks = [];
                let week = [];


                // loop through days and add to `week`; if we have 7 days in week, add to `weeks`:
                for (let day of days) {
                    week.push(day);

                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }

                return weeks;
            },

            /**
             * Generates a list of days in month-view for the selected (currently viewing) month
             *
             * @returns {Array}: list of moment date object
             */
            daysInMonth() {
                let days = [];  // list of days we will display in a month-view
                let firstDayOfMonth = createMomentObjectFromYearMonthDay(this.$store.state.selectedYear,
                                                                         this.$store.state.selectedMonth,
                                                                         1);

                // if day is not Sunday, then we add days from previous months to list to fill up the week:
                {
                    // subtract days until we get to Sunday:
                    // n.b. Sunday in moment dates == 0
                    let day = firstDayOfMonth;
                    while (day.day() !== DATE_ENUM.SUNDAY) {
                        // n.b. we decrement before pushing to array:
                        day = this.$moment(day).subtract(1, 'days');
                        days.unshift(day);
                    }
                }

                // starting on first day of month, keep adding days until we have all days that exist the in selected month:
                {
                    let day = firstDayOfMonth;
                    while (day.month() === this.$store.state.selectedMonth) {
                        // n.b. we add to array before incrementing:
                        days.push(day);
                        day = this.$moment(day).add(1, 'days');
                    }
                }

                // starting from last day of the month, keep adding days (from the next month) until we have fill up the week:
                {
                    let day = days[days.length - 1];
                    while (day.day() !== DATE_ENUM.SATURDAY) {
                        // n.b. we increment before pushing to array:
                        day = this.$moment(day).add(1, 'days');
                        days.push(day);
                    }
                }

                return days;
            },

            formattedSelectedMonth() {
                // TODO: n.b. we could also map the month names to an enum so that we don't keep returning moment objects:
                return createMomentObjectFromYearMonthDay(this.$store.state.selectedYear,
                                                          this.$store.state.selectedMonth,
                                                          this.$store.state.selectedDay)
                    .format('MMM');
            },

            formattedSelectedYear() {
                return this.$store.state.selectedYear;
            },

        }, // computed


        components: {
            'c-month-view-day': CMonthViewDay
        }
    }
</script>



<style scoped>
    .c-week-heading {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
    }

    .c-week-heading__day {
        width: 150px;
    }

    .c-week {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
</style>
