<template>
  <div class="item"
    :class="{zoom:editItem===i}"
    :style="style"
    @mousedown="itemEdit(i,$event)">
    <comp :item="item"></comp>
    <div class="delete" @click="deleteItem(i)"></div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import comp from '../../items/comp'
    import $ from 'jquery'
    let count=0;
    export default {
        name:'item',
        props:['item','preview','i'],
        computed:{
          ...mapState(['pages','editing','add','editBlock','editItem']),
          style(){
              let style={
                  width:`${this.item.width}px`,
                  height:`${this.item.height}px`,
                  top:`${this.item.top}px`,
                  left:`${this.item.left}px`,
                  backgroundColor:this.item.bgColor,
              }
              return style;
          },
        },
        methods:{
          ...mapMutations({
              changeEditItem: 'changeEditItem',
          }),
          deleteItem(i){
            this.pages[this.editing].blocks[this.editBlock].items.splice(i,1);
          },
          itemEdit(i,e){
            e.preventDefault();
            count++;
            this.changeEditItem(i);
            let edit = this.pages[this.editing].blocks[this.editBlock].items[i]
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
            $(document).on('mousemove',function(e){
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
            $(document).on('mouseup',function(e){
                e.preventDefault();
                $(document).off('mousemove');
                $(document).off('mouseup');
            });
            setTimeout(function(){
                if(count>1){
                  console.log('双击666')
                }
                count=0;
            },300);
          }
        },
        components:{
          comp
        }
    }
</script>

<style lang="scss" scoped>
    .item{
        position: absolute;
        cursor: pointer;
        z-index: 1;
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
