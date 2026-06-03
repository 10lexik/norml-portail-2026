<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

// Refs for GSAP targets
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const heroCta = ref<HTMLElement | null>(null)
const cards = ref<HTMLElement[]>([])

const addCardRef = (el: any) => {
  if (el) cards.value.push(el as HTMLElement)
}

onMounted(() => {
  // Clear any existing cards ref array to avoid duplicates on hot-reload
  cards.value = cards.value.filter(Boolean)

  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } })

  // 1. Initial page load reveal animations
  tl.fromTo(
    '.hero-bg-orb',
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 0.2, duration: 1.8, stagger: 0.2 }
  )
  .fromTo(
    heroTitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2 },
    '-=1.4'
  )
  .fromTo(
    heroSubtitle.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    '-=1.0'
  )
  .fromTo(
    heroCta.value,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.8'
  )
  .fromTo(
    '.feature-card',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
    '-=0.6'
  )
})

// Mouse movement interactive hover effect on cards (3D tilt)
const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  // Normalize coordinates
  const rotateX = -(y / rect.height) * 15
  const rotateY = (x / rect.width) * 15
  
  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    transformPerspective: 600,
    ease: 'power2.out',
    duration: 0.3,
    boxShadow: `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)`
  })
}

const handleMouseLeave = (card: HTMLElement) => {
  if (!card) return
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    ease: 'power2.out',
    duration: 0.5,
    boxShadow: 'none'
  })
}
</script>

<template>
  <div class="showcase-container">
    <!-- Background Glow Orbs -->
    <div class="glow-orb glow-orb-1 hero-bg-orb"></div>
    <div class="glow-orb glow-orb-2 hero-bg-orb"></div>

    <!-- Hero Section -->
    <header class="hero-section">
      <div class="tagline">Vue 3 + TypeScript + GSAP</div>
      <h1 ref="heroTitle" class="hero-title">
        Create <span class="gradient-text">Stunning</span> Digital Experiences
      </h1>
      <p ref="heroSubtitle" class="hero-subtitle">
        A premium, production-ready starter kit configured with high-performance animations, strict type safety, and optimized build setups.
      </p>
      <div ref="heroCta" class="hero-cta">
        <a href="https://github.com/10lexik/norml-portail-2026" target="_blank" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Repository GitHub
        </a>
        <a href="https://vercel.com" target="_blank" class="btn btn-secondary">
          Déployé sur Vercel
        </a>
      </div>
    </header>

    <!-- Interactive Cards Section -->
    <section class="features-grid">
      <div 
        v-for="(feature, idx) in features" 
        :key="idx"
        :ref="addCardRef"
        class="glass-panel feature-card"
        @mousemove="(e) => handleMouseMove(e, cards[idx])"
        @mouseleave="() => handleMouseLeave(cards[idx])"
      >
        <div class="card-icon" :style="{ color: feature.color }">
          <component :is="feature.icon" />
        </div>
        <h3 class="card-title">{{ feature.title }}</h3>
        <p class="card-description">{{ feature.description }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Custom minimal SVG icon components for styling
const BoltIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }),
  h('circle', { cx: '12', cy: '12', r: '4' })
])

const PaletteIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C4.85857 19 4.5 20 5.5 21C6.5 22 8 21 8 21C9.19619 21.6415 10.5552 22 12 22Z' }),
  h('circle', { cx: '7.5', cy: '10.5', r: '1.5' }),
  h('circle', { cx: '11.5', cy: '7.5', r: '1.5' }),
  h('circle', { cx: '16.5', cy: '9.5', r: '1.5' }),
  h('circle', { cx: '15.5', cy: '14.5', r: '1.5' })
])

const RocketIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5s1.26 2.5 5.5 2.5 4.24-1 5.5-2.5' }),
  h('path', { d: 'm12.5 11.5 6.5-6.5' }),
  h('path', { d: 'm14 6.5 4 4' }),
  h('path', { d: 'M9 15c-1.5 1.5-2.5 3.5-2.5 5.5s.5 2.5 2.5 2.5c2 0 4-1 5.5-2.5' }),
  h('path', { d: 'M15 9c1.5-1.5 3.5-2.5 5.5-2.5s2.5.5 2.5 2.5c0 2-1 4-2.5 5.5' })
])

export default defineComponent({
  name: 'Showcase',
  data() {
    return {
      features: [
        {
          title: 'Vite & Vue 3',
          description: 'HMR instantané avec le compilateur de composants SFC le plus performant du marché.',
          color: '#06b6d4',
          icon: BoltIcon
        },
        {
          title: 'GSAP Animations',
          description: 'Moteur d\'animation ultra-performant intégré pour des transitions fluides et interactives.',
          color: '#a855f7',
          icon: PaletteIcon
        },
        {
          title: 'Production Ready',
          description: 'Optimisé pour le déploiement sur Vercel et configuré pour le SEO et le support PWA.',
          color: '#f43f5e',
          icon: RocketIcon
        }
      ]
    }
  }
})
</script>

<style scoped>
.showcase-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero-section {
  text-align: center;
  max-width: 800px;
  margin-bottom: 5rem;
  z-index: 10;
}

.tagline {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent-secondary);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  z-index: 10;
}

.feature-card {
  padding: 2.5rem 2rem;
  text-align: left;
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
}

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero-section {
    margin-bottom: 3rem;
  }
}
</style>
