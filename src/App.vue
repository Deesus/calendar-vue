<template>
    <div>
        <div v-for="week in weeksInMonth">
            week
            <div>{{ week }}</div>
            <br>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'App',

        data() {
            return {
                selectedYear:   this.$moment().year(),
                selectedMonth:  this.$moment().month(),     // n.b. month is 0-indexed
                selectedDay:    this.$moment().date()
            };
        },

        methods: {},

        computed: {
            /**
             * Generates a list of days in month-view for the selected (currently viewing) month
             *
             * @returns {Array}: list of moment date object
             */
            daysInMonth() {
                let days = [];                          // list of days we will display in a month-view
                const DATE_ENUM = Object.freeze({       // these enums represent the 'day of week' format that moment expects [0-6]
                    SUNDAY: 0,
                    SATURDAY: 6
                });

                // n.b. the month in this moment object ranges from 1-12, but when we use `.month()` method on this object, we get 0-indexed months:
                // thus, `this.selectedMonth` is 0-indexed, so we add `1` to offset it:
                let firstDayOfMonth = this.$moment(`${this.selectedYear}-${this.selectedMonth+1}-1`,
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
                    while (day.month() === this.selectedMonth) {
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
            }
        },

        components: {},

        created() {

        }
    }
</script>


<style scoped>

</style>
