<template>
    <div class="detail-bottom-bar">
        <div class="bottom-bar-left">
            <div class="service">
                <img src="../../../assets/img/bottom/service.jpg" alt="">
                <div>客服</div>
            </div>
            <div class="shop">
                <img src="../../../assets/img/bottom/shop.jpg" alt="">
                <div>店铺</div>
            </div>
            <div class="collect">
                <img src="../../../assets/img/bottom/collect.jpg" alt="">
                <div>收藏</div>
            </div>
        </div>
        <div class="bottom-bar-center" @click="bottomBarClick">加入购物车</div>
        <div class="bottom-bar-right">购买</div>
    </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
        methods:{
            bottomBarClick(){
                //点击购物车跳转到购物车页面
                this.$emit('addCart')
            }
        }
    }
</script>

<style scoped>
    .detail-bottom-bar{
        width: auto;
        height: 44px;
        display: flex;
    }
    .bottom-bar-center{
        flex: 1;
        line-height: 44px;
        text-align: center;
        background: yellow;
        font-size: 15px;
    }
    .bottom-bar-right{
        flex: 1;
        line-height: 44px;
        text-align: center;
        color: #fff;
        background: #ff5777;
        font-size: 15px;
    }
    .bottom-bar-left{
        flex: 2;
        display: flex;
        margin-top: 2px;
    }
    .service, .shop, .collect{
        flex: 1;
        text-align: center;
        font-size: 13px;
    }
    .service img{
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }
    .shop img{
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }
    .collect img{
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }

</style>