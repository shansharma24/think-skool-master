<template>
  <div class="dashboard-container">
    <iframe src="http://localhost:5174/" class="dashboard-iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh; /* Full viewport height */
  overflow: hidden; /* Hide scrollbars if content overflows */
}

.dashboard-iframe {
  width: 100%;
  height: 100%;
  border: none; /* Remove default iframe border */
}
</style>
