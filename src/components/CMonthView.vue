<template>
    <div class="c-month-view">
        <div class="c-month-view__heading">
            {{ formatSelectedMonth }} {{ formatSelectedYear }}
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

        <!-- TODO: create a new component for 'day': -->
        <div class="c-week" v-for="week in weeksInMonth">
            <div v-for="day in week" class="c-day">{{ day.date() }}</div>
        </div>


    </div>
</template>



<script>
    const DATE_ENUM = Object.freeze({
        // day of week:
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,

        // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months
        // months:
        JANUARY: 0,
        FEBRUARY: 1,
        MARCH: 2,
        APRIL: 3,
        MAY: 4,
        JUNE: 5,
        JULY: 6,
        AUGUST: 7,
        SEPTEMBER: 8,
        OCTOBER: 9,
        NOVEMBER: 10,
        DECEMBER: 11
    });

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

                console.log(`month: ${this.$store.state.selectedMonth}`);
                console.log(`year: ${this.$store.state.selectedYear}`);
            },

            nextMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.DECEMBER) {
                    this.$store.commit('setCurrentMonth', DATE_ENUM.JANUARY);
                    this.$store.commit('setCurrentYear', this.$store.state.selectedYear + 1);
                }
                else {
                    this.$store.commit('setCurrentMonth', this.$store.state.selectedMonth + 1);
                }

                console.log(`month: ${this.$store.state.selectedMonth}`);
                console.log(`year: ${this.$store.state.selectedYear}`);
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
                let days = [];                          // list of days we will display in a month-view


                // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
                // thus, `this.$store.state.selectedMonth` is 0-indexed, so we add `1` to offset it:
                let firstDayOfMonth = this.$moment(`${this.$store.state.selectedYear}-${this.$store.state.selectedMonth+1}-1`,
                                                   'YYYY-M-D');


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

            formatSelectedMonth() {
                return this.$moment(this.$store.state.selectedMonth).format('MMM');
            },

            formatSelectedYear() {
                return this.$store.state.selectedYear;
            },

            year() {
                return this.$store.state.selectedYear;
            },

            month() {
                return this.$store.state.selectedMonth;
            },


        }, // computed



        created() {
            console.log(`day: ${this.$store.state.selectedDay}`);
            console.log(`month: ${this.$store.state.selectedMonth}`);
            console.log(`year: ${this.$store.state.selectedYear}`);
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

    .c-day {
        width: 150px;
        height: 150px;
        border: 1px solid lightslategray;
    }
</style>
