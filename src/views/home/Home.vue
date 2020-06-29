<template>
    <div id="home">
        <home-nav-bar class="home-nav">
            <div slot="nav-bar-center"><span>购物街</span></div>
        </home-nav-bar>
<!--        这部分是需要滚动的，滚动的地方有几点要注意：
            1.滚动时会出现卡顿的情况，是因为滚动内容因为没有完全加载完成，
            导致滚动区域的高度计算有偏差，所以需要监听滚动区域内的所有图片的加载情况后再刷新页面,此时最好在组件被挂载
            到页面之前就开始监听，因为这样刷新才不会出现卡顿，可以在mounted函数中监听或者是在组件的方法中监听，但是
            不能在created函数中，因为此时scroll组件还没有被创建出来
            2.再调用scroll组件内的方法时先要证实一下scroll组件是否被创建出来，否则调用会报错，因为入口组件的mounted函数是先被加载的
            渲染好挂载到页面上后里面的组件可能还没有生成页面被挂载到页面上，所以此时各个组件的函数是分开执行的，所以可能取不到组件
            3.每次监听完图片加载后需要调用一次refresh函数，若多张图片加载，需要多次调用refresh函数，显然是无法优化
            性能，所以可以封装一个防抖函数debounce函数封装在common中的utils中-->

<!--       在取到组件tabControl的offsetTop属性时遇到在哪里取的问题：在mounted函数中获取，但是此时取到的是不准确的，因为mounted-->
<!--       函数中组件是被创建出来了，但是图片等元素还未被加载，最好在methods中监听，因为方法在created函数中就被执行-->
        <tab-control :tab-data="tabControlData"
                     @tabClick="tabClick"
                     ref="TTabControl"
                     :class="{showTabControl:showTabControl}"></tab-control>
        <scroll class="con-tent"
                :probe-type="3"
                @Scroll="homeScroll"
                ref="scroll"
                :pull-up-load="true"
                @PullingUp="homePullingUp">
            <home-swiper :rotation-data="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
            <home-feature-view class="home-feature"
                               :feature-data="recommends"
                               @featureImgLoad="featureImgLoad"></home-feature-view>
            <home-recommend class="home-recommend"
                            @recommendImgLoad="recommendImgLoad"></home-recommend>
            <tab-control :tab-data="tabControlData"
                         @tabClick="tabClick" ref="BTabControl"></tab-control>
            <home-goods-list :goods-list="showGoodsList" @goodlistImgLoad="goodlistImgLoad"></home-goods-list>
        </scroll>
        <back-top :class="{homeBackTop:showBackTop}" @click.native="backTop"></back-top>
    </div>
</template>

