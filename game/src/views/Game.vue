<template>
  <div>
    <canvas id="gameScreen" width="1000" height="600"/>
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
</template>
<script>
export default {
  name: 'Game',
  data: () => ({}),
  methods: {
    getScoreP1 () {
      return this.$game.scoreP2
    },
    getScoreP2 () {
      return this.$game.scoreP1
    },
    getVictory () {
      return this.$game.victory
    }
  }
}
</script>
<style lang="css">
  #gameScreen {
    border: 1px solid black
 }
</style>
