<template>
    <div class="c-month-view">
        <div class="c-week-heading">
            <div class="c-week-heading__day">Sun</div>
            <div class="c-week-heading__day">Mon</div>
            <div class="c-week-heading__day">Tue</div>
            <div class="c-week-heading__day">Wed</div>
            <div class="c-week-heading__day">Thu</div>
            <div class="c-week-heading__day">Fri</div>
            <div class="c-week-heading__day">Sat</div>
        </div>
        <div class="c-week" v-for="week in weeksInMonth" :key="week.id">
            <template v-for="day in week">
                <div class="c-day">{{ day.date() }}</div>
            </template>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'CMonthView',

        data() {
            return {};
        },

        props: ['daysInMonth'],

        methods: {

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
            }
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
