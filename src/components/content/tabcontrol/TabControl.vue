<template>
    <div class="tab-control">
        <div v-for="(item,index) in tabData"
             :key="index"
             @click="tabClick(index)"
             :class="{activeTabStyle: currentIndex === index}">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data(){
            return {
                currentIndex:0
            }
        },
        props:{
            tabData:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            tabClick(index){
                this.currentIndex = index
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .tab-control{
        width: auto;
        height: 40px;
        display: flex;
        text-align: center;
        line-height: 40px;
    }
    .tab-control div{
        flex: 1;
    }
    .activeTabStyle span{
        color: #ff5777;
        border-bottom: 3px solid #ff5777;
        padding-bottom: 3px;
    }
</style>