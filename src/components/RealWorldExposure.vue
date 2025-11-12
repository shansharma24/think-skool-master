<template>
  <section class="exposure section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Real-World Exposure</h2>
        <p>Bridge the gap between learning and professional success</p>
      </div>
      <div class="exposure-grid grid grid-2">
        <div class="exposure-content">
          <div class="exposure-item">
            <div class="exposure-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <div class="exposure-details">
              <h3>Industry Projects</h3>
              <p>Work on real projects sponsored by leading tech companies, building a professional portfolio that showcases your skills to employers.</p>
              <ul class="exposure-features">
                <li><i class="fas fa-check"></i> Client-sponsored projects</li>
                <li><i class="fas fa-check"></i> Professional code reviews</li>
                <li><i class="fas fa-check"></i> Portfolio development</li>
              </ul>
            </div>
          </div>
          <div class="exposure-item">
            <div class="exposure-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="exposure-details">
              <h3>Hackathons & Competitions</h3>
              <p>Participate in coding competitions and hackathons that challenge your skills and provide networking opportunities with industry professionals.</p>
              <ul class="exposure-features">
                <li><i class="fas fa-check"></i> Monthly hackathons</li>
                <li><i class="fas fa-check"></i> Industry judges</li>
                <li><i class="fas fa-check"></i> Prize opportunities</li>
              </ul>
            </div>
          </div>
          <div class="exposure-item">
            <div class="exposure-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <div class="exposure-details">
              <h3>Internship Program</h3>
              <p>Gain valuable work experience through our structured internship program with partner companies, providing a smooth transition to full-time employment.</p>
              <ul class="exposure-features">
                <li><i class="fas fa-check"></i> Paid internships</li>
                <li><i class="fas fa-check"></i> Mentor supervision</li>
                <li><i class="fas fa-check"></i> Job placement pipeline</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exposure-visual">
          <div class="exposure-showcase">
            <div class="showcase-item project">
              <div class="showcase-header">
                <i class="fas fa-code"></i>
                <span>Project Showcase</span>
              </div>
              <div class="showcase-content">
                <h4>E-Commerce Platform</h4>
                <p>Built for a Fortune 500 client</p>
                <div class="tech-stack">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </div>
            <div class="showcase-item hackathon">
              <div class="showcase-header">
                <i class="fas fa-trophy"></i>
                <span>Hackathon Winner</span>
              </div>
              <div class="showcase-content">
                <h4>AI-Powered Healthcare App</h4>
                <p>1st Place - Global Tech Challenge</p>
                <div class="tech-stack">
                  <span>Python</span>
                  <span>TensorFlow</span>
                  <span>React</span>
                </div>
              </div>
            </div>
            <div class="showcase-item internship">
              <div class="showcase-header">
                <i class="fas fa-building"></i>
                <span>Internship Success</span>
              </div>
              <div class="showcase-content">
                <h4>Software Engineer Intern</h4>
                <p>Google - 6-month program</p>
                <div class="tech-stack">
                  <span>Go</span>
                  <span>Kubernetes</span>
                  <span>Cloud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exposure-stats">
        <div class="stats-container grid grid-4">
          <div class="stat-item">
            <div class="stat-number">200+</div>
            <div class="stat-label">Industry Projects</div>
            <div class="stat-description">Completed by students</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Hackathons Hosted</div>
            <div class="stat-description">Annual competitions</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">85%</div>
            <div class="stat-label">Internship Conversion</div>
            <div class="stat-description">To full-time positions</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Partner Companies</div>
            <div class="stat-description">Providing opportunities</div>
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
  gsap.set('.exposure h2, .exposure p, .exposure-item, .exposure-visual, .showcase-item, .stat-item', {
    opacity: 1,
    y: 0,
    x: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.exposure h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.exposure p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.exposure-item', {
    x: -50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure-content',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })

  gsap.fromTo('.exposure-visual', {
    x: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure-grid',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.showcase-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure-visual',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    ease: 'power2.out'
  })

  gsap.fromTo('.stat-item', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.exposure-stats',
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
.exposure {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.exposure-grid {
  margin-top: 4rem;
  align-items: center;
  gap: 4rem;
}

.exposure-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.exposure-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.exposure-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #0066cc, #004499);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 102, 204, 0.3);
}

.exposure-details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.exposure-details p {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.exposure-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.exposure-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666666;
}

.exposure-features i {
  color: #28a745;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.exposure-visual {
  position: relative;
}

.exposure-showcase {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.showcase-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.showcase-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.showcase-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.showcase-header i {
  font-size: 1.5rem;
  color: #0066cc;
}

.showcase-header span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.showcase-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.showcase-content p {
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-stack span {
  background: rgba(0, 102, 204, 0.1);
  color: #0066cc;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.exposure-stats {
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

@media (max-width: 1024px) {
  .exposure-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .exposure-visual {
    order: -1;
  }
}

@media (max-width: 768px) {
  .exposure {
    padding: 60px 0;
  }

  .exposure-content {
    gap: 2rem;
  }

  .exposure-item {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .exposure-icon {
    align-self: center;
  }

  .exposure-features {
    text-align: center;
  }

  .exposure-features li {
    justify-content: center;
  }

  .showcase-item {
    padding: 1rem;
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

  .exposure-item {
    gap: 1rem;
  }

  .exposure-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .tech-stack {
    justify-content: center;
  }
}
</style>
