<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="图片链接">
      <el-button @click="itemBg()">{{item.bgImg?'更改':'上传'}}图片</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import picUpload from '@/assets/picUpload'
  export default {
    props:['item'],
    methods:{
      itemBg(){
        picUpload()
        .then(res=>{
          this.item.bgImg=res.src;
          let obj = new Image();
          obj.src = res.src;
          obj.onload = ()=>{
            this.item.width=obj.width/2,
            this.item.height=obj.height/2;
          }
        })
      },
    }
  }
</script>
