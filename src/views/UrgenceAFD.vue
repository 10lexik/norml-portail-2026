<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

gsap.registerPlugin(ScrollTrigger)
const { t, tm } = useI18n()

// For FAQ accordion logic
const faqOpen = ref<number | null>(null)
const toggleFaq = (idx: number) => {
  faqOpen.value = faqOpen.value === idx ? null : idx
}

onMounted(() => {
  window.scrollTo(0, 0);

  gsap.from(".animate-fade-up", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".animate-fade-up",
      start: "top 90%",
    }
  })

  const elements = gsap.utils.toArray('.scroll-fade')
  elements.forEach((el: any) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-poster-beige text-prohib-black pb-20">
    <!-- HERO SECTION -->
    <section class="bg-prohib-black text-white pt-32 pb-20 px-6 text-center rounded-b-[3rem] shadow-xl relative z-10 overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-[-50%] left-[-10%] w-[800px] h-[800px] bg-error-red/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="animate-fade-up inline-block bg-error-red text-white py-1 px-4 rounded font-bold uppercase mb-6 shadow-lg tracking-widest text-sm">
        {{ t('urgencePage.badge') }}
      </div>
      <h1 class="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight font-main uppercase">
        {{ t('urgencePage.heroTitle') }}<br>
        <span class="text-reg-green">{{ t('urgencePage.heroSubtitle') }}</span>
      </h1>
      <p class="animate-fade-up text-xl md:text-2xl opacity-90 max-w-4xl mx-auto font-body leading-relaxed text-gray-300" v-html="t('urgencePage.heroDesc')">
      </p>
    </section>

    <div class="max-w-4xl mx-auto px-6 mt-16 space-y-12">
      <!-- CONTEXTE ACTU -->
      <div class="scroll-fade border-l-4 border-reg-green pl-6 py-4 italic text-gray-700 text-lg bg-white/50 rounded-r-lg shadow-sm">
        <p v-html="t('urgencePage.didYouKnowText')"></p>
      </div>

      <p class="scroll-fade text-xl leading-relaxed" v-html="t('urgencePage.introText')"></p>

      <!-- ALERTE BOX -->
      <div class="scroll-fade bg-red-50 border-l-8 border-error-red p-8 rounded-xl shadow-md">
        <h3 class="text-error-red text-2xl font-bold mb-4 flex items-center font-main uppercase">
          <span class="mr-3 text-3xl">⚠️</span> {{ t('urgencePage.alertTitle') }}
        </h3>
        <p class="mb-4 text-lg text-gray-800">{{ t('urgencePage.alertText') }}</p>
        <ul class="list-disc list-inside space-y-2 text-gray-700 text-lg">
          <li v-for="(pt, idx) in tm('urgencePage.alertPoints')" :key="idx" v-html="pt"></li>
        </ul>
      </div>

      <!-- KIT SECTION -->
      <div class="scroll-fade">
        <h2 class="text-3xl font-black font-main uppercase mb-4">{{ t('urgencePage.solutionTitle') }}</h2>
        <p class="text-lg text-gray-700 mb-8">{{ t('urgencePage.solutionDesc') }}</p>

        <div class="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <!-- Visual -->
          <div class="flex-1 bg-gray-50 flex flex-col justify-center items-center p-10 relative border-b md:border-b-0 md:border-r border-gray-200">
            <span class="absolute top-4 right-4 bg-error-red text-white px-2 py-1 text-xs font-bold rounded tracking-wider">PDF</span>
            <div class="text-6xl mb-4 drop-shadow-md">⚖️</div>
            <h3 class="text-2xl font-black font-main text-reg-green text-center uppercase leading-tight" v-html="t('urgencePage.kitTitle')"></h3>
            <p class="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">{{ t('urgencePage.kitSubtitle') }}</p>
            <div class="w-16 h-1.5 bg-reg-green mt-6 rounded-full"></div>
          </div>
          <!-- Content -->
          <div class="flex-[2] p-8 md:p-10">
            <h3 class="text-2xl font-bold mb-4 font-main">{{ t('urgencePage.kitContentTitle') }}</h3>
            <p class="text-gray-600 mb-6 font-body text-lg">{{ t('urgencePage.kitContentDesc') }}</p>
            <ul class="space-y-4 mb-8">
              <li v-for="(pt, idx) in tm('urgencePage.kitPoints')" :key="idx" class="flex items-start">
                <span class="text-reg-green mr-3 text-xl">✅</span>
                <span class="text-gray-800 font-medium text-lg leading-tight">{{ pt }}</span>
              </li>
            </ul>
            <form class="flex flex-col sm:flex-row gap-3" @submit.prevent>
              <input type="email" :placeholder="t('urgencePage.formPlaceholder')" required class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-reg-green focus:ring-1 focus:ring-reg-green transition-colors font-body text-lg">
              <button type="submit" class="bg-reg-green text-white font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md">{{ t('urgencePage.formBtn') }}</button>
            </form>
            <p class="text-xs text-gray-500 mt-4 flex items-center font-bold tracking-wide"><span class="mr-2">🔒</span> {{ t('urgencePage.formDisclaimer') }}</p>
          </div>
        </div>
      </div>

      <!-- EXPERTS SECTION -->
      <div class="scroll-fade pt-12">
        <h2 class="text-3xl font-black font-main text-center uppercase mb-4">{{ t('urgencePage.expertsTitle') }}</h2>
        <p class="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-body">{{ t('urgencePage.expertsDesc') }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(expert, idx) in tm('urgencePage.experts')" :key="idx" class="bg-white rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <img :src="expert.img" :alt="expert.name" class="w-24 h-24 mx-auto rounded-full object-cover border-4 border-reg-green mb-4 shadow-md">
            <div class="font-black text-xl font-main mb-1">{{ expert.name }}</div>
            <div class="text-reg-green font-bold text-xs uppercase tracking-widest mb-4">{{ expert.role }}</div>
            <p class="text-gray-600 text-sm leading-relaxed font-body" v-html="expert.bio"></p>
          </div>
        </div>
      </div>

      <!-- FAQ SECTION -->
      <div class="scroll-fade bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mt-16">
        <h2 class="text-3xl font-black font-main text-center uppercase mb-10">{{ t('urgencePage.faqTitle') }}</h2>
        
        <div class="space-y-4">
          <div v-for="(faq, idx) in tm('urgencePage.faqs')" :key="idx" class="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <button @click="toggleFaq(idx)" class="w-full flex justify-between items-center text-left py-4 focus:outline-none group">
              <span class="font-bold text-lg text-prohib-black group-hover:text-reg-green transition-colors pr-8 font-main">{{ faq.q }}</span>
              <span class="text-2xl font-light text-reg-green transition-transform duration-300" :class="{'text-error-red rotate-45': faqOpen === idx}">+</span>
            </button>
            <div v-show="faqOpen === idx" class="pb-6 pl-4 border-l-4 border-reg-green text-gray-600 leading-relaxed font-body">
              <p v-html="faq.a"></p>
            </div>
          </div>
        </div>
      </div>

      <!-- JOIN SECTION -->
      <div class="scroll-fade text-center py-16 border-t border-gray-200 mt-16">
        <h2 class="text-4xl font-black font-main uppercase mb-6">{{ t('urgencePage.joinTitle') }}</h2>
        <p class="text-xl text-gray-700 mb-10 leading-relaxed font-body" v-html="t('urgencePage.joinDesc')"></p>
        <a href="#" class="inline-block bg-error-red text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-red-700 transition-all duration-300 ease-out shadow-[0_10px_25px_-5px_rgba(211,47,47,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(211,47,47,0.6)] hover:-translate-y-1">
          {{ t('urgencePage.joinBtn') }}
        </a>
        <p class="mt-4 text-gray-500 font-bold uppercase tracking-wider text-sm">{{ t('urgencePage.joinSub') }}</p>
      </div>

      <!-- FOOTER / RETURN -->
      <div class="text-center pb-12">
        <router-link to="/" class="inline-flex items-center gap-2 text-prohib-black font-bold uppercase tracking-widest hover:text-reg-green transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Retour au portail
        </router-link>
      </div>

    </div>
  </div>
</template>