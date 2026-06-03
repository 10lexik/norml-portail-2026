<script setup lang="ts">
import CustomCursor from './components/CustomCursor.vue'
import StickyHeader from './components/StickyHeader.vue'
</script>

<template>
  <CustomCursor />
  <StickyHeader />
  <main class="w-full min-h-screen bg-poster-beige relative cursor-none md:cursor-auto overflow-x-hidden">
    <RouterView />
  </main>
</template>
