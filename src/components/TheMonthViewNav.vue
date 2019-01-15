<template>
    <div class="c-nav">
        <chevron-left-icon class="icon icon--pointer icon--white icon--med" @click="handlePreviousMonthClick"/>

        <transition
                name="fade-slide"
                mode="out-in"
                :enter-active-class="cssClassesForHeaderTransitionEnter"
                :leave-active-class="cssClassesForHeaderTransitionLeave"
        >
            <h1 class="c-heading-text c-nav__heading-text" :key="navHeaderMonthText" >
                <span class="c-heading-text c-heading-text--month">{{ navHeaderMonthText }}</span>
                <span class="c-heading-text c-heading-text--year">{{ navHeaderYearText }}</span>
            </h1>
        </transition>

        <chevron-right-icon class="icon icon--pointer icon--white icon--med" @click="handleNextMonthClick"/>
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


        // ==================== data/state: ====================
        data() {
            return {
                headerTransitionDirection: ''
            };
        },


        // ==================== methods: ====================
        methods: {
            // TODO: can we replace `this.$store.state` and `this.$store.commit` with aliases?

            /**
             * Handle event: when 'previous month' button is clicked, change the selected month to the previous moth
             */
            handlePreviousMonthClick() {
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

            /**
             * Handle event: when 'next month' button is clicked, change selected month to the next month
             */
            handleNextMonthClick() {
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


        // ==================== computed:  ====================
        computed: {
            // TODO: replace with filter?
            /**
             * Get formatted selected month text
             *
             * @returns {String} formatted selected month
             */
            navHeaderMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('MMMM');
            },

            // TODO: replace with filter?
            /**
             * Get formatted selected year text
             *
             * @returns {String} formatted year text
             */
            navHeaderYearText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('YYYY');
            },

            /**
             * Dynamically computed css classes for transitions between header month text
             *
             * @returns {Object}: computed css classes object
             */
            cssClassesForHeaderTransitionEnter() {
                let transitionClasses = '';

                if (this.headerTransitionDirection === HEADER_TRANSITION_DIRECTION_NEXT_NAME) {
                    transitionClasses = 'fade-slide-in-left animate-200';
                }
                else if (this.headerTransitionDirection ===  HEADER_TRANSITION_DIRECTION_PREVIOUS_NAME) {
                    transitionClasses = 'fade-slide-in-right animate-200';
                }

                return transitionClasses;
            },

            /**
             * Dynamically computed css classes for transitions between header month text
             *
             * @returns {Object}: computed css classes object
             */
            cssClassesForHeaderTransitionLeave() {
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


<style lang="scss" scoped>
    @import "../styles/base/_constants";
    @import "../styles/blocks/_heading-text";
    @import "../styles/blocks/_icon";
    @import "../styles/utils/_animations";


    .c-nav {
        background: $accent-color-black;
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
