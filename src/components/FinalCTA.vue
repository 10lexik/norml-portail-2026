<template>
  <section class="bg-reg-green text-white py-40 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
    <!-- Background pattern/glow -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-light-green/40 via-transparent to-transparent opacity-50"></div>
    
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <h2 class="text-5xl md:text-7xl font-black font-main tracking-tight uppercase mb-8 leading-tight">
        {{ $t('final_cta.title_part1') }}<br/>
        <span class="text-prohib-black">{{ $t('final_cta.title_part2') }}</span>
      </h2>
      <p class="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
        {{ $t('final_cta.subtitle') }}
      </p>
      
      <a 
        href="https://www.helloasso.com/associations/norml-france/adhesions/adhesion-2024-a-norml-france" 
        target="_blank" 
        class="inline-flex items-center justify-center gap-4 px-10 py-5 bg-prohib-black text-white text-xl font-bold font-main uppercase tracking-widest rounded-full hover:bg-white hover:text-prohib-black transition-all shadow-[0_10px_40px_rgba(20,20,20,0.4)] hover:shadow-[0_10px_50px_rgba(255,255,255,0.4)] hover:-translate-y-2 cursor-interaction"
      >
        {{ $t('final_cta.cta') }}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</template>
