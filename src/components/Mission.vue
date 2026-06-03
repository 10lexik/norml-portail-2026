<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!textRef.value) return
  
  const words = textRef.value.innerText.split(' ')
  textRef.value.innerHTML = ''
  
  words.forEach(word => {
    const span = document.createElement('span')
    span.innerText = word + ' '
    span.style.opacity = '0.1'
    span.style.display = 'inline-block'
    textRef.value?.appendChild(span)
  })

  gsap.to(textRef.value.children, {
    opacity: 1,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: textRef.value,
      start: "top 80%",
      end: "bottom 50%",
      scrub: 1
    }
  })
})
</script>

<template>
  <section class="py-32 px-6 md:px-12 bg-poster-beige flex items-center justify-center min-h-[70vh] relative z-10">
    <div class="max-w-6xl mx-auto text-center">
      <h2 
        ref="textRef" 
        class="text-4xl md:text-6xl lg:text-7xl font-black font-main tracking-tight leading-tight text-prohib-black uppercase"
      >
        Depuis des années, NORML France innove et crée les outils originaux d'information. L'information de santé publique n'est pas un business. Aidez-nous à garder un temps d'avance.
      </h2>
    </div>
  </section>
</template>
