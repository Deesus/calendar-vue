<template>
    <div class="c-nav">
        <h1 class="c-nav-header">
            <span class="c-nav-header__month">{{ navHeaderMonthText }}</span>
            <span class="c-nav-header__year">{{ navHeaderYearText }}</span>
        </h1>
        <div class="c-month-view__controls">
            <button @click="previousMonthHandler" type="button">&lt;</button>
            <button @click="nextMonthHandler" type="button">&gt;</button>
        </div>
    </div>

</template>


<script>
    import { DATE_ENUM } from '../appConstants';
    import { SET_CURRENT_MONTH_MUTATION, SET_CURRENT_YEAR_MUTATION } from '../store/mutation-types';

    export default {
        name: 'CNav',

        data() {
            return {};
        },

        methods: {
            // TODO: can we replace `this.$store.state` and `this.$store.commit` with aliases?

            previousMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.JANUARY) {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, DATE_ENUM.DECEMBER);
                    this.$store.commit(SET_CURRENT_YEAR_MUTATION, this.$store.state.selectedYear - 1);
                }
                else {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, this.$store.state.selectedMonth - 1);
                }
            },

            nextMonthHandler() {
                if (this.$store.state.selectedMonth === DATE_ENUM.DECEMBER) {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, DATE_ENUM.JANUARY);
                    this.$store.commit(SET_CURRENT_YEAR_MUTATION, this.$store.state.selectedYear + 1);
                }
                else {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, this.$store.state.selectedMonth + 1);
                }
            }
        },

        computed: {
            navHeaderMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('MMMM');
            },

            navHeaderYearText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('YYYY');
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants.less";

    .c-nav {
        width: 100%;
        padding: @page-top-padding 20px 20px 20px;
    }

    .c-nav-header__month {
        color: @font-color-default;
    }

    .c-nav-header__year {
        color: @accent-color-red;
    }
</style>
