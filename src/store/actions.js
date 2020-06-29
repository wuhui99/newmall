export default {
    addToCart(context, payload){
        return new Promise((resolve, reject)=>{
            let oldProduct = null
            for(let item of context.state.CartList){
                if(payload.iid === item.iid){
                    oldProduct = item
                }
            }
            if(oldProduct){
                context.commit('addCounter',oldProduct)
                resolve('当前商品数量+1')
            }
            else {
                payload.counter = 1
                payload.checked = false
                context.commit('addProduct', payload)
                resolve('新增商品')
            }
        })
    }
}