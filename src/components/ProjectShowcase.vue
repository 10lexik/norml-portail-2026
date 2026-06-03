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

  // Continuous Globe Animation (Wireframe spinning effect)
  gsap.to('.meridian-1', { rotationY: 360, duration: 4, repeat: -1, ease: "none" })
  gsap.to('.meridian-2', { rotationY: 360, duration: 6, repeat: -1, ease: "none" })
  gsap.to('.meridian-3', { rotationY: 360, duration: 5, repeat: -1, ease: "none" })
  gsap.to('.globe-ping', { scale: 1.5, opacity: 0.8, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" })
})

const handleMouseMove = (e: MouseEvent, idx: number) => {
  const card = cardsRef.value[idx] as HTMLElement
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  const rotateX = -(y / rect.height) * 20
  const rotateY = (x / rect.width) * 20
  
  // 3D Tilt Effect
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

  // Preview Animations on Hover
  if (projects[idx].id === 'norml-trvknn') {
    gsap.to(card.querySelector('.card-1'), { x: -35, rotateZ: -15, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.card-2'), { x: 0, rotateZ: 0, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.card-3'), { x: 35, rotateZ: 15, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.question-mark'), { opacity: 0, scale: 0.5, duration: 0.2, overwrite: "auto" })
    gsap.to(card.querySelector('.check-mark'), { opacity: 1, scale: 1, delay: 0.15, duration: 0.3, ease: "back.out(2)", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-globe') {
    gsap.to(card.querySelector('.globe-ping'), { boxShadow: '0 0 30px 10px #4caf50', duration: 0.3, overwrite: "auto" })
    gsap.to(card.querySelector('.globe-container'), { scale: 1.15, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
  }
}

const handleMouseLeave = (idx: number) => {
  const card = cardsRef.value[idx] as HTMLElement
  if (!card) return
  
  // Reset 3D Tilt
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    ease: 'power3.out',
    duration: 0.6,
    zIndex: 1,
    boxShadow: 'none'
  })

  // Reset Preview Animations
  if (projects[idx].id === 'norml-trvknn') {
    gsap.to(card.querySelectorAll('.card-1, .card-2, .card-3'), { x: 0, rotateZ: 0, duration: 0.5, ease: 'back.out(1.2)', overwrite: "auto" })
    gsap.to(card.querySelector('.question-mark'), { opacity: 1, scale: 1, duration: 0.3, delay: 0.1, overwrite: "auto" })
    gsap.to(card.querySelector('.check-mark'), { opacity: 0, scale: 0.5, duration: 0.2, overwrite: "auto" })
  } else if (projects[idx].id === 'norml-globe') {
    gsap.to(card.querySelector('.globe-ping'), { boxShadow: '0 0 15px 0px #4caf50', duration: 0.5, overwrite: "auto" })
    gsap.to(card.querySelector('.globe-container'), { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" })
  }
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
          class="block group relative p-[2px] bg-gradient-to-br from-white/20 to-white/5 rounded-3xl cursor-pointer"
          style="perspective: 1000px;"
        >
          <!-- Hover border effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
          
          <div class="bg-prohib-black h-full rounded-[22px] p-8 relative overflow-hidden flex flex-col pointer-events-none">
            <!-- Glow effect -->
            <div class="absolute -right-12 -top-12 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" :style="{ backgroundColor: p.color }"></div>
            
            <!-- SVG PREVIEWS -->
            <div class="relative h-48 w-full mb-8 flex items-center justify-center">
              
              <!-- Preview Trivia Kanna -->
              <div v-if="p.id === 'norml-trvknn'" class="relative w-full h-full flex items-center justify-center">
                <!-- Back card -->
                <div class="absolute w-28 h-40 rounded-xl border border-white/20 bg-white/5 shadow-lg flex items-center justify-center card-3">
                  <div class="w-14 h-2 bg-white/10 rounded-full"></div>
                </div>
                <!-- Middle card -->
                <div class="absolute w-28 h-40 rounded-xl border border-white/20 bg-white/10 shadow-lg flex items-center justify-center card-2">
                  <div class="w-14 h-2 bg-white/20 rounded-full"></div>
                </div>
                <!-- Front card -->
                <div class="absolute w-28 h-40 rounded-xl border-2 border-[#d4af37]/60 bg-[#141414] shadow-2xl flex items-center justify-center card-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="question-mark drop-shadow-md"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-mark absolute opacity-0 scale-50 drop-shadow-lg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>

              <!-- Preview NORML Globe -->
              <div v-if="p.id === 'norml-globe'" class="relative w-full h-full flex items-center justify-center perspective-[500px]">
                <div class="w-36 h-36 rounded-full border-2 border-white/20 flex items-center justify-center relative overflow-hidden globe-container">
                  <!-- Latitudes -->
                  <div class="absolute w-full h-[1px] bg-white/30 top-[25%] shadow-[0_0_5px_rgba(255,255,255,0.3)]"></div>
                  <div class="absolute w-full h-[1px] bg-white/30 top-[50%] shadow-[0_0_5px_rgba(255,255,255,0.3)]"></div>
                  <div class="absolute w-full h-[1px] bg-white/30 top-[75%] shadow-[0_0_5px_rgba(255,255,255,0.3)]"></div>
                  <!-- Longitudes (animated) -->
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-1" style="transform-style: preserve-3d;"></div>
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-2" style="transform-style: preserve-3d;"></div>
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-3" style="transform-style: preserve-3d;"></div>
                  <!-- Active Ping -->
                  <div class="absolute w-3 h-3 bg-[#4caf50] rounded-full top-[30%] left-[65%] globe-ping shadow-[0_0_15px_2px_#4caf50]"></div>
                </div>
              </div>

            </div>
            
            <h3 class="text-3xl font-bold mb-4 font-main tracking-tight uppercase mt-auto" :style="{ color: p.color }">{{ p.title }}</h3>
            <p class="text-gray-400 text-lg mb-8 font-body leading-relaxed">{{ p.desc }}</p>
            
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
