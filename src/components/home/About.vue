<template>
  <section id="hakkimizda" class="about-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="about-content">
            <span class="subtitle">{{ $t('common.about') }}</span>
            <h2>{{ $t('home.about.title', { years: experienceYears }) }}</h2>
            <p class="lead">{{ $t('home.about.description') }}</p>
            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-user-md"></i>
                </div>
                <div class="feature-text">
                  <h4>{{ $t('home.about.features.expertStaff.title') }}</h4>
                  <p>{{ $t('home.about.features.expertStaff.description') }}</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-clinic-medical"></i>
                </div>
                <div class="feature-text">
                  <h4>{{ $t('home.about.features.modernClinic.title') }}</h4>
                  <p>{{ $t('home.about.features.modernClinic.description') }}</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-heart"></i>
                </div>
                <div class="feature-text">
                  <h4>{{ $t('home.about.features.patientSatisfaction.title') }}</h4>
                  <p>{{ $t('home.about.features.patientSatisfaction.description') }}</p>
                </div>
              </div>
            </div>
            <div class="about-stats">
              <div class="stat-item">
                <h3>1000+</h3>
                <p>{{ $t('home.about.stats.successfulProcedures') }}</p>
              </div>
              <div class="stat-item">
                <h3>7/24</h3>
                <p>{{ $t('home.about.stats.communicationSupport') }}</p>
              </div>
              <div class="stat-item">
                <h3>%98</h3>
                <p>{{ $t('home.about.stats.patientSatisfaction') }}</p>
              </div>
            </div>
            <div class="about-cta">
              <router-link to="/hakkimizda-detay" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-arrow-right me-2"></i>
                {{ $t('common.learnMore') }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="about-image-wrapper">
            <div class="about-image-main">
              <img 
                src="/images/dr_mu.jpg" 
                alt="Doç. Dr. Mehmet Ünal - Dermatoloji ve Estetik Uzmanı, 20+ yıllık deneyim"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Dinamik yıl hesaplaması - 2002'den başlayarak
const experienceYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return currentYear - 2002
})

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