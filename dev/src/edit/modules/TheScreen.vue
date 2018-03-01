<template>
    <div class="screen">
        <div class="phone">
            <div class="screen">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'screen'
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
            }
        }
    }
</style>
