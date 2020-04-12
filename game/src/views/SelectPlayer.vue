<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color='orange' style="padding:20px">
          <v-row justify="center">
            <h1 style="font-color:blue">Player 1</h1>
          </v-row>
          <v-row dense>
            <v-col align-self="start" cols="7">
              <v-row v-for='data in players.data' :key="data.name">
                <v-col>
                  <v-card v-on:click="selectPlayer"  :dark="selectLeft.name == data.name" :disabled="selectRight.name == data.name">
                    <v-card-title>
                      {{data.name.replace('_',' ')}}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-row>
                <v-col>
                  <v-card v-if="selectLeft != ''">
                    <v-img
                      :src='require("../assets/" + selectLeft.name + ".png")'>
                    </v-img>
                    <v-card-title v-html="selectLeft.name.replace('_',' ').replace(' ','<br>')">
                    </v-card-title>
                    <v-card-text>
                      Speed: {{selectLeft.speed}} <br>
                      Height: {{selectLeft.height}} <br>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="orange"  style="padding:20px">
          <v-row justify="center">
            <h1 style="font-color:red">Player 2</h1>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-row align="baseline">
                <v-col>
                  <v-card v-if="selectRight != ''">
                    <v-img
                      :style="`transform: rotate(180deg);`"
                      :src='require("../assets/" + selectRight.name + ".png")'>
                    </v-img>
                    <v-card-title v-html="selectRight.name.replace('_',' ').replace(' ','<br>')">
                    </v-card-title>
                    <v-card-text>
                      Speed: {{selectRight.speed}} <br>
                      Height: {{selectRight.height}} <br>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col align-self="end" cols="7">
              <v-row  v-for='player in players.data' :key="player.name">
                <v-col>
                  <v-card v-on:click="selectPlayer" :dark="selectRight.name == player.name" :disabled="selectLeft.name == player.name">
                  <v-card-title>
                    {{player.name.replace('_',' ')}}
                  </v-card-title>
                </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="displayAlert" color="red">
      {{alert}}
      <v-btn
        color="white"
        text
        @click="displayAlert = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-row justify="center">
      <v-btn v-on:click="validate" color='orange'>
        validate
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWord',

  data: () => ({
    players: '',
    test: '',
    selectLeft: '',
    selectRight: '',
    alert: '',
    displayAlert: false
  }),
  methods: {
    selectPlayer: function (event) {
      var keys = Object.keys(this.players.data)
      for (var i = 0; i < keys.length; i++) {
        if (this.players.data[keys[i]].name.replace('_', ' ').replace(/\s/g, '') === event.toElement.innerText.replace('_', ' ').replace(/\s/g, '')) {
          console.log('ok')
          if (event.path[4]._prevClass.endsWith('start')) {
            this.selectLeft = this.players.data[keys[i]]
          } else if (event.path[4]._prevClass.endsWith('end')) {
            this.selectRight = this.players.data[keys[i]]
          }
        }
      }
    },
    validate: function (event) {
      if (this.selectRight.name !== undefined && this.selectLeft.name !== undefined) {
        this.$router.push({ path: 'Game', query: { player1: this.selectRight.name.replace(/\s/g, ''), player2: this.selectLeft.name.replace(/\s/g, '') } })
      } else {
        this.alert = 'You must choose two players.'
        this.displayAlert = true
      }
    }
  },
  mounted () {
    axios
      .get('https://bridge.buddyweb.fr/api/footballparty/players')
      .then(response => (this.players = response))
  }
}
</script>
