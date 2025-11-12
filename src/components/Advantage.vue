<template>
  <div class="advantage-page">
    <section class="page-header">
      <div class="container">
        <h1>Think Skool Advantage</h1>
        <p>What sets us apart in educational innovation</p>
      </div>
    </section>
    <ThinkSkoolAdvantage />
    <Credibility />
  </div>
</template>

<script setup>
import ThinkSkoolAdvantage from './ThinkSkoolAdvantage.vue'
import Credibility from './Credibility.vue'
</script>

<style scoped>
.advantage-page {
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
