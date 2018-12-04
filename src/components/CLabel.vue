<template>
    <span :class="eventLabelStyles">{{ message }}</span>
</template>


<script>
    import { LABEL_COLORS } from "../appConstants";


    export default {
        name: 'CLabel',


        props: {
            color: {
                type: String
            },

            message: {
                type: String,
                required: true
            }
        },


        data() {
            return {};
        },


        computed: {
            eventLabelStyles() {
                return {
                    'c-label': true,
                    'c-label--blue':   this.color === LABEL_COLORS.BLUE,
                    'c-label--green':  this.color === LABEL_COLORS.GREEN,
                    'c-label--purple': this.color === LABEL_COLORS.PURPLE,
                    'c-label--yellow': this.color === LABEL_COLORS.YELLOW
                }
            }
        }
    }
</script>


<style scoped lang="less">
    @import "../styles/base/_constants";

    .c-label {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 2px 4px;
        border-radius: 3px;
        color: @font-color-bold;
        font-size: 1.25rem;

        &&--blue {
            background: @label-color-blue;
        }

        &&--green {
            background: @label-color-green;
        }

        &&--purple {
            background: @label-color-purple;
        }

        &&--yellow {
            background: @label-color-yellow;
        }
    }
</style>
