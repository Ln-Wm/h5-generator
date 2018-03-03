<template>
  <div>
    <div class="add-block">
      <el-button @click="addBlock()">添加区块</el-button>
    </div>
    <div class="tools">
      <div class="add-button">文本</div>
      <div class="add-button"
        @click="addPlugin('pic')"
        @dragstart="addThis('pic')"
        draggable="true">
        图片
      </div>
      <div class="add-button">视频</div>
      <div class="add-button">表单</div>
      <div class="add-button">产品</div>
      <div class="add-button">领券</div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { item,block } from '@/assets/models'
    export default {
        name:'Tools',
        computed:{
          ...mapState(['pages','editing','add','editBlock','editItem'])
        },
        methods:{
          ...mapMutations({
              changeEditItem: 'changeEditItem',
              changeAdd: 'changeAdd',
          }),
          addBlock(){
            this.pages[this.editing].blocks.push(JSON.parse(JSON.stringify(block)))
          },
          addPlugin(name){
              this.addThis(name);
              if(this.pages[this.editing]){
                let edit=this.pages[this.editing].blocks[this.editBlock];
                edit.items.push(JSON.parse(JSON.stringify(this.add)));
                this.changeEditItem(edit.items.length-1);
                this.changeAdd({});
              }
          },
          addThis(name){
            if(!this.pages[this.editing]){
              this.$message.error('请先选择需要编辑的页面或区块');
            }else{
              this.changeAdd(JSON.parse(JSON.stringify(item[name])));
            }
          },
        }
    }
</script>

<style lang="scss" scoped>
  .tools{
    .add-button{
      line-height: 80px;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      font-size: 14px;
      border-radius: 4px;
      width: 80px;
      height: 80px;
      margin-left: 10px;
      margin-top:10px;
      display: inline-block;
      &:hover{
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }
  }
</style>
