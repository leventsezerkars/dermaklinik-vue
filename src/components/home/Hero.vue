<template>
  <section id="anasayfa" class="hero-section">
    <div class="swiper hero-slider">
      <div class="swiper-wrapper">
        <!-- Loading State -->
        <div v-if="isLoading" class="swiper-slide d-flex align-items-center justify-content-center">
          <div class="text-center text-white">
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Yükleniyor...</span>
            </div>
            <p class="mt-3">{{ $t('common.loading') }}</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="hasError" class="swiper-slide d-flex align-items-center justify-content-center">
          <div class="text-center text-white">
            <div class="alert alert-warning" role="alert">
              <i class="fas fa-exclamation-triangle me-2"></i>
              {{ error || $t('common.error') }}
            </div>
            <p class="mt-3">{{ $t('common.fallbackMessage') }}</p>
          </div>
        </div>

        <!-- Hero Slides -->
        <div 
          v-for="(slide, index) in displaySlides" 
          :key="slide.id"
          class="swiper-slide" 
          :style="{ backgroundImage: `url('${slide.imageUrl}')` }"
        >
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>{{ slide.title || $t('home.hero.defaultTitle') }}</h1>
                  <p class="lead">{{ slide.subtitle || slide.caption || $t('home.hero.defaultSubtitle') }}</p>
                  <div class="hero-buttons">
                    <a :href="`tel:${companyPhone}`" class="btn btn-primary me-3">{{ $t('common.bookAppointment') }}</a>
                    <a href="#hizmetler" class="btn btn-outline-light">{{ $t('common.services') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import fallbackData from '@/data/fallback-data'

// Store ve i18n
const store = useStore()
const { t } = useI18n()

// Store getters
const isLoading = computed(() => store.getters['gallery/isLoading'])
const hasError = computed(() => store.getters['gallery/hasError'])
const error = computed(() => store.getters['gallery/error'])

// Company info getters
const companyPhone = computed(() => {
  const apiPhone = store.getters['companyInfo/companyPhone']
  if (apiPhone) {
    return apiPhone
  }
  console.log('[Hero] Company Phone: Fallback verisi kullanılıyor')
  return fallbackData.companyInfo.phone
})

// Display slides - API'den veri gelirse onu, gelmezse fallback'i kullan
const displaySlides = computed(() => {
  const apiImages = store.getters['gallery/heroImages']
  
  if (apiImages && apiImages.length > 0) {
    return apiImages
  }
  
  // Loading durumunda fallback kullanılıyor mesajını farklı göster
  if (isLoading.value) {
    console.log('[Hero] Slides: Loading durumunda fallback verisi kullanılıyor')
  } else {
    console.log('[Hero] Slides: Fallback verisi kullanılıyor (API\'den veri gelmedi)')
  }
  
  return fallbackData.hero.slides
})

// Swiper instance
let swiperInstance = null

// Swiper'ı başlat
const initSwiper = () => {
  // DOM elementlerinin varlığını kontrol et
  const swiperElement = document.querySelector('.hero-slider')
  const paginationElement = document.querySelector('.swiper-pagination')
  const nextButton = document.querySelector('.swiper-button-next')
  const prevButton = document.querySelector('.swiper-button-prev')
  
  if (!swiperElement) {
    console.warn('[Hero] Swiper: .hero-slider elementi bulunamadı')
    return
  }
  
  // Swiper slide'larının varlığını kontrol et
  const slides = swiperElement.querySelectorAll('.swiper-slide')
  if (slides.length === 0) {
    console.warn('[Hero] Swiper: Slide elementleri bulunamadı')
    return
  }
  

  // Mevcut instance'ı temizle
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
  
  
  try {
    swiperInstance = new Swiper('.hero-slider', {
      modules: [Autoplay, EffectFade, Navigation, Pagination],
      loop: slides.length > 1, // Sadece birden fazla slide varsa loop aktif
      speed: 1000,
      autoplay: slides.length > 1 ? {
        delay: 5000,
        disableOnInteraction: false,
      } : false, // Sadece birden fazla slide varsa autoplay aktif
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: paginationElement ? {
        el: '.swiper-pagination',
        clickable: true,
      } : false,
      navigation: (nextButton && prevButton && slides.length > 1) ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false,
    })
    
  } catch (error) {
    console.error('[Hero] Swiper: Oluşturulurken hata:', error)
  }
}

// Watch fonksiyonunu kaldırdık - sadece onMounted'da Swiper başlatılıyor

// Component mount edildiğinde Swiper'ı başlat
onMounted(() => {
  // Swiper'ı başlat - DOM'un hazır olmasını bekle
  setTimeout(() => {
    initSwiper()
  }, 1000) // Daha uzun gecikme ile DOM'un tamamen hazır olmasını bekle
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/home/Hero.scss' as *;
</style> 