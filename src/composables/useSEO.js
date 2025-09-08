import { computed } from 'vue'
import { useStore } from 'vuex'

export function useSEO() {
  const store = useStore()

  // Store'dan SEO bilgilerini al
  const seoInfo = computed(() => store.getters['companyInfo/seoInfo'])
  const companyName = computed(() => store.getters['companyInfo/companyName'])
  const companyDescription = computed(() => store.getters['companyInfo/companyDescription'])

  // Sayfa başlığını oluştur
  const getPageTitle = (pageTitle = '') => {
    const baseTitle = companyName.value || 'DermaKlinik'
    const metaTitle = seoInfo.value?.metaTitle || ''
    
    if (pageTitle) {
      return `${pageTitle} - ${baseTitle}`
    }
    
    return metaTitle || baseTitle
  }

  // Meta açıklamasını oluştur
  const getMetaDescription = (pageDescription = '') => {
    const metaDescription = seoInfo.value?.metaDescription || ''
    const companyDesc = companyDescription.value || ''
    
    return pageDescription || metaDescription || companyDesc || 'Dermatoloji ve Estetik Dermatoloji Kliniği'
  }

  // Meta anahtar kelimelerini oluştur
  const getMetaKeywords = (pageKeywords = '') => {
    const metaKeywords = seoInfo.value?.metaKeywords || ''
    
    if (pageKeywords) {
      return pageKeywords
    }
    
    return metaKeywords || 'dermatoloji, estetik dermatoloji, cilt hastalıkları, botoks, dolgu, lazer epilasyon'
  }

  // Sayfa meta bilgilerini güncelle
  const updatePageMeta = (options = {}) => {
    const {
      title = '',
      description = '',
      keywords = '',
      image = '',
      url = ''
    } = options

    // Sayfa başlığını güncelle
    document.title = getPageTitle(title)

    // Meta description'ı güncelle
    updateMetaTag('description', getMetaDescription(description))

    // Meta keywords'ü güncelle
    updateMetaTag('keywords', getMetaKeywords(keywords))

    // Open Graph meta etiketleri
    if (title) updateMetaTag('og:title', getPageTitle(title))
    if (description) updateMetaTag('og:description', getMetaDescription(description))
    if (image) updateMetaTag('og:image', image)
    if (url) updateMetaTag('og:url', url)

    // Twitter Card meta etiketleri
    if (title) updateMetaTag('twitter:title', getPageTitle(title))
    if (description) updateMetaTag('twitter:description', getMetaDescription(description))
    if (image) updateMetaTag('twitter:image', image)
  }

  // Meta etiketini güncelle veya oluştur
  const updateMetaTag = (name, content) => {
    if (!content) return

    // Name attribute'u olan meta etiketler
    let selector = `meta[name="${name}"]`
    
    // Property attribute'u olan meta etiketler (Open Graph, Twitter)
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      selector = `meta[property="${name}"]`
    }

    let metaTag = document.querySelector(selector)
    
    if (metaTag) {
      metaTag.setAttribute('content', content)
    } else {
      metaTag = document.createElement('meta')
      
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        metaTag.setAttribute('property', name)
      } else {
        metaTag.setAttribute('name', name)
      }
      
      metaTag.setAttribute('content', content)
      document.head.appendChild(metaTag)
    }
  }

  return {
    seoInfo,
    companyName,
    companyDescription,
    getPageTitle,
    getMetaDescription,
    getMetaKeywords,
    updatePageMeta
  }
}
