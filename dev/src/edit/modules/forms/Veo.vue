<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="视频地址">
      <el-input v-model="item.videoUrl"></el-input>
    </el-form-item>
    <el-form-item label="自动播放">
      <el-switch v-model="item.autoPlay"></el-switch>
    </el-form-item>
    <el-form-item label="是否循环">
      <el-switch v-model="item.loop"></el-switch>
    </el-form-item>
    <el-form-item label="隐藏工具">
      <el-switch v-model="item.hideTool"></el-switch>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    props:['item'],
  }
</script>
