<template>
  <div class="container" :style="{height:height}">
    <transition :name="upDown" v-for="(page,i) in pages" :key="i">
      <div class="page"
        @touchstart="swipeStart($event,page.type,page.back)"
        @touchmove="moveDefault($event,page.type)"
        @touchend="swipe($event,page.type,page.target,page.back)"
        v-show="pageShow==page.id"
        :style="pageStyle(page)">
        <div class="block"
          v-if="pageShow==page.id"
          v-for="(block,i) in page.blocks"
          :style="blockStyle(block)"
          :key="i">
          <item
            v-for="(item,j) in block.items"
            :item="item"
            :i="j"
            :key="j"
            @jump="upDown=''">
          </item>
        </div>
      </div>
    </transition>
    <div class="pop"
      v-for="(pop,i) in pops"
      v-if="popShow==pop.id" >
      <div class="block"
        v-for="(block,i) in pop.blocks"
        :style="blockStyle(block)"
        :key="i">
        <item
          v-for="(item,j) in block.items"
          :item="item"
          :i="j"
          :key="j"
          @jump="upDown=''">
        </item>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import item from './modules/Item'
    export default {
      name:'App',
      data(){
        return {
          upDown:''
        }
      },
      computed:{
        ...mapState(['pages','pops','height','pageShow','popShow','start']),
      },
      methods:{
        ...mapMutations({
            changeStart: 'changeStart',
            closePop:'closePop',
            jump:'jump',
        }),
        blockStyle(block){
          let h=block.height;
          return {
            background:`url(${block.bgImg}) top/7.5rem no-repeat`,
            backgroundColor:block.bgColor,
            height:`${h*2/100}rem`
          }
        },
        swipeStart(e,type,back){
          if(type==0||back){
            this.changeStart(e.touches[0].pageY);
          }
        },
        switchPage(id,upDown){
          this.closePop();
          this.upDown=upDown||'';
          this.$nextTick(()=> {
            this.jump(id);
          });
        },
        swipe(e,type,target,back){
          if(type==0||back){
            let move=(e.changedTouches[0].pageY)-this.start
            if(move>0 && Math.abs(move)>50){
              //下滑
              if(back){
                this.switchPage(back,'up');
              }
            }else if(move<0 && Math.abs(move)>50){
              if(target&&target!=0){
                this.switchPage(target,'down');
              }
            }
            this.changeStart(0);
          }
        },
        moveDefault(e,i){
          if(i==0){
            e.preventDefault();
          }
        },
        pageStyle(page){
          let style={
            height:`${this.height}px`,
            background:`url(${page.bgImg}) top/7.5rem no-repeat`,
            backgroundColor:page.bgColor,
          }
          if(page.type==1){
            style.height=auto;
          }else{
            style.overflow='hidden';
          }
          return style;
        },
      },
      components:{
        item
      }
    }
</script>

<style lang="scss" scoped>
  .container{
    width: 7.5rem;
    .page{
      width: 7.5rem;
      .block{
        position: relative;
      }
    }
    .pop{
      width: 7.5rem;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.5);
    }
  }
</style>
