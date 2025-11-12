<template>
  <section class="vision-mission section">
    <div class="container">
      <div class="section-header">
        <h2>Our Vision & Mission</h2>
        <p>Driving the future of education through innovation, accessibility, and excellence</p>
      </div>
      <div class="vision-mission-grid">
        <div class="vision-card card">
          <div class="card-icon">
            <i class="fas fa-eye"></i>
          </div>
          <div class="card-content">
            <h3>Our Vision</h3>
            <p>To be the world's leading educational technology platform that democratizes access to quality STEM education, empowering every individual to shape the future through innovation and technology.</p>
            <div class="vision-points">
              <div class="point">
                <i class="fas fa-globe-americas"></i>
                <span>Global Accessibility</span>
              </div>
              <div class="point">
                <i class="fas fa-infinity"></i>
                <span>Limitless Learning</span>
              </div>
              <div class="point">
                <i class="fas fa-lightbulb"></i>
                <span>Innovation First</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mission-card card">
          <div class="card-icon">
            <i class="fas fa-bullseye"></i>
          </div>
          <div class="card-content">
            <h3>Our Mission</h3>
            <p>To transform traditional education by providing cutting-edge, industry-relevant skills through immersive learning experiences, expert mentorship, and real-world applications that prepare students for successful careers in technology.</p>
            <div class="mission-points">
              <div class="point">
                <i class="fas fa-users"></i>
                <span>Expert Mentorship</span>
              </div>
              <div class="point">
                <i class="fas fa-project-diagram"></i>
                <span>Hands-on Projects</span>
              </div>
              <div class="point">
                <i class="fas fa-briefcase"></i>
                <span>Career Readiness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="core-values">
        <h3>Our Core Values</h3>
        <div class="values-grid grid grid-4">
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h4>Excellence</h4>
            <p>Committed to delivering the highest quality education and maintaining rigorous academic standards.</p>
          </div>
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h4>Innovation</h4>
            <p>Continuously evolving our methods and technologies to provide cutting-edge learning experiences.</p>
          </div>
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h4>Inclusivity</h4>
            <p>Ensuring education is accessible to all, regardless of background, location, or socioeconomic status.</p>
          </div>
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h4>Impact</h4>
            <p>Creating meaningful change in students' lives and contributing to the advancement of technology globally.</p>
          </div>
        </div>
      </div>
      <div class="impact-stats">
        <div class="stats-container grid grid-3">
          <div class="impact-stat">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Students Empowered</div>
            <div class="stat-description">Across 25+ countries, building careers in technology</div>
          </div>
          <div class="impact-stat">
            <div class="stat-number">95%</div>
            <div class="stat-label">Career Success Rate</div>
            <div class="stat-description">Students find meaningful employment within 6 months</div>
          </div>
          <div class="impact-stat">
            <div class="stat-number">500+</div>
            <div class="stat-label">Industry Partners</div>
            <div class="stat-description">Leading companies trust our graduates</div>
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
  gsap.set('.vision-mission h2, .vision-mission p, .vision-card, .mission-card, .value-item, .impact-stat', {
    opacity: 1,
    y: 0,
    x: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.vision-mission h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.vision-mission',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.vision-mission p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.vision-mission',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.vision-card', {
    x: -50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.vision-mission-grid',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.mission-card', {
    x: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.vision-mission-grid',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.value-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.core-values',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })

  gsap.fromTo('.impact-stat', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.impact-stats',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.vision-mission {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.vision-mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 4rem;
}

.vision-card, .mission-card {
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.vision-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.mission-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f093fb, #f5576c);
}

.vision-card:hover, .mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.1);
}

.card-icon {
  font-size: 4rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.vision-card:hover .card-icon, .mission-card:hover .card-icon {
  transform: scale(1.1);
  background: rgba(0, 102, 204, 0.2);
}

.card-content h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.card-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 2rem;
}

.vision-points, .mission-points {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.point {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666666;
}

.point i {
  color: #28a745;
  font-size: 0.8rem;
  width: 16px;
  flex-shrink: 0;
}

.core-values {
  margin-top: 5rem;
  text-align: center;
}

.core-values h3 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #1a1a1a;
}

.values-grid {
  gap: 2rem;
}

.value-item {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.value-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1rem;
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 12px;
}

.value-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.value-item p {
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.5;
}

.impact-stats {
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

.impact-stat {
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

@media (max-width: 1024px) {
  .vision-mission-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .vision-mission {
    padding: 60px 0;
  }

  .vision-mission-grid {
    gap: 2rem;
  }

  .vision-card, .mission-card {
    padding: 2rem 1.5rem;
  }

  .card-icon {
    font-size: 3rem;
  }

  .card-content h3 {
    font-size: 1.5rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .value-item {
    padding: 1.5rem;
  }

  .core-values h3 {
    font-size: 1.5rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .impact-stat {
    margin-bottom: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .vision-card, .mission-card {
    text-align: left;
  }

  .vision-points, .mission-points {
    text-align: left;
  }

  .point {
    justify-content: flex-start;
  }

  .value-item {
    text-align: left;
  }

  .value-icon {
    margin-bottom: 0.5rem;
  }
}
</style>
