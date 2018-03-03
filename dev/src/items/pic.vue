<template>
  <img :src="item.bgUrl" v-if="item.bgUrl">
</template>

<script>
    export default {
        props:['item'],
    }
</script>
<style lang="scss" scoped>
  img{
      width:100%;
      height: 100%;
  }
</style>
