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
import { onMounted } from 'vue'
import Hero from '../components/home/Hero.vue'
import About from '@/components/home/About.vue'
import Services from '@/components/home/Services.vue'
import Gallery from '@/components/home/Gallery.vue'
import FAQ from '@/components/home/FAQ.vue'
import Contact from '@/components/home/Contact.vue'
import { useSEO } from '@/composables/useSEO'

const { updatePageMeta } = useSEO()

onMounted(() => {
  // Ana sayfa için SEO meta bilgilerini güncelle
  updatePageMeta({
    title: 'Ana Sayfa',
    description: 'Dermatoloji ve Estetik Dermatoloji Kliniği. Cilt hastalıkları, akne tedavisi, botoks, dolgu ve lazer epilasyon uygulamaları.',
    keywords: 'dermatoloji, estetik dermatoloji, cilt hastalıkları, akne tedavisi, botoks, dolgu, lazer epilasyon, Ankara',
    url: window.location.href
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/home/HomeView.scss' as *;
</style> 