<template>
  <section id="anasayfa" class="hero-section">
    <div class="swiper hero-slider">
      <div class="swiper-wrapper">
        <!-- Slide 1: Cilt Sağlığı ve Dermatoloji -->
        <div class="swiper-slide" style="background-image: url('images/woman1.jpg');">
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
        
        <!-- Slide 2: Cilt Bakımı ve Tedavi -->
        <div class="swiper-slide" style="background-image: url('images/woman2.jpg');">
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

        <!-- Slide 3: Estetik Dermatoloji -->
        <div class="swiper-slide" style="background-image: url('images/woman3.jpg');">
          <div class="container">
            <div class="row h-100 align-items-center">
              <div class="col-lg-6" data-aos="fade-right">
                <div class="hero-content">
                  <h1>Doğal Güzelliğinizi Ortaya Çıkarın</h1>
                  <p class="lead">Güvenli ve etkili estetik dermatoloji uygulamaları</p>
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