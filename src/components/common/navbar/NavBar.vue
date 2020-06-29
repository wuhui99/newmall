<template>
    <div class="nav-bar">
        <div class="nav-bar-left"><slot name="nav-bar-left"></slot></div>
        <div class="nav-bar-center"><slot name="nav-bar-center"></slot></div>
        <div class="nav-bar-right"><slot name="nav-bar-right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .nav-bar{
        width: auto;
        height: 44px;
        display: flex;
        text-align: center;
        line-height: 44px;
    }
    .nav-bar-left,.nav-bar-right{
        width: 60px;
        height: inherit;
    }
    .nav-bar-center{
        flex: 1;
    }
</style>