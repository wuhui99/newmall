<template>
    <div class="home-feature">
        <div v-for="(item,index) in featureData" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="featureImgLoad">
                <span>{{item.title}}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeFeatureView",
        props:{
            featureData:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            featureImgLoad(){
                this.$emit('featureImgLoad')
            }

        }
    }
</script>

<style scoped>
    .home-feature{
        width: auto;
        display: flex;
        text-align: center;
    }
    .home-feature div{
        flex: 1;
    }
    .home-feature img{
        width: 100%;
    }
</style>