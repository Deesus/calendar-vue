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
    import { mapState } from 'vuex';
    import CMonthView from './components/TheMonthView.vue';
    import CConfirmationModal from './components/CConfirmationModal.vue';
    import * as MUTATION from './store/typesMutations';
    import * as ACTION from './store/typesActions';


    export default {
        name: 'App',


        components: {
            CConfirmationModal,
            CMonthView
        },


        computed: {
            ...mapState([
                'fbInstance',
                'shouldShowConfirmModal',
                'selectedEventId'
            ])
        },


        methods: {
            /**
             * Handle event: when user clicks the delete button on the confirmation modal, delete calendar event from store and close modal
             */
            handleConfirmationModalDeleteClick() {
                this.$store.dispatch(ACTION.DELETE_EVENT, this.selectedEventId);
                this.$store.commit(MUTATION.SHOW_CONFIRM_MODAL, false);
            },

            /**
             * Handle event: when user clicks the cancel button on the confirmation modal, just close the modal
             */
            handleConfirmationModalCancelClick() {
                this.$store.commit(MUTATION.SHOW_CONFIRM_MODAL, false);
            }
        },


        // -------------------- life cycle hooks: --------------------
        mounted() {
            // fetch 'events in calendar' data:

            // we can't have more than one connection Firebase's server;
            // thus, only fetch data if a Firebase instance doesn't already exist:
            if (!this.fbInstance) {
                this.$store
                    // establish Firebase connection:
                    .dispatch(ACTION.INSTANTIATE_FIREBASE)

                    // get initial data:
                    .then( () => {
                        this.$store.dispatch(ACTION.GET_INITIAL_DATA);
                    });
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
