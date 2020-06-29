<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item, index) in topImg" :key="index">
            <img :src="item" alt="" @load="DetailSwiperLoad">
        </swiper-item>
    </swiper>
</template>

<script>
    import swiper from '../../../components/common/swiper/Swiper'
    import swiperItem from '../../../components/common/swiper/SwiperItem'
    export default {
        name: "DetailSwiper",
        components:{
            swiper,
            swiperItem
        },
        data(){
            return {
                flag:false
            }
        },
        props:{
            topImg:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            DetailSwiperLoad(){
                if(!this.flag){
                    this.$emit('DetailSwiperLoad')
                    this.flag = true
                }
            }
        }
    }
</script>

<style scoped>
    .detail-swiper{
        width: auto;
        height: 300px;
    }
    .detail-swiper img{
        width: 100%;
        height: 100%;
    }
</style>