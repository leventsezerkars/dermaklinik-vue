<template>
  <section id="hakkimizda" class="about-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="about-content">
            <span class="subtitle">HAKKIMIZDA</span>
            <h2>{{ new Date().getFullYear() - 2002 }} Yıllık Tecrübe ile Dermatoloji Uzmanınız</h2>
            <p class="lead">Modern teknolojiler ve uzman kadromuzla, cilt sağlığınız için en iyi çözümleri sunuyoruz.</p>
            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-user-md"></i>
                </div>
                <div class="feature-text">
                  <h4>Uzman Kadro</h4>
                  <p>Alanında uzman ve deneyimli ekibimizle hizmetinizdeyiz.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-clinic-medical"></i>
                </div>
                <div class="feature-text">
                  <h4>Modern Klinik</h4>
                  <p>En son teknoloji cihazlar ve steril ortamda tedavi imkanı.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-heart"></i>
                </div>
                <div class="feature-text">
                  <h4>Hasta Memnuniyeti</h4>
                  <p>Yüksek hasta memnuniyeti ile güvenilir hizmet.</p>
                </div>
              </div>
            </div>
            <div class="about-stats">
              <div class="stat-item">
                <h3>1000+</h3>
                <p>Başarılı İşlem</p>
              </div>
              <div class="stat-item">
                <h3>7/24</h3>
                <p>İletişim Desteği</p>
              </div>
              <div class="stat-item">
                <h3>%98</h3>
                <p>Hasta Memnuniyeti</p>
              </div>
            </div>
            <div class="about-cta">
              <router-link to="/hakkimizda-detay" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-arrow-right me-2"></i>
                Daha Fazla
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="about-image-wrapper">
            <div class="about-image-main">
              <img 
                src="/images/dr_mu.jpg" 
                alt="Doktor"
                loading="lazy"
              >
            </div>
            <div class="about-experience">
              <h3>50+</h3>
              <p>Sertifika<br>Eğitim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true
  })
})

</script>

<style lang="scss">
@use '@/assets/styles/components/home/About.scss';
</style> 