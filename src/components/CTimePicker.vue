<template>
    <div class="c-time-picker"><!--
    --><input class="c-time-picker__input c-time-picker__input--hours" type="text" v-model="hoursInput" @blur="formattedHoursInput" name="hours" placeholder="--"><!--
    --><span class="c-time-picker__colon">:</span><!--
    --><input class="c-time-picker__input c-time-picker__input--minutes" type="text" v-model="minutesInput" @blur="formattedMinutesInput" name="minutes" placeholder="--"><!--
    --><span class="c-time-picker__meridiem" @click="toggleMeridiemClicked">{{ meridiemValue }}</span>
    </div>
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
            this.emitTimePickerData();
        }
    }
</script>


<style scoped>
    .c-time-picker {
        border: 1px solid rgb(200, 200, 230);
        border-radius: 3px;
        display: inline-block;
    }

    .c-time-picker__input {
        width: 25px;
        border: none;
        background: white;
        text-align: center;
    }

    .c-time-picker__meridiem {
        cursor: pointer;
    }
</style>
