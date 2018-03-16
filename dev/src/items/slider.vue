<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(op,i) in item.imgList" :key="i">
      <a :href="op.url"
        class="img-item"
        :class="{active:i==0}"
        :style="img(op.img)">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import vmk from '@/assets/util'
    export default {
        props:['item','preview'],
        data() {
          return {
            swiperOption: {
              autoplay: {
                delay: 2000,
                disableOnInteraction: false,
              },
              setWrapperSize :true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              loop:true,
              width:this.preview?this.item.width:vmk.remToPx(this.item.width*2/100),
            }
          }
        },
        components: {
          swiper,
          swiperSlide
        },
        methods:{
          img(cover){
            return {
              width:this.preview?`${this.item.width}px`:`${this.item.width*2/100}rem`,
              height:this.preview?`${this.item.height}px`:`${this.item.height*2/100}rem`,
              background:'url('+cover+') center /cover no-repeat'
            }
          }
        },
    }
</script>
<style lang="scss">
  .swiper-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    overflow: hidden;
    .swiper-wrapper{
      height: 100%;
      position: relative;
      &:after{
        content:'';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .swiper-slide{
        overflow: hidden;
        width: 100%;
        height: 100%;
        float: left;
        .img-item{
          display: block;
        }
      }
    }
    .swiper-pagination{
      width: 100%;
      height:.4rem;
      line-height: .4rem;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      .swiper-pagination-bullet{
        display: inline-block;
        vertical-align: middle;
        width: .4rem;
        height: .08rem;
        background: #fff;
        border-radius: .02rem;
        margin: 0 .07rem;
        opacity: .5;
        &.swiper-pagination-bullet-active{
          opacity: 1;
        }
      }
    }
  }
</style>
