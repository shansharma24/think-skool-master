<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <div class="logo-placeholder">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <span>Think Skool</span>
          </div>
          <p>Empowering students with real-world tech skills and career opportunities.</p>
          <div class="footer-social">
            <a href="#" class="social-link">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h3>Programs</h3>
          <ul class="footer-links">
            <li><router-link to="/courses">All Courses</router-link></li>
            <li><router-link to="/programs">Specializations</router-link></li>
            <li><router-link to="/portal">Learning Portal</router-link></li>
            <li><router-link to="/exposure">Real-World Exposure</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Company</h3>
          <ul class="footer-links">
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/advantage">Our Advantage</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Support</h3>
          <ul class="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Student Resources</a></li>
            <li><a href="#">Technical Support</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter for the latest updates and exclusive content.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2025 Think Skool. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No specific script needed for footer
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #e0e0e0;
  padding: 60px 0 20px;
  margin-top: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: white;
}

.logo-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0066cc, #004499);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 15px;
}

.footer-section h3 {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: white;
}

.footer-section p {
  margin-bottom: 20px;
  color: #ccc;
  line-height: 1.6;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0e0e0;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #0066cc;
  color: white;
  transform: translateY(-3px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #90caf9;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.newsletter-form input::placeholder {
  color: #aaa;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #0066cc;
}

.newsletter-form button {
  padding: 12px 15px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: #004499;
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom p {
  color: #ccc;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: #90caf9;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form button {
    width: 100%;
  }
}
</style>
