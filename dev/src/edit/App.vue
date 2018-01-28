<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">编辑活动ฅ^•ﻌ•^ฅ</a>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-xs-3">
                <div class="layer">
                    页面/弹窗列表
                </div>
            </div>
            <div class="col-xs-6">
                <div class="screen">
                    展示屏幕
                </div>
            </div>
            <div class="col-xs-3">
                <div class="tools">
                    添加组件
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import swal from 'sweetalert'
    export default {
        data(){
            return {}
        },
        name:'App',
        computed:mapState([
            'doc'
        ])
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
