import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/questons/:classroom',
    name: 'questions',
    component: Questions
  }
]

const router = new VueRouter({
  routes
})

export default router
