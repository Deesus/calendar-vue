<template>
    <div id="app">

        <!-- main layout (month view): -->
        <c-month-view></c-month-view>

        <!-- modals: -->
        <c-confirmation-modal v-if="shouldShowConfirmModal"
                              v-on:cancel-clicked="onCancelClicked"
                              v-on:confirm-clicked="onDeleteClicked"
                              message="Delete Event?" />

    </div>
</template>



<script>
    import CMonthView from './components/CMonthView.vue';
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


        data() {
            return {};
        },


        computed: {
            shouldShowConfirmModal() {
                return this.$store.state.shouldShowConfirmModal;
            }
        },


        methods: {
            onDeleteClicked() {
                this.$store.commit(REMOVE_EVENT_FROM_CALENDAR_MUTATION, this.$store.state.selectedEventId);
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            },

            onCancelClicked() {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            }
        }
    }
</script>


<style lang="less" scoped>
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
</style>
