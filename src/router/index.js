import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'

Vue.use(VueCookies)
Vue.use(VueRouter)

VueCookies.config('7d')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/classrooms/:classroom',
    name: 'classrooms',
    component: Questions
  }
]

const router = new VueRouter({
  routes
})

export default router
