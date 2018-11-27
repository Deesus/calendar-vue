<template>
    <div class="c-nav">
        <h1 class="c-nav-header">
            <span class="c-nav-header__month">{{ navHeaderMonthText }}</span>
            <span class="c-nav-header__year">{{ navHeaderYearText }}</span>
        </h1>
    </div>
</template>


<script>
    export default {
        name: 'CNav',

        data() {
            return {};
        },

        methods: {},

        computed: {
            navHeaderMonthText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('MMMM');
            },

            navHeaderYearText() {
                return this.$store.getters.getMomentObjectFromSelectedDate.format('YYYY');
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../styles/base/_constants.less";

    .c-nav {
        width: 290px;
        background: @side-nav-bg-color;
        padding: @page-top-padding 20px 20px 20px;

        &__header {

        }
    }

    .c-nav-header__month {
        color: @font-color-muted;
    }

    .c-nav-header__year {
        color: @accent-color-red;
    }
</style>
