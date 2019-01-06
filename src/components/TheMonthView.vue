<template>
    <div>
        <div :class="monthViewStyles">
            <!-- ---------- header/nav: ---------- -->
            <c-month-view-nav class="c-month-view__nav"/>

            <!-- --------- days-of-week heading: ---------- -->
            <div class="c-month-view__days-of-week">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>

            <!-- ---------- days in month: ---------- -->
            <c-month-view-day v-for="(day, index) in daysInMonth" :day="day" :key="index"/>
        </div>

        <!-- ---------- month-view overlay: ---------- -->
        <div class="c-month-view__overlay" v-if="shouldShowMonthViewBgOverlay"></div>

        <!-- ---------- day view (modal): ---------- -->
        <router-view></router-view>
    </div>

</template>


<script>
    import { createMomentObjectFromYearMonthDay } from '../utils/utils';
    import { DATE_ENUM } from '../appConstants';
    import CMonthViewNav from './TheMonthViewNav.vue';
    import CMonthViewDay from './CMonthViewDay.vue';


    export default {
        name: 'CMonthView',


        components: {
            CMonthViewDay,
            CMonthViewNav
        },


        data() {
            return {};
        },


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
            },

            shouldShowMonthViewBgOverlay() {
                return this.$store.state.shouldShowMonthViewBgOverlay;
            },

            monthViewStyles() {
                return {
                    'c-month-view': true,
                    'c-month-view--unfocus': this.$store.state.shouldShowMonthViewBgOverlay === true
                }
            }
        } // computed
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";


    .c-month-view {
        display: grid;
        grid-template-columns: repeat(7, 1fr);          // there are 7 days in a week
        grid-template-rows: auto 40px repeat(4, 1fr);   // there is always the month heading + 4 weeks
        grid-auto-rows: 1fr;                            // if there are more than 4 weeks in a month, each row will have height of 1fr
        grid-gap: 1px;
        justify-items: stretch;
        background: @calendar-border-color;
        cursor: pointer;            // prevents cursor from reverting when hovering over grid gaps
        min-height: 100vh;
        max-width: 100%;
        transition: filter linear 200ms;

        &&--unfocus {
            filter: blur(4px) grayscale(.7);
        }

        &__nav {
            grid-row: ~"1/2";
            grid-column: ~"1/8";
        }

        &__days-of-week {
            grid-row: ~"2/3";
            grid-column: ~"1/8";
            background: white;
            display: grid;
            grid-gap: 1px;
            grid-template-rows: 100%;
            grid-template-columns: repeat(7, 1fr);
            justify-items: end;
            cursor: default;
            color: @font-color-highlight;

            & > * {
                padding: @calendar-cell-padding;
            }
        }

        &__overlay {
            z-index: 30;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            position: fixed;
            background: rgba(0, 0, 0, 0.3);
        }

        // the router-link (<a> tag) is grid-item:
        a {
            overflow: hidden;   // prevents content from exceeding grid-item's width; this ensures equal width calendar cells
        }
    }
</style>
