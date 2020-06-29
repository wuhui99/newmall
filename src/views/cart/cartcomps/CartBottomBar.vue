<template>
    <div class="cart-bottom-bar">
        <div class="left" @click="bottomLogoClick">
            <img :class="{BottomShow:BottomShow}" src="../../../assets/img/cart/tick.svg" alt="">
            <span>全选</span>
            <span>{{totalPrice}}</span>
        </div>
        <div class="right">去计算({{CartListLength}})</div>
    </div>
</template>

<script>
    import { mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        computed:{
            ...mapGetters(['CartListLength','CartList']),
            //下面的代码是介绍在所有商品中只要有一个未被选中，则统计时也不会被选中，只有所有的商品都被选中，才会选中
            BottomShow(){
                if(this.CartListLength == 0){
                    return false
                }
                else {
                    //find函数是返回的是找到的数值（元素），元素（数值）取反是可以的，并且非零常数取反是false，0取反是true
                    return !(this.CartList.find(item=>{
                        return item.checked == false
                    }))
                }
            },
            totalPrice(){
                //下面的代码是先将商品列表中所有被选中的商品返回，在将新的数组中的数值进行相加，最后保留2位小数
                return '￥' + this.CartList.filter(item=>{
                    return item.checked
                }).reduce((preValue, item)=>{
                    return preValue + item.counter * item.price
                },0).toFixed(2)
            }
        },
        methods:{
            bottomLogoClick(){
                if(this.BottomShow){
                    this.CartList.forEach(item=>{
                         item.checked = false
                    })
                }
                else {
                    this.CartList.forEach(item=>{
                        item.checked = true
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .cart-bottom-bar{
        width: auto;
        height: 35px;
        position: fixed;
        bottom: 49px;
        left: 0;
        right: 0;
        display: flex;
    }
    .left{
        flex:3;
        padding-left: 20px;
        background-color: #f6f6f6;
        line-height: 35px;
    }
    .left img{
        width: 15px;
        height: 15px;
        vertical-align: middle;
        border-radius: 50%;
        border: 2px solid #f6f6f6;
    }
    .right{
        flex: 1;
        background-color: orange;
        color: #ffffff;
        text-align: center;
        line-height: 35px;
    }
    .left span{
        margin-left: 5px;
    }
    .BottomShow{
        background-color: #ff5777;
    }
</style>