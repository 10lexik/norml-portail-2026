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
    <img ref="logo" src="../assets/img/logo-norml.svg" alt="NORML France Logo"
      class="w-48 md:w-64 mb-12 drop-shadow-2xl z-10" />

    <!-- Content -->
    <div class="text-center z-10 max-w-4xl">
      <h1 ref="headline"
        class="text-[11vw] sm:text-5xl md:text-7xl lg:text-8xl font-black text-prohib-black mb-6 leading-tight uppercase">
        {{ $t('hero.title_part1') }} <br />
        <span class="text-gradient-norml">{{ $t('hero.title_part2') }}</span>
      </h1>
      <p ref="subhead" class="text-[4.5vw] sm:text-xl md:text-2xl text-prohib-black/80 font-medium mb-12 max-w-2xl mx-auto">
        {{ $t('hero.subtitle') }}
      </p>
      <div ref="cta">
        <a href="https://www.norml.fr/categorie-produit/adhesions-dons-souscriptions/"
          target="_blank"
          class="inline-flex items-center justify-center gap-4 px-[6vw] py-[3.5vw] sm:px-10 sm:py-5 bg-prohib-black text-white text-[4vw] sm:text-xl whitespace-nowrap font-bold font-main uppercase tracking-widest rounded-full hover:bg-white hover:text-prohib-black transition-all shadow-[0_10px_40px_rgba(20,20,20,0.4)] hover:shadow-[0_10px_50px_rgba(255,255,255,0.4)] hover:-translate-y-2 active:scale-95 active:shadow-inner cursor-interaction">
          {{ $t('hero.cta') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-arrow-right">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
