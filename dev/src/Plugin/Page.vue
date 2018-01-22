<template>
    <div class="col-xs-12 clearfix">
        <div class="form-inline pull-right">
            <ul class="pagination">
                <li :class="index==1?'disabled':''">
                    <a v-on:click="page(1)" href="javascript:void(0)">
                        <i class="glyphicon glyphicon-step-backward"></i>
                    </a>
                </li>
                <li v-for="n in 7" v-if="index+n-3>0 && index+n-3<=pagenum" :class="n==3?'active':''">
                    <a href="javascript:void(0)" v-on:click="page(index+n-3)">{{index+n-3}}</a>
                </li>
                <li :class="(index==pagenum||count==0)?'disabled':''">
                    <a href="javascript:void(0)" v-on:click="page(pagenum)">
                        <i class="glyphicon glyphicon-step-forward"></i>
                    </a>
                </li>
            </ul>
            <div class="form-group">
                <label>共{{count}}条</label>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            index: {
                type: Number,
                required: true
            },
            count:{
                type: Number,
                required: true
            },
        },
        computed:{
            pagenum(){
                return Math.ceil(this.count/10);
            }
        },
        methods: {
            page:function(i){
                if(i<=10&&i>0){
                    this.$emit('update:index', i);
                    this.$emit('search');
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .col-xs-12{
        margin-top: 10px;
        .pagination{
            margin: 0;
            vertical-align: middle;
        }
    }
</style>
