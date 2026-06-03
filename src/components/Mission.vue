<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const textRef = ref<HTMLElement | null>(null)

const initAnimation = () => {
  if (!textRef.value) return
  
  // Kill existing scroll trigger for this section
  const existingST = ScrollTrigger.getById("missionST")
  if (existingST) {
    existingST.kill()
  }
  
  const text = t('mission.text')
  const words = text.split(' ')
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
      id: "missionST",
      trigger: textRef.value,
      start: "top 80%",
      end: "bottom 50%",
      scrub: 1
    }
  })
}

onMounted(() => {
  initAnimation()
})

// Re-run animation setup when language changes
watch(locale, () => {
  setTimeout(() => {
    initAnimation()
  }, 100)
})
</script>

<template>
  <section class="py-32 px-6 md:px-12 bg-poster-beige flex items-center justify-center min-h-[70vh] relative z-10">
    <div class="max-w-6xl mx-auto text-center">
      <h2 
        ref="textRef" 
        class="text-4xl md:text-6xl lg:text-7xl font-black font-main tracking-tight leading-tight text-prohib-black uppercase"
      >
      </h2>
    </div>
  </section>
</template>
