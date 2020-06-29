<template>
    <div class="detail-base-info" v-if="Object.keys(baseInfo).length !== 0" >
        <div class="info-title">{{baseInfo.title}}</div>
        <div class="info-price">
            <span class="n-price">{{baseInfo.newPrice}}</span>
            <span class="o-price">{{baseInfo.oldPrice}}</span>
            <span class="discount">{{baseInfo.discount}}</span>
        </div>
        <div class="info-column">
            <div class="column-left">{{baseInfo.columns[0]}}</div>
            <div>{{baseInfo.columns[1]}}</div>
            <div class="column-right">{{baseInfo.services[baseInfo.services.length-1].name}}</div>
        </div>
        <div class="info-services">
            <div v-for="index in (baseInfo.services.length-1)" :key="index">
                <img :src="baseInfo.services[index-1].icon">
                <span>{{baseInfo.services[index-1].name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props:{
            baseInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
    .info-title{
        margin-top: 5px;
        text-align: left;
        padding: 5px 10px;
        font-size: 15px;
    }
    .info-price{
        padding: 5px 10px;
    }
    .n-price{
        color: #ff5777;
    }
    .o-price{
        font-size: 12px;
        text-decoration-line: line-through;
        margin-left: 5px;
    }
    .discount{
        background-color: #ff5777;
        color: #fff;
        position: relative;
        top: -7px;
        font-size: 13px;
        margin-left: 4px;
        border-radius: 3px;
    }
    .info-column{
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 3px solid #f6f6f6;
    }
    .info-column div{
        flex: 1;
        font-size: 14px;
        color: #222;
    }
    .info-column .column-left{
        text-align: left;
    }
    .info-column .column-right{
        text-align: right;
    }
    .info-services{
        margin-top: 15px;
        display: flex;
        font-size: 12px;
        padding-left: 10px;
        padding-bottom: 15px;
        border-bottom: 3px solid #f6f6f6;
    }
    .info-services div{
        flex: 1;
    }
    .info-services img{
        width: 15px;
        height: 15px;
        vertical-align: middle;
    }
    .info-services span{
        margin-left: 2px;
    }

</style>