<script>
    import HomeNavBar from "../../components/common/navbar/NavBar"
    import {HomeRotationData, HomeGoodsData} from "../../network/home"
    import HomeSwiper from './homecomps/HomeSwiper'
    import HomeFeatureView from "./homecomps/HomeFeatureView"
    import HomeRecommend from './homecomps/HomeRecommend'
    import TabControl from '../../components/content/tabcontrol/TabControl'
    import Scroll from '../../components/common/scroll/Scroll'
    import HomeGoodsList from '../../components/content/goods/GoodsList'
    import {debounce} from "../../common/utils"
    import {BackTopMixin} from '../../common/mixin'

    export default {
        name: "Home",
        components:{
            HomeNavBar,
            HomeRotationData,
            HomeSwiper,
            HomeFeatureView,
            HomeRecommend,
            TabControl,
            Scroll,
            HomeGoodsList,
            HomeGoodsData,
            debounce,
        },
        mixins:[BackTopMixin],
        data(){
            return {
                banners:[],
                recommends:[],
                tabControlData:['流行','精选','热销'],
                goodsList:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]}
                },
                currentType:'pop',
                // 下面的代码在mixins中
                // showBackTop:false,
                showTabControl:false,
                swiperImgFlag:false,
                featureImgFlag:false,
                recommendImgFlag:false,
                tabControlOffsetTop:0,
                homeSaveY:0
            }
        },
        computed:{
            showGoodsList(){
                return this.goodsList[this.currentType].list
            },
        },
        created() {
            this.getHomeRotationData()
            this.getHomeGoodsData('pop')
            this.getHomeGoodsData('new')
            this.getHomeGoodsData('sell')
        },
        mounted() {
            // 可以在方法中监听图片加载或者在mounted函数中监听图片加载，无论是在哪里调用滚动组件，都要进行组件的判断，但是不能在created
            // 函数中写，因为created函数是在组件创建完后就调用，此时事件一定收不到，而在mounted函数中可能首页挂载前子组件就已经进入了原生DOM
            // 中，此时首页再进行挂载后一定会监听到图片的加载，但是不一定滚动效果产生，所以还要再滚动组件中在判断
            const newrefresh = debounce(this.$refs.scroll.refresh, 500)
            this.$bus.$on('goodlistImgLoad',()=>{
                newrefresh()
            })
        },
        activated() {
            //该步骤是将组件刷新，重新架子啊，这样就可以滚动了
            this.$refs.scroll.refresh()
            // 该步骤可以使得回到原来的位置，但是不一定其他的组件或者图片全部被加载完成，此时可能会出现无法滚动的位置，位置是回到原来的
            // 位置，但是滚顶就会卡顿，因为滚动是实时变化位置的
            this.$refs.scroll.backTop(0,this.homeSaveY,0)

        },
        deactivated() {
            // 获取滚动组件的位置用getSaveY方法
            this.homeSaveY = this.$refs.scroll.getSaveY()
        },
        methods:{
            //网络请求：获取首页轮播图以及展示推荐商品数据
            getHomeRotationData(){
                HomeRotationData().then(res=>{
                    console.log(res);
                    //存放的是轮播图的数据
                    this.banners = res.data.data.banner.list
                    //展示页面的数据
                    this.recommends = res.data.data.recommend.list
                },err=>{
                    console.log(err);
                })

            },
            getHomeGoodsData(type){
                const page = this.goodsList[type].page +1
                HomeGoodsData(type, page).then(res=>{

                    const result = res.data
                    console.log(result);
                    this.goodsList[type].list.push(...result.data.list)
                    this.goodsList[type].page +=1

                    this.$refs.scroll.finishPullingUp()
                },err=>{
                    console.log(err);
                })
            },
            //获取滚动事件位置
            homeScroll(position){
                //console.log(position);

                //在上拉滚动条一定距离之后使回到顶部按钮显示
                this.showBackTop=(-position.y)>1000

                // 获取tabControl组件的offsetTop属性，并判断滚动距离大于offsetTop值就显出来
                this.showTabControl = (-position.y)>this.tabControlOffsetTop
            },
            //获取当前tabControl导航栏点击哪个商品类别
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.TTabControl.currentIndex = index
                this.$refs.BTabControl.currentIndex = index
            },
            //获取swiper的图片加载情况
            swiperImgLoad(){
                const newrefresh = debounce(this.$refs.scroll.refresh, 500)
                newrefresh()
                this.swiperImgFlag = true
                if(this.featureImgFlag && this.recommendImgFlag){
                    this.tabControlOffsetTop = this.$refs.BTabControl.$el.offsetTop
                }
                //console.log(this.tabControlOffsetTop);
            },
            //获取recommend的图片加载情况
            recommendImgLoad(){
                const newrefresh = debounce(this.$refs.scroll.refresh,500)
                newrefresh()
                this.recommendImgFlag = true
                if(this.featureImgFlag && this.swiperImgFlag){
                    this.tabControlOffsetTop = this.$refs.BTabControl.$el.offsetTop
                }
                //console.log(this.tabControlOffsetTop);
            },
            //获取feature的图片加载情况
            featureImgLoad(){
                const newrefresh = debounce(this.$refs.scroll.refresh, 500)
                newrefresh()
                this.featureImgFlag = true
                if(this.recommendImgFlag && this.swiperImgFlag){
                    this.tabControlOffsetTop = this.$refs.BTabControl.$el.offsetTop
                }
                console.log(this.tabControlOffsetTop);
            },
            //获取商品展示的图片加载情况
            goodlistImgLoad(){
                const newrefresh = this.$refs.scroll.refresh
                newrefresh()
            },
            //回到顶部事件,下面的代码合并在mixins中
            // backTop(){
            //     this.$refs.scroll.backTop(0,0,500)
            // },
            //上拉加载更多事件
            homePullingUp(){
                this.getHomeGoodsData(this.currentType)
            }

        }
    }
</script>

<style scoped>
    #home{
        /*设置首页的高度为view-port*/
        height: 100vh;
        position: relative;
        background-color: #fff;
    }
    .home-nav{
        font-size: 15px;
        background-color: #ff8198;
        color: #fff;
    }
    .home-feature{
        margin-top: 10px;
    }
    .home-recommend{
        margin-top: 20px;
    }
    .con-tent{
        width: auto;
        height: calc(100% - 44px - 49px);
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px;
        background-color: #fff;
        overflow: hidden;
    }
    .homeBackTop{
        position: fixed;
        right: 20px;
        bottom: 54px;
    }
    .showTabControl{
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
        z-index: 10;
        background-color: #fff;
    }
</style>