<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="footer-info">
              <div class="footer-logo">
                <img 
                  :src="companyLogo || '/images/logo_beyaz.png'" 
                  :alt="companyName || 'Logo'" 
                  height="70"
                >
                <span class="brand-text">{{ companyName || $t('header.brand') }}</span>
              </div>
              <p class="mt-3">{{ companyDescription || $t('footer.description') }}</p>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-links">
              <h4>{{ $t('footer.quickLinks') }}</h4>
              <ul>
                <li><router-link to="/">{{ $t('common.home') }}</router-link></li>
                <li><router-link to="/#hakkimizda">{{ $t('common.about') }}</router-link></li>
                <li><router-link to="/#hizmetler">{{ $t('common.services') }}</router-link></li>
                <li><router-link to="/#galeri">{{ $t('footer.gallery') }}</router-link></li>
                <li><router-link to="/#contact">{{ $t('common.contact') }}</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="footer-links">
              <h4>{{ $t('footer.ourServices') }}</h4>
              <ul>
                <li><router-link to="/#genel">{{ $t('header.generalDermatology') }}</router-link></li>
                <li><router-link to="/#estetik">{{ $t('header.aestheticDermatology') }}</router-link></li>
                <li><router-link to="/#lazer">{{ $t('header.laserTreatments') }}</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="footer-contact">
              <h4>{{ $t('footer.contactInfo') }}</h4>
              <div class="contact-info">
                <p v-if="companyAddress"><i class="fas fa-map-marker-alt"></i> {{ companyAddress }}</p>
                <p v-else><i class="fas fa-map-marker-alt"></i> {{ $t('footer.address') }}</p>
                
                <p v-if="companyPhone"><i class="fas fa-phone"></i> {{ companyPhone }}</p>
                <p v-else><i class="fas fa-phone"></i> {{ $t('footer.phone') }}</p>
                
                <p v-if="companyEmail"><i class="fas fa-envelope"></i> {{ companyEmail }}</p>
                <p v-else><i class="fas fa-envelope"></i> {{ $t('footer.email') }}</p>
                
                <p v-if="companyWorkingHours"><i class="fas fa-clock"></i> {{ companyWorkingHours }}</p>
                <p v-else><i class="fas fa-clock"></i> {{ $t('footer.workingHours') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">{{ $t('footer.copyright') }}</p>
          </div>
          <div class="col-md-6 text-end">
            <div class="footer-bottom-links">
              <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#kvkkModal">{{ $t('footer.kvkk') }}</a>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="modal fade" id="kvkkModal" tabindex="-1" aria-labelledby="kvkkModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark">
        <div class="modal-header border-0">
          <h5 class="modal-title text-white" id="kvkkModalLabel">{{ $t('footer.kvkk') }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <iframe src="/KVKK.pdf" style="width: 100%; height: 80vh; border: 0;" title="KVKK"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import LanguageSelector from '@/components/common/LanguageSelector.vue'
import '@/assets/styles/components/layout/_Footer.scss';

const store = useStore()

// Store'dan şirket bilgilerini al
const companyName = computed(() => store.getters['companyInfo/companyName'])
const companyLogo = computed(() => store.getters['companyInfo/companyLogo'])
const companyAddress = computed(() => store.getters['companyInfo/companyAddress'])
const companyPhone = computed(() => store.getters['companyInfo/companyPhone'])
const companyEmail = computed(() => store.getters['companyInfo/companyEmail'])
const companyWorkingHours = computed(() => store.getters['companyInfo/workingHours'])
const companyDescription = computed(() => store.getters['companyInfo/companyDescription'])

onMounted(async () => {
  // Şirket bilgilerini çek
  try {
    await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  } catch (error) {
    console.error('Şirket bilgileri yüklenirken hata:', error)
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/components/layout/_Footer.scss';
</style> 