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
            <button @click="loadHeroData" class="btn btn-primary">
              {{ $t('common.retry') }}
            </button>
          </div>
        </div>

        <!-- Hero Slides -->
        <div 
          v-else-if="heroImages.length > 0"
          v-for="(image, index) in heroImages" 
          :key="image.id"
          class="swiper-slide" 
          :style="{ backgroundImage: `url('${getImageUrl(image.imageUrl)}')` }"
        >
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>{{ image.title || $t('home.hero.defaultTitle') }}</h1>
                  <p class="lead">{{ image.caption || $t('home.hero.defaultSubtitle') }}</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">{{ $t('common.bookAppointment') }}</a>
                    <a href="#hizmetler" class="btn btn-outline-light">{{ $t('common.services') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback Slides (API'den veri gelmezse) -->
        <div  v-else class="swiper-slide" style="background-image: url('images/dr_mu2.jpg?v=3');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>{{ $t('home.hero.slide1.title') }}</h1>
                  <p class="lead">{{ $t('home.hero.slide1.subtitle') }}</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">{{ $t('common.bookAppointment') }}</a>
                    <a href="#hizmetler" class="btn btn-outline-light">{{ $t('common.services') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div  v-else class="swiper-slide" style="background-image: url('images/woman2.jpg');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>{{ $t('home.hero.slide2.title') }}</h1>
                  <p class="lead">{{ $t('home.hero.slide2.subtitle') }}</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">{{ $t('common.bookAppointment') }}</a>
                    <a href="#hizmetler" class="btn btn-outline-light">{{ $t('common.services') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div  v-else class="swiper-slide" style="background-image: url('images/woman3.jpg');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>{{ $t('home.hero.slide3.title') }}</h1>
                  <p class="lead">{{ $t('home.hero.slide3.subtitle') }}</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">{{ $t('common.bookAppointment') }}</a>
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

// Store ve i18n
const store = useStore()
const { t } = useI18n()

// Store getters
const isLoading = computed(() => store.getters['gallery/isLoading'])
const hasError = computed(() => store.getters['gallery/hasError'])
const error = computed(() => store.getters['gallery/error'])

// Hero resimlerini getir
const heroImages = computed(() => {
  const images = store.getters['gallery/heroImages']
  return images
})

// Fallback resimleri (API'den veri gelmezse kullanılacak)
const fallbackImages = {
  dr_mu2: 'images/dr_mu2.jpg?v=3',
  woman2: 'images/woman2.jpg',
  woman3: 'images/woman3.jpg'
}

// Resim URL'sini oluştur
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return fallbackImages.dr_mu2
  
  // Eğer URL zaten tam URL ise direkt döndür
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  // Resimler için base URL (API olmadan)
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7078'
  const fullUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
  return fullUrl
}

// Hero verilerini yükle
const loadHeroData = async () => {
  try {
    // Sabit grup ID ile hero resimlerini yükle
    const result = await store.dispatch('gallery/fetchHeroImages')
    
    // Veri yüklendikten sonra Swiper'ı sadece bir kez başlat
    if (!swiperInstance) {
      setTimeout(() => {
        initSwiper()
      }, 200)
    }
  } catch (error) {
    console.error('Hero verileri yüklenirken hata:', error)
  }
}

// Swiper instance
let swiperInstance = null

// Swiper'ı başlat
const initSwiper = () => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }
  
  swiperInstance = new Swiper('.hero-slider', {
        modules: [Autoplay, EffectFade, Navigation, Pagination],
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
}

// Component mount edildiğinde verileri yükle
onMounted(() => {
  loadHeroData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/home/Hero.scss' as *;
</style> 