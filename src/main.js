import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from '@/comm/axios'
Vue.prototype.$axios = axios;
Vue.use(Mint);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
