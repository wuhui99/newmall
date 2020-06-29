<template>
    <div class="recommend">
        <img src="../../../assets/img/home/recommend_bg.jpg" alt="" @load="recommendImgLoad">
    </div>
</template>

<script>
    export default {
        name: "HomeRecommend",
        methods:{
            recommendImgLoad(){
                this.$emit('recommendImgLoad')
            }
        }
    }
</script>

<style scoped>
    .recommend{
        width: auto;
    }
    .recommend img{
        width: 100%;
    }
</style>