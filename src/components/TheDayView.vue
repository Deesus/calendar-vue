<template>
    <div class="c-day-view">

        <!-- ---------- header: ---------- -->
        <div class="c-day-view__header c-day-header"><!--
            --><router-link class="c-day-header__return-link"
                            :to="{ path: '/' }"><!--
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
                    <plus-icon class="icon icon--pointer icon--med" @click="handleShowEventFormFieldsClick"/>
                </span>
                <span v-else>
                    <a @click="handleSaveEventClick" :class="cssClassesForSaveEventLink">Save</a>
                </span>
            </span>
        </div>

        <!-- ---------- add event: ---------- -->
        <form class="c-event-add c-day-view__add-event" v-if="shouldShowEventControls">
            <input id="addEventNameElementId"
                   class="c-event-add__field c-event-add__field--input"
                   :name="addEventNameElementId"
                   v-model.trim="calendarEventName"
                   maxlength="100"
                   placeholder="Name"
                   type="text">

            <label class="c-event-add__label">Starts</label>
            <div class="c-event-add__field c-event-add__field--time-picker">
                <c-time-picker v-on:timePickerUpdated="handleStartTimeDataUpdated" :eventStartTime="calendarEventStartTime" />
            </div>

            <textarea :id="addEventNotesElementId"
                      class="c-event-add__field c-event-add__field--textarea"
                      :name="addEventNotesElementId"
                      v-model.trim="calendarEventNotes"
                      maxlength="2000"
                      placeholder="Notes"></textarea>
        </form>

        <!-- ---------- list of events: ---------- -->
        <ul class="c-day-view__event-list">
            <c-event-list-item v-for="event in eventsInDay"
                               :key="event.id"
                               :event="event"
                               @click.native="handleExistingEventItemClick(event)"/>
            <li v-if="eventsInDay.length === 0" class="no-events">
                no events
            </li>
        </ul>
    </div>
</template>



<script>
    import { PlusIcon, XIcon, ChevronLeftIcon } from 'vue-feather-icons';
    import { mapGetters } from 'vuex';
    import { createISOStringFromYearMonthDayHoursMinutesMeridiem,
             getHoursMinutesMeridiumFromISO,
             createUniqueId,
             randomSample
           } from '../utils/utils';
    import { LABEL_COLORS, KEY_CODES } from '../appConstants';
    import * as MUTATION from '../store/typesMutations';
    import * as ACTION from '../store/typesActions';
    import CTimePicker from './CTimePicker.vue';
    import CEventListItem from './CEventListItem.vue';



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

                calendarEventLabel: '',
                calendarEventName:  '',
                calendarEventNotes: '',
                calendarEventId:    null,

                // n.b. default values get updated as soon as the time-picker component has mounted:
                calendarEventStartTime: {
                    hours:      null,
                    minutes:    null,
                    meridiem:   null
                },
                shouldShowEventControls: false
            }
        },


        methods: {
            // when time-picker updates its internal state (e.g. onblur), we update the CDayView's data:
            /**
             * Handle event: when child emits event; update component's state when child component's state is updated (e.g. onblur)
             *
             * @param payload {Object}: object with values for hours, minutes and meridiem values
             */
            handleStartTimeDataUpdated(payload) {
                this.calendarEventStartTime.hours    = payload.hoursInput;
                this.calendarEventStartTime.minutes  = payload.minutesInput;
                this.calendarEventStartTime.meridiem = payload.meridiemValue;
            },

            /**
             * Handle event: when user clicks save event, save event to store
             * This method handles saving both new events as well as saving an edited event.
             */
            handleSaveEventClick() {
                // check if form fields are valid:
                if (this.isFormValid === false) {
                    return;
                }

                let isoString = createISOStringFromYearMonthDayHoursMinutesMeridiem(this.$store.state.selectedYear,
                                                                                    this.$store.state.selectedMonth,
                                                                                    this.$store.state.selectedDay,
                                                                                    this.calendarEventStartTime.hours,
                                                                                    this.calendarEventStartTime.minutes,
                                                                                    this.calendarEventStartTime.meridiem);

                if (this.calendarEventId === null) {
                    // TODO: should change from mutation to action:
                    this.$store.dispatch(ACTION.ADD_EVENT, {
                        id:         createUniqueId(),
                        name:       this.calendarEventName,
                        startTime:  isoString,
                        endTime:    isoString,
                        notes:      this.calendarEventNotes,
                        labelColor: randomSample(Object.values(LABEL_COLORS))     // TODO: replace random label color with ability to pick color
                    });
                }
                // ---------- if editing an existing event (`calendarEventId` will not be null): ----------
                else {
                    // this is the same as 'add event,' except the event id and label are already given, plus we're calling to EDIT_EVENT_IN_CALENDAR:
                    this.$store.dispatch(ACTION.EDIT_EVENT, {
                        id:         this.calendarEventId,
                        name:       this.calendarEventName,
                        startTime:  isoString,
                        endTime:    isoString,
                        notes:      this.calendarEventNotes,
                        labelColor: this.calendarEventLabel
                    });
                }

                // ---------- after successful store commit, reset fields: ----------
                this.calendarEventName  = '';
                this.calendarEventNotes = '';
                this.calendarEventId    = null;
            },

            /**
             * Handle event: when user clicks to add an event, the event's form fields are shown
             */
            handleShowEventFormFieldsClick() {
                // n.b. once we show the 'add event' controls, it is always shown until user leaves day-view:
                this.shouldShowEventControls = true;
            },

            /**
             * Handle event: when user clicks existing event item, set state to selected calendar event
             *
             * @param calendarEvent {Object}: a calendar event
             */
            handleExistingEventItemClick(calendarEvent) {
                this.shouldShowEventControls = true;

                // convert ISO date-time value to moment object, then we can query hours, minutes, meridiem:
                const momentEventStartTime = getHoursMinutesMeridiumFromISO(calendarEvent.startTime);

                this.calendarEventLabel              = calendarEvent.labelColor;
                this.calendarEventName               = calendarEvent.name;
                this.calendarEventNotes              = calendarEvent.notes;
                this.calendarEventId                 = calendarEvent.id;
                this.calendarEventStartTime.hours    = momentEventStartTime.hours;
                this.calendarEventStartTime.minutes  = momentEventStartTime.minutes;
                this.calendarEventStartTime.meridiem = momentEventStartTime.meridiem;
            }
        },


        computed: {
            ...mapGetters([
                'eventsInDay',
                'getFullMonthText',
                'getFullYearText',
                'getDayOfWeekAndMonthText'
            ]),

            /**
             * Validates the input fields in the component
             *
             * @returns {boolean}: true if form is valid; false if errors/invalid
             */
            isFormValid() {
                let validationErrors = [];

                // check various form fields:
                // n.b. right now, this error list doesn't do much; but we'll need it if we want to extend the validation (e.g. add error styles to inputs):
                if (this.calendarEventName === '') {
                    validationErrors.push(this.addEventNameElementId);
                }

                // form is valid if # of errors is zero:
                return validationErrors.length === 0;
            },

            /**
             * Dynamically computed css classes for the 'save event' link
             *
             * @returns {Object}: computed css classes object
             */
            cssClassesForSaveEventLink() {
                return {
                    'c-link':            true,
                    'c-link--highlight': this.isFormValid === true,
                    'c-link--disabled':  this.isFormValid === false
                };
            }
        }, // /computed


        // -------------------- life cycle hooks: --------------------
        mounted() {
            // when component is mounted, show the bg overlay:
            {
                this.$store.commit(MUTATION.SHOW_MONTH_VIEW_BG_OVERLAY, true);
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
            this.$store.commit(MUTATION.SHOW_MONTH_VIEW_BG_OVERLAY, false);
        }
    }
