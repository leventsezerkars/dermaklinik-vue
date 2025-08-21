<template>
  <div class="top-bar text-white py-1" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <span>
            <i class="fas fa-clock me-2"></i>
            {{ $t('common.mondaySaturday') }}: {{ $t('common.timeRangeExtended') }}
          </span>
        </div>
        <div class="col-md-4 text-end support-wrapper">
          <!-- Masaüstü -->
          <a href="tel:+905465297677" class="me-3 d-none d-md-inline">
            <i class="fas fa-phone me-2"></i>
            +90 546 529 76 77
          </a>
          <a href="mailto:dr.munal1101@gmail.com" class="d-none d-md-inline">
            <i class="fas fa-envelope me-2"></i>
            dr.munal1101@gmail.com
          </a>
          <!-- Mobil: Destek butonu -->
          <button class="btn support-toggle d-inline d-md-none" type="button" @click="toggleSupport" :aria-expanded="supportOpen.toString()">
            <i class="fas fa-headset me-2"></i>
            Destek
          </button>
        </div>
        <div class="col-md-1 text-end">
          <LanguageSelector />
        </div>
      </div>
    </div>
    <!-- Mobil destek paneli -->
    <div v-if="supportOpen" ref="supportRef" class="support-panel d-md-none">
      <a href="tel:+905465297677" class="support-item">
        <i class="fas fa-phone me-2"></i>
        +90 546 529 76 77
      </a>
      <a href="mailto:dr.munal1101@gmail.com" class="support-item">
        <i class="fas fa-envelope me-2"></i>
        dr.munal1101@gmail.com
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSelector from '@/components/common/LanguageSelector.vue'

const isScrolled = ref(false)
const supportOpen = ref(false)
const supportRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const toggleSupport = () => {
  supportOpen.value = !supportOpen.value
}

const handleDocumentClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (!target) return
  if (target.closest('.support-toggle') || target.closest('.support-panel')) return
  supportOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style lang="scss">
@use '@/assets/styles/components/layout/TopBar';
</style> 