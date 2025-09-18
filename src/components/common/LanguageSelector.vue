<template>
  <div class="language-selector">
    <div class="dropdown">
      <button 
        class="btn btn-link dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        <img :src="currentFlag" :alt="currentLang" class="current-flag" />
        <i class="fas fa-chevron-down dropdown-arrow"></i>
      </button>
      <ul class="dropdown-menu">
        <li v-for="locale in supportedLocales" :key="locale.code">
          <button 
            class="dropdown-item" 
            @click="changeLanguage(locale.code)"
            :class="{ active: currentLocale === locale.code }"
          >
            <img :src="locale.flag" :alt="locale.name" class="flag" />
            <span class="name">{{ locale.name }}</span>
            <i v-if="currentLocale === locale.code" class="fas fa-check active-icon"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { supportedLocales, setLocale } from '@/i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const currentFlag = computed(() => {
  const current = supportedLocales.find(l => l.code === currentLocale.value)
  return current ? current.flag : '/images/flags/tr.svg'
})

const currentLang = computed(() => {
  const current = supportedLocales.find(l => l.code === currentLocale.value)
  return current ? current.name : 'Türkçe'
})

const changeLanguage = async (newLocale) => {
  if (newLocale !== currentLocale.value) {
    setLocale(newLocale)
    // i18n locale'ini güncelle
    locale.value = newLocale
    
    // Menu store'unda dil değişimini tetikle
    const { useStore } = await import('vuex')
    const store = useStore()
    await store.dispatch('menu/changeLanguage', newLocale)
  }
}

// Sayfa yüklendiğinde localStorage'dan dili al ve i18n'e uygula
const initializeLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && savedLocale !== locale.value) {
    locale.value = savedLocale
  }
}

// Component mount olduğunda dili başlat
import { onMounted } from 'vue'
onMounted(() => {
  initializeLocale()
})
</script>

<style lang="scss" scoped>
.language-selector {
  .dropdown-toggle {
    color: #ffffff;
    text-decoration: none;
    padding: 0.35rem 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.3s ease;
    font-weight: 500;
    min-height: 28px;
    
    &:hover, &:focus {
      color: #D4AF37;
      background: rgba(212, 175, 55, 0.15);
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.2);
    }
    
    &::after {
      display: none; // Bootstrap arrow'ı gizle
    }
  }
  
  .dropdown-arrow {
    font-size: 0.65rem;
    transition: transform 0.3s ease;
    margin-left: 0.15rem;
    color: #D4AF37;
  }
  
  .dropdown-toggle[aria-expanded="true"] .dropdown-arrow {
    transform: rotate(180deg);
  }
  
  .current-flag {
    width: 18px;
    height: 13px;
    object-fit: cover;
    border-radius: 2px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }
  
  .dropdown-menu {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    min-width: 140px;
    padding: 0.4rem 0;
    margin-top: 0.3rem;
    animation: fadeInUp 0.3s ease;
    z-index: 9999 !important; // Çok yüksek z-index
    position: absolute !important; // Position absolute zorunlu
    
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 1rem;
      color: #333;
      border: none;
      background: transparent;
      transition: all 0.3s ease;
      position: relative;
      border-radius: 6px;
      margin: 0 0.2rem;
      
      &:hover {
        background: rgba(212, 175, 55, 0.1);
        color: #D4AF37;
        transform: translateX(2px);
      }
      
      &.active {
        background: rgba(212, 175, 55, 0.15);
        color: #D4AF37;
        font-weight: 600;
      }
      
      .flag {
        width: 24px;
        height: 18px;
        object-fit: cover;
        border-radius: 2px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
      }
      
      .name {
        font-size: 0.85rem;
        font-weight: 500;
        flex: 1;
      }
      
      .active-icon {
        color: #D4AF37;
        font-size: 0.7rem;
        margin-left: auto;
      }
    }
  }
}

// Animasyon
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive tasarım
@media (max-width: 768px) {
  .language-selector {
    .dropdown-toggle {
      padding: 0.3rem 0.6rem;
      min-height: 26px;
      
      .current-flag {
        width: 16px;
        height: 12px;
      }
    }
    
    .dropdown-menu {
      min-width: 120px;
      
      .dropdown-item {
        padding: 0.5rem 0.8rem;
        
        .flag {
          width: 20px;
          height: 15px;
        }
        
        .name {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
