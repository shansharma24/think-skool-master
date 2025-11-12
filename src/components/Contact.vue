<template>
  <section class="contact">
    <div class="container">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input v-model="form.name" type="text" placeholder="Name" required />
        </div>
        <div class="form-group">
          <input v-model="form.role" type="text" placeholder="Role" required />
        </div>
        <div class="form-group">
          <input v-model="form.phone" type="tel" placeholder="Phone" required />
        </div>
        <div class="form-group">
          <input v-model="form.email" type="email" placeholder="Email" required />
        </div>
        <button type="submit" class="submit-btn">Request Demo</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const form = ref({
  name: '',
  role: '',
  phone: '',
  email: ''
})

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  alert('Thank you for your interest! We will contact you soon.')
}

onMounted(() => {
  gsap.from('.contact h2', {
    scrollTrigger: '.contact',
    y: 50,
    opacity: 0,
    duration: 1
  })
  gsap.from('.contact-form', {
    scrollTrigger: '.contact-form',
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3
  })
  gsap.from('.form-group', {
    scrollTrigger: '.contact-form',
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.5
  })
  gsap.from('.submit-btn', {
    scrollTrigger: '.contact-form',
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay: 1
  })
})
</script>

<style scoped>
.contact {
  padding: 100px 0;
  background: white;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.submit-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}
</style>
