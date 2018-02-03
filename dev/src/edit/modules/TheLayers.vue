<template>
    <div class="layers" @dragover="preDefault">
        <div class="page-list" @drop="dragEvent">
            <div class="page clearfix"
                v-for="(item,i) in pages"
                :key="i"
                :order="i"
                @dragstart.self="orderStart(i)"
                @dragenter.self="orderEnter"
                draggable="true">
                {{i+1}}-{{item.name}}
                <a href="javascript:void(0);" @click="deleteModule(i)">
                    <i class="glyphicon glyphicon-remove"></i>
                </a>
            </div>
            <a href="javascript:void(0);" class="btn btn-default" @click="add()">添加页面</a>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import { page } from '@/assets/models'
    import swal from 'sweetalert'
    export default {
        name:'Layers',
        data(){
            return {
                top:0
            }
        },
        computed: {
            ...mapState(['pages','pageIndex'])
        },
        methods:{
            ...mapMutations({
                pageInc: 'pageInc'
            }),
            add(){
                this.pageInc();
                let data=Object.assign({},page,{
                    id:this.pageIndex,
                    name:`页面${this.pageIndex}`
                });
                this.pages.push(data);
            },
            preDefault(e){
                e.preventDefault();
            },
            deleteModule(i){
                this.pages.splice(i,1);
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
                a{
                    float: right;
                    color: red;
                    margin-top: 5px;
                }
                &:hover{
                    background: #eee;
                    cursor: pointer;
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
