<template>
    <router-link :to="{ name: 'day-view', params: { timeStamp: dayTimeStamp } }">
        <div :class="monthViewDayStyles" @click="dayClicked">
            <div class="c-month-view-day__date-heading">
                <div :class="dateNumberStyle"><span>{{ day.date() }}</span></div>
            </div>
            <div class="event" v-for="event in eventsInDay" :key="event.id">{{ event.name }}</div>
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

                return {
                    'c-month-view-day':         true,
                    'c-month-view-day--muted':  isNotCurrentMonth,
                };
            },

            dayTimeStamp() {
                // TODO: can we place this function in utils module?
                // n.b. we offset month value by 1:
                return `${this.day.date()}-${this.day.month()+1}-${this.day.year()}`;
            },

            dateNumberStyle() {
                let isToday = this.day.isSame(this.$moment(), 'day');

                return {
                    'date-number':        true,
                    'date-number--today': isToday
                }
            }
        }

    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants.less";

    .c-month-view-day {
        width: 100%;
        height: 100%;
        background: white;
        padding: @calendar-cell-padding;

        &&--muted {
            background: @calendar-muted-bg-color;
        }

        &__date-heading {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 4px;
        }
    }

    .date-number {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        line-height: 1;

        &&--today {
            color: white;
            background: #1EAAFC;
            border-radius: 50%;
        }
    }

    /* TODO: how to make event tag take up full width of cell but also keep the cells evenly spaced? */
    .event {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
