<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const titleRef = ref(null)

const projects = [
  {
    key: 'trivia',
    id: 'norml-trvknn',
    url: 'https://norml-trvknn.vercel.app/',
    route: null,
    color: '#d4af37'
  },
  {
    key: 'globe',
    id: 'norml-globe',
    url: 'https://norml-globe.vercel.app/',
    route: null,
    color: '#4caf50'
  },
  {
    key: 'urgence',
    id: 'norml-urgence',
    url: null,
    route: '/urgence-afd',
    color: '#d32f2f'
  },
  {
    key: 'ticket',
    id: 'norml-ticket',
    url: null,
    route: '/ticket-caisse',
    color: '#2E8A42'
  },
  {
    key: 'bilan',
    id: 'norml-bilan',
    url: null,
    route: '/bilan-live',
    color: '#8bc34a'
  }
]

onMounted(() => {
  gsap.fromTo(titleRef.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' } }
  )

  gsap.fromTo('.project-card',
    { opacity: 0, y: 100, rotateX: 15 },
    { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)', scrollTrigger: { trigger: sectionRef.value, start: 'top 60%' } }
  )

  gsap.to('.meridian-1', { rotationY: 360, duration: 4, repeat: -1, ease: "none" })
  gsap.to('.meridian-2', { rotationY: 360, duration: 6, repeat: -1, ease: "none" })
  gsap.to('.meridian-3', { rotationY: 360, duration: 5, repeat: -1, ease: "none" })
  gsap.to('.globe-ping', { scale: 1.5, opacity: 0.8, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" })

  gsap.to('.pulse-fast', { scale: 1.1, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" })

  // Mobile scrub animations
  const mm = gsap.matchMedia()
  mm.add("(max-width: 768px)", () => {
    const cards = gsap.utils.toArray('.project-card') as HTMLElement[]
    cards.forEach((card, idx) => {
      const projectId = projects[idx].id

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'center 50%',
          scrub: 1
        }
      })

      // Generic card hover FX
      tl.to(card, { scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }, 0)
      tl.to(card.querySelector('.absolute.inset-0.bg-gradient-to-br'), { opacity: 1 }, 0)
      tl.to(card.querySelector('svg.ml-2'), { x: 8 }, 0)

      if (projectId === 'norml-trvknn') {
        tl.to(card.querySelector('.card-1'), { x: -35, rotateZ: -15 }, 0)
          .to(card.querySelector('.card-3'), { x: 35, rotateZ: 15 }, 0)
          .to(card.querySelector('.question-mark'), { opacity: 0, scale: 0.5 }, 0)
          .to(card.querySelector('.check-mark'), { opacity: 1, scale: 1 }, 0)
      } else if (projectId === 'norml-globe') {
        tl.to(card.querySelector('.globe-ping'), { boxShadow: '0 0 30px 10px #4caf50' }, 0)
          .to(card.querySelector('.globe-container'), { scale: 1.15 }, 0)
      } else if (projectId === 'norml-urgence') {
        tl.to(card.querySelector('.urgence-1'), { scale: 1.1 }, 0)
          .to(card.querySelector('.urgence-2'), { scale: 1.3, opacity: 0.5 }, 0)
          .to(card.querySelector('.urgence-3'), { scale: 1.5, opacity: 0.2 }, 0)
      } else if (projectId === 'norml-ticket') {
        tl.to(card.querySelector('.ticket-1'), { y: 25, rotateZ: 5 }, 0)
          .to(card.querySelector('.ticket-3'), { y: -25, rotateZ: -5 }, 0)
      } else if (projectId === 'norml-bilan') {
        tl.to(card.querySelector('.bilan-1'), { y: -20, scale: 1.05 }, 0)
          .to(card.querySelector('.bilan-3'), { y: 20, scale: 0.95 }, 0)
          .to(card.querySelector('.bilan-counter'), { scale: 1.15, textShadow: '0 0 15px #8bc34a' }, 0)
      }
    })
  })
})

const handleMouseMove = (e: MouseEvent, idx: number) => {
  const card = e.currentTarget as HTMLElement
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2

  const rotateX = -(y / rect.height) * 20
  const rotateY = (x / rect.width) * 20

  gsap.to(card, { rotateX, rotateY, transformPerspective: 1000, ease: 'power2.out', duration: 0.4, scale: 1.02, zIndex: 10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' })

  if (projects[idx].id === 'norml-trvknn') {
    gsap.to(card.querySelector('.card-1'), { x: -35, rotateZ: -15, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.card-2'), { x: 0, rotateZ: 0, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.card-3'), { x: 35, rotateZ: 15, duration: 0.4, overwrite: "auto", ease: "back.out(1.5)" })
    gsap.to(card.querySelector('.question-mark'), { opacity: 0, scale: 0.5, duration: 0.2, overwrite: "auto" })
    gsap.to(card.querySelector('.check-mark'), { opacity: 1, scale: 1, delay: 0.15, duration: 0.3, ease: "back.out(2)", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-globe') {
    gsap.to(card.querySelector('.globe-ping'), { boxShadow: '0 0 30px 10px #4caf50', duration: 0.3, overwrite: "auto" })
    gsap.to(card.querySelector('.globe-container'), { scale: 1.15, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-urgence') {
    gsap.to(card.querySelector('.urgence-1'), { scale: 1.1, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.urgence-2'), { scale: 1.3, opacity: 0.5, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.urgence-3'), { scale: 1.5, opacity: 0.2, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-ticket') {
    gsap.to(card.querySelector('.ticket-1'), { y: 25, rotateZ: 5, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.ticket-2'), { y: 0, rotateZ: 0, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.ticket-3'), { y: -25, rotateZ: -5, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-bilan') {
    gsap.to(card.querySelector('.bilan-1'), { y: -20, scale: 1.05, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.bilan-2'), { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.bilan-3'), { y: 20, scale: 0.95, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" })
    gsap.to(card.querySelector('.bilan-counter'), { scale: 1.15, textShadow: '0 0 15px #8bc34a', duration: 0.3, overwrite: "auto" })
  }
}

const handleMouseLeave = (e: MouseEvent, idx: number) => {
  const card = e.currentTarget as HTMLElement
  if (!card) return

  gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, ease: 'power3.out', duration: 0.6, zIndex: 1, boxShadow: 'none' })

  if (projects[idx].id === 'norml-trvknn') {
    gsap.to(card.querySelectorAll('.card-1, .card-2, .card-3'), { x: 0, rotateZ: 0, duration: 0.5, ease: 'back.out(1.2)', overwrite: "auto" })
    gsap.to(card.querySelector('.question-mark'), { opacity: 1, scale: 1, duration: 0.3, delay: 0.1, overwrite: "auto" })
    gsap.to(card.querySelector('.check-mark'), { opacity: 0, scale: 0.5, duration: 0.2, overwrite: "auto" })
  } else if (projects[idx].id === 'norml-globe') {
    gsap.to(card.querySelector('.globe-ping'), { boxShadow: '0 0 15px 0px #4caf50', duration: 0.5, overwrite: "auto" })
    gsap.to(card.querySelector('.globe-container'), { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" })
  } else if (projects[idx].id === 'norml-urgence') {
    gsap.to(card.querySelectorAll('.urgence-1, .urgence-2, .urgence-3'), { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)', overwrite: "auto" })
  } else if (projects[idx].id === 'norml-ticket') {
    gsap.to(card.querySelectorAll('.ticket-1, .ticket-2, .ticket-3'), { y: 0, rotateZ: 0, duration: 0.5, ease: 'back.out(1.2)', overwrite: "auto" })
  } else if (projects[idx].id === 'norml-bilan') {
    gsap.to(card.querySelectorAll('.bilan-1, .bilan-2, .bilan-3'), { y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)', overwrite: "auto" })
    gsap.to(card.querySelector('.bilan-counter'), { scale: 1, textShadow: 'none', duration: 0.5, overwrite: "auto" })
  }
}
</script>

<template>
  <section ref="sectionRef"
    class="py-32 px-6 md:px-12 bg-prohib-black text-white relative rounded-t-[3rem] -mt-10 z-20 shadow-2xl">
    <div class="max-w-6xl mx-auto">
      <h2 ref="titleRef"
        class="text-[9vw] sm:text-4xl md:text-5xl font-black mb-16 text-center tracking-wide uppercase">
        {{ $t('projects.title_part1') }} <span class="text-gradient-norml">{{ $t('projects.title_part2') }}</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <component :is="p.route ? 'router-link' : 'a'" v-for="(p, i) in projects" :key="p.id"
          :[p.route?'to':'href']="p.route || p.url" :target="p.url ? '_blank' : undefined"
          @mousemove="(e: MouseEvent) => handleMouseMove(e, i)" @mouseleave="(e: MouseEvent) => handleMouseLeave(e, i)"
          class="project-card block group relative p-[2px] bg-gradient-to-br from-white/20 to-white/5 rounded-3xl cursor-pointer"
          style="perspective: 1000px;">
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-20 md:opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity rounded-3xl pointer-events-none">
          </div>

          <div
            class="bg-prohib-black h-full rounded-[22px] p-8 relative overflow-hidden flex flex-col pointer-events-none">
            <div
              class="absolute -right-12 -top-12 w-64 h-64 rounded-full blur-[80px] opacity-30 md:opacity-20 group-hover:opacity-40 group-active:opacity-40 transition-opacity duration-500"
              :style="{ backgroundColor: p.color }"></div>

            <div class="relative h-40 w-full mb-8 flex items-center justify-center">

              <!-- Trivia -->
              <div v-if="p.id === 'norml-trvknn'" class="relative w-full h-full flex items-center justify-center">
                <div
                  class="absolute w-24 h-32 rounded-xl border border-white/20 bg-white/5 shadow-lg flex items-center justify-center card-3">
                  <div class="w-10 h-1.5 bg-white/10 rounded-full"></div>
                </div>
                <div
                  class="absolute w-24 h-32 rounded-xl border border-white/20 bg-white/10 shadow-lg flex items-center justify-center card-2">
                  <div class="w-10 h-1.5 bg-white/20 rounded-full"></div>
                </div>
                <div
                  class="absolute w-24 h-32 rounded-xl border-2 border-[#d4af37]/60 bg-[#141414] shadow-2xl flex items-center justify-center card-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="question-mark drop-shadow-md">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="#4caf50" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                    class="check-mark absolute opacity-0 scale-50 drop-shadow-lg">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Globe -->
              <div v-else-if="p.id === 'norml-globe'"
                class="relative w-full h-full flex items-center justify-center perspective-[500px]">
                <div
                  class="w-28 h-28 rounded-full border-2 border-white/20 flex items-center justify-center relative overflow-hidden globe-container">
                  <div class="absolute w-full h-[1px] bg-white/30 top-[25%] shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  </div>
                  <div class="absolute w-full h-[1px] bg-white/30 top-[50%] shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  </div>
                  <div class="absolute w-full h-[1px] bg-white/30 top-[75%] shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  </div>
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-1"
                    style="transform-style: preserve-3d;"></div>
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-2"
                    style="transform-style: preserve-3d;"></div>
                  <div class="absolute w-[100%] h-full border border-white/30 rounded-[50%] meridian-3"
                    style="transform-style: preserve-3d;"></div>
                  <div
                    class="absolute w-2 h-2 bg-[#4caf50] rounded-full top-[30%] left-[65%] globe-ping shadow-[0_0_15px_2px_#4caf50]">
                  </div>
                </div>
              </div>

              <!-- Urgence -->
              <div v-else-if="p.id === 'norml-urgence'" class="relative w-full h-full flex items-center justify-center">
                <div
                  class="absolute w-24 h-24 rounded-full border border-white/20 bg-white/5 shadow-lg flex items-center justify-center urgence-3">
                </div>
                <div
                  class="absolute w-24 h-24 rounded-full border border-white/20 bg-white/10 shadow-lg flex items-center justify-center urgence-2">
                </div>
                <div
                  class="absolute w-24 h-24 rounded-full border-2 border-[#d32f2f]/60 bg-[#141414] shadow-2xl flex items-center justify-center urgence-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="#d32f2f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="drop-shadow-md">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>

              <!-- Ticket -->
              <div v-else-if="p.id === 'norml-ticket'" class="relative w-full h-full flex items-center justify-center">
                <div
                  class="absolute w-20 h-28 rounded-sm border border-white/20 bg-white/5 shadow-lg flex flex-col items-center ticket-3 border-b-dotted border-b-4 border-b-white/20">
                  <div class="w-10 h-1 bg-white/10 mt-4 rounded-full"></div>
                </div>
                <div
                  class="absolute w-20 h-28 rounded-sm border border-white/20 bg-white/10 shadow-lg flex flex-col items-center ticket-2 border-b-dotted border-b-4 border-b-white/20">
                  <div class="w-10 h-1 bg-white/20 mt-4 rounded-full"></div>
                </div>
                <div
                  class="absolute w-20 h-28 rounded-sm border-2 border-[#2E8A42]/60 bg-[#141414] shadow-2xl flex flex-col items-center ticket-1 border-b-[4px] border-b-dotted border-b-[#2E8A42]/60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#2E8A42" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="mt-4 drop-shadow-md">
                    <path d="M16 16v-4" />
                    <path d="M8 16v-4" />
                    <path d="M12 16v-6" />
                    <path d="M4 16v-2" />
                    <path d="M20 16v-2" />
                  </svg>
                  <div class="w-12 h-1 bg-[#2E8A42]/40 mt-3 rounded-full"></div>
                  <div class="w-8 h-1 bg-[#2E8A42]/40 mt-1.5 rounded-full"></div>
                </div>
              </div>

              <!-- Bilan -->
              <div v-else-if="p.id === 'norml-bilan'" class="relative w-full h-full flex items-center justify-center">
                <div
                  class="absolute w-32 h-16 rounded-xl border border-white/20 bg-white/5 shadow-lg flex items-center justify-center bilan-3">
                </div>
                <div
                  class="absolute w-32 h-16 rounded-xl border border-white/20 bg-white/10 shadow-lg flex items-center justify-center bilan-2">
                </div>
                <div
                  class="absolute w-32 h-16 rounded-xl border-2 border-[#8bc34a]/60 bg-[#141414] shadow-2xl flex items-center justify-center bilan-1 overflow-hidden">
                  <div
                    class="font-mono text-3xl font-black text-[#8bc34a] tracking-widest bilan-counter drop-shadow-[0_0_10px_rgba(139,195,74,0.5)]">
                    0:00
                  </div>
                </div>
              </div>

            </div>

            <h3 class="text-[6.5vw] sm:text-2xl font-black mb-2 uppercase tracking-tight" :style="{ color: p.color }">
              {{ $t(`projects.items.${p.key}.title`) }}
            </h3>
            <p class="text-[4vw] sm:text-sm text-gray-400 leading-relaxed min-h-[3rem] mb-6 font-body">
              {{ $t(`projects.items.${p.key}.desc`) }}
            </p>

            <div
              class="mt-auto flex items-center text-[3.5vw] sm:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap"
              :style="{ color: p.color }">
              {{ $t('projects.discover') }}
              <svg xmlns="http://www.w3.org/2000/svg"
                class="ml-2 w-5 h-5 group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
