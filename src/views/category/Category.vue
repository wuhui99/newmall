<template>
    <div id="category">
        <category-nav-bar class="category-nav-bar">
            <div slot="nav-bar-center">商品分类</div>
        </category-nav-bar>
    </div>
</template>

<script>
    import CategoryNavBar from '../../components/common/navbar/NavBar'
    export default {
        name: "Category",
        components:{
            CategoryNavBar
        }
    }
</script>

<style scoped>
    .category-nav-bar{
        background-color: #ff8198;
        color: #fff;
        font-weight: bold;
    }
</style>