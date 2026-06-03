<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursorRef = ref<HTMLElement | null>(null)
let isVisible = false

const onMouseMove = (e: MouseEvent) => {
  if (!cursorRef.value) return
  
  if (!isVisible) {
    gsap.to(cursorRef.value, { opacity: 1, duration: 0.3 })
    isVisible = true
  }

  gsap.to(cursorRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: "power2.out"
  })

  const target = e.target as HTMLElement
  const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-interaction')

  if (isClickable) {
    gsap.to(cursorRef.value, { scale: 3, backgroundColor: 'transparent', border: '2px solid #2E8A42', duration: 0.2 })
  } else {
    gsap.to(cursorRef.value, { scale: 1, backgroundColor: '#2E8A42', border: '0px solid transparent', duration: 0.2 })
  }
}

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div 
    ref="cursorRef" 
    class="fixed top-0 left-0 w-4 h-4 bg-reg-green rounded-full pointer-events-none z-[9999] opacity-0 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
    style="will-change: transform;"
  ></div>
</template>
