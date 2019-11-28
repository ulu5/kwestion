import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueCookies)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

VueCookies.config('7d')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/classrooms',
    name: 'classrooms',
    component: Questions
  }
]

const router = new VueRouter({
  routes
})

export default router
