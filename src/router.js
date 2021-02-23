import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tip from './views/Tip.vue'
  
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
