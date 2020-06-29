<template>
        <tab-bar>
            <tab-bar-item class="tab-item" link="/home">
                <img src="../../../assets/img/tabbar/home.svg" alt="" slot="item-icon">
                <img src="../../../assets/img/tabbar/home_active.svg" alt="" slot="active-item-icon">
                <span slot="item-text">首页</span>
            </tab-bar-item>

            <tab-bar-item class="tab-item" link="/category">
                <img src="../../../assets/img/tabbar/category.svg" alt="" slot="item-icon">
                <img src="../../../assets/img/tabbar/category_active.svg" alt="" slot="active-item-icon">
                <span slot="item-text">分类</span>
            </tab-bar-item>

            <tab-bar-item class="tab-item" link="/cart">
                <img src="../../../assets/img/tabbar/cart.svg" alt="" slot="item-icon">
                <img src="../../../assets/img/tabbar/cart_active.svg" alt="" slot="active-item-icon">
                <span slot="item-text">购物车</span>
            </tab-bar-item>

            <tab-bar-item class="tab-item" link="/profile">
                <img src="../../../assets/img/tabbar/profile.svg" alt="" slot="item-icon">
                <img src="../../../assets/img/tabbar/profile_active.svg" alt="" slot="active-item-icon">
                <span slot="item-text">我的</span>
            </tab-bar-item>
        </tab-bar>
</template>

<script>
    import TabBar from '../../common/tabbar/TabBar'
    import TabBarItem from '../../common/tabbar/TabBarItem'
    export default {
        name: "MainTabBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>
    .tab-item{
        margin-top: 3px;
        text-align: center;
    }
    .tab-item img{
        width: 26px;
        height: 26px;
        vertical-align: middle;
    }
    .tab-item span{
        font-size: 13px;
        position: relative;
        top: -3px;
    }
</style>