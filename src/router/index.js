import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

return originalPush.call(this, location).catch(err => err)

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive: false, 
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      keepAlive: false, 
    },
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue'),
    meta:{
      keepAlive: false, 
    },
  },
  {
    path: '/salary',
    name: 'salary',
    component: () => import(/* webpackChunkName: "about" */ '../components/salary.vue'),
    meta:{
      keepAlive: true, //此组件要被缓存
    }
  },
  {
    path: '/author',
    name: 'authorPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/authorPage.vue'),
    meta:{
      keepAlive: true, 
    },
  },
  
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
