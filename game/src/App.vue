<template>
  <v-app>
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
