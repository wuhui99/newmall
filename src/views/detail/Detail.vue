<template>
    <div id="detail">
<!--        NavBar这里需要掌握：1.点击时需要跳转到对应的组件，此时需要获取组件的offsetTop属性值，但是在哪里获取呢？-->
<!--        不能再created函数中获取，因为此时组件都还没有被创建，-->
<!--        不能在mounted函数中获取，因为在created函数中开始请求数据，但是请求数据是异步操作，mounted函数是挂载后调用-->
<!--        但先要判断数据有没有，因为我们做了v-if的判断，数据可能还没有，组件就不能被创建，所以失败 更别说图片的加载完成-->
<!--        不能在获取数据后获取，因为此时虽然组件有数据可以生成，但是渲染还不一定有，也是失败的-->
<!--        不能在$nextTick函数中获取，因为此时图片还没有被加载，组件时可以被加载了-->
<!--        能在update函数中获取，但是每次更新完数据后都要调用一次，没有达到节流的效果-->
<!--        所以在methods中监听图片加载后获取，但是依旧会频繁调用，所以可以增加防抖操作-->
        <detail-nav-bar @itemClick="itemClick" ref="detailNav"></detail-nav-bar>
        <scroll class="con-tent"
                @Scroll="detailScroll"
                ref="scroll"
                :probe-type="3">
            <!--                注意在监听滚动条位置时一定要将prototype设置为3，因为默认是不发生监听的-->
            <detail-swiper  class="detail-swiper"
                            :top-img="topImg"
                            @DetailSwiperLoad="DetailSwiperLoad"></detail-swiper>
            <detail-base-info :base-info="baseInfo"></detail-base-info>
            <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :commend-info="commendInfo"></detail-comment-info>
            <detail-goods-info :detail-info="goodsInfo"
                               ref="goodsInfo"
                               @detailGoodsInfoImgLoad="detailGoodsInfoImgLoad"></detail-goods-info>
        </scroll>
        <back-top :class="{detailBackTop:showBackTop}" @click.native="backTop"></back-top>
        <detail-bottom-bar class="detail-bottom-bar" @addCart="addCart"></detail-bottom-bar>
    </div>
</template>

