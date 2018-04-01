import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Cinema from '@/components/Cinema'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[{
        path: '',
        name: 'login',
        component: Login,
      },{
        path: '/login',
        name: 'login',
        component: Login,
      },{
        path: '/register',
        name: 'register',
        component: Register,
      }]
    },{
      path: '/home',
      name: 'home',
      component: Home,
    },{
      path: '/404',
      name: '404',
      component: NotFound,
    },{
      path: '/cinema',
      name: 'cinema',
      component: Cinema,
    },{
      path: '/me',
      name: 'me',
      component: Me,
    }
  ]
})
