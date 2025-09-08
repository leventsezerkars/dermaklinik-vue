<template>
  <div class="top-bar text-white py-1" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <span v-if="companyWorkingHours">
            <i class="fas fa-clock me-2"></i>
            {{ companyWorkingHours }}
          </span>
          <span v-else>
            <i class="fas fa-clock me-2"></i>
            {{ $t('common.mondaySaturday') }}: {{ $t('common.timeRangeExtended') }}
          </span>
        </div>
        <div class="col-md-4 text-end support-wrapper">
          <!-- Masaüstü -->
          <a v-if="companyPhone" :href="`tel:${companyPhone}`" class="me-3 d-none d-md-inline">
            <i class="fas fa-phone me-2"></i>
            {{ companyPhone }}
          </a>
          <a v-if="companyEmail" :href="`mailto:${companyEmail}`" class="d-none d-md-inline">
            <i class="fas fa-envelope me-2"></i>
            {{ companyEmail }}
          </a>
          <!-- Fallback için statik değerler -->
          <template v-if="!companyPhone && !companyEmail">
            <a href="tel:+905465297677" class="me-3 d-none d-md-inline">
              <i class="fas fa-phone me-2"></i>
              +90 546 529 76 77
            </a>
            <a href="mailto:dr.munal1101@gmail.com" class="d-none d-md-inline">
              <i class="fas fa-envelope me-2"></i>
              dr.munal1101@gmail.com
            </a>
          </template>
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
      <a v-if="companyPhone" :href="`tel:${companyPhone}`" class="support-item">
        <i class="fas fa-phone me-2"></i>
        {{ companyPhone }}
      </a>
      <a v-if="companyEmail" :href="`mailto:${companyEmail}`" class="support-item">
        <i class="fas fa-envelope me-2"></i>
        {{ companyEmail }}
      </a>
      <!-- Fallback için statik değerler -->
      <template v-if="!companyPhone && !companyEmail">
        <a href="tel:+905465297677" class="support-item">
          <i class="fas fa-phone me-2"></i>
          +90 546 529 76 77
        </a>
        <a href="mailto:dr.munal1101@gmail.com" class="support-item">
          <i class="fas fa-envelope me-2"></i>
          dr.munal1101@gmail.com
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import LanguageSelector from '@/components/common/LanguageSelector.vue'

const store = useStore()
const isScrolled = ref(false)
const supportOpen = ref(false)
const supportRef = ref<HTMLElement | null>(null)

// Store'dan şirket bilgilerini al
const companyPhone = computed(() => store.getters['companyInfo/companyPhone'])
const companyEmail = computed(() => store.getters['companyInfo/companyEmail'])
const companyWorkingHours = computed(() => store.getters['companyInfo/workingHours'])

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

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleDocumentClick)
  
  // Şirket bilgilerini çek
  try {
    await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  } catch (error) {
    console.error('Şirket bilgileri yüklenirken hata:', error)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style lang="scss">
@use '@/assets/styles/components/layout/TopBar';
</style> 