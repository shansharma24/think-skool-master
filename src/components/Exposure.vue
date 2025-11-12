<template>
  <div class="exposure-page">
    <section class="page-header">
      <div class="container">
        <h1>Real-World Exposure</h1>
        <p>Practical learning experiences that prepare you for the future</p>
      </div>
    </section>
    <RealWorldExposure />
    <Testimonials />
  </div>
</template>

<script setup>
import RealWorldExposure from './RealWorldExposure.vue'
import Testimonials from './Testimonials.vue'
</script>

<style scoped>
.exposure-page {
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
