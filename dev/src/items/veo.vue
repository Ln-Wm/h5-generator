<template>
  <video
      :autoplay="item.autoPlay"
      :controls="!item.hideTool"
      :src="item.videoUrl"
      x5-playsinline="isiPhoneShowPlaysinline"
      playsinline="isiPhoneShowPlaysinline"
      webkit-playsinline="isiPhoneShowPlaysinline"
      x-webkit-airplay
      :loop="item.loop">
  </video>
</template>

<script>
    export default {
        props:['item'],
        methods:{
          pause:function(e){
            if(e.target.paused){
              e.target.play().exitFullscreen();
            }else{
              e.target.pause().exitFullscreen();
            }
          }
        },
        mounted:function(){
          this.$nextTick(()=> {
              let $this=$(this.$el);
              function startPlay() {
                let media = $this.find('video')[0];
                media.play();
              }
              if(this.item.autoPlay){
                startPlay();
                document.addEventListener("WeixinJSBridgeReady", function () {
                  startPlay();
                }, false);
                wx.getNetworkType({
                  success: function (res) {
                    startPlay();
                  }
                });
              }
          });
        },
    }
</script>
<style lang="scss" scoped>
  video{
      width:100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size:15px;
  }
</style>
