<template>
  <section id="anasayfa" class="hero-section">
    <div class="swiper hero-slider">
      <div class="swiper-wrapper">
        <!-- Slide 1: Genel Dermatoloji -->
        <div class="swiper-slide" style="background-image: url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>Cildiniz İçin Bilim ve Estetiği Buluşturuyoruz</h1>
                  <p class="lead">Uzman kadromuzla sizlere en iyi dermatolojik hizmeti sunuyoruz</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">Randevu Al</a>
                    <a href="#hizmetler" class="btn btn-outline-light">Hizmetlerimiz</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide 2: Modern Tedaviler -->
        <div class="swiper-slide" style="background-image: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>Cilt Sağlığınız Bizim Uzmanlık Alanımız</h1>
                  <p class="lead">En son teknoloji cihazlarla etkili sonuçlar</p>
                  <div class="hero-buttons">
                    <a href="#randevu" class="btn btn-primary me-3">Randevu Al</a>
                    <a href="#hizmetler" class="btn btn-outline-light">Hizmetlerimiz</a>
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