import Toast from './Toast'
const obj = {}


obj.install = function (Vue) {
      // 1.构造组件构造器
    const toastConstructor = Vue.extend(Toast)
    //2.构造对象
    const toast = new toastConstructor()
    //3.将对象挂载到某个div上
    toast.$mount(document.createElement('div'))
    //4.并且渲染页面
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}
export default obj