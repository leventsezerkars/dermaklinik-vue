<template>
  <section class="services-section" id="hizmetler">
    <div class="container">
      <div class="section-title text-center" data-aos="fade-up">
        <h2>{{ $t('home.services.title') }}</h2>
        <p>{{ $t('home.services.subtitle') }}</p>
      </div>

      <!-- Cilt Gençleştirme ve Yenileme -->
      <div class="service-category mb-5" id="genel">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-content">
              <h3>{{ $t('header.generalDermatology') }}</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/akne-sivilce-tedavisi">
                  <div class="service-item laser">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.general.items.acne') }}</h4>
                      <p>{{ $t('home.services.general.acne.description') }}</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/rosacea-gul-hastaligi-tedavisi">
                  <div class="service-item prp">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-droplet"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.general.items.rosacea') }}</h4>
                      <p>{{ $t('home.services.general.rosacea.description') }}</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/sigil-ben-tedavisi">
                  <div class="service-item mezo">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-syringe"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.general.items.wart') }}</h4>
                      <p>{{ $t('home.services.general.wart.description') }}</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/sac-dokulmesi-ve-sac-tedavileri">
                  <div class="service-item dna">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-dna"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.general.items.hairLoss') }}</h4>
                      <p>{{ $t('home.services.general.hairLoss.description') }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-image">
              <img 
                src="/images/w6.jpg" 
                alt="Genel Dermatoloji - Cilt hastalıkları tedavisi, akne, rozasea, siğil tedavisi"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Estetik Uygulamalar -->
      <div class="service-category mb-5" id="estetik">
        <div class="row align-items-center flex-row-reverse">
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-content">
              <h3>{{ $t('header.aestheticDermatology') }}</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/botoks-uygulamasi">
                  <div class="service-item botox">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-wand-magic"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.aesthetic.items.botox') }}</h4>
                      <p>{{ $t('home.services.aesthetic.botox.description') }}</p>
                    </div>
                  </div>                  
                </router-link>
                <router-link class="service-link" to="/hizmetler/dolgu-uygulamasi">
                  <div class="service-item dolgu">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-fill-drip"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.aesthetic.items.filler') }}</h4>
                      <p>{{ $t('home.services.aesthetic.filler.description') }}</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/leke-tedavisi">
                  <div class="service-item genclik">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.aesthetic.items.spotTreatment') }}</h4>
                      <p>{{ $t('home.services.aesthetic.spotTreatment.description') }}</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/iple-yuz-askilama">
                  <div class="service-item sikilastirma">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-arrows-to-circle"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.aesthetic.items.threadLifting') }}</h4>
                      <p>{{ $t('home.services.aesthetic.threadLifting.description') }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-image">
              <img 
                src="/images/w1.jpg" 
                alt="Estetik Dermatoloji - Botoks, dolgu, leke tedavisi, iplik uygulamaları"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Saç ve Kaş Uygulamaları -->
      <div class="service-category" id="lazer">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-content">
              <h3>{{ $t('header.laserTreatments') }}</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/veloce-bb-light">
                  <div class="service-item sac-mezo">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-spray-can"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.laser.items.veloceBB') }}</h4>
                      <p>{{ $t('home.services.laser.veloceBB.description') }}</p>
                    </div>
                  </div>
                </router-link>

                <router-link class="service-link" to="/hizmetler/fraksiyonel-karbondioksit-co2-lazer">
                  <div class="service-item sac-prp">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-droplet"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.laser.items.fractionalCO2') }}</h4>
                      <p>{{ $t('home.services.laser.fractionalCO2.description') }}</p>
                    </div>
                  </div>
                </router-link>

                <router-link class="service-link" to="/hizmetler/secret-altin-igne-fraksiyonel-radyofrekans">
                  <div class="service-item kas">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.laser.items.secretGoldenNeedle') }}</h4>
                      <p>{{ $t('home.services.laser.secretGoldenNeedle.description') }}</p>
                    </div>
                  </div>
                </router-link>
                
                <router-link class="service-link" to="/hizmetler/piko-saniye-lazer">
                  <div class="service-item kas">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="service-content">
                      <h4>{{ $t('services.laser.items.picoSecond') }}</h4>
                      <p>{{ $t('home.services.laser.picoSecond.description') }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-image">
              <img 
                src="/images/w7.jpg" 
                alt="Lazer Tedavileri - Veloce BB Light, CO2 lazer, altın iğne, piko saniye lazer"
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
@use '@/assets/styles/components/home/Services.scss';
</style> 