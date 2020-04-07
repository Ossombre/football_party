<template>
  <v-app>
    <v-app-bar
      app
      color="orange"
      dark
    >
      <div class="d-flex align-center">
        <!-- Icon of the game -->

        <p style="font-size:40px; margin-top: 10px">Football party</p>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <transition>
        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
