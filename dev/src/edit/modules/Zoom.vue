<template>
    <div class="dot-box">
        <div class="dot tl" @mousedown.self="zoom($event,1,1)"></div>
        <div class="dot tr" @mousedown.self="zoom($event,2,1)"></div>
        <div class="dot bl" @mousedown.self="zoom($event,1,2)"></div>
        <div class="dot br" @mousedown.self="zoom($event,2,2)"></div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        computed:{
          ...mapState(['item']),
        },
        methods:{
            ...mapMutations({
                changeSize: 'changeSize',
            }),
            zoom:function(e,wd,hg){
                let left=this.item.left;
                let top=this.item.top;
                let width=this.item.width;
                let height=this.item.height;

                const $this = $(e.target);
                const father = $this.parents('.block');
                const faWidth = father.width();
                const faHeight = father.height();
                const thisWidth = $this.innerWidth();
                const thisHeight = $this.innerHeight();
                const X = e.pageX;
                const Y = e.pageY;
                let positionX;
                let positionY;
                switch(wd){
                    case 1:
                        positionX = left
                    break;
                    case 2:
                        positionX = $this.position().left+left;
                    break;
                }
                switch(hg){
                    case 1:
                        positionY = top;
                    break;
                    case 2:
                        positionY = $this.position().top+top;
                    break;
                }
                let l=left+width;
                let t=top+height;
                $(document).on('mousemove',(e)=>{
                    e.preventDefault();
                    let moveX = positionX+e.pageX-X;
                    let moveY = positionY+e.pageY-Y;
                    switch(wd){
                        case 1:
                            width=left-moveX+width;
                            left=moveX;
                            if(moveX < 0){
                                width=l;
                                left=0;
                            }
                            if(moveX > (left+width)){
                                width=1;
                                left=l;
                            }
                        break;
                        case 2:
                            width=moveX-left;
                            if(moveX < left){
                                width=1;
                            }
                            if(moveX > (faWidth-thisWidth)){
                                width=faWidth-left;
                            }
                        break;
                    }
                    switch(hg){
                        case 1:
                            height=top-moveY+height;
                            top=moveY;

                            if(moveY < 0){
                                height=t;
                                top=0;
                            }
                            if(moveY > (top+height)){
                                height=1;
                                top=t;
                            }
                        break;
                        case 2:
                            height=moveY-top;
                            if(moveY < top){
                                height=1;
                            }
                            if(moveY > (faHeight-thisHeight)){
                                height=faHeight-top;
                            }
                        break;
                    }
                    this.changeSize({
                      top:top,
                      left:left,
                      width:width,
                      height:height
                    })
                });
                $(document).on('mouseup',(e)=>{
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .dot-box{
        width: 0;
        height: 0;
        .dot{
            width: 10px;
            height: 10px;
            border: 1px solid #08a1ef;
            border-radius: 50%;
            position: absolute;
            background: #fff;
        }
        .tl{
            top: -6px;
            left: -6px;
            cursor:nw-resize;
        }
        .tr{
            top: -6px;
            right: -6px;
            cursor:ne-resize;
        }
        .bl{
            bottom: -6px;
            left: -6px;
            cursor:sw-resize;
        }
        .br{
            bottom: -6px;
            right: -6px;
            cursor:se-resize;
        }
    }
</style>
