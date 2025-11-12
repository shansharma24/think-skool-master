import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Programs from './components/Programs.vue'
import Advantage from './components/Advantage.vue'
import Courses from './components/Courses.vue'
import Portal from './components/Portal.vue'
import Exposure from './components/Exposure.vue'
import Contact from './components/Contact.vue'
import Dashboard from './components/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/programs', name: 'Programs', component: Programs },
  { path: '/advantage', name: 'Advantage', component: Advantage },
  { path: '/courses', name: 'Courses', component: Courses },
  { path: '/portal', name: 'Portal', component: Portal },
  { path: '/exposure', name: 'Exposure', component: Exposure },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
