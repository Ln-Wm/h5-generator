<template>
    <div class="container">
        <p>{{welcome}}</p>
        <a href="javascript:void(0);" @click="add()">添加活动</a>
    </div>
</template>

<script>
    export default {
        name:'App',
        methods:{
            add(){
                this.$http.get('/index/addAjax').then(res=>{
                    if(res.data.success){
                        console.log(res.data)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
</style>
