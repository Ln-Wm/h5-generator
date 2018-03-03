<template>
  <div class="shell" @dragover="preDefault">
    <div class="phone">
      <div class="screen" @drop="addItem">
        <template v-if="pages[editing]">
          <div class="block"
            v-for="(block,i) in pages[editing].blocks"
            :style="blockHeight(block)"
            :key="i">
            <item
              v-for="(item,j) in block.items"
              :item="item"
              :i="j"
              :key="j">
            </item>
            <a href="javascript:;" class="edit-block">编辑区块</a>
            <a href="javascript:;" class="delete-block">删除区块</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import item from './item'
    import $ from 'jquery'
    export default {
        name:'screen',
        data(){
          return {
            editPage:{}
          }
        },
        computed:{
          ...mapState(['pages','editing','add','editBlock','editItem'])
        },
        methods:{
          ...mapMutations({
              changeEditItem: 'changeEditItem',
              changeAdd: 'changeAdd',
          }),
          blockHeight(block){
            let h=block.height;
            return {
              height:`${h}px`
            }
          },
          preDefault(e){
              e.preventDefault();
          },
          addItem(e){
            if(this.add.key){
              const scr=$(e.target).closest('.block');
              const top=e.pageY-scr.offset().top;
              const left=e.pageX-scr.offset().left;
              this.add.top=Math.floor(top-this.add.height/2);
              this.add.left=Math.floor(left-this.add.width/2);
              let edit=this.pages[this.editing].blocks[this.editBlock];
              edit.items.push(JSON.parse(JSON.stringify(this.add)));
              this.changeEditItem(edit.items.length-1);
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
        }
      }
    }
  }
</style>
