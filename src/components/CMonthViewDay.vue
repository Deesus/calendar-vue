<template>
    <router-link :to="{ name: 'day-view', params: { timeStamp: dayTimeStamp } } ">
        <div :class="monthViewDayStyles" @click="dayClicked">
            <div>{{ day.date() }}</div>
            <div v-for="event in eventsInDay" :key="event.id">{{ event.name }}</div>
        </div>
    </router-link>
</template>


<script>
    import { SET_CURRENT_DAY_MUTATION,
             SET_CURRENT_MONTH_MUTATION,
             SET_CURRENT_YEAR_MUTATION
           } from '../store/mutation-types';

    export default {
        name: 'CMonthViewDay',


        data() {
            return {};
        },


        props: {
            day: {
                type:       Object,   // we could have also imported moment and specified that as the type
                required:   true
            }
        },


        methods: {
            // TODO: we want to redirect to the month user was previously viewing rather than the clicked month
            // since we commit the the 'current date', if we select days from next/previous month,
            // the return link redirects to new month rather than the month user was viewing
            dayClicked() {
                this.$store.commit(SET_CURRENT_DAY_MUTATION,     this.day.date() );
                this.$store.commit(SET_CURRENT_MONTH_MUTATION,   this.day.month() );
                this.$store.commit(SET_CURRENT_YEAR_MUTATION,    this.day.year() );
            },
        },


        computed: {
            // TODO: same function in DayView; place function in utils
            eventsInDay() {

                let listOfEvents = this.$store.state.eventsInCalendar;

                return listOfEvents.filter((event) => {
                    return (this.day.isSameOrAfter(event.startTime, 'day')) &&
                           (this.day.isSameOrBefore(event.endTime,  'day'));
                });
            },

            monthViewDayStyles() {
                let isNotCurrentMonth = this.day.month() !== this.$store.state.selectedMonth;
                let isToday = this.day.isSame(this.$moment(), 'day');

                return {
                    'c-month-view-day':         true,
                    'c-month-view-day--muted':  isNotCurrentMonth,
                    'c-month-view-day--today':  isToday
                };
            },

            dayTimeStamp() {
                // TODO: can we place this function in utils module?
                // n.b. we offset month value by 1:
                return `${this.day.date()}-${this.day.month()+1}-${this.day.year()}`;
            }
        }

    }
</script>


<style lang="less" scoped>
    .c-month-view-day {
        width: 150px;
        height: 150px;
        border: 1px solid lightslategray;

        &&--muted {
            color: rgb(120,120,120);
            background: rgb(248, 248, 254);
        }

        &&--today {
            background: #faff9a;
        }
    }
</style>
