<template>
  <v-container>
    <v-row>
      <v-card>
        <v-overlay v-if="!start || this.$game.victory != ''" absolute=true>
          <v-btn  v-on:click="startGame">{{button}}</v-btn>
          <v-card v-if="this.$game.victory != ''">{{getVictory()}}</v-card>
        </v-overlay>
        <canvas id="gameScreen" ref="gameScreen" width="1000" height="600"/>
        <img id="bg" :src='require("../assets/background.png")' style="display: none">
        <img id="PictureP1" :src='require("../assets/" + $route.query.player2 + ".png")' style="display: none">
        <img id="PictureP2" :src='require("../assets/" + $route.query.player1 + ".png")' style="display: none">
      </v-card>
      <v-row>
        <v-col>
          <v-row>
            <h1 style="margin-left: 240px"><pre>{{$route.query.player1.replace('_',' ')}}:  {{ getScoreP1() }}</pre></h1>
            <h1 style="margin-left: 125px"><pre>{{ getScoreP2() }}  :{{$route.query.player2.replace('_',' ')}}</pre></h1>
          </v-row>
          <h1 id="victory" ref="victory" style="margin-left: 400px">{{getVictory()}}</h1>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Game',
  data: () => ({
    start: false,
    button: 'Start',
    GAME_WIDTH: 1000,
    GAME_HEIGHT: 600,
    lastTime: 0,
    ctx: ''
  }),
  methods: {
    getScoreP1 () {
      return this.$game.scoreP2
    },
    getScoreP2 () {
      return this.$game.scoreP1
    },
    getVictory () {
      return this.$game.victory
    },
    startGame () {
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

      const canvas = this.$refs.gameScreen
      this.ctx = canvas.getContext('2d')
      this.start = true
      this.button = 'restart'

      this.$game.start()
      this.$game.victory = ''
      requestAnimationFrame(this.gameLoop)
    },
    gameLoop (timestamp) {
      const deltaTime = timestamp - this.lastTime
      this.lastTime = timestamp
      this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
      this.$game.update(deltaTime)
      this.$game.draw(this.ctx)
      if (this.$refs.victory.innerText == null || this.$refs.victory.innerText === '') {
        requestAnimationFrame(this.gameLoop)
      }
    }
  }
}
</script>
<style lang="css">
  #gameScreen {
    border: 1px solid black
 }
</style>
