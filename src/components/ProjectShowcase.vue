<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const titleRef = ref(null)
const cardsRef = ref<HTMLElement[]>([])

const addCard = (el: any) => {
  if (el && !cardsRef.value.includes(el)) cardsRef.value.push(el)
}

const projects = [
  {
    title: 'Trivia Kanna',
    id: 'norml-trvknn',
    desc: 'Un jeu interactif pour tester et améliorer vos connaissances sur le cannabis.',
    url: 'https://norml-trvknn.vercel.app/',
    color: '#d4af37' // color-gold
  },
  {
    title: 'NORML Globe',
    id: 'norml-globe',
    desc: 'Visualisation 3D interactive des législations mondiales.',
    url: 'https://norml-globe.vercel.app/',
    color: '#4caf50' // color-highlight-green
  }
]

onMounted(() => {
  // Title reveal
  gsap.fromTo(titleRef.value, 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%'
      }
    }
  )

  // Staggered cards reveal
  gsap.fromTo(cardsRef.value,
    { opacity: 0, y: 100, rotateX: 15 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 60%'
      }
    }
  )
})

const handleMouseMove = (e: MouseEvent, idx: number) => {
  const card = cardsRef.value[idx] as HTMLElement
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  const rotateX = -(y / rect.height) * 20
  const rotateY = (x / rect.width) * 20
  
  gsap.to(card, {
    rotateX,
    rotateY,
    transformPerspective: 1000,
    ease: 'power2.out',
    duration: 0.4,
    scale: 1.02,
    zIndex: 10,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  })
}

const handleMouseLeave = (idx: number) => {
  const card = cardsRef.value[idx] as HTMLElement
  if (!card) return
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    ease: 'power3.out',
    duration: 0.6,
    zIndex: 1,
    boxShadow: 'none'
  })
}
</script>

<template>
  <section ref="sectionRef" class="py-32 px-6 md:px-12 bg-prohib-black text-white relative rounded-t-[3rem] -mt-10 z-20 shadow-2xl">
    <div class="max-w-6xl mx-auto">
      <h2 ref="titleRef" class="text-4xl md:text-5xl font-black mb-16 text-center tracking-wide uppercase">
        Nos Projets <span class="text-gradient-norml">Phares</span>
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <a 
          v-for="(p, i) in projects" 
          :key="p.id" 
          :href="p.url"
          target="_blank"
          :ref="addCard"
          @mousemove="(e) => handleMouseMove(e, i)"
          @mouseleave="() => handleMouseLeave(i)"
          class="block group relative p-[2px] bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"
        >
          <!-- Hover border effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
          
          <div class="bg-prohib-black h-full rounded-[22px] p-8 relative overflow-hidden">
            <!-- Glow effect -->
            <div class="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" :style="{ backgroundColor: p.color }"></div>
            
            <h3 class="text-3xl font-bold mb-4 font-main tracking-tight uppercase" :style="{ color: p.color }">{{ p.title }}</h3>
            <p class="text-gray-400 text-lg mb-10 font-body leading-relaxed">{{ p.desc }}</p>
            
            <div class="flex items-center text-sm font-bold tracking-wider uppercase transition-colors" :style="{ color: p.color }">
              Découvrir le projet
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
