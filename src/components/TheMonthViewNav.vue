<template>
    <div class="c-nav">
        <chevron-left-icon class="icon icon--pointer icon--white icon--med" @click="previousMonthHandler"/>

        <transition
                name="fade-slide"
                mode="out-in"
                :enter-active-class="headerTransitionEnterClasses"
                :leave-active-class="headerTransitionLeaveClasses"
        >
            <h1 class="c-heading-text c-nav__heading-text" :key="navHeaderMonthText" >
                <span class="c-heading-text c-heading-text--month">{{ navHeaderMonthText }}</span>
                <span class="c-heading-text c-heading-text--year">{{ navHeaderYearText }}</span>
            </h1>
        </transition>

        <chevron-right-icon class="icon icon--pointer icon--white icon--med" @click="nextMonthHandler"/>
    </div>
</template>


<script>
    import { DATE_ENUM } from '../appConstants';
    import { SET_CURRENT_MONTH_MUTATION, SET_CURRENT_YEAR_MUTATION } from '../store/mutation-types';
    import { ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons';

    const HEADER_TRANSITION_DIRECTION_NEXT_NAME = 'NEXT';
    const HEADER_TRANSITION_DIRECTION_PREVIOUS_NAME = 'PREVIOUS';


    export default {
        name: 'CNav',


        components: {
            ChevronLeftIcon,
            ChevronRightIcon
        },


        data() {
            return {
                headerTransitionDirection: ''
            };
        },


        methods: {
            // TODO: can we replace `this.$store.state` and `this.$store.commit` with aliases?

            previousMonthHandler() {
                // update state (for animation classes):
                this.headerTransitionDirection = HEADER_TRANSITION_DIRECTION_PREVIOUS_NAME;


                // update selected month and year:
                if (this.$store.state.selectedMonth === DATE_ENUM.JANUARY) {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, DATE_ENUM.DECEMBER);
                    this.$store.commit(SET_CURRENT_YEAR_MUTATION, this.$store.state.selectedYear - 1);
                }
                else {
                    this.$store.commit(SET_CURRENT_MONTH_MUTATION, this.$store.state.selectedMonth - 1);
                }
            },

            nextMonthHandler() {
                // update state (for animation classes):
                this.headerTransitionDirection = HEADER_TRANSITION_DIRECTION_NEXT_NAME;


                // update selected month and year:
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
            },

            headerTransitionEnterClasses() {
                let transitionClasses = '';

                if (this.headerTransitionDirection === HEADER_TRANSITION_DIRECTION_NEXT_NAME) {
                    transitionClasses = 'fade-slide-in-left animate-200';
                }
                else if (this.headerTransitionDirection ===  HEADER_TRANSITION_DIRECTION_PREVIOUS_NAME) {
                    transitionClasses = 'fade-slide-in-right animate-200';
                }

                return transitionClasses;
            },

            headerTransitionLeaveClasses() {
                let transitionClasses = '';

                if (this.headerTransitionDirection === HEADER_TRANSITION_DIRECTION_PREVIOUS_NAME) {
                    transitionClasses = 'fade-slide-out-left animate-200';
                }
                else if (this.headerTransitionDirection === HEADER_TRANSITION_DIRECTION_NEXT_NAME) {
                    transitionClasses = 'fade-slide-out-right animate-200';
                }

                return transitionClasses;
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";
    @import "../styles/blocks/_heading-text";
    @import "../styles/blocks/_icon";
    @import "../styles/utils/_animations";


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
