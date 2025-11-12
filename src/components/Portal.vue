<template>
  <div class="portal-page">
    <section class="page-header">
      <div class="container">
        <h1>Learning Portal</h1>
        <p>Access your personalized learning environment</p>
      </div>
    </section>
    <PortalFeatures />
  </div>
</template>

<script setup>
import PortalFeatures from './PortalFeatures.vue'
</script>

<style scoped>
.portal-page {
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  padding: 100px 0 60px;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.page-header p {
  font-size: 1.2rem;
  color: #e0e0e0;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }
}
</style>
