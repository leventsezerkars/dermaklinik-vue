<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="contact-form-wrapper">
            <h2>{{ $t('home.contact.form.title') }}</h2>
            <p>{{ $t('home.contact.form.subtitle') }}</p>
            <form class="contact-form" @submit.prevent="handleSubmit">
              <!-- Success Message -->
              <div v-if="isSuccess" class="alert alert-success" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                {{ $t('home.contact.form.success') }}
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>
                {{ errorMessage }}
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.firstName" 
                      :placeholder="$t('home.contact.form.firstName')"
                      :disabled="isLoading"
                      required
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.lastName" 
                      :placeholder="$t('home.contact.form.lastName')"
                      :disabled="isLoading"
                      required
                    >
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input 
                  type="email" 
                  class="form-control" 
                  v-model="form.email" 
                  :placeholder="$t('home.contact.form.email')"
                  :disabled="isLoading"
                  required
                >
              </div>
              <div class="form-group">
                <input 
                  type="tel" 
                  class="form-control" 
                  v-model="form.phone" 
                  :placeholder="$t('home.contact.form.phone')"
                  :disabled="isLoading"
                >
              </div>
              <div class="form-group">
                <select 
                  class="form-select" 
                  v-model="form.service"
                  :disabled="isLoading"
                >
                  <option value="">{{ $t('home.contact.form.selectService') }}</option>
                  <option value="{{ $t('header.generalDermatology') }}">{{ $t('header.generalDermatology') }}</option>
                  <option value="{{ $t('header.aestheticDermatology') }}">{{ $t('header.aestheticDermatology') }}</option>
                  <option value="{{ $t('header.laserTreatments') }}">{{ $t('header.laserTreatments') }}</option>
                </select>
              </div>
              <div class="form-group">
                <textarea 
                  class="form-control" 
                  rows="5" 
                  v-model="form.message" 
                  :placeholder="$t('home.contact.form.message')"
                  :disabled="isLoading"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <i v-if="!isLoading" class="fas fa-paper-plane me-2"></i>
                {{ isLoading ? $t('home.contact.form.sending') : $t('home.contact.form.send') }}
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="map-wrapper h-100">
            <iframe 
              :src="googleMapsUrl"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="map-info">
              <div class="map-buttons">
                <a :href="directionsUrl" 
                   target="_blank" 
                   class="btn btn-primary">
                  <i class="fas fa-directions"></i>
                  <span>{{ $t('home.contact.map.getDirections') }}</span>
                </a>
                <a :href="`tel:${companyPhone}`" 
                   class="btn btn-outline-primary"
                   @click="handlePhoneCall">
                  <i class="fas fa-phone"></i>
                  <span>{{ $t('home.contact.map.callNow') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { EmailAPI } from '@/services/api.js'
import { useI18n } from 'vue-i18n'
import { useGoogleAnalytics } from '@/composables/useGoogleAnalytics'
import fallbackData from '@/data/fallback-data'

const store = useStore()
const { t } = useI18n()
const { trackContactForm, trackPhoneCall } = useGoogleAnalytics()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// CompanyInfo'dan veri çek
const companyPhone = computed(() => {
  const phone = store.getters['companyInfo/companyPhone']
  const fallbackPhone = fallbackData.companyInfo.phone
  return phone || fallbackPhone
})

const googleMapsUrl = computed(() => {
  const mapsUrl = store.getters['companyInfo/googleMapsUrl']
  const fallbackMapsUrl = fallbackData.companyInfo.googleMapsUrl
  return mapsUrl || fallbackMapsUrl
})

const directionsUrl = computed(() => {
  const mapsUrl = store.getters['companyInfo/googleMapsUrl']
  const fallbackDirectionsUrl = fallbackData.companyInfo.directionsUrl
  return mapsUrl || fallbackDirectionsUrl
})

const handleSubmit = async () => {
  // Form validasyonu
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.message) {
    errorMessage.value = t('home.contact.form.validation.required')
    return
  }

  if (!isValidEmail(form.value.email)) {
    errorMessage.value = t('home.contact.form.validation.email')
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  isSuccess.value = false

  try {
    const response = await EmailAPI.sendContactEmail(form.value)
    
    if (response.result) {
      isSuccess.value = true
      
      // Google Analytics'e form gönderimi eventi gönder
      trackContactForm('contact')
      
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      }
      
      // 3 saniye sonra success mesajını gizle
      setTimeout(() => {
        isSuccess.value = false
      }, 3000)
    } else {
      errorMessage.value = response.errorMessage || t('home.contact.form.error.general')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    errorMessage.value = t('home.contact.form.error.network')
  } finally {
    isLoading.value = false
  }
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Event handlers
const handlePhoneCall = () => {
  trackPhoneCall(companyPhone.value)
}
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Contact.scss';
</style> 