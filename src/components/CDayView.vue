<template>
    <div>
        {{ formattedFullDate }}
        <br>
        <router-link :to="{name: 'month-view' }">back to month view</router-link>
    </div>
</template>


<script>
    export default {
        name: 'CDayView',

        data() {
            return {};
        },

        props: ['day'],

        methods: {},

        computed: {
            formattedFullDate() {
                return `${this.$store.state.selectedDay}/${this.$store.state.selectedMonth+1}/${this.$store.state.selectedYear}`;
            }
        }
    }
</script>


<style scoped>

</style>
