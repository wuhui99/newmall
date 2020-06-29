<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="active-item-icon"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            link:{
                type:String,
                required:true
            }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.link)!==-1
            },
            activeStyle(){
                return this.isActive ? {color:'red'}:{}
            }
        },
        methods:{
            itemClick(){
                this.$router.push(this.link)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        flex: 1;
    }
</style>