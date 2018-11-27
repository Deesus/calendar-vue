<template>
    <div class="modal-overlay">
        <div class="modal modal--medium">
            <div class="modal__header">
                <span><slot name="modal-header"></slot></span>
                <i v-if="showCloseIcon" @click="closeModalClicked" class="icon icon--close">X</i>
            </div>
            <div class="modal__body"><slot name="modal-body"></slot></div>
            <div class="modal__footer"><slot name="modal-footer"></slot></div>
        </div>
    </div>
</template>


<script>
    import { SHOW_CONFIRM_MODAL_MUTATION } from '../store/mutation-types';

    export default {
        name: 'CModal',

        props: {
            showCloseIcon: {
                type:    Boolean,
                default: true
            }
        },

        data() {
            return {};
        },

        methods: {
            closeModalClicked() {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            }
        },

        computed: { }
    }
</script>


<style lang="less" scoped>
    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        z-index: 250;
        background: white;
        border-radius: 3px;
        padding: 16px;
        min-height: 100px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);

        &&--medium {
            width: 280px;
        }

        &__header {
            display: flex;
            justify-content: space-between;
        }
    }

    .modal-overlay {
        position: fixed;
        background: rgba(0, 0, 0, 0.65);
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vw;
        z-index: 240;
    }
</style>
