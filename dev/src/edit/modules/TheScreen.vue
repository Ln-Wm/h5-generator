<template>
  <div class="shell" @dragover="preDefault">
    <div class="phone">
      <div class="screen" @drop="addItem" :style="screen">
        <template v-if="edit">
          <div class="block"
            :class="{active:editBlock==i}"
            v-for="(piece,i) in edit.blocks"
            :style="blockStyle(piece)"
            :key="i">
            <item
              v-for="(item,j) in piece.items"
              :item="item"
              :i="j"
              :block-index="i"
              :key="j">
            </item>
            <a href="javascript:;" class="edit-block" @click="changeEditBlock(i)">编辑区块</a>
            <a href="javascript:;" class="delete-block" @click="deleteBlock(i)">删除区块</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import item from './item'
    export default {
        name:'screen',
        computed:{
          ...mapState(['pages','edit','add','block','editBlock']),
          screen(){
            return {
              background:`url(${this.edit.bgImg}) top/375px no-repeat`,
              backgroundColor:this.edit.bgColor,
              'overflow-y':this.edit.type==1?'auto':'hidden'
            }
          }
        },
        methods:{
          ...mapMutations({
            changeEditBlock:'changeEditBlock',
            changeEditItem: 'changeEditItem',
            changeAdd: 'changeAdd',
          }),
          blockStyle(block){
            let h=block.height;
            return {
              background:`url(${block.bgImg}) top/375px no-repeat`,
              backgroundColor:block.bgColor,
              height:`${h}px`
            }
          },
          deleteBlock(i){
            if(this.edit.blocks.length>1){
              this.edit.blocks.splice(i,1);
            }else{
              this.$notify.error({
                title: '删除失败',
                message: '页面里面至少要有一个block'
              });
            }
          },
          preDefault(e){
              e.preventDefault();
          },
          addItem(e){
            if(this.add.key){
              const scr=$(e.target).closest('.block');
              const i= scr.index();
              this.changeEditBlock(i);
              const top=e.pageY-scr.offset().top;
              const left=e.pageX-scr.offset().left;
              this.add.top=Math.floor(top-this.add.height/2);
              this.add.left=Math.floor(left-this.add.width/2);
              this.block.items.push(JSON.parse(JSON.stringify(this.add)));
              this.changeEditItem(this.block.items.length-1);
              this.changeAdd({});
            }
          },
        },
        components:{
          item
        }
    }
</script>

<style lang="scss" scoped>
  .shell{
    .phone{
      width: 395px;
      padding:10px;
      background: #eee;
      border-radius: 10px;
      margin: 0 auto;
      .screen{
        width: 375px;
        height: 667px;
        background: #fff;
        overflow-y:auto;
        .block{
          width: 375px;
          position: relative;
          .edit-block{
            height: 20px;
            background: #409EFF;
            color: #fff;
            font-size: 14px;
            padding: 0 5px;
            line-height: 20px;
            position: absolute;
            top: 0;
            left: 0;
          }
          .delete-block{
            height: 20px;
            background: #F56C6C;
            color: #fff;
            font-size: 14px;
            padding: 0 5px;
            line-height: 20px;
            position: absolute;
            top: 0;
            right: 0;
          }
          &.active{
            box-shadow: inset 0 0 20px rgba(250,41,29,.4)
          }
        }
      }
    }
  }
</style>
