<template>
    <div class="cart-goods-item">
        <div class="logo" @click="logoClick">
            <img :class="{checkLogo:cartListItem.checked}" src="../../../assets/img/cart/tick.svg" alt="">
        </div>
        <div class="item-left">
            <img :src="cartListItem.img" alt="">
        </div>
        <div class="item-right">
            <div class="right-title">{{cartListItem.title}}</div>
            <div class="right-price-number">
                <div class="item-price">{{cartListItem.price}}</div>
                <div class="item-number">
                    <button @click="SubNumber">-</button>
                    <span class="number">{{cartListItem.counter}}</span>
                    <button @click="AddNumber">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CartGoodsItem",
        props:{
            cartListItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            SubNumber(){
                this.cartListItem.counter--
                if(this.cartListItem.counter<0){
                    this.cartListItem.count = 0
                }
            },
            AddNumber(){
                this.cartListItem.counter++
            },
            logoClick(){
                this.cartListItem.checked = !this.cartListItem.checked
                this.checked = this.cartListItem.checked
            }
        }
    }
</script>

<style scoped>
    .cart-goods-item{
        display: flex;
        margin-top: 1px;
        border-bottom: 3px solid #f6f6f6;
        width: 100%;
    }
    .logo{
        width: 40px;
        text-align: center;
    }
    .logo img{
        width: 15px;
        height: 15px;
        vertical-align: middle;
        position: relative;
        top: 30%;
        border: 2px solid #f6f6f6;
        border-radius: 50%;
    }
    .item-left{
        flex: 1;
        text-align: left;
    }
    .item-left img{
        width: 70%;
        vertical-align: middle;
        border-radius: 5px;
    }
    .item-right{
        flex: 2;
        font-size: 15px;
    }
    .right-price-number{
        margin-top: 15px;
        display: flex;
    }
    .right-price-number div{
        flex: 1;
    }
    .item-price{
        text-align: left;
    }
    .item-number{
        text-align: center;
    }
    .number{
        margin-left: 3px;
        margin-right: 3px;
    }
    .checkLogo{
        background-color: #ff5777;
    }
</style>