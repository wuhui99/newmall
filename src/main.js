import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import Toast from './components/content/toast/index'
// 1.安装Toast组件
Vue.use(Toast)


Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
