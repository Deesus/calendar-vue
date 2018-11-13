<template>
    <div class="c-day-view">
        <div class="c-day-view__heading">
            <div>{{ formattedFullDate }}</div>
            <router-link :to="{name: 'month-view' }">back to month view</router-link>
        </div>

        <ul>
            <li v-for="hour in hoursInDay" :key="hour.index" @click="hourClicked">
                {{ hour }}
            </li>
        </ul>

    </div>
</template>


<script>
    export default {
        name: 'CDayView',

        data() {
            return {
                // TODO: replace with a moment object where you can format the time in any way you want:
                hoursInDay: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                             12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                            .map((val, index) => {
                                if (index < 12) {
                                    return `${val}am`;
                                }
                                else {
                                    return `${val}pm`;
                                }
                            })
            }
        },

        methods: {
            // TODO: fill out click event: open modal, enter time
            hourClicked(event) {
                console.log(event);
            }
        },

        computed: {
            formattedFullDate() {
                return `${this.$store.state.selectedDay}/${this.$store.state.selectedMonth+1}/${this.$store.state.selectedYear}`;
            }
        }
    }
</script>


<style scoped>
    ul {
        list-style: none;
    }

    li {
        border-top: 1px solid silver;
        margin: 0;
        padding: 12px 0;
    }
</style>
