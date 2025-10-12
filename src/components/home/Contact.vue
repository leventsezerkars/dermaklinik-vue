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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1324.3769308986002!2d32.44742075994305!3d37.8622338918696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08506268d51bd%3A0xd23e3de31bae298!2sDo%C3%A7.%20Dr.%20Mehmet%20Unal%20Dermatoloji%20Klini%C4%9Fi!5e0!3m2!1str!2str!4v1676893648669!5m2!1str!2str"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="map-info">
              <div class="map-buttons">
                <a href="https://www.google.com/maps/dir//Ate%C5%9Fbaz+Veli+Mahallesi,+Yeni+Meram+Cd.+No:83+D:4,+42090+Meram%2FKonya/@37.8746357,32.4565924,17z" 
                   target="_blank" 
                   class="btn btn-primary">
                  <i class="fas fa-directions"></i>
                  <span>{{ $t('home.contact.map.getDirections') }}</span>
                </a>
                <a href="tel:+905465297677" 
                   class="btn btn-outline-primary">
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
import { ref } from 'vue'
import { EmailAPI } from '@/services/api.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Contact.scss';
</style> 