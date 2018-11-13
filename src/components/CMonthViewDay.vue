<template>
    <router-link :to="{ name: 'day-view', params: { timeStamp: dayTimeStamp } } ">
        <div :class="monthViewDayStyles" @click="dayClicked">
            {{ day.date() }}
        </div>
    </router-link>
</template>


<script>
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
                this.$store.commit('setCurrentDay',     this.day.date() );
                this.$store.commit('setCurrentMonth',   this.day.month() );
                this.$store.commit('setCurrentYear',    this.day.year() );
            },
        },


        computed: {
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
                // n.b. we offset month value by 1:
                return `${this.day.date()}-${this.day.month()+1}-${this.day.year()}`;
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
