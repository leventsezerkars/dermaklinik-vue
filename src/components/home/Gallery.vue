<template>
  <section id="galeri" class="gallery-section">
    <div class="container">
      <div class="section-title text-center mb-5" data-aos="fade-up">
        <h2>Galeri</h2>
        <p>Kliniğimizden Kareler</p>
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
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/modern-medical-clinic-reception_23-2149482335.jpg" alt="Modern Klinik">
              <div class="gallery-item-title">
                <h4>Modern Klinik Ortamımız</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/doctor-examining-patient-dermatology-clinic_23-2149482337.jpg" alt="Muayene Odası">
              <div class="gallery-item-title">
                <h4>Konforlu Muayene Odalarımız</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/cosmetologist-making-beauty-procedures-client_23-2149214483.jpg" alt="Estetik Ünite">
              <div class="gallery-item-title">
                <h4>Estetik Uygulama Ünitemiz</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/beautician-doing-beauty-procedures-client_23-2149214480.jpg" alt="Lazer Tedavi">
              <div class="gallery-item-title">
                <h4>Lazer Tedavi Ünitemiz</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/modern-clinic-waiting-room-reception_23-2149482339.jpg" alt="Bekleme Salonu">
              <div class="gallery-item-title">
                <h4>Ferah Bekleme Salonumuz</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/cosmetologist-making-mesotherapy-injection_23-2149252125.jpg" alt="Mezoterapi">
              <div class="gallery-item-title">
                <h4>Mezoterapi Ünitemiz</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/dermatologist-examining-patient-skin_23-2149482334.jpg" alt="Cilt Analizi">
              <div class="gallery-item-title">
                <h4>Cilt Analiz Ünitemiz</h4>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="gallery-item">
              <img src="https://img.freepik.com/free-photo/doctor-patient-dermatology-consultation_23-2149482338.jpg" alt="Konsültasyon">
              <div class="gallery-item-title">
                <h4>Konsültasyon Odamız</h4>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Gallery.scss';
</style> 