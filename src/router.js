import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Index from '@/views/Index/Index.vue'
import Home from '@/views/Home/Home.vue'
import UserAdd from '@/views/UserAdd/UserAdd.vue'
import UserManage from '@/views/UserManage/UserManage.vue'
import EditPassword from '@/views/EditPassword/EditPassword.vue'
import GoodsManage from '@/views/GoodsManage/GoodsManage.vue'
import GoodsAdd from '@/views/GoodsAdd/GoodsAdd.vue'

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
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        },
        {
          name: 'useradd',
          path: '/useradd',
          component: UserAdd
        },
        {
          name: 'usermanage',
          path: '/usermanage',
          component: UserManage
        },
        {
          name: 'editpassword',
          path: '/editpassword',
          component: EditPassword
        },
        {
          name: 'GoodsManage',
          path: '/goodsmanage',
          component: GoodsManage
        },
        {
          name: 'GoodsAdd',
          path: '/goodsadd',
          component: GoodsAdd
        }
      ]
    }
  ],
})
