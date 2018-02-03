<template>
    <div class="screen">
        <div class="phone">
            <div class="screen">

            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert'
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
            .screen{
                width: 375px;
                height: 667px;
                background: #fff;
                overflow-y:auto;
            }
        }
    }
</style>
