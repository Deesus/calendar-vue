<template>
    <span :class="eventLabelStyles">{{ message }}</span>
</template>


<script>
    import { LABEL_COLORS } from "../appConstants";


    export default {
        name: 'CLabel',


        // ==================== props: ====================
        props: {
            /**
             * Background color of label
             *
             * Accepts: 'blue' || 'green' || 'purple' || 'red' || 'yellow'
             */
            color: {
                type: String,
                required: true
            },

            /**
             * Message/text that the label should display; n.b. labels cannot be empty
             */
            message: {
                type: String,
                required: true
            },

            /**
             * Determines if label should behave like a span (inline) or a div (block)
             *
             * Accepts: 'inline' || 'block'
             */
            blockLevel: {
                type: String,
                default: 'inline',
                required: false,
                validator(value) {
                    return ['inline', 'block'].indexOf(value) !== -1;
                }
            }
        },


        // ==================== computed: ====================
        computed: {
            /**
             * Dynamically computed css classes for the component
             *
             * @returns {Object}: computed css classes object
             */
            eventLabelStyles() {
                return {
                    'c-label': true,
                    'c-label--block':  this.blockLevel === 'block',
                    'c-label--inline': this.blockLevel === 'inline',
                    'c-label--blue':   this.color === LABEL_COLORS.BLUE,
                    'c-label--green':  this.color === LABEL_COLORS.GREEN,
                    'c-label--purple': this.color === LABEL_COLORS.PURPLE,
                    'c-label--red':    this.color === LABEL_COLORS.RED,
                    'c-label--yellow': this.color === LABEL_COLORS.YELLOW
                }
            }
        }

    }
</script>


<style scoped lang="scss">
    @import "../styles/base/_constants";


    .c-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 2px 4px;
        border-radius: 3px;
        color: $font-color-bold;
        font-size: 1.25rem;

        &--inline {
            display: inline-block;
        }

        &--block {
            display: block;
        }

        &--blue {
            background: $label-color-blue;
        }

        &--green {
            background: $label-color-green;
        }

        &--purple {
            background: $label-color-purple;
        }

        &--red {
            background: $label-color-red;
        }

        &--yellow {
            background: $label-color-yellow;
        }
    }
</style>
