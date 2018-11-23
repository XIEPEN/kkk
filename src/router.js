import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      component: Index,
      // 子路由
      children: [
        // 默认子组件
        {
          name: 'home',
          path: '',
          component: Home
        }
      ]
      }
    
  ]
})
