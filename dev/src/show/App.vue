<template>
    <div class="container">
        <p>1234</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name:'App',
        computed:mapState([
            'pages'
        ])
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 7.5rem;
    }
</style>
