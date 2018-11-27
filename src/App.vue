<template>
    <div id="app">

        <!-- main layout: -->
        <c-nav></c-nav>
        <router-view></router-view>

        <!-- modals: -->
        <c-modal v-if="shouldShowConfirmModal">
            <template slot="modal-header">Delete Event?</template>
            <template slot="modal-footer">
                <button type="button" @click="onCancelClicked">Cancel</button>
                <button type="button" @click="onDeleteClicked">Delete</button>
            </template>
        </c-modal>

    </div>
</template>



<script>
    import CModal from './components/CModal.vue';
    import CNav from './components/CNav.vue';
    import { REMOVE_EVENT_FROM_CALENDAR_MUTATION,
             SHOW_CONFIRM_MODAL_MUTATION
           } from './store/mutation-types';

    export default {
        name: 'App',


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
        },


        components: {
            CModal,
            CNav
        }
    }
</script>



<style lang="less" scoped>
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
</style>
