<template>
    <div class="c-day-view">

        <!-- ---------- header: ---------- -->
        <div class="c-day-view__header c-day-header">
            <router-link class="c-day-header__return-lnk" :to="{name: 'month-view' }" @click.native="returnToMonthViewLinkClicked"><chevron-left-icon class="icon cursor-pointer"></chevron-left-icon></router-link>
            <div>
                <div class="c-day-header__text c-day-header__text c-day-header__text--month">{{ getFullMonthText }}</div>
                <div class="c-day-header__text c-day-header__text c-day-header__text--year">{{ getFullYearText }}</div>
            </div>
            <span class="c-day-header__action">
                <span v-if="!shouldShowEventControls">
                    <plus-icon class="cursor-pointer" @click="toggleShowEventControlsClicked"></plus-icon>
                </span>
                <span v-else>
                    <button type="button" @click="addEventSubmitted" :disabled="isFormValid === false">Add</button>
                </span>
            </span>
        </div>

        <!-- ---------- add event: ---------- -->
        <form class="c-day-view__add-event" v-if="shouldShowEventControls">
            <label><input id="addEventNameElementId" class="c-input" maxlength="100" placeholder="Name" :name="addEventNameElementId" type="text" v-model.trim="newEventName"></label>

            <div>
                <label>Starts</label>
                <c-time-picker v-on:timePickerUpdated="updateStartTimeData"></c-time-picker>
            </div>

            <label><textarea :id="addEventNotesElementId" class="c-textarea" maxlength="2000" placeholder="Notes" :name="addEventNotesElementId" v-model.trim="newEventNotes"></textarea></label>
        </form>

        <!-- ---------- list of events: ---------- -->
        <ul class="c-day-view__event-list">
            <li class="c-event" v-for="event in eventsInDay" :key="event.id">
                <div class="c-event__info c-event-info">
                    <span class="c-event-info__start-time">{{ event.startTime.format('h:mma') }}</span>
                    <span class="c-event-info__name">{{ event.name }}</span>
                    <span class="c-event-info__close"><x-icon class="cursor-pointer" @click="deleteEventClicked(event.id)"></x-icon></span>
                </div>
                <div class="c-event__notes">
                    {{ event.notes }}
                </div>
            </li>
        </ul>

    </div>
</template>


<script>
    import { createMomentObjectFromYearMonthDayHoursMinutesMeridiem,
             createUniqueId
           } from '../utils/utils';
    import { ADD_EVENT_TO_CALENDAR_MUTATION,
             SELECT_EVENT_ID_MUTATION,
             SHOW_CONFIRM_MODAL_MUTATION
           } from '../store/mutation-types';
    import CTimePicker from './CTimePicker.vue';
    import { PlusIcon, XIcon, ChevronLeftIcon } from 'vue-feather-icons';


    export default {
        name: 'CDayView',


        components: {
            CTimePicker,
            PlusIcon,
            XIcon,
            ChevronLeftIcon
        },


        data() {
            return {
                addEventNameElementId:  'add-event-name',
                addEventNotesElementId: 'add-notes-textarea',

                // TODO: replace dummy event name, and event label:
                newEventLabel: 'yellow',
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
                    label:      this.newEventLabel
                });
            },

            toggleShowEventControlsClicked() {
                // n.b. once we show the 'add event' controls, it is always shown until user leaves day-view:
                this.shouldShowEventControls = true;
            },

            returnToMonthViewLinkClicked() {
                // n.b. this is a placeholder in case we need to extend the functionality of the component
            },

            deleteEventClicked(id) {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, true);
                this.$store.commit(SELECT_EVENT_ID_MUTATION, id);
            },
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

            getFullMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('MMMM');
            },

            getFullYearText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('YYYY');
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";

    @day-view-border-radius: 4px;
    @day-view-padding: 16px;


    .c-day-view {
        background: white;
        margin: 24px auto;
        width: 600px;
        max-width: 100%;
        border-radius: @day-view-border-radius;
        border: 1px solid @accent-color-medium-gray;
        min-height: calc(~"100vh - 48px");

        &__header {
            padding: @day-view-padding;
        }

        &__add-event {
            padding: 0 @day-view-padding @day-view-padding @day-view-padding;
            display: flex;
            flex-direction: column;

            & > * {
                display: inline-block;
                &:not(:first-child) {
                    margin-top: 12px;
                }
            }
        }

        &__event-list {
        }
    }

    .c-day-header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        &__text--month {
            color: @font-color-bold;
            font-size: 2.4rem;
            line-height: 1;
        }

        &__text--year {
            color: @accent-color-red;
            font-size: 3.6rem;
            font-weight: bold;
            line-height: 1;
        }

        &__action {
            flex-grow: 1;
            text-align: right;
        }
    }

    .c-event {
        border-top: 1px solid @accent-color-medium-gray;
        margin: 0;
        padding: @day-view-padding;

        &:last-child {
            border-bottom: 1px solid @accent-color-medium-gray;
        }

        &__info {
            display: flex;
        }
    }

    .c-event-info {
        &__start-time {
            min-width: 80px;
        }

        &__name {
            flex-grow: 1;
        }

        &__close {
            min-width: 36px;
            text-align: right;
        }
    }
</style>
