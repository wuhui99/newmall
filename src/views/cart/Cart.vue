<template>
    <div id="cart">
        <cart-nav-bar class="cart-nav-bar">
            <div slot="nav-bar-center">购物车({{CartListLength}})</div>
        </cart-nav-bar>
            <scroll class="con-tent">
                <cart-goods></cart-goods>
            </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    //在使用vuex中的属性时，可以直接$store.state/$state.getters,亦可以使用下面的方法
    import CartNavBar from '../../components/common/navbar/NavBar'
    import { mapGetters } from 'vuex'
    import CartGoods from "./cartcomps/CartGoods"
    import scroll from '../../components/common/scroll/Scroll'
    import CartBottomBar from './cartcomps/CartBottomBar'
    export default {
        name: "Cart",
        components:{
            CartNavBar,
            CartGoods,
            scroll,
            CartBottomBar
        },
        computed:{
            ...mapGetters(['CartListLength','CartList'])
        }
    }
</script>

<style scoped>
    #cart{
        height: 100vh;
    }
    .cart-nav-bar{
        background-color: #ff8198;
        color: #ffffff;
    }
    .con-tent{
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background-color: #ffffff;
        height: calc(100% - 44px - 49px - 35px);
    }
</style>