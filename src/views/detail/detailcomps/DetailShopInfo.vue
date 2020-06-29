<template>
    <div class="shop-info">
        <div class="shop-logo">
            <img :src="shopInfo.logo" alt="">
            <span>{{shopInfo.name}}</span>
        </div>
        <div class="shop-primary">
            <div class="shop-info-left">
                <div class="left-sell">
                    <div>{{shopInfo.sells}}</div>
                    <span>总销量</span>
                </div>
                <div class="left-num">
                    <div>{{shopInfo.fans}}</div>
                    <span>全部宝贝</span>
                </div>
            </div>
            <div class="shop-info-right">
                <div v-for="(item, index) in shopInfo.score" :key="index">
                    <span>{{item.name}}</span>
                    <span class="score-n" :class="{activeScoreN:item.isBetter}">{{item.score}}</span>
                    <span class="score-t" :class="{activeScoreT:item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
                </div>
            </div>
        </div>
        <div class="shop-extra">
            <span>进店逛逛</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "DetailShopInfo",
        props:{
            shopInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
    .shop-logo{
        margin-top: 15px;
        padding-left: 5px;
    }
    .shop-logo img{
        height: 50px;
        vertical-align: middle;
        border-radius: 50%;
    }
    .shop-logo span{
        margin-left: 5px;
    }
    .shop-primary{
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }
    .shop-primary .shop-info-left{
        flex: 1;
        display: flex;
        text-align: center;
    }
    .shop-primary .shop-info-right{
        flex: 1;
        text-align: left;
        padding-left: 40px;
        font-size: 13px;
    }
    .left-sell, .left-num{
        flex: 1;
    }
    .left-sell div{
        font-size: 20px;
    }
    .score-n{
        color: green;
    }
    .activeScoreN{
        color: red;
    }
    .shop-info-right span{
        margin-right: 5px;
    }
    .score-t{
        background-color: green;
        border-radius: 3px;
        color: #fff;
        padding: 0;
    }
    .activeScoreT{
        background-color: red;
        border-radius: 3px;
    }
    .shop-info-right div{
        margin-bottom: 5px;
    }
    .shop-extra{
        margin-top: 10px;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 3px solid #f6f6f6;
    }
    .shop-extra span{
        background: #f6f6f6;
        padding: 5px 10px;
        border-radius: 5px;
    }
</style>