<template>
    <!-- TODO: the c-nav component is really part of the Month view, so it shouldn't be a separate component; it creates an extra div in DOM -->
    <!--<c-nav></c-nav>-->
    <div class="c-month-view">
        <!-- --------- month heading: ---------- -->
        <div class="c-month-view__heading">Sun</div>
        <div class="c-month-view__heading">Mon</div>
        <div class="c-month-view__heading">Tue</div>
        <div class="c-month-view__heading">Wed</div>
        <div class="c-month-view__heading">Thu</div>
        <div class="c-month-view__heading">Fri</div>
        <div class="c-month-view__heading">Sat</div>

        <!-- ---------- days in month: ---------- -->
        <c-month-view-day v-for="(day, index) in daysInMonth" :day="day" :key="index"></c-month-view-day>
    </div>
</template>



<script>
    import { createMomentObjectFromYearMonthDay } from '../utils/utils';
    import { DATE_ENUM } from '../appConstants';
    import CNav from './CNav.vue';
    import CMonthViewDay from './CMonthViewDay.vue';

    export default {
        name: 'CMonthView',


        data() {
            return {};
        },

        methods: {},


        computed: {
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
            CMonthViewDay,
            CNav
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants.less";

    .c-month-view {
        display: grid;
        grid-template-columns: repeat(7, 1fr);      /* there are 7 days in a week */
        grid-template-rows: 32px repeat(4, 1fr);    /* there is always the month heading + 4 weeks */
        grid-auto-rows: 1fr;                        /* if there are more than 4 weeks in a month, each row will have height of 1fr */
        grid-gap: 1px;
        justify-items: stretch;
        min-height: 100vh;
        background: @calendar-border-color;
        cursor: pointer;                            /* prevents cursor from reverting when hovering over grid gaps */

        &__heading {
            background: white;
        }
    }
</style>
