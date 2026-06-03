<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const receiptRef = ref(null)

onMounted(() => {
  window.scrollTo(0, 0);
  
  // Animation "Impression du ticket sortant de la fente"
  gsap.from(receiptRef.value, {
    y: "-100%", // Démarre complètement en haut (caché par l'overflow)
    opacity: 1, // On le garde opaque, l'overflow le cache
    duration: 2,
    ease: "power2.out",
    delay: 0.2
  })
  
  gsap.from(".print-line", {
    opacity: 0,
    y: -10,
    stagger: 0.15,
    duration: 0.6,
    delay: 1.0 // Commence quand le ticket est à moitié sorti
  })
})
</script>

<template>
  <!-- Mobile-first: on réduit le min-h ou on utilise 100dvh, alignement vers le haut -->
  <div class="min-h-[100dvh] bg-poster-beige flex flex-col justify-start items-center pt-8 px-4 pb-12">
    
    <!-- Conteneur global du système d'impression (fixe) -->
    <div class="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[420px] -rotate-2 mt-4">
      
      <!-- Fente d'imprimante (reste absolument fixe au-dessus du ticket) -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-[#1a1a1a] rounded-full shadow-inner z-20"></div>
      
      <!-- Fenêtre d'apparition (masque le ticket tant qu'il n'est pas "imprimé") -->
      <div class="overflow-hidden w-full relative z-10 pt-1">
        
        <!-- Le Ticket (celui qui va s'animer vers le bas) -->
        <div ref="receiptRef" class="receipt bg-[#fdfdfd] pt-5 px-4 pb-8 md:pt-6 md:px-6 md:pb-10 text-[#1a1a1a] shadow-[4px_15px_25px_rgba(0,0,0,0.15)] mx-2">
          
          <div class="header text-center mb-4 border-b-2 border-dashed border-gray-400 pb-3 print-line">
            <div class="text-2xl md:text-3xl font-black uppercase text-reg-green leading-tight mb-1" v-html="t('ticketPage.republique')"></div>
            <div class="text-xs md:text-sm text-gray-600 uppercase tracking-widest font-bold">{{ t('ticketPage.subtitle') }}</div>
          </div>

          <div class="mb-4 flex flex-col print-line">
            <div class="flex justify-between items-end mb-1">
              <span class="text-xs md:text-sm font-bold uppercase max-w-[65%]">{{ t('ticketPage.costTitle') }}</span>
              <span class="font-mono font-bold text-base md:text-lg">{{ t('ticketPage.costVal') }}</span>
            </div>
            <div class="text-[10px] md:text-xs text-gray-500 italic">{{ t('ticketPage.costDesc') }}</div>
            <span class="font-mono text-[10px] md:text-xs border border-gray-300 rounded px-2 py-0.5 text-gray-500 inline-block mt-1 self-start">{{ t('ticketPage.costBase') }}</span>
          </div>

          <div class="mb-4 flex flex-col print-line">
            <div class="flex justify-between items-end mb-1">
              <span class="text-xs md:text-sm font-bold uppercase max-w-[65%]">{{ t('ticketPage.revenueTitle') }}</span>
              <span class="font-mono font-bold text-base md:text-lg">{{ t('ticketPage.revenueVal') }}</span>
            </div>
            <div class="text-[10px] md:text-xs text-gray-500 italic">{{ t('ticketPage.revenueDesc') }}</div>
            <span class="font-mono text-[10px] md:text-xs border border-gray-300 rounded px-2 py-0.5 text-gray-500 inline-block mt-1 self-start">{{ t('ticketPage.revenueBase') }}</span>
          </div>

          <div class="border-t-2 border-dashed border-gray-400 my-3 print-line"></div>

          <div class="mb-4 flex flex-col mt-2 print-line">
            <div class="flex justify-between items-end mb-1 text-error-red">
              <span class="text-xs md:text-sm font-bold uppercase max-w-[65%]" v-html="t('ticketPage.totalTitle')"></span>
              <span class="font-mono font-black text-xl md:text-2xl whitespace-nowrap">{{ t('ticketPage.totalVal') }}</span>
            </div>
            <span class="font-mono text-[10px] md:text-xs border border-error-red bg-red-50 rounded px-2 py-0.5 text-error-red inline-block mt-1 self-start font-bold">{{ t('ticketPage.totalBase') }}</span>
          </div>

          <div class="mt-4 md:mt-6 text-center border-2 border-reg-green p-3 md:p-4 rounded rotate-1 print-line relative overflow-hidden bg-white shadow-sm">
            <span class="text-reg-green font-black uppercase text-sm md:text-base block mb-1" v-html="t('ticketPage.potentialTitle')"></span>
            <span class="text-reg-green font-mono font-black text-2xl md:text-3xl block">{{ t('ticketPage.potentialVal') }}</span>
            <div class="text-[10px] md:text-xs text-reg-green italic mt-1 font-bold">{{ t('ticketPage.potentialDesc') }}</div>
          </div>

          <div class="mt-6 md:mt-8 text-center print-line">
            <div class="barcode h-8 w-[90%] md:w-4/5 mx-auto opacity-80"></div>
            <div class="font-mono text-[10px] md:text-xs mt-3 text-gray-500">{{ t('ticketPage.date') }}</div>
            <div class="font-mono text-[10px] md:text-xs mt-1 text-gray-500 font-bold">{{ t('ticketPage.merci') }}</div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- FOOTER / RETURN -->
    <div class="w-full text-center mt-12 z-30">
      <router-link to="/" class="inline-flex items-center gap-2 text-prohib-black font-bold uppercase tracking-widest hover:text-reg-green transition-colors active:scale-95 active:text-reg-green">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Retour au portail
      </router-link>
    </div>
    
  </div>
</template>

<style scoped>
.receipt {
  /* EFFET PAPIER DENTELÉ (BAS) - Adapté pour mobile/desktop via padding dynamique au dessus */
  --mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 90deg, #0000 91deg) 50% / 20px 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  -webkit-mask-size: 20px 100%;
  mask-size: 20px 100%;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  -webkit-mask-position: bottom;
  mask-position: bottom;
  padding-bottom: 35px; /* Assure que le texte ne se superpose pas aux dents */

  /* EFFET FROISSÉ (PLIS) */
  background-image: 
    linear-gradient(175deg, rgba(0,0,0,0) 90%, rgba(0,0,0,0.04) 90%),
    linear-gradient(5deg, rgba(0,0,0,0.03) 10%, rgba(0,0,0,0) 10%),
    radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02), transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03), transparent 30%);
}

/* Le ticket est masqué s'il remonte grâce au parent overflow-hidden */

.barcode {
  background: linear-gradient(to right, 
    #000 2px, transparent 2px,
    #000 4px, #000 6px, transparent 6px, transparent 8px,
    #000 8px, #000 12px, transparent 12px, transparent 15px,
    #000 16px, transparent 16px, transparent 19px,
    #000 22px, #000 28px, transparent 28px, transparent 31px,
    #000 32px, #000 34px, transparent 34px, transparent 38px,
    #000 40px, #000 48px, transparent 48px, transparent 52px,
    #000 56px, #000 60px, transparent 60px
  );
  background-repeat: repeat-x;
  background-size: 60px 100%;
}
</style>
