export default {
    addCounter(state, payload){
        payload.counter +=1
    },
    addProduct(state, payload){
        state.CartList.push(payload)
    }
}