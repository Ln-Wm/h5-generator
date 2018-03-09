<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="文本内容">
      <el-input type="textarea" v-model="item.text"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    props:['item'],
  }
</script>
