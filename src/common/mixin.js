//当多个组件需要使用公共的组件时，不仅仅只是用到组件对象，而且也用到了该组件相应的附加方法，则将全部合并在mixin中

// 比如本项目中的“回到顶部”组件BackTop，不仅仅是用到了vue组件，也用到了相应的数据，方法等，可以抽取方法整体，但是不能抽取方法内部的语句
// 但是可以抽取mounted函数中的语句



//下面是BackTop组件的混入
import BackTop from '../components/content/backtop/BackTop'

export const BackTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            showBackTop:false,
        }
    },
    methods:{
        backTop(){
            this.$refs.scroll.backTop(0,0,500)
        }
    }
}