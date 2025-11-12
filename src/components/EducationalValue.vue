<template>
  <section class="educational-value section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Why Choose Think Skool?</h2>
        <p>Traditional education often falls short in preparing students for real-world challenges. Think Skool bridges this gap with innovative, hands-on learning that delivers measurable results.</p>
      </div>
      <div class="value-props grid grid-3">
        <div class="value-prop card">
          <div class="value-icon">
            <i class="fas fa-industry"></i>
          </div>
          <h3>Industry-Aligned Curriculum</h3>
          <p>Our programs are designed in collaboration with leading tech companies, ensuring students learn skills that are immediately applicable in today's job market.</p>
          <ul class="value-features">
            <li><i class="fas fa-check"></i> Real-world projects</li>
            <li><i class="fas fa-check"></i> Industry certifications</li>
            <li><i class="fas fa-check"></i> Job-ready skills</li>
          </ul>
        </div>
        <div class="value-prop card">
          <div class="value-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>Expert Mentorship</h3>
          <p>Learn from industry veterans and successful entrepreneurs who provide personalized guidance and real-world insights throughout your learning journey.</p>
          <ul class="value-features">
            <li><i class="fas fa-check"></i> 1-on-1 mentoring</li>
            <li><i class="fas fa-check"></i> Career counseling</li>
            <li><i class="fas fa-check"></i> Network building</li>
          </ul>
        </div>
        <div class="value-prop card">
          <div class="value-icon">
            <i class="fas fa-rocket"></i>
          </div>
          <h3>Accelerated Learning</h3>
          <p>Our intensive, project-based approach accelerates skill development, allowing students to build portfolios and gain experience faster than traditional methods.</p>
          <ul class="value-features">
            <li><i class="fas fa-check"></i> Hands-on projects</li>
            <li><i class="fas fa-check"></i> Fast-track programs</li>
            <li><i class="fas fa-check"></i> Portfolio development</li>
          </ul>
        </div>
      </div>
      <div class="stats-section">
        <div class="stats grid grid-4">
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Student Satisfaction</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">6 Months</div>
            <div class="stat-label">Average Time to Job</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">$85K</div>
            <div class="stat-label">Average Starting Salary</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">250+</div>
            <div class="stat-label">Corporate Partners</div>
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
  gsap.from('.educational-value h2', {
    scrollTrigger: {
      trigger: '.educational-value',
      start: 'top center+=100'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  gsap.from('.educational-value p', {
    scrollTrigger: {
      trigger: '.educational-value',
      start: 'top center+=100'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })
  gsap.from('.value-prop', {
    scrollTrigger: {
      trigger: '.value-props',
      start: 'top center+=100'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })

  // Set initial visible state as fallback
  gsap.set('.value-prop', {
    opacity: 1,
    y: 0
  })
  gsap.from('.stat-item', {
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top center+=100'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.educational-value {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.value-props {
  margin-top: 4rem;
}

.value-prop {
  text-align: center;
  padding: 3rem 2rem;
  transition: all 0.3s ease;
}

.value-prop:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 102, 204, 0.1);
}

.value-icon {
  font-size: 3rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.value-prop:hover .value-icon {
  transform: scale(1.1);
  background: rgba(0, 102, 204, 0.2);
}

.value-prop h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.value-prop p {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.value-features {
  list-style: none;
  padding: 0;
  text-align: left;
}

.value-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666666;
}

.value-features i {
  color: #28a745;
  font-size: 0.8rem;
}

.stats-section {
  margin-top: 5rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  border-radius: 16px;
  color: white;
}

.stats {
  margin: 0 auto;
  max-width: 1000px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .value-props {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .value-prop {
    padding: 2rem 1.5rem;
  }

  .value-icon {
    font-size: 2.5rem;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .value-props {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .value-features {
    text-align: center;
  }
}
</style>
