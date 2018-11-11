<template>
    <div>
        <c-month-view></c-month-view>
    </div>
</template>



<script>
    import CMonthView from './components/CMonthView.vue';

    export default {
        name: 'App',

        data() {
            return {

            };
        },

        methods: {},

        components: {
            'c-month-view': CMonthView
        }
    }
</script>



<style scoped>

</style>
