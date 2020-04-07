import Vue from 'vue'
import VueRouter from 'vue-router'
import SelectPlayer from '../views/SelectPlayer.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SelectPlayer',
    component: SelectPlayer
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
]

const router = new VueRouter({
  routes
})

export default router
