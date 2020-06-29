<template>
    <div class="goods-list-item" @click="goodsListClick">
        <div class="item-img">
            <img :src="goods.show.img" alt="" @load="goodlistImgLoad">
        </div>
        <div class="item-info">
            <div class="info-p">{{goods.title}}</div>
            <div class="info-content">
                <span class="info-price">{{goods.price}}</span>
                <img src="../../../assets/img/common/collect.svg" alt="">
                <span class="info-cfav">{{goods.cfav}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            goods:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        methods:{
            goodlistImgLoad(){
                this.$bus.$emit('goodlistImgLoad')
            },
            goodsListClick(){
                this.$router.push({
                    path:'/detail',
                    query:{
                        iid:this.goods.iid
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .goods-list-item img{
        width: 100%;
        border-radius: 5px;
    }
    .item-img, .item-info{
        width: 100%;
    }
    .goods-list-item{
        width: 45%;
        text-align: center;
    }
    .info-p{
        width: auto;
        font-size: 15px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .info-price{
        color: #ff5777;
        font-size: 15px;
    }
    .info-content img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        position: relative;
        top: -4px;
    }
</style>