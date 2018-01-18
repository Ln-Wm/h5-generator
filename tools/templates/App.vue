<template>
    <p>{{welcome}}</p>
</template>

<script>
    export default {
        data:function(){
            return this.$root.$data
        },
    }
</script>

<style lang="scss" scoped>
    p {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
</style>
