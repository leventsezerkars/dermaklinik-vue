<template>
  <div class="top-bar text-white py-1" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <span>
            <i class="fas fa-clock me-2"></i>
            Pazartesi - Cumartesi: 09:00 - 21:00
          </span>
        </div>
        <div class="col-md-6 text-end">
          <a href="tel:+905465297677" class="me-3">
            <i class="fas fa-phone me-2"></i>
            +90 546 529 76 77
          </a>
          <a href="mailto:dr.munal1101@gmail.com">
            <i class="fas fa-envelope me-2"></i>
            dr.munal1101@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
@use '@/assets/styles/components/layout/TopBar';
</style> 