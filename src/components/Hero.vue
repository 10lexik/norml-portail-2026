<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const logo = ref(null)
const headline = ref(null)
const subhead = ref(null)
const cta = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

  tl.fromTo(logo.value, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    .fromTo(headline.value, { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, '-=0.6')
    .fromTo(subhead.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8')
    .fromTo(cta.value, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(1.5)' }, '-=0.8')
})
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
    <!-- Logo -->
    <img ref="logo" src="../assets/img/logo.svg" alt="NORML France Logo" class="w-48 md:w-64 mb-12 drop-shadow-2xl z-10" />
    
    <!-- Content -->
    <div class="text-center z-10 max-w-4xl">
      <h1 ref="headline" class="text-5xl md:text-7xl lg:text-8xl font-black text-prohib-black mb-6 leading-tight uppercase">
        Les outils numériques de <br/>
        <span class="text-gradient-norml">NORML France</span>
      </h1>
      <p ref="subhead" class="text-xl md:text-2xl text-prohib-black/80 font-medium mb-12 max-w-2xl mx-auto">
        Découvrez nos projets interactifs conçus pour informer, sensibiliser et mobiliser.
      </p>
      <div ref="cta">
        <a href="https://www.helloasso.com/associations/norml-france/adhesions/adhesion-2024-a-norml-france" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 bg-reg-green text-white text-lg font-bold uppercase tracking-widest rounded-full hover:bg-light-green hover:shadow-xl transition-all hover:-translate-y-1">
          Devenir Membre
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>
