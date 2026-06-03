import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/urgence-afd',
      name: 'urgence-afd',
      component: () => import('../views/UrgenceAFD.vue')
    },
    {
      path: '/ticket-caisse',
      name: 'ticket-caisse',
      component: () => import('../views/TicketCaisse.vue')
    },
    {
      path: '/bilan-live',
      name: 'bilan-live',
      component: () => import('../views/BilanLive.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
