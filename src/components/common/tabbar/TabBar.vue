<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
    .tab-bar{
        width: auto;
        height: 49px;
        display: flex;
        background-color: #f6f6f6;
    }
</style>