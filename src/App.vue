<script setup lang="ts">
import CustomCursor from './components/CustomCursor.vue'
import StickyHeader from './components/StickyHeader.vue'
import Hero from './components/Hero.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import Mission from './components/Mission.vue'
import FinalCTA from './components/FinalCTA.vue'
</script>

<template>
  <CustomCursor />
  <StickyHeader />
  <main class="w-full min-h-screen bg-poster-beige relative cursor-none md:cursor-auto">
    <Hero />
    <ProjectShowcase />
    <Mission />
    <FinalCTA />
  </main>
</template>