<script>
    import DetailNavBar from './detailcomps/DetailNavBar'
    import {DetailRotationData, GoodsBaseInfo, ShopInfo, GoodsParam} from '../../network/detail'
    import {detailRotationData} from "../../../../supermall/src/network/detail"
    import DetailSwiper from './detailcomps/DetailSwiper'
    import DetailBaseInfo from './detailcomps/DetailBaseInfo'
    import scroll from '../../components/common/scroll/Scroll'
    import DetailShopInfo from './detailcomps/DetailShopInfo'
    import DetailGoodsInfo from './detailcomps/DetailGoodsInfo'
    import DetailParamInfo from './detailcomps/DetailParamInfo'
    import DetailCommentInfo from './detailcomps/DetailCommendInfo'
    import DetailBottomBar from './detailcomps/DetailBottomBar'
    import {BackTopMixin} from '../../common/mixin'
    import {debounce} from "../../common/utils";

    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            DetailRotationData,
            DetailSwiper,
            GoodsBaseInfo,
            DetailBaseInfo,
            scroll,
            DetailShopInfo,
            ShopInfo,
            DetailGoodsInfo,
            GoodsParam,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            debounce
        },
        data(){
            return {
                iid:null,
                topImg:[],
                baseInfo:{},
                shopInfo:{},
                goodsInfo:{},
                paramInfo:{},
                commendInfo:{},
                themeTopYs:[],
                getTopYs:null,
                currentIndex:0,
            }
        },
        mixins:[BackTopMixin],
        created() {
            // 地址在没被创建之前拿到
            this.iid = this.$route.query.iid
            //给防抖函数赋值，使其调用时只调用一次
            this.getTopYs = debounce(()=>{
                this.themeTopYs = []
                this.themeTopYs.push(0)
                //获取参数的属性值
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                //获取评论的属性值
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                //获取推荐的属性值
                this.themeTopYs.push(this.$refs.goodsInfo.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
            },300)
        },
        mounted() {
            this.getDetailRotationData(this.iid)
        },
        methods:{
            getDetailRotationData(iid){
                detailRotationData(iid).then(res=>{
                    console.log(res)
                    const result = res.result
                    // 获取详情页轮播图数据
                    this.topImg = result.itemInfo.topImages

                    // 获取商品基本信息
                    this.baseInfo  = new GoodsBaseInfo(result.itemInfo, result.columns, result.shopInfo)

                    // 获取店铺信息
                    this.shopInfo = new ShopInfo(result.shopInfo)

                    // 获取商品详细数据
                    this.goodsInfo = result.detailInfo

                    // 获取商品参数信息
                    this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)

                    //获取评价信息
                    if(result.rate.cRate !== 0)
                    {
                        this.commendInfo = result.rate.list[0]
                    }
                },err=>{
                    console.log(err);
                })
            },

            // 监听轮播图的图片是否被加载完成
            DetailSwiperLoad(){
                // 每次监听到图片加载后都会生成newrefresh变量，都会调用debounce函数，返回函数给refresh变量不管函数内部执不执行，
                // 起码debounce函数每次都执行
                const newrefresh = debounce(this.$refs.scroll.refresh, 500)
                newrefresh()
            },
            //监听商品信息中的图片是否被加载完成
            detailGoodsInfoImgLoad(){
                const newrefresh = debounce(this.$refs.scroll.refresh, 500)
                newrefresh()
            },
            //监听滚动条的滚动位置
            detailScroll(position){
                console.log(position);
                //回到顶部是否显示
                this.showBackTop = (-position.y)>1000
                //在滚动时相应的标题是否发生变化
                // [index=0,index=1]:显示的是商品基本信息index=0
                // [index=1,index=2]:显示的是商品参数信息index=1
                // [index=2,index=3]：显示的是商品评论信息index=2
                // [index=3,index=4]：显示的是商品推荐信息（但是这里索引值是没有4的）index=3
                // 但是这里有几个问题：1.需要分类考虑，在前面3个判断时都是最大最小的闭区间，但是第4个是只要左区间，所以要分开写
                // 2.在滚动区域是每次都会发送位置信息，所以每次都会进入判断，降低性能
                const length = this.themeTopYs.length
                const positionY = -position.y
                for (let i=0; i<length; i++)
                if(this.currentIndex !==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
                    this.currentIndex = i
                    //若是组件的属性，可以通过$el取，但是如果是组件的数据，方法等是可以直接取到的
                    this.$refs.detailNav.currentIndex = this.currentIndex
                }
            },
            //监听NavBar的点击
            itemClick(index){
                //监听图片加载后先进行页面刷新
                const newrefresh = debounce(this.$refs.scroll.refresh, 500)
                newrefresh()
                console.log(this.themeTopYs);
                //刷新完页面后再获取属性值
                this.getTopYs()
                this.$refs.scroll.backTop(0,(-this.themeTopYs[index]),500)
            },
            //点击购物车将数据发送到vuex中
            addCart(){
                console.log('....');
                let product = {}
                product.iid = this.iid
                product.img = this.topImg[0]
                product.title = this.baseInfo.title
                product.price = this.baseInfo.newPrice


                //在添加购物车后，返回结果表明是否已经成功
                this.$store.dispatch('addToCart', product).then(res=>{
                    //当商品成功添加后需要显示返回结果，使用toast插件
                    this.$toast.show(res,1500)
                })
            }
        }
    }
</script>

<style scoped>
    #detail{
        height: 100vh;
        width: auto;
    }
    .con-tent{
        width: auto;
        height: calc(100% - 44px - 44px);
        position: relative;
        z-index: 10;
        overflow: hidden;
        background-color: #ffffff;
    }
    .detail-bottom-bar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: #fff;
    }
    .detailBackTop{
        position: fixed;
        right: 20px;
        bottom: 54px;
        z-index: 100;
    }
</style>