<template>
  <section class="portfolio section section-dark">
    <div class="container">
      <div class="section-header">
        <h2>Comprehensive Course Portfolio</h2>
        <p>Explore our diverse range of cutting-edge technology courses designed for the future workforce</p>
      </div>
      <div class="courses grid grid-4">
        <div class="course-card card" v-for="course in courses" :key="course.name">
          <div class="course-header">
            <div class="course-icon">
              <i :class="course.icon"></i>
            </div>
            <div class="course-badge">{{ course.level }}</div>
          </div>
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          <div class="course-features">
            <span v-for="feature in course.features" :key="feature" class="feature-tag">
              <i class="fas fa-check"></i> {{ feature }}
            </span>
          </div>
          <div class="course-meta">
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ course.duration }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>{{ course.students }} students</span>
            </div>
          </div>
          <div class="course-footer">
            <div class="course-price">
              <span class="price">${{ course.price }}</span>
              <span class="period">/course</span>
            </div>
            <router-link to="/courses" class="btn btn-outline">
              Learn More
            </router-link>
          </div>
        </div>
      </div>
      <div class="portfolio-cta">
        <h3>Ready to Start Your Tech Journey?</h3>
        <p>Join thousands of students who have transformed their careers with Think Skool</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn btn-primary">
            <i class="fas fa-calendar"></i> Schedule Consultation
          </router-link>
          <router-link to="/programs" class="btn btn-outline">
            <i class="fas fa-eye"></i> View All Programs
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const courses = ref([
  {
    name: 'Cybersecurity Fundamentals',
    description: 'Master the art of protecting digital assets and systems from evolving cyber threats.',
    icon: 'fas fa-shield-alt',
    features: ['Ethical Hacking', 'Network Security', 'Cryptography'],
    duration: '12 weeks',
    level: 'Intermediate',
    students: '2,500+',
    price: '2,499'
  },
  {
    name: 'AI & Machine Learning',
    description: 'Dive deep into artificial intelligence and machine learning algorithms and applications.',
    icon: 'fas fa-brain',
    features: ['Neural Networks', 'Deep Learning', 'Computer Vision'],
    duration: '16 weeks',
    level: 'Advanced',
    students: '3,200+',
    price: '3,499'
  },
  {
    name: 'Internet of Things',
    description: 'Build intelligent connected devices and explore the Internet of Things ecosystem.',
    icon: 'fas fa-microchip',
    features: ['Embedded Systems', 'Sensors', 'Cloud Integration'],
    duration: '10 weeks',
    level: 'Intermediate',
    students: '1,800+',
    price: '2,299'
  },
  {
    name: 'Full-Stack Development',
    description: 'Master modern software development practices and create innovative applications.',
    icon: 'fas fa-code',
    features: ['Full-Stack Dev', 'Mobile Apps', 'Cloud Deployment'],
    duration: '14 weeks',
    level: 'Beginner-Advanced',
    students: '4,100+',
    price: '2,999'
  }
])

onMounted(() => {
  // Set initial visible state as fallback
  gsap.set('.portfolio h2, .portfolio p, .course-card, .portfolio-cta', {
    opacity: 1,
    y: 0
  })

  // Animate from visible state to add motion
  gsap.fromTo('.portfolio h2', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top center+=100',
      markers: false // Set to true for debugging
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.fromTo('.portfolio p', {
    y: 30,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.fromTo('.course-card', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.courses',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })

  gsap.fromTo('.portfolio-cta', {
    y: 50,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: '.portfolio-cta',
      start: 'top center+=100',
      markers: false
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.portfolio {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.portfolio .section-header h2,
.portfolio .section-header p {
  color: white !important;
}

.courses {
  margin-top: 4rem;
}

.course-card {
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0066cc, #28a745);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.course-card:hover::before {
  transform: scaleX(1);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.15);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.course-icon {
  font-size: 3rem;
  color: #0066cc;
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.course-card:hover .course-icon {
  transform: scale(1.1);
  background: rgba(0, 102, 204, 0.2);
}

.course-badge {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.course-card p {
  font-size: 0.95rem;
  color: #cccccc;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.course-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(40, 167, 69, 0.2);
}

.feature-tag i {
  font-size: 0.7rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #cccccc;
}

.meta-item i {
  color: #0066cc;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #28a745;
}

.period {
  font-size: 0.8rem;
  color: #cccccc;
}

.btn-outline {
  color: #0066cc;
  border-color: #0066cc;
}

.btn-outline:hover {
  background: #0066cc;
  color: white;
}

.portfolio-cta {
  margin-top: 5rem;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.portfolio-cta h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.portfolio-cta p {
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .courses {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .course-card {
    padding: 2rem;
  }

  .course-header {
    flex-direction: column;
    gap: 1rem;
  }

  .course-icon {
    font-size: 2.5rem;
  }

  .course-features {
    gap: 0.3rem;
  }

  .feature-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
  }

  .course-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .course-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .courses {
    grid-template-columns: 1fr;
  }

  .portfolio-cta {
    padding: 2rem;
  }

  .portfolio-cta h3 {
    font-size: 1.5rem;
  }
}
</style>
