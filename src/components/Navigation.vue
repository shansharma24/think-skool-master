<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <div class="logo-placeholder">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <span>Think Skool</span>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/programs">Programs</router-link></li>
        <li><router-link to="/advantage">Advantage</router-link></li>
        <li><router-link to="/courses">Courses</router-link></li>
        <li><router-link to="/portal">Portal</router-link></li>
        <li><router-link to="/exposure">Exposure</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li class=""><router-link to="/login">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const scrollToSection = (sectionId) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: `#${sectionId}`, offsetY: 70 },
    ease: 'power2.inOut'
  })
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 15px 0;
  transition: background 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #1E293B;
}

.logo-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0071BC, #F26522);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-right: 10px;
}

.logo span {
  background: linear-gradient(135deg, #0071BC 0%, #F26522 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-left: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #64748B;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
  padding: 5px 0;
}

.nav-links a:hover {
  color: #F26522;
}

.nav-links a.router-link-active {
  color: #F26522;
  font-weight: 600;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #F26522;
  border-radius: 1px;
}

.login-btn {
  background-color: #fff;
  border: 2px solid #000; 
  color: #FF8C00;            
  padding: 10px 20px;       
  border-radius: 40px;       
  font-weight: 600;
  font-size: 10px;     
  cursor: pointer;        
  transition: all 0.3s ease; 
}

.login-btn:hover {
  background-color: ; 
  transform: translateY(-2px); 
}

.login-btn:active {
  transform: translateY(0); 
    opacity: 0.9;             
}
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
