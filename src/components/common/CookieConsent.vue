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
      <a href="/privacy-policy" class="privacy-link">
        <i class="fas fa-shield-alt"></i>
        {{ $t('cookie.privacyPolicy') }}
      </a>
      <a href="/cookie-policy" class="cookie-policy-link">
        <i class="fas fa-cookie"></i>
        {{ $t('cookie.cookiePolicy') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showCookieBanner = ref(false)

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

  a {
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
