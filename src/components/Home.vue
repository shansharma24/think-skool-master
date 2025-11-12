<template>
  <div class="home">
    <!-- Hero Section with Professional Landing -->
    <Hero id="hero" />

    <!-- About Section - New Addition -->
    <section class="about section section-alt">
      <div class="container">
        <div class="about-content grid grid-2">
          <div class="about-text">
            <h2>About Think Skool</h2>
            <p>Think Skool is a premier educational technology platform dedicated to bridging the gap between traditional education and the demands of the modern workforce. Founded in 2020, we've empowered over 10,000 students worldwide with cutting-edge skills in emerging technologies.</p>
            <p>Our mission is to democratize access to quality tech education, ensuring that every student, regardless of their background, has the opportunity to build a successful career in technology.</p>
            <div class="about-stats">
              <div class="stat">
                <div class="stat-number">4+</div>
                <div class="stat-label">Years of Excellence</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">Expert Instructors</div>
              </div>
              <div class="stat">
                <div class="stat-number">25+</div>
                <div class="stat-label">Countries Served</div>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="about-image">
              <div class="image-placeholder">
                <i class="fas fa-users"></i>
                <p>Think Skool Team</p>
              </div>
            </div>
            <div class="about-features">
              <div class="feature-item">
                <i class="fas fa-award text-primary"></i>
                <span>Industry Recognized</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-globe text-primary"></i>
                <span>Global Reach</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-lightbulb text-primary"></i>
                <span>Innovative Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Value Proposition -->
    <EducationalValue id="educational-value" />

    <!-- Course Portfolio -->
    <CoursePortfolio id="portfolio" />

    <!-- Success Stories Section - New Addition -->
    <section class="success-stories section">
      <div class="container">
        <div class="section-header">
          <h2>Success Stories</h2>
          <p>Real students, real results. See how Think Skool has transformed careers across industries.</p>
        </div>
        <div class="stories grid grid-3">
          <div class="story card">
            <div class="story-header">
              <div class="story-avatar">
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div class="story-meta">
                <h4>Sarah Mitchell</h4>
                <span class="story-role">Cybersecurity Analyst at Google</span>
              </div>
            </div>
            <p>"Think Skool's cybersecurity program gave me the practical skills I needed to land my dream job. The hands-on projects and expert mentorship were invaluable."</p>
            <div class="story-stats">
              <span><i class="fas fa-clock"></i> 8 months to job offer</span>
              <span><i class="fas fa-dollar-sign"></i> $95K starting salary</span>
            </div>
          </div>
          <div class="story card">
            <div class="story-header">
              <div class="story-avatar">
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div class="story-meta">
                <h4>James Rodriguez</h4>
                <span class="story-role">AI Engineer at Tesla</span>
              </div>
            </div>
            <p>"The AI & ML course was comprehensive and challenging. I went from zero coding experience to building autonomous systems. The career support was exceptional."</p>
            <div class="story-stats">
              <span><i class="fas fa-clock"></i> 6 months to job offer</span>
              <span><i class="fas fa-dollar-sign"></i> $110K starting salary</span>
            </div>
          </div>
          <div class="story card">
            <div class="story-header">
              <div class="story-avatar">
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div class="story-meta">
                <h4>Aisha Liu</h4>
                <span class="story-role">Full-Stack Developer at Amazon</span>
              </div>
            </div>
            <p>"Think Skool's development program taught me modern technologies and best practices. The portfolio projects helped me stand out in a competitive job market."</p>
            <div class="story-stats">
              <span><i class="fas fa-clock"></i> 5 months to job offer</span>
              <span><i class="fas fa-dollar-sign"></i> $105K starting salary</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Think Skool Advantage -->
    <ThinkSkoolAdvantage id="advantage" />

    <!-- Real World Exposure -->
    <RealWorldExposure id="exposure" />

    <!-- Portal Features -->
    <PortalFeatures id="portal" />

    <!-- Testimonials -->
    <Testimonials />

    <!-- Vision & Mission -->
    <VisionMission />

    <!-- Credibility -->
    <Credibility />

    <!-- Contact -->
    <Contact id="contact" />
  </div>
</template>

<script setup>
import Hero from './Hero.vue'
import EducationalValue from './EducationalValue.vue'
import ThinkSkoolAdvantage from './ThinkSkoolAdvantage.vue'
import CoursePortfolio from './CoursePortfolio.vue'
import PortalFeatures from './PortalFeatures.vue'
import RealWorldExposure from './RealWorldExposure.vue'
import Testimonials from './Testimonials.vue'
import VisionMission from './VisionMission.vue'
import Credibility from './Credibility.vue'
import Contact from './Contact.vue'
</script>

<style scoped>
.home {
  /* Home page specific styles if needed */
}

.about {
  padding: 100px 0;
}

.about-content {
  align-items: center;
  gap: 4rem;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #666666;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.about-stats .stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0066cc;
  margin-bottom: 0.5rem;
}

.about-stats .stat-label {
  font-size: 0.9rem;
  color: #666666;
  font-weight: 500;
}

.about-visual {
  position: relative;
}

.about-image {
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

.image-placeholder {
  text-align: center;
  color: #666666;
}

.image-placeholder i {
  font-size: 4rem;
  color: #0066cc;
  margin-bottom: 1rem;
  display: block;
}

.image-placeholder p {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.about-features {
  position: absolute;
  bottom: -20px;
  left: -20px;
  right: -20px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.feature-item i {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
}

.success-stories {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.stories {
  margin-top: 4rem;
}

.story {
  padding: 2rem;
  transition: all 0.3s ease;
}

.story:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 102, 204, 0.1);
}

.story-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.story-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0066cc, #004499);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.story-meta h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1a1a1a;
}

.story-role {
  font-size: 0.9rem;
  color: #0066cc;
  font-weight: 500;
}

.story p {
  font-style: italic;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.story-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666666;
}

.story-stats span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-text {
    text-align: center;
  }

  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about {
    padding: 60px 0;
  }

  .about-text h2 {
    font-size: 2rem;
  }

  .about-stats {
    grid-template-columns: 1fr;
  }

  .about-features {
    position: static;
    margin-top: 2rem;
  }

  .stories {
    grid-template-columns: 1fr;
  }

  .story-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
