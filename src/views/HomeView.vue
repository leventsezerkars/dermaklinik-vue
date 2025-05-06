<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero />

    <!-- About Section -->
    <About />

    <!-- Services Section -->
    <Services />

    <!-- Gallery Section -->
    <Gallery />

    <!-- FAQ Section -->
    <FAQ />

    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script setup>
import Hero from '../components/home/Hero.vue'
import About from '@/components/home/About.vue'
import Services from '@/components/home/Services.vue'
import Gallery from '@/components/home/Gallery.vue'
import FAQ from '@/components/home/FAQ.vue'
import Contact from '@/components/home/Contact.vue'
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/home/HomeView.scss' as *;
</style> 