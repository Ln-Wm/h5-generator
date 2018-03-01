<template>
    <div class="screen">
        <div class="phone">
            <div class="screen">
              <template v-if="editPage.type==0||editPage.type==2">
                <div class="item" v-for="(item,i) in editPage.items">
                  123
                </div>
              </template>
              <template v-else>
                <div class="block" v-for="(item,i) in editPage.items">

                </div>
              </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name:'screen',
        data(){
          return {
            editPage:{}
          }
        },
        computed:{
          ...mapState(['pages','editing'])
        }
    }
</script>

<style lang="scss" scoped>
    .screen{
        .phone{
            width: 395px;
            padding:10px;
            background: #eee;
            border-radius: 10px;
            margin: 0 auto;
            .screen{
                width: 375px;
                height: 667px;
                background: #fff;
                overflow-y:auto;
                .block{
                  width: 375px;
                }
            }
        }
    }
</style>
