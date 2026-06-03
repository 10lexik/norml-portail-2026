<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const headerRef = ref<HTMLElement | null>(null)
let isVisible = false

const handleScroll = () => {
  if (!headerRef.value) return
  const scrollY = window.scrollY
  
  if (scrollY > 600 && !isVisible) {
    isVisible = true
    gsap.to(headerRef.value, { y: 0, duration: 0.5, ease: "power3.out" })
  } else if (scrollY <= 600 && isVisible) {
    isVisible = false
    gsap.to(headerRef.value, { y: -100, duration: 0.3, ease: "power2.in" })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (headerRef.value) {
    gsap.set(headerRef.value, { y: -100 })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    ref="headerRef" 
    class="fixed top-0 left-0 w-full bg-poster-beige/90 backdrop-blur-md border-b border-prohib-black/10 z-50 px-6 py-4 flex justify-between items-center shadow-sm"
  >
    <div class="flex items-center gap-4">
      <img src="../assets/img/logo.svg" alt="NORML France" class="h-10 drop-shadow-sm" />
      <span class="font-bold font-main text-xl text-prohib-black tracking-wide uppercase hidden md:block mt-1">
        Les Outils Numériques
      </span>
    </div>
    
    <a 
      href="https://www.helloasso.com/associations/norml-france/adhesions/adhesion-2024-a-norml-france" 
      target="_blank" 
      class="inline-flex items-center gap-2 px-6 py-3 bg-prohib-black text-white font-bold font-main uppercase tracking-widest rounded-full hover:bg-reg-green transition-colors shadow-lg text-sm cursor-interaction"
    >
      Soutenir notre action
    </a>
  </header>
</template>
