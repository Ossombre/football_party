<template>
  <v-container>
    <v-row>
      <v-col align-self="start">
        <v-row v-for='data in players.data' :key="data.name">
          <v-card v-on:click="selectPlayer" style="margin-bottom:20px">
            <v-card-title>
              {{data.name}}
            </v-card-title>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-card v-if="selectLeft != ''">
            <v-card-title>
              {{selectLeft.name}}
            </v-card-title>
            <v-card-text>
              Speed: {{selectLeft.speed}} <br>
              Height: {{selectLeft.height}} <br>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <v-row align="baseline">
          <v-card v-if="selectRight != ''" >
            <v-card-title>
              {{selectRight.name}}
            </v-card-title>
            <v-card-text>
              Speed: {{selectRight.speed}} <br>
              Height: {{selectRight.height}} <br>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col align-self="end">
        <v-row  v-for='player in players.data' :key="player.name">
          <v-card v-on:click="selectPlayer" style="margin-bottom:20px">
            <v-card-title>
              {{player.name}}
            </v-card-title>
          </v-card>
        </v-row>
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
        if (this.players.data[keys[i]].name.replace(/\s/g, '') === event.toElement.innerText.replace(/\s/g, '')) {
          if (event.path[3]._prevClass.endsWith('start')) {
            this.selectLeft = this.players.data[keys[i]]
          } else if (event.path[3]._prevClass.endsWith('end')) {
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
