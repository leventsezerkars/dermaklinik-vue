<template>
  <section id="anasayfa" class="hero-section">
    <div class="swiper hero-slider">
      <div class="swiper-wrapper">
        <!-- Slide 1: Cilt Sağlığı ve Dermatoloji -->
        <div class="swiper-slide" style="background-image: url('images/dr_mu2.jpg?v=3');">
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
        
        <!-- Slide 2: Cilt Bakımı ve Tedavi -->
        <div class="swiper-slide" style="background-image: url('images/woman2.jpg');">
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

        <!-- Slide 3: Estetik Dermatoloji -->
        <div class="swiper-slide" style="background-image: url('images/woman3.jpg');">
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

<script>
import { onMounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  name: 'Hero',
  setup() {
    onMounted(() => {
      new Swiper('.hero-slider', {
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
    })
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/home/Hero.scss' as *;
</style> 