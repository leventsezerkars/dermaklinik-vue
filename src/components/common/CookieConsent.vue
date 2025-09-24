<template>
  <div v-if="showCookieBanner" class="cookie-consent-banner">
    <div class="cookie-consent-content">
      <div class="cookie-icon">
        <i class="fas fa-cookie-bite"></i>
      </div>
      
      <div class="cookie-text">
        <h3>{{ $t('cookie.title') }}</h3>
        <p>{{ $t('cookie.description') }}</p>
        <div class="cookie-features">
          <div class="feature-item">
            <i class="fas fa-check-circle"></i>
            <span>{{ $t('cookie.features.analytics') }}</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-check-circle"></i>
            <span>{{ $t('cookie.features.preferences') }}</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-check-circle"></i>
            <span>{{ $t('cookie.features.security') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cookie-actions">
      <button @click="acceptCookies" class="btn-accept">
        <i class="fas fa-check"></i>
        {{ $t('cookie.accept') }}
      </button>
      <button @click="declineCookies" class="btn-decline">
        <i class="fas fa-times"></i>
        {{ $t('cookie.decline') }}
      </button>
    </div>
    
    <div class="cookie-links">
      <button @click="openKVKKModal" class="kvkk-link">
        <i class="fas fa-file-pdf"></i>
        {{ $t('cookie.kvkk') }}
      </button>
    </div>
  </div>

  <!-- KVKK PDF Modal -->
  <div v-if="showKVKKModal" class="kvkk-modal-overlay" @click="closeKVKKModal">
    <div class="kvkk-modal" @click.stop>
      <div class="kvkk-modal-header">
        <h3>{{ $t('cookie.kvkkTitle') }}</h3>
        <button @click="closeKVKKModal" class="kvkk-modal-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="kvkk-modal-content">
        <iframe 
          :src="kvkkPdfUrl" 
          width="100%" 
          height="600px"
          frameborder="0"
          title="KVKK Aydınlatma Metni"
        ></iframe>
      </div>
      <div class="kvkk-modal-footer">
        <button @click="closeKVKKModal" class="btn btn-primary">
          {{ $t('common.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showCookieBanner = ref(false)
const showKVKKModal = ref(false)
const kvkkPdfUrl = '/KVKK.pdf'

// Cookie consent kontrolü
const checkCookieConsent = () => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    showCookieBanner.value = true
  }
}

// Cookie'leri kabul et
const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  localStorage.setItem('cookie-consent-date', new Date().toISOString())
  showCookieBanner.value = false
  
  // Analytics ve diğer tracking kodlarını burada başlatabilirsiniz
  console.log('Cookie consent accepted')
}

// Cookie'leri reddet
const declineCookies = () => {
  localStorage.setItem('cookie-consent', 'declined')
  localStorage.setItem('cookie-consent-date', new Date().toISOString())
  showCookieBanner.value = false
  
  // Sadece gerekli cookie'leri kullanın
  console.log('Cookie consent declined')
}

// KVKK modal'ını aç
const openKVKKModal = () => {
  showKVKKModal.value = true
  document.body.style.overflow = 'hidden' // Sayfa kaydırmayı engelle
}

// KVKK modal'ını kapat
const closeKVKKModal = () => {
  showKVKKModal.value = false
  document.body.style.overflow = 'auto' // Sayfa kaydırmayı geri aç
}

onMounted(() => {
  checkCookieConsent()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 1.5rem;
  animation: slideUp 0.4s ease-out;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba($gold, 0.3);
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px 12px 0 0;

  @media (max-width: $breakpoint-md) {
    padding: 1rem;
    border-radius: 8px 8px 0 0;
    max-width: 100%;
  }
}

.cookie-consent-content {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }
}

.cookie-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, $gold, $gold-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba($gold, 0.3);

  i {
    font-size: 1.2rem;
    color: $dark;
  }

  @media (max-width: $breakpoint-md) {
    width: 40px;
    height: 40px;

    i {
      font-size: 1rem;
    }
  }
}

.cookie-text {
  flex: 1;

  h3 {
    color: $gold;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, $gold, $gold-light);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: $breakpoint-md) {
      font-size: 1.1rem;
    }
  }

  p {
    color: rgba($white, 0.9);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 1rem 0;

    @media (max-width: $breakpoint-md) {
      font-size: 0.9rem;
    }
  }
}

.cookie-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: rgba($white, 0.8);
    font-size: 0.8rem;
    background: rgba($gold, 0.1);
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    border: 1px solid rgba($gold, 0.2);

    i {
      color: $gold;
      font-size: 0.8rem;
    }
  }
}

.cookie-actions {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: 0.6rem;
  }

  .btn-accept,
  .btn-decline {
    flex: 1;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    text-decoration: none;

    @media (max-width: $breakpoint-md) {
      padding: 0.6rem 1.2rem;
      font-size: 0.85rem;
    }
  }

  .btn-accept {
    background: linear-gradient(135deg, $gold, $gold-light);
    color: $dark;
    box-shadow: 0 4px 15px rgba($gold, 0.3);

    &:hover {
      background: linear-gradient(135deg, $gold-light, $gold);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($gold, 0.4);
    }
  }

  .btn-decline {
    background: transparent;
    color: rgba($white, 0.8);
    border: 2px solid rgba($white, 0.3);

    &:hover {
      background: rgba($white, 0.1);
      border-color: rgba($white, 0.5);
      color: $white;
    }
  }
}

.cookie-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: 0.5rem;
  }

  a, button {
    color: rgba($white, 0.7);
    text-decoration: none;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    background: none;
    cursor: pointer;

    &:hover {
      color: $gold;
      background: rgba($gold, 0.1);
      border-color: rgba($gold, 0.2);
    }

    i {
      font-size: 0.7rem;
    }
  }
}

// KVKK Modal Styles
.kvkk-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.kvkk-modal {
  background: $dark;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba($gold, 0.2);
  animation: slideUp 0.3s ease-out;

  @media (max-width: $breakpoint-md) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 8px;
  }
}

.kvkk-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba($gold, 0.2);
  background: linear-gradient(135deg, rgba($gold, 0.1) 0%, rgba($gold, 0.05) 100%);

  h3 {
    color: $gold;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    background: linear-gradient(135deg, $gold, $gold-light);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: $breakpoint-md) {
      font-size: 1.1rem;
    }
  }
}

.kvkk-modal-close {
  background: none;
  border: none;
  color: rgba($white, 0.7);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: rgba($gold, 0.2);
    color: $gold;
  }
}

.kvkk-modal-content {
  flex: 1;
  padding: 1.5rem;
  overflow: hidden;

  iframe {
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    @media (max-width: $breakpoint-md) {
      height: 500px;
    }
  }
}

.kvkk-modal-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba($gold, 0.2);
  display: flex;
  justify-content: center;
  background: rgba($dark, 0.5);

  .btn {
    background: linear-gradient(135deg, $gold, $gold-light);
    color: $dark;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba($gold, 0.3);

    &:hover {
      background: linear-gradient(135deg, $gold-light, $gold);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($gold, 0.4);
    }
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
