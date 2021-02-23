import Vue from 'vue'
import Router from 'vue-router'
import Wallet from './views/Wallet.vue'
import Tip from './views/Tip.vue'
  
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/tip',
      name: 'tip',
      component: Tip
    },

     
     
    {
      path: '/*',
      component: NotFound
    },
  ]
})
