<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">活动列表ฅ^•ﻌ•^ฅ</a>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-xs-12">
                <a href="javascript:void(0);" class="btn btn-success" @click="add()">添加活动</a>
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>活动ID</th>
                            <th>标题</th>
                            <th>添加时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in doc">
                            <td>{{i+1}}</td>
                            <td>{{item.actId}}</td>
                            <td>{{item.title}}</td>
                            <td>{{new Date(item.time).toLocaleString()}}</td>
                            <td>
                                <a :href="'/show/index/'+item.actId" target="_blank">查看</a>
                                <a :href="'/edit/index/'+item.actId" target="_blank">编辑</a>
                                <a href="javascript:void(0);" style="color:red;">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page
                :count="count"
                :index.sync="pageIndex"
                @search="search()">
            </page>
        </div>
    </div>
</template>

<script>
    import Page from '../Plugin/Page.vue'
    import { mapState } from 'vuex'
    import swal from 'sweetalert'
    export default {
        data(){
            return {
                pageIndex:1,
                listNum:10
            }
        },
        name:'App',
        computed:mapState([
            'doc',
            'count'
        ]),
        methods:{
            add(){
                this.$http.get('/index/addAjax').then(res=>{
                    if(res.data.success){
                        console.log(res.data)
                    }
                })
            }
        },
        components:{
            Page
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
