import {request} from "./request"


export function DetailRotationData(iid) {
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
//定义商品基本信息的类
export class GoodsBaseInfo {
    constructor(itemInfo, columns, shopInfo) {
        //标题
        this.title = itemInfo.title
        //现价
        this.newPrice = itemInfo.lowNowPrice
        //原价
        this.oldPrice = itemInfo.oldPrice
        //折扣
        this.discount = itemInfo.discountDesc
        //销量.收藏.发货
        this.columns = columns
        //服务
        this.services = shopInfo.services

    }
}
//定义店铺基本信息
export class ShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.sells = shopInfo.cSells;
        this.fans = shopInfo.cFans;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
//定义商品参数
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}