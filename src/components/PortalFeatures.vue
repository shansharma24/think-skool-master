<template>
  <section class="portal section">
    <div class="container">
      <div class="section-header">
        <h2>Learning Portal Features</h2>
        <p>Experience the most advanced online learning platform designed for modern education</p>
      </div>
      <div class="portal-showcase">
        <div class="portal-visual">
          <div class="portal-screenshot">
            <div class="screenshot-placeholder">
              <i class="fas fa-laptop-code"></i>
              <p>Interactive Learning Dashboard</p>
            </div>
          </div>
          <div class="floating-features">
            <div class="floating-feature feature-1">
              <i class="fas fa-play-circle"></i>
              <span>Video Lessons</span>
            </div>
            <div class="floating-feature feature-2">
              <i class="fas fa-code"></i>
              <span>Code Editor</span>
            </div>
            <div class="floating-feature feature-3">
              <i class="fas fa-users"></i>
              <span>Live Sessions</span>
            </div>
            <div class="floating-feature feature-4">
              <i class="fas fa-trophy"></i>
              <span>Achievements</span>
            </div>
          </div>
        </div>
        <div class="portal-features">
          <div class="feature-group">
            <h3>Interactive Learning</h3>
            <div class="features-list">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-play-circle"></i>
                </div>
                <div class="feature-content">
                  <h4>HD Video Content</h4>
                  <p>Crystal clear video lessons with expert instructors</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-code"></i>
                </div>
                <div class="feature-content">
                  <h4>Integrated Code Editor</h4>
                  <p>Practice coding directly in the browser with real-time feedback</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-brain"></i>
                </div>
                <div class="feature-content">
                  <h4>AI-Powered Quizzes</h4>
                  <p>Adaptive assessments that adjust to your learning pace</p>
                </div>
              </div>
            </div>
          </div>
          <div class="feature-group">
            <h3>Community & Support</h3>
            <div class="features-list">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="feature-content">
                  <h4>Live Study Groups</h4>
                  <p>Connect with peers and collaborate on projects</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <div class="feature-content">
                  <h4>24/7 Mentor Support</h4>
                  <p>Get help whenever you need it from our expert mentors</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-trophy"></i>
                </div>
                <div class="feature-content">
                  <h4>Gamification</h4>
                  <p>Earn badges and certificates as you progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="portal-stats">
        <div class="stats-container grid grid-4">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Interactive Modules</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Practice Exercises</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Platform Availability</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Languages Supported</div>
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
  gsap.set('.portal h2, .portal p, .portal-visual, .portal-features, .feature-item, .stat-item', {
    opacity: 1,
    y: 0,
    x: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.portal h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.portal p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.portal-visual', {
    x: -50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal-showcase',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.portal-features', {
    x: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal-showcase',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.feature-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal-features',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.4,
    ease: 'power2.out'
  })

  gsap.fromTo('.stat-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portal-stats',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })

  // Floating animation for features
  gsap.to('.floating-feature', {
    y: 'random(-10, 10)',
    rotation: 'random(-3, 3)',
    duration: 'random(3, 6)',
    ease: 'power2.inOut',
    stagger: 0.2,
    repeat: -1,
    yoyo: true
  })
})
</script>

<style scoped>
.portal {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.portal .section-header h2,
.portal .section-header p {
  color: white !important;
}

.portal-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 4rem;
}

.portal-visual {
  position: relative;
}

.portal-screenshot {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.2);
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.screenshot-placeholder {
  text-align: center;
  color: #666666;
}

.screenshot-placeholder i {
  font-size: 4rem;
  color: #0066cc;
  margin-bottom: 1rem;
  display: block;
}

.screenshot-placeholder p {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.floating-features {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-feature {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a1a;
  border: 1px solid #e9ecef;
}

.floating-feature i {
  font-size: 1.2rem;
  color: #0066cc;
}

.feature-1 { top: 10%; right: -15%; }
.feature-2 { top: 40%; left: -15%; }
.feature-3 { bottom: 40%; right: -15%; }
.feature-4 { bottom: 10%; left: -15%; }

.portal-features {
  color: white;
}

.feature-group {
  margin-bottom: 3rem;
}

.feature-group h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: white;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #0066cc;
}

.feature-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.feature-content p {
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.5;
}

.portal-stats {
  margin-top: 5rem;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
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
  color: #0066cc;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #cccccc;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 1024px) {
  .portal-showcase {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .portal-visual {
    order: 2;
  }

  .portal-features {
    order: 1;
  }
}

@media (max-width: 768px) {
  .portal {
    padding: 60px 0;
  }

  .portal-showcase {
    gap: 2rem;
  }

  .portal-screenshot {
    min-height: 300px;
  }

  .floating-feature {
    display: none;
  }

  .feature-group h3 {
    font-size: 1.5rem;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .feature-icon {
    align-self: center;
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
  .stats-container {
    grid-template-columns: 1fr;
  }

  .feature-content h4 {
    font-size: 1rem;
  }
}
</style>
