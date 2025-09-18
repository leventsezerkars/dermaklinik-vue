<template>
  <section id="galeri" class="gallery-section">
    <div class="container">
      <div class="section-title text-center mb-5" data-aos="fade-up">
        <h2>{{ $t('home.gallery.title') }}</h2>
        <p>{{ $t('home.gallery.subtitle') }}</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Yükleniyor...</span>
        </div>
        <p class="mt-3">{{ $t('common.loading') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center py-5">
        <div class="alert alert-warning" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error || $t('common.error') }}
        </div>
        <button @click="loadGalleryData" class="btn btn-primary">
          {{ $t('common.retry') }}
        </button>
      </div>

      <!-- Gallery Content -->
      <div v-else-if="galleryImages.length > 0" class="gallery-slider">
        <swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :pagination="{
            clickable: true
          }"
          :navigation="true"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
            },
            '768': {
              slidesPerView: 3,
            },
            '1024': {
              slidesPerView: 3,
            }
          }"
        >
          <swiper-slide v-for="(image, index) in galleryImages" :key="image.id">
            <div class="gallery-item" @click="openLightbox(index)">
              <img 
                :src="getImageUrl(image.imageUrl)" 
                :alt="image.title || image.altText || 'Galeri Resmi'"
                @error="handleImageError"
              >
              <div class="gallery-item-title">
                <h4>{{ image.title || $t('home.gallery.defaultTitle') }}</h4>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-5">
        <div class="alert alert-info" role="alert">
          <i class="fas fa-info-circle me-2"></i>
          {{ $t('home.gallery.noImages') }}
        </div>
      </div>
    </div>

    <!-- Lightbox Component -->
    <vue-easy-lightbox
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      :scrollDisabled="true"
      :escDisabled="false"
      :moveDisabled="false"
      :clickDisabled="false"
      :swipeDisabled="false"
      :teleported="true"
      @hide="closeLightbox"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation

// Store ve i18n
const store = useStore()
const { t } = useI18n()

// Lightbox state
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

// Fallback resimleri (API'den veri gelmezse kullanılacak)
const fallbackImages = {
  clinic1: new URL('/images/clinic_images/DSCF4172.JPG', import.meta.url).href,
  clinic2: new URL('/images/clinic_images/DSCF4217.JPG', import.meta.url).href,
  clinic3: new URL('/images/clinic_images/DSCF4218.JPG', import.meta.url).href,
  clinic4: new URL('/images/clinic_images/DSCF4231.JPG', import.meta.url).href,
  clinic5: new URL('/images/clinic_images/DSCF4235.JPG', import.meta.url).href,
  clinic6: new URL('/images/clinic_images/DSCF4254.JPG', import.meta.url).href,
  clinic7: new URL('/images/clinic_images/DSCF4267.JPG', import.meta.url).href,
  clinic8: new URL('/images/clinic_images/DSCF4268.JPG', import.meta.url).href,
  clinic9: new URL('/images/clinic_images/DSCF4285.JPG', import.meta.url).href,
  clinic10: new URL('/images/clinic_images/DSCF4295.JPG', import.meta.url).href,
  clinic11: new URL('/images/clinic_images/DSCF4301.JPG', import.meta.url).href,
  clinic12: new URL('/images/clinic_images/DSCF4303.JPG', import.meta.url).href
}

// Store getters
const isLoading = computed(() => store.getters['gallery/isLoading'])
const hasError = computed(() => store.getters['gallery/hasError'])
const error = computed(() => store.getters['gallery/error'])

// Galeri resimlerini getir (sabit grup ID ile)
const galleryImages = computed(() => store.getters['gallery/galleryImages'])

// Lightbox için resim listesi
const lightboxImages = computed(() => {
  if (galleryImages.value.length > 0) {
    return galleryImages.value.map(img => getImageUrl(img.imageUrl))
  }
  
  // Fallback resimler
  return Object.values(fallbackImages)
})

// Resim URL'sini oluştur
const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return fallbackImages.clinic1
  }
  
  // Eğer URL zaten tam URL ise direkt döndür
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  // Resimler için base URL (API olmadan)
  const baseUrl = import.meta.env.VITE_API_BASE_URL ||'https://localhost:7078'
  const fullUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
  return fullUrl
}

// Resim yükleme hatası durumunda fallback kullan
const handleImageError = (event) => {
  console.warn('Resim yüklenemedi:', event.target.src)
  event.target.src = fallbackImages.clinic1
}

// Galeri verilerini yükle
const loadGalleryData = async () => {
  try {
    // Sabit grup ID ile galeri resimlerini yükle
    const result = await store.dispatch('gallery/fetchGalleryImages')
  } catch (error) {
    console.error('Galeri verileri yüklenirken hata:', error)
  }
}

// Lightbox açma fonksiyonu
const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxVisible.value = true
}

// Lightbox kapatma fonksiyonu
const closeLightbox = () => {
  lightboxVisible.value = false
}

// Component mount edildiğinde verileri yükle
onMounted(() => {
  loadGalleryData()
})
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Gallery.scss';
</style> 