<template>
  <section class="testimonials section">
    <div class="container">
      <div class="section-header">
        <h2>What Our Students Say</h2>
        <p>Real experiences from students who transformed their careers with Think Skool</p>
      </div>
      <div class="testimonials-grid grid grid-3">
        <div class="testimonial card">
          <div class="testimonial-header">
            <div class="testimonial-avatar">
              <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div class="testimonial-meta">
              <h4>Sarah Chen</h4>
              <span class="testimonial-role">Software Engineer at Google</span>
              <div class="testimonial-rating">
                <i class="fas fa-star" v-for="i in 5" :key="i"></i>
              </div>
            </div>
          </div>
          <p>"Think Skool completely changed my career trajectory. The hands-on projects and expert mentorship helped me land my dream job at Google. The curriculum is incredibly practical and up-to-date."</p>
          <div class="testimonial-course">
            <span>Completed: Full-Stack Development</span>
          </div>
        </div>
        <div class="testimonial card">
          <div class="testimonial-header">
            <div class="testimonial-avatar">
              <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div class="testimonial-meta">
              <h4>Michael Rodriguez</h4>
              <span class="testimonial-role">AI Engineer at Tesla</span>
              <div class="testimonial-rating">
                <i class="fas fa-star" v-for="i in 5" :key="i"></i>
              </div>
            </div>
          </div>
          <p>"The AI & ML program exceeded my expectations. The instructors are industry veterans who really understand what employers are looking for. I went from zero AI knowledge to building autonomous systems."</p>
          <div class="testimonial-course">
            <span>Completed: AI & Machine Learning</span>
          </div>
        </div>
        <div class="testimonial card">
          <div class="testimonial-header">
            <div class="testimonial-avatar">
              <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div class="testimonial-meta">
              <h4>Emily Johnson</h4>
              <span class="testimonial-role">Cybersecurity Analyst at Microsoft</span>
              <div class="testimonial-rating">
                <i class="fas fa-star" v-for="i in 5" :key="i"></i>
              </div>
            </div>
          </div>
          <p>"Think Skool's cybersecurity program is comprehensive and practical. The ethical hacking labs and real-world scenarios prepared me perfectly for my role at Microsoft. Highly recommended!"</p>
          <div class="testimonial-course">
            <span>Completed: Cybersecurity Fundamentals</span>
          </div>
        </div>
      </div>
      <div class="testimonials-stats">
        <div class="stats-container grid grid-4">
          <div class="stat-item">
            <div class="stat-number">4.9/5</div>
            <div class="stat-label">Average Rating</div>
            <div class="stat-description">From 2,000+ reviews</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
            <div class="stat-description">Student happiness score</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">95%</div>
            <div class="stat-label">Recommendation Rate</div>
            <div class="stat-description">Would recommend to friends</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support Available</div>
            <div class="stat-description">Round-the-clock assistance</div>
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
  gsap.set('.testimonials h2, .testimonials p, .testimonial, .stat-item', {
    opacity: 1,
    y: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.testimonials h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.testimonials',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.testimonials p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.testimonials',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.testimonial', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.testimonials-grid',
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
      trigger: '.testimonials-stats',
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
.testimonials {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.testimonials-grid {
  margin-top: 4rem;
}

.testimonial {
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.1);
}

.testimonial-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.testimonial-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0066cc, #004499);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 8px 25px rgba(0, 102, 204, 0.3);
}

.testimonial-meta {
  text-align: center;
}

.testimonial-meta h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1a1a1a;
}

.testimonial-role {
  font-size: 0.9rem;
  color: #0066cc;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.testimonial-rating {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.testimonial-rating i {
  color: #ffc107;
  font-size: 1rem;
}

.testimonial p {
  font-style: italic;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.testimonial-course {
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.testimonial-course span {
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
  background: rgba(0, 102, 204, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.testimonials-stats {
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
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonial {
    padding: 1.5rem;
  }

  .testimonial-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .avatar-placeholder {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
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

  .testimonial-rating {
    justify-content: center;
  }
}
</style>