</script>



<style lang="scss" scoped>
    @import "../styles/base/constants";
    @import "../styles/blocks/icon";
    @import "../styles/mixins/mixins";


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
        border-radius: $day-view-border-radius;
        border: 1px solid $accent-color-medium-gray;
        min-height: 200px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);

        &__header {
            padding: $day-view-padding;
        }

        &__add-event {
            padding: 0 $day-view-padding $day-view-padding $day-view-padding;
            background: $day-view-header-bg-color;

            & > * {
                display: inline-block;
                &:not(:first-child) {
                    margin-top: 12px;
                }
            }
        }

        &__event-list {
            border-top: 1px solid $accent-color-medium-gray;
        }
    }

    .c-event-add {
        display: grid;
        grid-template-columns: 85px 1fr;

        &__field {
            &--time-picker {
                grid-column: 2/3;
            }

            &--input {
                grid-column: 1/3;
                @include mixin-input-field();
                height: 44px;
            }

            &--textarea {
                grid-column: 1/3;
                @include mixin-input-field();
                resize: none;
                height:72px;
            }
        }

        &__label {
            padding-left: 8px;
            padding-top: 10px;
            grid-column: 1/2;
        }
    }

    .c-day-header-text {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;


        &--bold {
            font-weight: bold;
            color: $font-color-bold;
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
        background: $day-view-header-bg-color;
        border-top-left-radius: $day-view-border-radius;
        border-top-right-radius: $day-view-border-radius;

        &__return-link {
            display: flex;
            align-items: center;

            & > svg {
                margin-left: -12px;
                width: auto;
                height:48px;
                color: $accent-color-medium-gray;

                &:hover {
                    color: $accent-color-dark-gray;
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
        color: $font-color-default;
        cursor: pointer;

        &:hover,
        &:active {
            color: $font-color-default;
        }

        &--highlight {
            color: $accent-color-red;
        }

        &--disabled {
            pointer-events: none;
            color: $font-color-muted;
        }
    }
</style>
