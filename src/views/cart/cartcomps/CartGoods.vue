<template>
    <div class="cart-goods">
        <cart-goods-item v-for="(item, index) in CartList"
                         :key="index"
                         :cart-list-item="item"></cart-goods-item>
    </div>
</template>

<script>
    import CartGoodsItem from "./CartGoodsItem"
    import {mapGetters} from 'vuex'
    export default {
        name: "CartGoods",
        components:{
            CartGoodsItem
        },
        computed:{
            ...mapGetters(['CartList'])
        }
    }
</script>

<style scoped>
    .cart-goods{
        width: auto;
        margin-top: 5px;
        padding: 3px 5px;
    }
</style>