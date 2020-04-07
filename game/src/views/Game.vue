<template>
  <v-container>
    <v-row>
      <h1>
        This is an about page <br>
        :{{$route.query.player1}}: <br>
        :{{$route.query.player2}}:
      </h1>
    </v-row>
  </v-container>
</template>
<script>
export default {
}
</script>
