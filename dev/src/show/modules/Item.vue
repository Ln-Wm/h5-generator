<template>
  <div class="item"
    :style="style"
    @click="handleClick()">
    <comp :item="item"></comp>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import comp from '../../items/comp'
    let count=0;
    export default {
        name:'item',
        props:['item'],
        computed:{
          // ...mapState(['pages','editing','add','editBlock','editItem']),
          style(){
              let style={
                  width:`${this.item.width*2/100}rem`,
                  height:`${this.item.height*2/100}rem`,
                  top:`${this.item.top*2/100}rem`,
                  left:`${this.item.left*2/100}rem`,
                  background:`url(${this.item.bgImg}) top/${this.item.width*2/100}rem no-repeat`,
                  backgroundColor:this.item.bgColor,
              }
              return style;
          },
        },
        methods:{
          ...mapMutations({
            jump: 'jump',
            openPop: 'openPop',
            closePop: 'closePop',
          }),
          handleClick(){
            if(this.item.event==1){
              switch(this.item.operate){
                case 1:
                  this.$emit('jump');
                  this.jump(this.item.target);
                break;
                case 2:
                  location.href=this.item.target;
                break;
                case 3:
                  this.openPop(this.item.target);
                break;
                case 4:
                  this.closePop();
                break;
              }
            }
          }
        },
        components:{
          comp
        },
        mounted:function(){
            var self = this;
            this.$nextTick(()=> {
                var $this=$(self.$el);
                var action=[];
                var preset=self.item.animate?JSON.parse(JSON.stringify(self.item.animate)):[];
                for(var i in preset){
                    var animate=preset[i];
                    if(animate.loop==0){
                        action.push(animate);
                        break;
                    }else{
                        for(let q=0;q<parseInt(animate.loop);q++){
                            var frame=JSON.parse(JSON.stringify(animate));
                            if(q>0){
                                frame.time=0;
                            }
                            action.push(frame);
                        }
                    }
                }
                function play(i){
                    $this.removeClass().addClass('item animated '+action[i].name);
                    setTimeout(function(){
                        $this.removeClass().addClass('item');
                        if(action[i].loop==0){
                            action[i].time=0;
                            action.push(action[i]);
                        }
                        i++;
                        if(i<action.length){
                            setTimeout(function(){
                                play(i);
                            },parseFloat(action[i].time)*1000+50);
                        }else if(action[i-1].type=='exit'){
                            $this.addClass('hide');
                        }
                    },action[i].duration);
                }
                if(action.length){
                    if(action[0].type=='enter'){
                        $this.addClass('hide');
                    }
                    setTimeout(function(){
                        $this.removeClass('hide');
                        play(0);
                    },parseFloat(action[0].time)*1000);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .item{
      position: absolute;
    }
</style>
