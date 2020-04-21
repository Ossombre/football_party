<template>
  <v-container fluid>
    <v-row style="margin-left:100pt">
      <v-col >
        <v-row>
          <v-card color="blue" height="125pt" width="400pt">
            <v-row>
              <v-col cols="4">
                <v-img
                  :src='require("../assets/" + $route.query.player1 + ".png")'>
                </v-img>
              </v-col>
              <v-col cols="4" style="margin-top: 25pt;">
                <v-card-title v-html="$route.query.player1.replace('_',' ').replace(' ','<br>')">
                </v-card-title>
              </v-col>
              <v-col cols="4" style="margin-top: 40pt;">
                <h1>{{getScoreP1()}}</h1>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <h1 style="margin-top:50pt;margin-left:170pt">VS</h1>
      </v-col>
      <v-col style="margin-right:120px;">
        <v-row>
          <v-card color="red" height="125pt" width="400pt">
            <v-row>
              <v-col cols="4" style="margin-top: 40pt;">
                <h1 style="margin-left:75pt">{{getScoreP2()}}</h1>
              </v-col>
              <v-col cols="4" style="margin-top: 20pt;">
                <v-card-title v-html="$route.query.player2.replace('_',' ').replace(' ','<br>')">
                </v-card-title>
              </v-col>
              <v-col cols="4">
                <v-img
                  :style="`transform: rotate(180deg);`"
                  :src='require("../assets/" + $route.query.player2 + ".png")'>
                </v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row >
      <v-card style="margin-left: 320pt">
        <v-overlay style="text-align: center" v-if="!start || this.$game.victory != ''" absolute=true>
          <h1 style="display: block" v-if="this.$game.victory != ''">{{getVictory()}}</h1>
          <v-btn  v-on:click="startGame" style="display: inline-block">{{button}}</v-btn>
        </v-overlay>
        <canvas id="gameScreen" ref="gameScreen" width="1000" height="600"/>
        <img id="bg" :src='require("../assets/background.png")' style="display: none">
        <img id="PictureP1" :src='require("../assets/" + $route.query.player2 + ".png")' style="display: none">
        <img id="PictureP2" :src='require("../assets/" + $route.query.player1 + ".png")' style="display: none">
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-btn style="margin-top:25pt" v-on:click="returnBack" color='orange'>
        Return to character selection
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Game',
  data: () => ({
    player: '',
    start: false,
    button: 'Start',
    GAME_WIDTH: 1000,
    GAME_HEIGHT: 600,
    lastTime: 0,
    player1Stat: '',
    player2Stat: '',
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
      for (var k = 0; k < this.player.length; k++) {
        if (this.player[k].name === this.$route.query.player2) {
          this.player1Stat = this.player[k]
        } else if (this.player[k].name === this.$route.query.player1) {
          this.player2Stat = this.player[k]
        }
      }
      const canvas = this.$refs.gameScreen
      this.ctx = canvas.getContext('2d')
      this.start = true
      this.button = 'restart'
      this.$game.start(this.player1Stat, this.player2Stat)
      this.$game.victory = ''
      requestAnimationFrame(this.gameLoop)
    },
    gameLoop (timestamp) {
      const deltaTime = timestamp - this.lastTime
      this.lastTime = timestamp
      this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT)
      this.$game.update(deltaTime)
      this.$game.draw(this.ctx)
      if (this.$game.victory == null || this.$game.victory === '') {
        requestAnimationFrame(this.gameLoop)
      }
    },
    returnBack: function (event) {
      this.start = false
      this.$router.go(-1)
    }
  },
  mounted () {
    axios
      .get('https://bridge.buddyweb.fr/api/footballparty/players')
      .then(response => (this.player = response.data))
  }
}
</script>
<style lang="css">
  #gameScreen {
    border: 1px solid black
 }
</style>
