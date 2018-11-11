<template>
    <div :class="monthViewDayStyles" @click="dayClicked">
        {{ day.date() }}
    </div>
</template>


<script>
    export default {
        name: 'CMonthViewDay',

        data() {
            return {};
        },

        props: ['day'],

        methods: {
            dayClicked() {

            },
        },

        computed: {

            monthViewDayStyles() {
                let isNotCurrentMonth = this.day.month() !== this.$store.state.selectedMonth;
                let isToday = this.day.isSame(this.$moment(), 'day');

                return {
                    'c-month-view-day': true,
                    'c-month-view-day--muted': isNotCurrentMonth,
                    'c-month-view-day--today': isToday
                };
            }
        }
    }
</script>


<style scoped>
    .c-month-view-day {
        width: 150px;
        height: 150px;
        border: 1px solid lightslategray;
    }

    .c-month-view-day--muted {
        color: rgb(120,120,120);
        background: rgb(248, 248, 254);
    }

    .c-month-view-day--today {
        background: #faff9a;
    }
</style>
