<template>
  <section class="advantage section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>The Think Skool Advantage</h2>
        <p>What sets us apart in the world of technology education</p>
      </div>
      <div class="advantage-grid grid grid-3">
        <div class="advantage-card card">
          <div class="advantage-icon">
            <i class="fas fa-industry"></i>
          </div>
          <h3>Industry Partnerships</h3>
          <p>Direct collaboration with leading tech companies ensures our curriculum stays current with industry demands and provides real-world relevance.</p>
          <div class="advantage-features">
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Google, Microsoft, Amazon partnerships</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Regular curriculum updates</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Industry certification alignment</span>
            </div>
          </div>
        </div>
        <div class="advantage-card card">
          <div class="advantage-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>Personalized Learning</h3>
          <p>AI-powered learning paths adapt to each student's pace and learning style, ensuring optimal comprehension and retention.</p>
          <div class="advantage-features">
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Adaptive learning algorithms</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Individual progress tracking</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Customized study plans</span>
            </div>
          </div>
        </div>
        <div class="advantage-card card">
          <div class="advantage-icon">
            <i class="fas fa-rocket"></i>
          </div>
          <h3>Career Acceleration</h3>
          <p>Comprehensive career support including resume building, interview preparation, and direct employer connections for faster job placement.</p>
          <div class="advantage-features">
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Professional resume services</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Mock interview sessions</span>
            </div>
            <div class="feature">
              <i class="fas fa-check"></i>
              <span>Job placement assistance</span>
            </div>
          </div>
        </div>
      </div>
      <div class="advantage-stats">
        <div class="stats-container grid grid-4">
          <div class="stat-item">
            <div class="stat-number">95%</div>
            <div class="stat-label">Job Placement Rate</div>
            <div class="stat-description">Within 6 months of completion</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">$92K</div>
            <div class="stat-label">Average Salary</div>
            <div class="stat-description">Starting salary for graduates</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">6 Months</div>
            <div class="stat-label">Average Time to Hire</div>
            <div class="stat-description">From graduation to job offer</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Partner Companies</div>
            <div class="stat-description">Hiring our graduates</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Set initial visible state as fallback
  gsap.set('.advantage h2, .advantage p, .advantage-card, .stat-item', {
    opacity: 1,
    y: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.advantage h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.advantage',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.advantage p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.advantage',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.advantage-card', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.advantage-grid',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })

  gsap.fromTo('.stat-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.advantage-stats',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.advantage {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.advantage-grid {
  margin-top: 4rem;
}

.advantage-card {
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.1);
}

.advantage-icon {
  font-size: 4rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.advantage-card:hover .advantage-icon {
  transform: scale(1.1);
  background: rgba(0, 102, 204, 0.2);
}

.advantage-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.advantage-card p {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.advantage-features {
  text-align: left;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #666666;
}

.feature i {
  color: #28a745;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.advantage-stats {
  margin-top: 5rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  border-radius: 16px;
  color: white;
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .advantage-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .advantage-card {
    padding: 2rem 1.5rem;
  }

  .advantage-icon {
    font-size: 3rem;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .advantage-grid {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .advantage-features {
    text-align: center;
  }

  .feature {
    justify-content: center;
  }
}
</style>
