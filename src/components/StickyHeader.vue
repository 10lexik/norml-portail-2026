<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

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

const switchLocale = (lang: string) => {
  locale.value = lang as any
}
</script>

<template>
  <header ref="headerRef"
    class="fixed top-0 left-0 w-full bg-poster-beige/90 backdrop-blur-md border-b border-prohib-black/10 z-50 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-sm">
    <div class="flex items-center gap-4">
      <img src="../assets/img/logo-norml.svg" alt="NORML France" class="h-8 md:h-10 drop-shadow-sm" />
    </div>

    <div class="flex items-center gap-4">
      <!-- Language Switcher -->
      <div class="flex items-center gap-2 text-sm font-bold font-main text-prohib-black/70 cursor-interaction">
        <button @click="switchLocale('fr')"
          :class="{ 'text-reg-green border-b-2 border-reg-green': locale === 'fr', 'hover:text-prohib-black': locale !== 'fr' }"
          class="transition-colors pb-1">FR</button>
        <span class="opacity-50">|</span>
        <button @click="switchLocale('en')"
          :class="{ 'text-reg-green border-b-2 border-reg-green': locale === 'en', 'hover:text-prohib-black': locale !== 'en' }"
          class="transition-colors pb-1">EN</button>
      </div>

      <a href="https://www.norml.fr/categorie-produit/adhesions-dons-souscriptions/" target="_blank"
        class="inline-flex items-center gap-2 px-[4vw] py-[2vw] md:px-6 md:py-3 bg-prohib-black text-white font-bold font-main uppercase tracking-widest rounded-full hover:bg-reg-green transition-colors shadow-lg text-[3.2vw] sm:text-xs md:text-sm whitespace-nowrap active:scale-95 active:shadow-inner cursor-interaction">
        {{ $t('header.cta') }}
      </a>
    </div>
  </header>
</template>
