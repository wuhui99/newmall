<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        components:{
            BScroll
        },
        data(){
            return {
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
        },

        //一旦template被挂载后则执行mounted函数
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                //定义再滚动组件时可以记录滚动位置
                probeType: this.probeType,
                click:true,
                pullUpLoad: this.pullUpLoad
            })
            this.scroll.on('scroll',position=>{
                this.$emit('Scroll',position)
            })
            this.scroll.on('pullingUp',()=>{
                this.$emit('PullingUp')
            })
        },
        methods:{
            //使页面刷新
            refresh(){
                this.scroll && this.scroll.refresh()
            },
            //使滚动页面回到顶部
            backTop(x,y,time){
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            //完成上拉加载更多事件
            finishPullingUp(){
                this.scroll &&  this.scroll.finishPullUp()
            },
            //打印位置坐标
            getSaveY(){
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #fff;
    }
</style>