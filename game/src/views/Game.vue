<template>
  <v-container>
    <v-row>
      <h1>
        This is an about page <br>
        :{{$route.query.player1}}: <br>
        :{{$route.query.player2}}:
      </h1>
      <div>
        <v-btn v-if="!start" v-on:click="startGame">Start</v-btn>
        <canvas id="gameScreen" ref="gameScreen" width="1000" height="600"/>
        <!--img id="img_ball" src="assets/drawables/" style="display:none"/-->
        <v-row>
          <v-col>
            <v-row>
              <h1 style="margin-left: 240px"><pre>player 1:  {{ getScoreP1() }}</pre></h1>
              <h1 style="margin-left: 125px"><pre>{{ getScoreP2() }}  :player 2</pre></h1>
            </v-row>
            <h1 style="margin-left: 400px">{{ getVictory() }}</h1>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Game',
  data: () => ({
    start: false,
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

      this.$game.start()
      requestAnimationFrame(this.gameLoop)
    },
    gameLoop (timestamp) {
      const deltaTime = timestamp - this.lastTime
      this.lastTime = timestamp
      this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
      this.$game.update(deltaTime)
      this.$game.draw(this.ctx)
      requestAnimationFrame(this.gameLoop)
    }
  }
}
</script>
<style lang="css">
  #gameScreen {
    border: 1px solid black
 }
</style>
