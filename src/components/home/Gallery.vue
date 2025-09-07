<template>
  <section id="galeri" class="gallery-section">
    <div class="container">
      <div class="section-title text-center mb-5" data-aos="fade-up">
        <h2>{{ $t('home.gallery.title') }}</h2>
        <p>{{ $t('home.gallery.subtitle') }}</p>
      </div>
      <div class="gallery-slider">
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
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(0)">
              <img :src="images.clinic10" alt="Modern Klinik">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.modernClinic.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(1)">
              <img :src="images.clinic1" alt="Lazer Tedavi">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.laserUnit.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(2)">
              <img :src="images.clinic6" alt="Lazer Tedavi">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.laserUnit.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(3)">
              <img :src="images.clinic7" alt="Bekleme Salonu">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.waitingRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(4)">
              <img :src="images.clinic8" alt="Bekleme Salonu">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.waitingRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(5)">
              <img :src="images.clinic6" alt="Bekleme Salonu">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.waitingRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(6)">
              <img :src="images.clinic3" alt="Tedavi Odası">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.examinationRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(7)">
              <img :src="images.clinic4" alt="Tedavi Odası">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.treatmentRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(8)">
              <img :src="images.clinic5" alt="Tedavi Odası">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.treatmentRoom.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(9)">
              <img :src="images.clinic12" alt="Muayene Odası">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.generalView.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item" @click="openLightbox(10)">
              <img :src="images.clinic11" alt="Estetik Ünite">
              <div class="gallery-item-title">
                <h4>{{ $t('home.gallery.items.generalView.title') }}</h4>
              </div>
            </div>
          </swiper-slide>
        </swiper>
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
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation

// Lightbox state
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

// Resimleri import et
const images = {
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

// Lightbox için resim listesi
const lightboxImages = computed(() => [
  images.clinic10,
  images.clinic1,
  images.clinic6,
  images.clinic7,
  images.clinic8,
  images.clinic6,
  images.clinic3,
  images.clinic4,
  images.clinic5,
  images.clinic12,
  images.clinic11
])

// Lightbox açma fonksiyonu
const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxVisible.value = true
}

// Lightbox kapatma fonksiyonu
const closeLightbox = () => {
  lightboxVisible.value = false
}
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Gallery.scss';
</style> 