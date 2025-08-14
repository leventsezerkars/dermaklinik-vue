import { createI18n } from 'vue-i18n'
import tr from '@/locales/tr'
import en from '@/locales/en'

const messages = {
  tr,
  en
}

// Varsayılan dil olarak Türkçe'yi ayarla
const defaultLocale = 'tr'

// Tarayıcı dilini algıla
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && messages[savedLocale]) {
    return savedLocale
  }
  
  const browserLocale = navigator.language.split('-')[0]
  if (messages[browserLocale]) {
    return browserLocale
  }
  
  return defaultLocale
}

export default createI18n({
  legacy: false, // Composition API kullanımı için
  locale: getDefaultLocale(),
  fallbackLocale: defaultLocale,
  messages,
  globalInjection: true,
  silentTranslationWarn: true
})

// Dil değiştirme fonksiyonu
export const setLocale = (locale) => {
  if (messages[locale]) {
    localStorage.setItem('locale', locale)
    // Global i18n instance'ını güncelle
    if (window.i18n && window.i18n.global) {
      window.i18n.global.locale.value = locale
    }
  }
}

// Mevcut dili al
export const getCurrentLocale = () => {
  return localStorage.getItem('locale') || defaultLocale
}

// Desteklenen diller
export const supportedLocales = [
  { code: 'tr', name: 'Türkçe', flag: '/images/flags/tr.svg' },
  { code: 'en', name: 'English', flag: '/images/flags/en.svg' }
]
