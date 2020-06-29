<template>
    <Swiper class="home-swiper" >
        <SwiperItem v-for="(item, index) in rotationData" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="swiperImgLoad">
            </a>
        </SwiperItem>
    </Swiper>
</template>

<script>
    import Swiper from '../../../components/common/swiper/Swiper'
    import SwiperItem from '../../../components/common/swiper/SwiperItem'
    export default {
        name: "HomeSwiper",
        components:{
            Swiper,
            SwiperItem
        },
        data(){
            return {
                flag:true
            }
        },
        props:{
            rotationData:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            swiperImgLoad(){
                if(this.flag){
                    this.$emit('swiperImgLoad')
                    this.flag = false
                }

            }
        }
    }
</script>

<style scoped>
    .home-swiper{
        width: auto;
    }
    .home-swiper img{
        height: 100%;
    }
</style>