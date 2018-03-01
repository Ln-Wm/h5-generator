<template>
    <div class="pic" @click="jump" :style="style">
        <img :src="item.bgUrl" v-if="item.bgUrl">
    </div>
</template>

<script>
    export default {
        props:['item'],
        computed: {
            style(){
                var style={
                    width:(this.item.width/100)+'rem',
                    height:(this.item.height/100)+'rem',
                    top:(this.item.top/100)+'rem',
                    left:(this.item.left/100)+'rem',
                    backgroundColor:this.item.bgColor,
                }
                for(var key in this.item.feature){
                    var feature=this.item.feature[key];
                    if(feature.type=='style'){
                        style[key]=feature.value;
                    }else if(feature.type=='stylepx'){
                        style[key]=(parseInt(feature.value)/100)+'rem';
                    }
                }
                return style;
            },
        },
    }
</script>
<style lang="scss" scoped>
    .pic{
        position: absolute;
        img{
            width:100%;
            height: 100%;
        }
    }
</style>
