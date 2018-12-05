<template>
    <div class="c-nav">

        <chevron-left-icon class="icon icon--pointer icon--white icon--med" @click="previousMonthHandler"/>
        <h1 class="c-heading-text c-nav__heading-text">
            <span class="c-heading-text c-heading-text--month">{{ navHeaderMonthText }}</span>
            <span class="c-heading-text c-heading-text--year">{{ navHeaderYearText }}</span>
        </h1>
        <chevron-right-icon class="icon icon--pointer icon--white icon--med" @click="nextMonthHandler"/>

    </div>
</template>


<script>
    import { DATE_ENUM } from '../appConstants';
    import { SET_CURRENT_MONTH_MUTATION, SET_CURRENT_YEAR_MUTATION } from '../store/mutation-types';
    import { ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons';


    export default {
        name: 'CNav',


        components: {
            ChevronLeftIcon,
            ChevronRightIcon
        },


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
    @import "../styles/base/_constants";
    @import "../styles/blocks/_heading-text";
    @import "../styles/blocks/_icon";


    .c-nav {
        background: @accent-color-black;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 12px;
        cursor: default;

        &__heading-text {
            width: 260px;
            text-align: center;
            line-height: 1;
        }
    }
</style>
