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

    <!-- Blog Section -->
    <Blog />

    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Hero from '../components/home/Hero.vue'
import About from '@/components/home/About.vue'
import Services from '@/components/home/Services.vue'
import Gallery from '@/components/home/Gallery.vue'
import FAQ from '@/components/home/FAQ.vue'
import Blog from '@/components/home/Blog.vue'
import Contact from '@/components/home/Contact.vue'
import { useSEO } from '@/composables/useSEO'

const { setSEOHead } = useSEO()

onMounted(() => {
  // Ana sayfa için SEO meta bilgilerini güncelle - companyInfo'dan direkt kullan
  setSEOHead({
    type: 'website'
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/home/HomeView.scss' as *;
</style> 