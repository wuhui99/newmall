<template>
    <nav-bar class="detail-nav">
        <div class="nav-left" slot="nav-bar-left" @click="detailNavLeftClick">
            <img src="../../../assets/img/common/back.svg" alt="">
        </div>
        <div class="nav-center" slot="nav-bar-center">
            <div @click="detailNavRightClick(index)"
                 :class="{activeNavCenter:currentIndex === index}"
                 v-for="(item, index) in navTitle"
                 :key="index">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from '../../../components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return {
                navTitle:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            detailNavLeftClick(){
                this.$router.go(-1)
            },
            detailNavRightClick(index){
                this.currentIndex = index
                this.$emit('itemClick',index)
            }
        }
    }
</script>

<style scoped>
    .detail-nav{
        background-color: #f6f6f6;
        color: #222;
    }
    .nav-center{
        display: flex;
        text-align: center;
    }
    .nav-center div{
        flex: 1;
    }
    .nav-left img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .activeNavCenter{
        color: #ff5777;
    }
</style>