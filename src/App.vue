<template>
    <div id="app">

        <!-- main layout (month view): -->
        <c-month-view></c-month-view>

        <!-- modals: -->
        <c-confirmation-modal v-if="shouldShowConfirmModal"
                              v-on:cancel-clicked="handleConfirmationModalCancelClick"
                              v-on:confirm-clicked="handleConfirmationModalDeleteClick"
                              message="Delete Event?" />

    </div>
</template>



<script>
    import CMonthView from './components/TheMonthView.vue';
    import CConfirmationModal from './components/CConfirmationModal.vue';
    import { REMOVE_EVENT_FROM_CALENDAR_MUTATION,
             SHOW_CONFIRM_MODAL_MUTATION
           } from './store/mutation-types';


    export default {
        name: 'App',


        components: {
            CConfirmationModal,
            CMonthView
        },


        // ==================== computed: ====================
        computed: {
            shouldShowConfirmModal() {
                return this.$store.state.shouldShowConfirmModal;
            }
        },


        // ==================== methods: ====================
        methods: {

            /**
             * Handle event: when user clicks the delete button on the confirmation modal, delete calendar event from store and close modal
             */
            handleConfirmationModalDeleteClick() {
                this.$store.commit(REMOVE_EVENT_FROM_CALENDAR_MUTATION, this.$store.state.selectedEventId);
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            },

            /**
             * Handle event: when user clicks the cancel button on the confirmation modal, just close the modal
             */
            handleConfirmationModalCancelClick() {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            }
        }
    }
</script>


<style lang="scss" scoped>
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
</style>
