<template>
    <span class="c-time-picker"><!--
    --><input class="c-time-picker__input c-time-picker__input--hours" type="text" v-model="hoursInput" @blur="formattedHoursInput" name="hours" placeholder="--"><!--
    --><span class="c-time-picker__colon">:</span><!--
    --><input class="c-time-picker__input c-time-picker__input--minutes" type="text" v-model="minutesInput" @blur="formattedMinutesInput" name="minutes" placeholder="--"><!--
    --><span class="c-time-picker__meridiem" @click="toggleMeridiemClicked">{{ meridiemValue }}</span>
    </span>
</template>


<script>
    export default {
        name: 'CTimePicker',


        data() {
            return {
                // n.b. these are default time-picker values:
                hoursInput:     '12',
                minutesInput:   '00',
                meridiemValue:  'AM'
            };
        },


        methods: {
            emitTimePickerData() {
                this.$emit('timePickerUpdated', {
                    hoursInput:     this.hoursInput,
                    minutesInput:   this.minutesInput,
                    meridiemValue:  this.meridiemValue
                });
            },

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

            toggleMeridiemClicked() {
                if (this.meridiemValue === 'AM') {
                    this.meridiemValue = 'PM';
                }
                else {
                    this.meridiemValue = 'AM';
                }

                this.emitTimePickerData();
            }
        }, // /methods


        mounted() {
            // as soon as the component is mounted, it emits the default time-picker values to parent:
            this.emitTimePickerData();
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";

    .c-time-picker {
        display: inline-block;
        background: @input-bg-color;
        height: 44px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: @input-border-radius;

        & > * {
            height: 44px;
            padding: 0.95rem 0;
            color: @font-color-bold;
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
