<template>
  <el-form ref="form" label-width="80px">
    <div class="">
      <el-button type="primary" @click="addImg()">添加图片</el-button>
    </div>
    <div v-for="(op,i) in item.imgList" :key="i">
      <h3>
        图片-{{parseInt(i)+1}}
        <el-button type="danger" @click="deleteAction(i)">删除</el-button>
      </h3>
      <el-form-item label="展示图片">
        <el-button @click="itemBg(i)">{{item.imgList[i].img?'更改':'上传'}}图片</el-button>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="op.url"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
  import picUpload from '@/assets/picUpload'
  export default {
    props:['item'],
    methods:{
      itemBg(i){
        picUpload()
        .then(res=>{
          this.item.imgList[i].img=res.src;
          this.$notify({
            title: '上传成功！',
            type: 'success'
          });
          if(i==0){
            let obj = new Image();
            obj.src = res.src;
            obj.onload = ()=>{
              this.item.width=obj.width/2,
              this.item.height=obj.height/2;
            }
          }
        })
      },
      addImg(){
        const img={
          url:'javascript:;',
          img:''
        }
        this.item.imgList.push(img);
      },
    }
  }
</script>
