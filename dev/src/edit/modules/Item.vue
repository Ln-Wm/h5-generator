<template>
  <div class="item"
    :class="{zoom:(editItem==i && editBlock==blockIndex)}"
    :style="style">
    <comp :item="item" :preview="true"></comp>
    <div class="blank" @mousedown="itemEdit(i,$event)"></div>
    <div class="delete" @click="deleteItem(i)" v-if="!item.noDel"></div>
    <zoom v-if="editItem==i && editBlock==blockIndex && item.size"></zoom>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import comp from '../../items/comp'
    import Zoom from './Zoom.vue'
    import picUpload from '@/assets/picUpload'
    let count=0;
    export default {
        name:'item',
        props:['item','i','blockIndex'],
        computed:{
          ...mapState(['pages','editing','add','editBlock','editItem']),
          style(){
              let style={
                  width:`${this.item.width}px`,
                  height:`${this.item.height}px`,
                  top:`${this.item.top}px`,
                  left:`${this.item.left}px`,
                  background:`${this.item.bgColor} url(${this.item.bgImg}) top/100% 100% no-repeat`,
              }
              return style;
          },
        },
        methods:{
          ...mapMutations({
              changeEditItem: 'changeEditItem',
              changeEditBlock: 'changeEditBlock',
          }),
          deleteItem(i){
            this.pages[this.editing].blocks[this.editBlock].items.splice(i,1);
          },
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
          itemEdit(i,e){
            e.preventDefault();
            count++;
            this.changeEditBlock(this.blockIndex);
            this.changeEditItem(i);
            let edit = this.pages[this.editing].blocks[this.editBlock].items[i];
            let $this = $(e.target).closest('.item');
            let father = $this.parent();
            let faWidth = father.width();
            let faHeight = father.height();
            let thisWidth = $this.innerWidth();
            let thisHeight = $this.innerHeight();
            let X = e.pageX;
            let Y = e.pageY;
            let positionX = $this.position().left;
            let positionY = $this.position().top;
            $(document).on('mousemove',e=>{
                e.preventDefault();
                let moveX = positionX+e.pageX-X;
                let moveY = positionY+e.pageY-Y;
                edit.left=moveX;
                edit.top=moveY;
                if(moveX < 0){
                    edit.left=0;
                }
                if(moveX > (faWidth-thisWidth)){
                    edit.left=faWidth-thisWidth;
                }
                if(moveY < 0){
                    edit.top=0;
                }
                if(moveY > (faHeight-thisHeight)){
                    edit.top=faHeight-thisHeight;
                }
            });
            $(document).on('mouseup',e=>{
                e.preventDefault();
                $(document).off('mousemove');
                $(document).off('mouseup');
            });
            setTimeout(()=>{
                if(count>1){
                  console.log('双击666');
                  this.itemBg();
                }
                count=0;
            },300);
          }
        },
        components:{
          comp,
          Zoom
        }
    }
</script>

<style lang="scss" scoped>
    .item{
        position: absolute;
        cursor: pointer;
        z-index: 1;
        .blank{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .delete{
            width:20px;
            height:20px;
            cursor:pointer;
            text-align: center;
            line-height: 20px;
            color: #fff;
            position: absolute;
            top: 5px;
            right: 5px;
            background: #f10637;
            display: none;
            border-radius: 50%;
        }
        &:hover{
            box-shadow: 0 0 4px rgba(102,175,233,.2);
            .delete{
                display: block;
            }
        }
        .item-child{
            position: absolute;
            cursor: pointer;
            z-index: 1;
        }
        &.zoom{
            border: 1px solid #08a1ef;
            cursor: move;
        }
    }
</style>
