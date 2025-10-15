import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

// Global initialization flag
let globalInitialized = false

export function useGoogleAnalytics() {
  const store = useStore()
  const isInitialized = ref(false)
  const isGtagLoaded = ref(false)

  // Google Analytics script'ini yükler
  const loadGoogleAnalyticsScript = () => {
    return new Promise((resolve, reject) => {
      // Script zaten yüklenmişse
      if (window.gtag) {
        isGtagLoaded.value = true
        resolve()
        return
      }

      // Script'i head'e ekle
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + store.getters['companyInfo/googleAnalyticsCode']
      
      script.onload = () => {
        isGtagLoaded.value = true
        resolve()
      }
      
      script.onerror = () => {
        console.error('Google Analytics script yüklenemedi')
        reject(new Error('Google Analytics script yüklenemedi'))
      }
      
      document.head.appendChild(script)
    })
  }

  // Google Analytics'i initialize eder
  const initializeGoogleAnalytics = async () => {
    try {
      const analyticsCode = store.getters['companyInfo/googleAnalyticsCode']
      
      if (!analyticsCode) {
        console.warn('Google Analytics kodu bulunamadı')
        return
      }

      // Script'i yükle
      await loadGoogleAnalyticsScript()

      // gtag fonksiyonunu tanımla
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = gtag

      // Google Analytics'i initialize et
      gtag('js', new Date())
      gtag('config', analyticsCode, {
        page_title: document.title,
        page_location: window.location.href
      })

      isInitialized.value = true
      globalInitialized = true
      console.log('Google Analytics başarıyla initialize edildi:', analyticsCode)
    } catch (error) {
      console.error('Google Analytics initialize edilemedi:', error)
    }
  }

  // Global initialization - sadece bir kez çalışır
  const initializeGlobalGoogleAnalytics = async () => {
    if (globalInitialized) {
      return
    }

    try {
      // CompanyInfo'yu yükle
      await store.dispatch('companyInfo/fetchActiveCompanyInfo')
      
      // Google Analytics kodu varsa initialize et
      const analyticsCode = store.getters['companyInfo/googleAnalyticsCode']
      if (analyticsCode) {
        await initializeGoogleAnalytics()
      } else {
        console.log('Google Analytics kodu bulunamadı, tracking devre dışı')
      }
    } catch (error) {
      console.error('Google Analytics global initialize edilemedi:', error)
    }
  }

  // Sayfa görüntüleme eventi gönderir
  const trackPageView = (pageTitle, pagePath) => {
    if (!isInitialized.value || !window.gtag) {
      console.warn('Google Analytics henüz initialize edilmedi')
      return
    }

    window.gtag('config', store.getters['companyInfo/googleAnalyticsCode'], {
      page_title: pageTitle || document.title,
      page_location: pagePath || window.location.href
    })
  }

  // Custom event gönderir
  const trackEvent = (eventName, parameters = {}) => {
    if (!isInitialized.value || !window.gtag) {
      console.warn('Google Analytics henüz initialize edilmedi')
      return
    }

    window.gtag('event', eventName, parameters)
  }

  // E-ticaret eventi gönderir
  const trackPurchase = (transactionId, value, currency = 'TRY', items = []) => {
    if (!isInitialized.value || !window.gtag) {
      console.warn('Google Analytics henüz initialize edilmedi')
      return
    }

    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    })
  }

  // Form gönderimi eventi
  const trackFormSubmit = (formName, formId = null) => {
    trackEvent('form_submit', {
      form_name: formName,
      form_id: formId
    })
  }

  // İletişim formu gönderimi
  const trackContactForm = (formType = 'contact') => {
    trackEvent('contact_form_submit', {
      form_type: formType
    })
  }

  // Randevu formu gönderimi
  const trackAppointmentForm = () => {
    trackEvent('appointment_form_submit', {
      form_type: 'appointment'
    })
  }

  // Blog okuma eventi
  const trackBlogRead = (blogTitle, blogId) => {
    trackEvent('blog_read', {
      blog_title: blogTitle,
      blog_id: blogId
    })
  }

  // Hizmet görüntüleme eventi
  const trackServiceView = (serviceName, serviceId) => {
    trackEvent('service_view', {
      service_name: serviceName,
      service_id: serviceId
    })
  }

  // Galeri görüntüleme eventi
  const trackGalleryView = (imageName, imageId) => {
    trackEvent('gallery_view', {
      image_name: imageName,
      image_id: imageId
    })
  }

  // WhatsApp tıklama eventi
  const trackWhatsAppClick = (phoneNumber) => {
    trackEvent('whatsapp_click', {
      phone_number: phoneNumber
    })
  }

  // Telefon arama eventi
  const trackPhoneCall = (phoneNumber) => {
    trackEvent('phone_call', {
      phone_number: phoneNumber
    })
  }

  // E-posta gönderimi eventi
  const trackEmailClick = (emailAddress) => {
    trackEvent('email_click', {
      email_address: emailAddress
    })
  }

  // CompanyInfo değiştiğinde Google Analytics'i yeniden initialize et
  watch(
    () => store.getters['companyInfo/googleAnalyticsCode'],
    (newCode, oldCode) => {
      if (newCode && newCode !== oldCode) {
        initializeGoogleAnalytics()
      }
    }
  )

  // Component mount olduğunda global initialization'ı çalıştır
  onMounted(() => {
    initializeGlobalGoogleAnalytics()
  })

  return {
    isInitialized,
    isGtagLoaded,
    initializeGoogleAnalytics,
    initializeGlobalGoogleAnalytics,
    trackPageView,
    trackEvent,
    trackPurchase,
    trackFormSubmit,
    trackContactForm,
    trackAppointmentForm,
    trackBlogRead,
    trackServiceView,
    trackGalleryView,
    trackWhatsAppClick,
    trackPhoneCall,
    trackEmailClick
  }
}
