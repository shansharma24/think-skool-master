<template>
  <section class="hero section">
    <div class="hero-bg">
      <div class="hero-bg-pattern"></div>
    </div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge">🏆 #1 EdTech Platform 2024</span>
        </div>
        <h1 class="hero-title">
          Transform Education with
          <span class="text-primary">think skool</span>
        </h1>
        <p class="hero-subtitle">
          Empowering the next generation with cutting-edge technology skills, real-world projects, and industry mentorship. Join 10,000+ students who are building tomorrow's innovations today.
        </p>
        <div class="hero-features">
          <div class="feature-item">
            <i class="fas fa-check-circle text-secondary"></i>
            <span>Industry-Validated Curriculum</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-check-circle text-secondary"></i>
            <span>Hands-on Project Learning</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-check-circle text-secondary"></i>
            <span>Expert Mentorship Program</span>
          </div>
        </div>
        <div class="hero-actions">
          <router-link to="/dashboard" class="btn btn-primary">
            <i class="fas fa-rocket"></i> Start Your Journey
          </router-link>
          <a href="#demo" class="btn btn-outline">
            <i class="fas fa-play"></i> Watch Demo
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Students Trained</div>
          </div>
          <div class="stat">
            <div class="stat-number">500+</div>
            <div class="stat-label">Partner Schools</div>
          </div>
          <div class="stat">
            <div class="stat-number">95%</div>
            <div class="stat-label">Placement Rate</div>
          </div>
          <div class="stat">
            <div class="stat-number">50+</div>
            <div class="stat-label">Industry Experts</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-image">
          <div class="floating-elements">
            <div class="floating-card card-1">
              <i class="fas fa-brain"></i>
              <span>AI & ML</span>
            </div>
            <div class="floating-card card-2">
              <i class="fas fa-code"></i>
              <span>Development</span>
            </div>
            <div class="floating-card card-3">
              <i class="fas fa-shield-alt"></i>
              <span>Cybersecurity</span>
            </div>
            <div class="floating-card card-4">
              <i class="fas fa-microchip"></i>
              <span>IoT</span>
            </div>
          </div>
          <div class="hero-illustration">
            <div class="illustration-placeholder">
              <i class="fas fa-users"></i>
              <p>Students Learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Set initial visible state as fallback
  gsap.set('.hero-badge, .hero-title, .hero-subtitle, .feature-item, .hero-actions, .stat, .hero-visual', {
    opacity: 1,
    y: 0,
    x: 0
  })

  const tl = gsap.timeline()

  tl.fromTo('.hero-badge', {
    y: -30,
    opacity: 0
  }, {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
  })
  .fromTo('.hero-title', {
    y: 50,
    opacity: 0
  }, {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
  }, '-=0.3')
  .fromTo('.hero-subtitle', {
    y: 30,
    opacity: 0
  }, {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .fromTo('.feature-item', {
    x: -30,
    opacity: 0
  }, {
    duration: 0.6,
    x: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.3')
  .fromTo('.hero-actions', {
    y: 30,
    opacity: 0
  }, {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .fromTo('.stat', {
    y: 30,
    opacity: 0
  }, {
    duration: 0.6,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.3')
  .fromTo('.hero-visual', {
    x: 50,
    opacity: 0
  }, {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: 'power2.out'
  }, '-=1')

  // Floating animation for cards
  gsap.to('.floating-card', {
    y: 'random(-10, 10)',
    rotation: 'random(-2, 2)',
    duration: 'random(4, 8)',
    ease: 'power2.inOut',
    stagger: 0.3,
    repeat: -1,
    yoyo: true
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 20px;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
  opacity: 0.05;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  padding-right: 2rem;
}

.hero-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo-text {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0071BC, #F26522);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.hero-badge {
  margin-bottom: 1.5rem;
}

.badge {
  display: inline-block;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #1E293B;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
  color: #1E293B;
}

.feature-item i {
  font-size: 1.1rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #F26522;
  color: white;
  box-shadow: 0 8px 25px rgba(242, 101, 34, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(242, 101, 34, 0.5);
  background: #0071BC;
}

.btn-outline {
  background: transparent;
  color: #0071BC;
  border: 2px solid #0071BC;
  box-shadow: none;
}

.btn-outline:hover {
  background: #0071BC;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 113, 188, 0.4);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #F26522;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748B;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-visual {
  position: relative;
}

.hero-image {
  position: relative;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  border: 1px solid #e9ecef;
}

.floating-card i {
  font-size: 1.5rem;
  color: #F26522;
}

.card-1 { top: 10%; left: -10%; }
.card-2 { top: 30%; right: -10%; }
.card-3 { bottom: 30%; left: -10%; }
.card-4 { bottom: 10%; right: -10%; }

.hero-illustration {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.illustration-placeholder {
  text-align: center;
  color: #666666;
}

.illustration-placeholder i {
  font-size: 4rem;
  color: #F26522;
  margin-bottom: 1rem;
  display: block;
}

.illustration-placeholder p {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-content {
    padding-right: 0;
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0;
    min-height: auto;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .btn {
    width: 100%;
    justify-content: center;
    max-width: 300px;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-features {
    text-align: left;
  }
}
</style>
