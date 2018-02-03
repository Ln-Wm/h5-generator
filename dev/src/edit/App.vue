<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">编辑活动ฅ^•ﻌ•^ฅ</a>
                </div>
                <div class="navbar-header navbar-right">
                    <button type="button" class="btn btn-default navbar-btn" @click="save()">保存</button>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-xs-2">
                <layers></layers>
            </div>
            <div class="col-xs-8">
                <screen></screen>
            </div>
            <div class="col-xs-2">
                <tools></tools>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Layers from './modules/TheLayers'
    import Screen from './modules/TheScreen'
    import Tools from './modules/TheTools'
    import swal from 'sweetalert'
    export default {
        name:'App',
        methods:mapActions({
            save: 'save'
        }),
        components:{
            Layers,
            Screen,
            Tools
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
