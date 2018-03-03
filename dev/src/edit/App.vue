<template>
    <el-container>
      <el-header>
        <el-menu default-active="1" mode="horizontal">
          <el-menu-item index="1">编辑活动</el-menu-item>
          <el-button type="primary" plain @click="saveAct()">保存</el-button>
        </el-menu>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="4">
            <layers></layers>
          </el-col>
          <el-col :span="12">
            <screen></screen>
          </el-col>
          <el-col :span="4">
            <tools></tools>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import Layers from './modules/TheLayers'
    import Screen from './modules/TheScreen'
    import Tools from './modules/TheTools'
    export default {
        name:'App',
        methods:{
          ...mapActions({
              save: 'save'
          }),
          saveAct(){
            this.save()
            .then(res=>{
              this.$notify({
                title: '保存成功！',
                type: 'success'
              });
            })
            .catch(res=>{
              this.$notify({
                title: '保存失败！',
                type: 'success'
              });
            })
          },
          preDefault:function(e){
            e.preventDefault();
          },
        },
        components:{
            Layers,
            Screen,
            Tools
        }
    }
</script>
<style lang="scss" scoped>
  .el-menu{
    .el-button{
      float: right;
      margin-top: 10px;
    }
  }
</style>
