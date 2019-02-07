<template>
    <li :class="cssClassesForEventListItem">
        <span class="c-event-list-item__start-time">{{ event.startTime.format('h:mma') }}</span>
        <span class="c-event-list-item__name">{{ event.name }}</span>
        <span class="c-event-list-item__close">
            <x-icon @click="handleDeleteEventClick(event.id)" class="icon icon--pointer icon--med"/>
        </span>
        <span class="c-event-list-item__notes">{{ event.notes }}</span>
    </li>
</template>


<script>
    import { XIcon } from 'vue-feather-icons';
    import { SELECT_EVENT_ID_MUTATION, SHOW_CONFIRM_MODAL_MUTATION } from '../store/typesMutation';
    import { LABEL_COLORS } from '../appConstants';


    export default {
        name: 'CEventListItem',


        components: {
            XIcon
        },


        // ==================== props: ====================
        props: {
            /**
             * The 'event' object
             */
            event: {
                required: true,
                type: Object
                // TODO: add validator property; check if `name`, `id`, and `starTime` are undefined
            }
        },


        // ==================== methods: ====================
        methods: {
            /**
             * Handle event: when users clicks delete event icon, delete the event from store
             */
            handleDeleteEventClick(id) {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, true);
                this.$store.commit(SELECT_EVENT_ID_MUTATION, id);
            }
        },


        // ==================== computed: ====================
        computed: {
            /**
             * Dynamically computed css classes for the component
             *
             * @returns {object}: computed css classes object
             */
            cssClassesForEventListItem() {
                return {
                    'c-event-list-item':         true,
                    'c-event-list-item--blue':   this.event.label === LABEL_COLORS.BLUE,
                    'c-event-list-item--green':  this.event.label === LABEL_COLORS.GREEN,
                    'c-event-list-item--purple': this.event.label === LABEL_COLORS.PURPLE,
                    'c-event-list-item--red':    this.event.label === LABEL_COLORS.RED,
                    'c-event-list-item--yellow': this.event.label === LABEL_COLORS.YELLOW
                }
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/_constants";
    @import "../styles/blocks/_icon";

    $event-list-item-color-tab-width: 5px;


    .c-event-list-item {
        border-left: $event-list-item-color-tab-width solid transparent;
        margin: 0;
        cursor: pointer;
        padding: $day-view-padding $day-view-padding $day-view-padding ($day-view-padding - $event-list-item-color-tab-width);
        display: grid;
        grid-template-columns: 80px 1fr 36px;
        grid-template-areas:
            "event-time event-name event-close"
            "event-time event-notes event-close";

        &:not(:first-child) {
            border-top: 1px solid $accent-color-medium-gray;
        }

        &:last-child {
            border-bottom: 1px solid $accent-color-medium-gray;
        }

        &--blue {
            border-left-color: $label-color-blue;
        }

        &--green {
            border-left-color: $label-color-green;
        }

        &--purple {
            border-left-color: $label-color-purple;
        }

        &--red {
            border-left-color: $label-color-red;
        }

        &--yellow {
            border-left-color: $label-color-yellow;
        }

        &__start-time {
            grid-area: event-time;
        }

        &__name {
            grid-area: event-name;
            flex-grow: 1;
            color: $font-color-bold;
        }

        &__close {
            grid-area: event-close;
            min-width: 36px;
            text-align: right;

            .icon {
                padding: 3px;   // added padding to increase tap target area
            }
        }

        &__notes {
            grid-area: event-notes;
            color: $font-color-muted;
        }
    }
</style>
