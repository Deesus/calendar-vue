<template>
    <div>
        <div class="c-day-view">

            <!-- ---------- header: ---------- -->
            <div class="c-day-view__header c-day-header"><!--
                --><router-link class="c-day-header__return-link"
                                :to="{ path: '/' }"
                                @click.native="returnToMonthViewLinkClicked"><!--
                    --><chevron-left-icon class="icon icon--pointer icon--x-lg"/><!--
                --></router-link>
                <div class="c-day-header-text c-day-header__text">
                    <div class="c-day-header-text c-day-header-text__primary">{{ getDayOfWeekAndMonthText }}</div>
                    <div class="c-day-header-text__auxiliary">
                        <div class="c-day-header-text c-day-header-text--bold">{{ getFullMonthText }}</div>
                        <div class="c-day-header-text c-day-header-text--muted">{{ getFullYearText }}</div>
                    </div>
                </div>
                <span class="c-day-header__action">
                    <span v-if="!shouldShowEventControls">
                        <plus-icon class="icon icon--pointer icon--med" @click="toggleShowEventControlsClicked"/>
                    </span>
                    <span v-else>
                        <a @click="addEventSubmitted" :class="addEventLinkStyles">Add</a>
                    </span>
                </span>
            </div>

            <!-- ---------- add event: ---------- -->
            <form class="c-add-event c-day-view__add-event" v-if="shouldShowEventControls">
                <input id="addEventNameElementId"
                       class="c-add-event__field c-add-event__field--input"
                       :name="addEventNameElementId"
                       v-model.trim="newEventName"
                       maxlength="100"
                       placeholder="Name"
                       type="text">

                <label class="c-add-event__label">Starts</label>
                <div class="c-add-event__field c-add-event__field--time-picker">
                    <c-time-picker v-on:timePickerUpdated="updateStartTimeData"/>
                </div>

                <textarea :id="addEventNotesElementId"
                          class="c-add-event__field c-add-event__field--textarea"
                          :name="addEventNotesElementId"
                          v-model.trim="newEventNotes"
                          maxlength="2000"
                          placeholder="Notes"></textarea>
            </form>

            <!-- ---------- list of events: ---------- -->
            <ul class="c-day-view__event-list">
                <c-event-list-item v-for="event in eventsInDay"
                                   :key="event.id"
                                   :event="event" />
                <li v-if="eventsInDay.length === 0" class="no-events">
                    no events
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    import { createMomentObjectFromYearMonthDayHoursMinutesMeridiem, createUniqueId, randomSample } from '../utils/utils';
    import { LABEL_COLORS, KEY_CODES } from '../appConstants';
    import { ADD_EVENT_TO_CALENDAR_MUTATION, SHOW_MONTH_VIEW_BG_OVERLAY } from '../store/mutation-types';
    import CTimePicker from './CTimePicker.vue';
    import CEventListItem from './CEventListItem.vue';
    import { PlusIcon, XIcon, ChevronLeftIcon } from 'vue-feather-icons';


    export default {
        name: 'CDayView',


        components: {
            CEventListItem,
            CTimePicker,
            PlusIcon,
            XIcon,
            ChevronLeftIcon
        },


        data() {
            return {
                addEventNameElementId:  'add-event-name',
                addEventNotesElementId: 'add-notes-textarea',

                newEventLabel: '',
                newEventName: '',
                newEventNotes: '',

                // n.b. default values get updated as soon as the time-picker component has mounted:
                newEventStartTime: {
                    hours:      null,
                    minutes:    null,
                    meridiem:   null
                },
                shouldShowEventControls: false
            }
        },


        methods: {
            // when time-picker updates its internal state (e.g. onblur), we update the CDayView's data:
            updateStartTimeData(payload) {
                this.newEventStartTime.hours    = payload.hoursInput;
                this.newEventStartTime.minutes  = payload.minutesInput;
                this.newEventStartTime.meridiem = payload.meridiemValue;
            },

            addEventSubmitted() {
                // check if form fields are valid:
                if (this.isFormValid === false) {
                    return;
                }

                let momentObj = createMomentObjectFromYearMonthDayHoursMinutesMeridiem(this.$store.state.selectedYear,
                                                                                       this.$store.state.selectedMonth,
                                                                                       this.$store.state.selectedDay,
                                                                                       this.newEventStartTime.hours,
                                                                                       this.newEventStartTime.minutes,
                                                                                       this.newEventStartTime.meridiem);

                // TODO: should change from mutation to action:
                this.$store.commit(ADD_EVENT_TO_CALENDAR_MUTATION, {
                    id:         createUniqueId(),
                    name:       this.newEventName,
                    startTime:  momentObj,
                    endTime:    momentObj,
                    notes:      this.newEventNotes,
                    label:      randomSample(Object.keys(LABEL_COLORS))     // TODO: replace random label color with ability to pick color
                });

                // after successful store commit, reset fields:
                this.newEventName = '';
                this.newEventNotes = '';
            },

            toggleShowEventControlsClicked() {
                // n.b. once we show the 'add event' controls, it is always shown until user leaves day-view:
                this.shouldShowEventControls = true;
            },

            returnToMonthViewLinkClicked() {
                // n.b. this is a placeholder in case we need to extend the functionality of the component
            }
        },


        computed: {
            /**
             * Filters the Vuex store's event list for only the events in the selected day
             *
             * @returns {Array}: list of events on the selected date
             */
            eventsInDay() {
                let listOfEvents = this.$store.state.eventsInCalendar;
                let selectedDate = this.$store.getters.getMomentObjectFromSelectedDate;

                return listOfEvents.filter((event) => {
                    return (selectedDate.isSameOrAfter(event.startTime, 'day')) &&
                           (selectedDate.isSameOrBefore(event.endTime,  'day'));
                });
            },

            isFormValid() {
                let validationErrors = [];

                // check various form fields:
                // n.b. right now, this error list doesn't do much; but we'll need it if we want to extend the validation (e.g. add error styles to inputs):
                if (this.newEventName === '') {
                    validationErrors.push(this.addEventNameElementId);
                }

                // form is valid if # of errors is zero:
                return validationErrors.length === 0;
            },

            addEventLinkStyles() {
                return {
                    'c-link':            true,
                    'c-link--highlight': this.isFormValid === true,
                    'c-link--disabled':  this.isFormValid === false
                };
            },

            getFullMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('MMMM');
            },

            getFullYearText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('YYYY');
            },

            getDayOfWeekAndMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('dd D');
            }
        }, // /computed


        mounted() {
            // when component is mounted, show the bg overlay:
            {
                this.$store.commit(SHOW_MONTH_VIEW_BG_OVERLAY, true);
            }

            // when 'escape' key is pressed, close and return to month view:
            {
                // normal HTML tags don't dispatch global keypress events <https://github.com/vuejs/vue/issues/1250#issuecomment-137492490>
                window.addEventListener('keydown', (event) => {
                    if (event.keyCode === KEY_CODES.ESCAPE) {
                        this.$router.push('/');
                    }
                });
            }

        },


        destroyed() {
            // when component is destroyed, hide the bg overlay:
            this.$store.commit(SHOW_MONTH_VIEW_BG_OVERLAY, false);
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";
    @import "../styles/blocks/_icon";
    @import (reference) "../styles/mixins/_mixins";


    .c-day-view {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 220;
        background: white;
        margin: 0;
        width: 600px;
        max-width: 100%;
        border-radius: @day-view-border-radius;
        border: 1px solid @accent-color-medium-gray;
        min-height: 200px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);

        &__header {
            padding: @day-view-padding;
        }

        &__add-event {
            padding: 0 @day-view-padding @day-view-padding @day-view-padding;
            background: @day-view-header-bg-color;

            & > * {
                display: inline-block;
                &:not(:first-child) {
                    margin-top: 12px;
                }
            }
        }

        &__event-list {
            border-top: 1px solid @accent-color-medium-gray;
        }
    }

    .c-add-event {
        display: grid;
        grid-template-columns: 85px 1fr;

        &__field {
            &&--time-picker {
                grid-column: ~"2/3";
            }

            &&--input {
                grid-column: ~"1/3";
                &:extend(.c-mixin-field all);
                height: 44px;
            }

            &&--textarea {
                grid-column: ~"1/3";
                &:extend(.c-mixin-field all);
                resize: none;
                height:72px;
            }
        }

        &__label {
            padding-left: 8px;
            padding-top: 10px;
            grid-column: ~"1/2";
        }
    }

    .c-day-header-text {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;


        &&--bold {
            font-weight: bold;
            color: @font-color-bold;
        }

        &__primary {
            font-size: 3.1rem;
        }

        &__auxiliary {
            padding: 0 12px;
            font-size: 1.6rem;
            line-height: 1;
        }
    }

    .c-day-header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background: @day-view-header-bg-color;
        border-top-left-radius: @day-view-border-radius;
        border-top-right-radius: @day-view-border-radius;

        &__return-link {
            display: flex;
            align-items: center;

            & > svg {
                margin-left: -12px;
                width: auto;
                height:48px;
                color: @accent-color-medium-gray;

                &:hover {
                    color: @accent-color-dark-gray;
                }
            }
        }

        &__action {
            flex-grow: 1;
            text-align: right;
        }
    }

    .no-events {
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child,
        &:last-child {
            border-bottom: 0;
        }
    }

    .c-link {
        text-decoration: none;
        color: @font-color-default;
        cursor: pointer;

        &:hover,
        &:active {
            color: @font-color-default;
        }

        &&--highlight {
            color: @accent-color-red;
        }

        &&--disabled {
            pointer-events: none;
            color: @font-color-muted;
        }
    }
</style>
