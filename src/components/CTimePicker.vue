<template>
    <span class="c-time-picker"><!--
    --><input class="c-time-picker__input c-time-picker__input--hours" type="text" v-model="hoursInput" @blur="formattedHoursInput" name="hours" placeholder="--"><!--
    --><span class="c-time-picker__colon">:</span><!--
    --><input class="c-time-picker__input c-time-picker__input--minutes" type="text" v-model="minutesInput" @blur="formattedMinutesInput" name="minutes" placeholder="--"><!--
    --><span class="c-time-picker__meridiem" @click="handleToggleMeridiemClick">{{ meridiemValue }}</span>
    </span>
</template>


<script>
    export default {
        name: 'CTimePicker',


        props: {
            /**
             * Moment object of the event's start time, if supplied
             */
            eventStartTime: {
                type: Object,
                required: false
            }
        },


        // ==================== data/state: ====================
        data() {
            return {
                // n.b. these are default time-picker values:
                hoursInput:     this.eventStartTime.hours       || '12',
                minutesInput:   this.eventStartTime.minutes     || '00',
                meridiemValue:  this.eventStartTime.meridiem    || 'AM'
            };
        },


        // ==================== methods: ====================
        methods: {
            /**
             * Helper method for emitting to parent component
             */
            emitTimePickerData() {
                this.$emit('timePickerUpdated', {
                    hoursInput:     this.hoursInput,
                    minutesInput:   this.minutesInput,
                    meridiemValue:  this.meridiemValue
                });
            },

            // TODO: can we change formatted input methods into filters?
            /**
             * Format component's hour input value to fit within range of hours
             */
            formattedHoursInput() {
                let inputValue = parseInt(this.hoursInput, 10);

                // if invalid number, blank the field:
                if ((typeof inputValue !== 'number') || isNaN(inputValue)) {
                    this.hoursInput = '';
                }
                else if (inputValue < 1 || inputValue > 12) {
                    this.hoursInput = 12;
                }
                else if (inputValue >= 1 && inputValue <= 9) {
                    this.hoursInput = `0${inputValue}`;
                }
                else {
                    this.hoursInput = inputValue;
                }

                this.emitTimePickerData();
            },

            /**
             * Format component's minute input value to fit within range of minutes
             */
            formattedMinutesInput() {
                let inputValue = parseInt(this.minutesInput, 10);

                // if invalid number, blank the field:
                if ((typeof inputValue !== 'number') || isNaN(inputValue)) {
                    this.minutesInput = '';
                }
                else if (inputValue >=1 && inputValue <= 9) {
                    this.minutesInput = `0${inputValue}`;
                }
                else if (inputValue <= 0 || inputValue > 59) {
                    this.minutesInput = '00';
                }
                else {
                    this.minutesInput = inputValue;
                }

                this.emitTimePickerData();
            },

            /**
             * Handle event: when user clicks the meridiem label, toggle state from AM/PM
             */
            handleToggleMeridiemClick() {
                if (this.meridiemValue === 'AM') {
                    this.meridiemValue = 'PM';
                }
                else {
                    this.meridiemValue = 'AM';
                }

                this.emitTimePickerData();
            }
        }, // /methods


        // ==================== life cycle hooks: ====================
        mounted() {
            // as soon as the component is mounted, ensure the date is formatted (if existing event),
            // then emit the default time-picker values to parent:
            this.formattedMinutesInput();
            this.emitTimePickerData();
        }
    }
</script>


<style lang="scss" scoped>
    @import "../styles/base/_constants";


    .c-time-picker {
        display: inline-block;
        background: $input-bg-color;
        height: 44px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: $input-border-radius;

        & > * {
            height: 44px;
            padding: 0.95rem 0;
            color: $font-color-bold;
            background: transparent;
        }

        &__input {
            display: inline-block;
            width: 24px;
            border: none;
            text-align: center;
        }

        &__meridiem {
            display: inline-block;
            width: 26px;
            cursor: pointer;
        }
    }
</style>
