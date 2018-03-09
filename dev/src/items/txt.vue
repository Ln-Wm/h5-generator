<template>
  <div class="text" v-html="item.text"></div>
</template>

<script>
    export default {
        props:['item'],
    }
</script>
<style lang="scss" scoped>
  .text{
      width:100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size:15px;
  }
</style>
