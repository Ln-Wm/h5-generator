<template>
    <el-container>
      <el-header>
        <el-menu default-active="1" mode="horizontal">
          <el-menu-item index="1">活动列表ฅ^•ﻌ•^ฅ</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="add()">添加活动</el-button>
            <el-table
              :data="doc"
              style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="actId" label="活动ID"></el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column label="添加时间">
                <template slot-scope="scope">{{new Date(scope.row.time).toLocaleString()}}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <a :href="'/show/index/'+scope.row.actId" target="_blank">查看</a>
                    <a :href="'/edit/index/'+scope.row.actId" target="_blank">编辑</a>
                    <a href="javascript:;" style="color:#F56C6C;">删除</a>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              :total="count"
              :page-size="10"
              :current-page.sync="pageIndex"
              @current-change="search()">
            </el-pagination>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
                      location.reload();
                    }
                })
            }
        },
        components:{
            Page
        }
    }
</script>

<style lang="scss">
    a {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      text-decoration: none;
      color:#409EFF;
    }
</style>
