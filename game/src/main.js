import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Game from './game'

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
