<template>
    <div class="c-month-view">
        <div class="c-month-view__controls">
            <button @click="previousMonthHandler" type="button">&lt;</button>
            <button @click="nextMonthHandler" type="button">&gt;</button>
        </div>

        <div class="c-week-heading">
            <div class="c-week-heading__day">Sun</div>
            <div class="c-week-heading__day">Mon</div>
            <div class="c-week-heading__day">Tue</div>
            <div class="c-week-heading__day">Wed</div>
            <div class="c-week-heading__day">Thu</div>
            <div class="c-week-heading__day">Fri</div>
            <div class="c-week-heading__day">Sat</div>
        </div>

        <div class="c-week" v-for="(week, weekIndex) in weeksInMonth" :key="weekIndex">
            <c-month-view-day v-for="(day, dayIndex) in week" :day="day" :key="dayIndex"></c-month-view-day>
        </div>

    </div>
</template>



<script>
    import { createMomentObjectFromYearMonthDay } from '../utils/utils';
    import { DATE_ENUM } from '../appConstants';
    import CMonthViewDay from './CMonthViewDay.vue';
    import { SET_CURRENT_MONTH_MUTATION, SET_CURRENT_YEAR_MUTATION } from '../store/mutation-types';

    export default {
        name: 'CMonthView',


        data() {
            return { };
        },


        methods: {
            // TODO: can we replace `this.$store.state` and `this.$store.commit` with aliases?

            previousMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.JANUARY) {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, DATE_ENUM.DECEMBER);
                    this.$store.commit(SET_CURRENT_YEAR_MUTATION, this.$store.state.selectedYear - 1);
                }
                else {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, this.$store.state.selectedMonth - 1);
                }
            },

            nextMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.DECEMBER) {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, DATE_ENUM.JANUARY);
                    this.$store.commit(SET_CURRENT_YEAR_MUTATION, this.$store.state.selectedYear + 1);
                }
                else {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, this.$store.state.selectedMonth + 1);
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
            }
        }, // computed


        components: {
            CMonthViewDay
        }
    }
</script>



<style lang="less" scoped>
    @import "../styles/base/_constants.less";

    .c-month-view {
        padding-top: @page-top-padding;
    }

    .c-week-heading {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;

        &__day {
            width: 150px;
        }
    }

    .c-week {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
</style>
