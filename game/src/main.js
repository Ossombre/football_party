import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Game from './game'

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const GAME_WIDTH = 1000
const GAME_HEIGHT = 600

const game = new Game(GAME_WIDTH, GAME_HEIGHT)

Vue.prototype.$game = game
new Vue({
  router,
  vuetify,
  data: { game: game },
  render: h => h(App)
}).$mount('#app')

const canvas = document.getElementById('gameScreen')
const ctx = canvas.getContext('2d')

game.start()

let lastTime = 0
function gameLoop (timestamp) {
  const deltaTime = timestamp - lastTime
  lastTime = timestamp
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  game.update(deltaTime)
  game.draw(ctx)

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
