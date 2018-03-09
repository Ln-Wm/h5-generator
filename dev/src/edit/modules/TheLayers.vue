<template>
    <div class="layers" @dragover="preDefault">
        <h1>页面管理</h1>
        <div class="page-list" @drop="dragEvent">
            <div class="page clearfix"
                v-for="(item,i) in pages"
                :key="i"
                :order="i"
                :class="{active:editing==i}"
                @click.self="resetEdit(),changeEditing(i)"
                @dragstart.self="orderStart(i)"
                @dragenter.self="orderEnter"
                draggable="true">
                {{i+1}}-{{item.name}}
                <a href="javascript:void(0);" class="delete" @click="deleteModule(i)">
                    <i class="el-icon-close"></i>
                </a>
            </div>
            <el-button @click="add(1)" style="margin-top:10px;">添加页面</el-button>
            <el-button @click="add(2)" style="margin-top:10px;">添加弹窗</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { page, pop } from '@/assets/models'
    export default {
        name:'Layers',
        data(){
            return {
                top:0
            }
        },
        computed: {
            ...mapState(['pages','pageIndex','editing'])
        },
        methods:{
            ...mapMutations({
                pageInc: 'pageInc',
                changeEditing: 'changeEditing',
                resetEdit:'resetEdit',
            }),
            add(type){
                this.pageInc();
                let data;
                if(type==1){
                  data=Object.assign({},page,{
                      id:this.pageIndex,
                      name:`页面${this.pageIndex}`
                  });
                }else{
                  data=Object.assign({},pop,{
                      id:this.pageIndex,
                      name:`弹窗${this.pageIndex}`
                  });
                }
                this.pages.push(data);
            },
            preDefault(e){
                e.preventDefault();
            },
            deleteModule(i){
              if(this.pages.length>1){
                this.pages.splice(i,1);
                if(i>0){
                  this.changeEditing(i-1);
                }else{
                  this.changeEditing(0);
                }
              }else{
                this.$notify.error({
                  title: '删除失败',
                  message: '至少保留一个页面'
                });
              }
            },
            dragEvent(e){
                $('.page').removeClass('orderdown orderup');
                var order=parseInt($(e.target).attr('order'));
                this.pages.splice(order, 0, this.pages.splice(this.top,1)[0]);
            },
            orderStart(i){
                this.top=i;
            },
            orderEnter(e){
                var order=parseInt($(e.target).attr('order'));
                $('.page').removeClass('orderdown orderup');
                if(this.top<order){
                    $(e.target).addClass('orderdown');
                }else{
                    $(e.target).addClass('orderup');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .layers{
        text-align: center;
        h1{
          font-size: 22px;
        }
        .page-list{
            height:687px;
            overflow-y: auto;
            .page{
                width: 100%;
                height: 70px;
                line-height: 70px;
                margin-top: 10px;
                padding: 0 10px;
                border-radius: 5px;
                position: relative;
                font-size: 16px;
                .delete{
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 0;
                    right: 5px;
                    background: red;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 50%;
                    color: #fff;
                    display: none;
                    font-size: 16px;
                }
                &:hover{
                    background: #eee;
                    cursor: pointer;
                    .delete{
                      display: block;
                    }
                }
                &.active{
                    background: #eee;
                }
                &.orderdown:after{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 5px;
                    border-bottom: 2px dashed #f10637;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                &.orderup:after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 5px;
                    border-top: 2px dashed #f10637;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
</style>
