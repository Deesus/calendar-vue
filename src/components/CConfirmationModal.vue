<template>
    <div class="c-confirmation-modal-overlay">
        <x-icon class="c-confirmation-modal-overlay__x-icon" v-if="showCloseIcon" @click="closeModalClicked"></x-icon>

        <div class="c-confirmation-modal">
            <div class="c-confirmation-modal__message">
                {{ message }}
            </div>
            <div class="c-confirmation-modal__footer">
                <button class="c-confirmation-modal__button c-confirmation-modal__button--cancel" type="button" @click="cancelButtonClicked">Cancel</button>
                <button class="c-confirmation-modal__button c-confirmation-modal__button--confirm" type="button" @click="confirmButtonClicked">Delete</button>
            </div>
        </div>
    </div>
</template>


<script>
    import { SHOW_CONFIRM_MODAL_MUTATION } from '../store/mutation-types';
    import { XIcon } from 'vue-feather-icons';

    export default {
        name: 'CModal',


        props: {
            showCloseIcon: {
                type:    Boolean,
                default: true
            },
            message: {
                type:     String,
                required: true
            }
        },


        components: {
            XIcon
        },


        data() {
            return {};
        },


        methods: {
            closeModalClicked() {
                this.$store.commit(SHOW_CONFIRM_MODAL_MUTATION, false);
            },

            cancelButtonClicked() {
                // cancel is same as closing the modal except we emit a 'cancel' event:
                this.closeModalClicked();
                this.$emit('cancel-clicked', 'canceled');
            },

            confirmButtonClicked() {
                this.$emit('confirm-clicked', 'confirmed');
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants";

    @modal-padding: 16px;
    @modal-border-radius: 3px;

    .c-confirmation-modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 280px;
        min-height: 144px;
        color: @font-color-default;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 250;
        background: white;
        border-radius: @modal-border-radius;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);


        &__message {
            padding: @modal-padding;
            text-align: center;
        }

        &__footer {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }

        &__button {
            height: 60px;
            width: auto;
            flex-grow: 1;
            border: 0;
            color: white;
            cursor: pointer;
            transition: 250ms background-color ease-in-out;

            // confirm button:
            /* TODO: we should have the props define the styling of the buttons: */
            &&--confirm {
                border-radius: 0 0 @modal-border-radius 0;
                background-color: #f16265;

                &:hover {
                    background-color: #ee5250;
                }
            }

            // cancel button:
            &&--cancel {
                border-radius: 0 0 0 @modal-border-radius;
                background-color: #9eaaa8;

                &:hover {
                    background-color: #86999a;
                }
            }
        }
    }

    .c-confirmation-modal-overlay {
        position: fixed;
        background: rgba(0, 0, 0, 0.65);
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vw;
        z-index: 240;

        &__x-icon {
            height: 40px;
            width: auto;
            padding: 8px;
            cursor: pointer;
            color: @font-color-white;
            position: fixed;
            right: 44px;
            top: 44px;
        }
    }
</style>
