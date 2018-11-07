<template>
    <div class="layout">
        <ks-header>Menu | meow | oink | moo | woof</ks-header>

        <div class="layout__content">
            <!-- side panel: -->
            <ks-side-nav></ks-side-nav>

            <!-- main content: -->
            <ks-main></ks-main>
        </div>
    </div>
</template>


<script>
    import KsSideNav from './components/KsSideNav.vue';
    import KsMain from './components/KsMain.vue';
    import KsHeader from './components/KsHeader.vue';

    export default {
        name: 'App',

        data() {
            return {
            };
        },

        methods: {},

        components: {
            'ks-side-nav': KsSideNav,
            'ks-main': KsMain,
            'ks-header': KsHeader
        }
    }
</script>


<style scoped>
    .layout__content {
        margin-top: 60px;
    }
</style>
