import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Index from '@/views/Index/Index.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Index
    
    }
  ],
})
