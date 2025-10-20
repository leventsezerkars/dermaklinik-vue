import { computed } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import fallbackData from '@/data/fallback-data'

export function useSEO() {
  const store = useStore()

  // Store'dan SEO bilgilerini al
  const seoInfo = computed(() => store.getters['companyInfo/seoInfo'])
  const companyName = computed(() => store.getters['companyInfo/companyName'])
  const companyInfo = computed(() => store.getters['companyInfo/activeCompanyInfo'])

  // Fallback SEO bilgileri
  const fallbackSEO = computed(() => fallbackData.companyInfo.seo)

  // Sayfa başlığını oluştur
  const getPageTitle = (pageTitle = '') => {
    const baseTitle = companyName.value || fallbackSEO.value.defaultTitle
    const metaTitle = seoInfo.value?.metaTitle || fallbackSEO.value.defaultTitle
    
    if (pageTitle) {
      return `${pageTitle} - ${baseTitle}`
    }
    
    return metaTitle || baseTitle
  }

  // Meta açıklamasını oluştur - companyInfo'dan gelenler + sayfa özel açıklama
  const getMetaDescription = (pageDescription = '') => {
    const companyDescription = seoInfo.value?.metaDescription || fallbackSEO.value.defaultDescription
    
    if (pageDescription) {
      // Company description + page description birleştir
      const combinedDescription = companyDescription ? `${companyDescription} ${pageDescription}` : pageDescription
      return combinedDescription
    }
    
    return companyDescription || fallbackSEO.value.defaultDescription
  }

  // Meta anahtar kelimelerini oluştur - companyInfo'dan gelenler + sayfa özel kelimeler
  const getMetaKeywords = (pageKeywords = '') => {
    const companyKeywords = seoInfo.value?.metaKeywords || fallbackSEO.value.defaultKeywords
    
    if (pageKeywords) {
      // Company keywords + page keywords birleştir
      const combinedKeywords = companyKeywords ? `${companyKeywords}, ${pageKeywords}` : pageKeywords
      return combinedKeywords
    }
    
    return companyKeywords || fallbackSEO.value.defaultKeywords
  }

  // Open Graph image URL'ini oluştur
  const getOGImage = (pageImage = '') => {
    if (pageImage) return pageImage
    
    // Company logo varsa onu kullan
    const companyLogo = companyInfo.value?.logoUrl
    if (companyLogo) return companyLogo
    
    // Fallback image
    return '/images/logo_beyaz.png'
  }

  // URL'yi oluştur
  const getPageURL = (pageUrl = '') => {
    if (pageUrl) return pageUrl
    return window.location.href
  }

  // SEO head bilgilerini ayarla
  const setSEOHead = (options = {}) => {
    const {
      title = '',
      description = '',
      keywords = '',
      image = '',
      url = '',
      type = 'website'
    } = options

    const pageTitle = getPageTitle(title)
    const pageDescription = getMetaDescription(description)
    const pageKeywords = getMetaKeywords(keywords)
    const pageImage = getOGImage(image)
    const pageURL = getPageURL(url)

    useHead({
      title: pageTitle,
      meta: [
        {
          name: 'description',
          content: pageDescription
        },
        {
          name: 'keywords',
          content: pageKeywords
        },
        {
          property: 'og:title',
          content: pageTitle
        },
        {
          property: 'og:description',
          content: pageDescription
        },
        {
          property: 'og:image',
          content: pageImage
        },
        {
          property: 'og:url',
          content: pageURL
        },
        {
          property: 'og:type',
          content: type
        },
        {
          property: 'og:site_name',
          content: companyName.value || fallbackSEO.value.defaultTitle
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: pageTitle
        },
        {
          name: 'twitter:description',
          content: pageDescription
        },
        {
          name: 'twitter:image',
          content: pageImage
        }
      ]
    })
  }

  return {
    seoInfo,
    companyName,
    companyDescription,
    companyInfo,
    getPageTitle,
    getMetaDescription,
    getMetaKeywords,
    getOGImage,
    getPageURL,
    setSEOHead,
  }
}
