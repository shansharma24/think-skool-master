<template>
  <section class="credibility section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Credibility & Administration</h2>
        <p>Building trust through excellence in education delivery and professional oversight</p>
      </div>
      <div class="credibility-grid grid grid-2">
        <div class="credibility-content">
          <div class="credibility-point">
            <div class="point-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <div class="point-content">
              <h3>Validated Curriculum</h3>
              <p>Our curriculum is designed and validated by industry experts from leading tech companies, ensuring relevance and quality in every module.</p>
              <ul class="point-features">
                <li><i class="fas fa-check"></i> Industry expert validation</li>
                <li><i class="fas fa-check"></i> Regular curriculum updates</li>
                <li><i class="fas fa-check"></i> Compliance with industry standards</li>
              </ul>
            </div>
          </div>
          <div class="credibility-point">
            <div class="point-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="point-content">
              <h3>Structured Delivery</h3>
              <p>Well-organized course delivery with clear milestones, regular assessments, and consistent learning schedules for optimal student progress.</p>
              <ul class="point-features">
                <li><i class="fas fa-check"></i> Milestone-based learning</li>
                <li><i class="fas fa-check"></i> Regular progress assessments</li>
                <li><i class="fas fa-check"></i> Flexible scheduling options</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="credibility-content">
          <div class="credibility-point">
            <div class="point-icon">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="point-content">
              <h3>Professional Oversight</h3>
              <p>Experienced professionals oversee all aspects of program delivery, from content quality to student support and administrative processes.</p>
              <ul class="point-features">
                <li><i class="fas fa-check"></i> Dedicated program managers</li>
                <li><i class="fas fa-check"></i> Quality assurance teams</li>
                <li><i class="fas fa-check"></i> Continuous improvement processes</li>
              </ul>
            </div>
          </div>
          <div class="credibility-point">
            <div class="point-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <div class="point-content">
              <h3>Administrative Ease</h3>
              <p>Streamlined administration for schools and institutions with automated reporting, easy enrollment processes, and comprehensive support systems.</p>
              <ul class="point-features">
                <li><i class="fas fa-check"></i> Automated reporting systems</li>
                <li><i class="fas fa-check"></i> Simplified enrollment processes</li>
                <li><i class="fas fa-check"></i> 24/7 administrative support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="credibility-stats">
        <div class="stats-container grid grid-4">
          <div class="stat-item">
            <div class="stat-number">ISO 9001</div>
            <div class="stat-label">Certified</div>
            <div class="stat-description">Quality management system</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Compliance Rate</div>
            <div class="stat-description">Regulatory standards met</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support Available</div>
            <div class="stat-description">Round-the-clock assistance</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">Uptime</div>
            <div class="stat-description">Platform reliability</div>
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
  gsap.set('.credibility h2, .credibility p, .credibility-point, .stat-item', {
    opacity: 1,
    y: 0,
    x: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.credibility h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.credibility',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.credibility p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.credibility',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.credibility-point', {
    x: -50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.credibility-grid',
      start: 'top center+=100',
      markers: false
    },
    x: 0,
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
      trigger: '.credibility-stats',
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
.credibility {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.credibility-grid {
  margin-top: 4rem;
  align-items: flex-start;
  gap: 3rem;
}

.credibility-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.credibility-point {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.credibility-point:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.point-icon {
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

.point-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.point-content p {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.point-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.point-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666666;
}

.point-features i {
  color: #28a745;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.credibility-stats {
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
  .credibility-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .credibility-content {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .credibility {
    padding: 60px 0;
  }

  .credibility-point {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .point-icon {
    align-self: center;
  }

  .point-content h3 {
    font-size: 1.3rem;
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
  .credibility-point {
    gap: 1rem;
  }

  .point-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .point-features {
    text-align: center;
  }

  .point-features li {
    justify-content: center;
  }
}
</style>
