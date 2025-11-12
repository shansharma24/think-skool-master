<template>
  <div id="app" :class="{ 'dashboard-route': isDashboardRoute }">
    <Navigation v-if="!isDashboardRoute" />
    <router-view />
    <Footer v-if="!isDashboardRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isDashboardRoute = computed(() => route.path === '/dashboard')
</script>

<style scoped>
#app {
  min-height: 100vh;
}

#app.dashboard-route {
  height: 100vh;
  overflow: hidden;
}
</style>
