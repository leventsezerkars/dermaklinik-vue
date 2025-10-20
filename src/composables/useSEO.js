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

  // Schema.org yapısal veri oluştur
  const getSchemaData = (options = {}) => {
    const {
      type = 'website',
      title = '',
      description = '',
      image = '',
      url = '',
      articleData = null,
      serviceData = null
    } = options

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": companyName.value || fallbackSEO.value.defaultTitle,
      "description": seoInfo.value?.metaDescription || fallbackSEO.value.defaultDescription,
      "url": getPageURL(url),
      "telephone": companyInfo.value?.phone || fallbackData.companyInfo.phone,
      "email": companyInfo.value?.email || fallbackData.companyInfo.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": companyInfo.value?.address || fallbackData.companyInfo.address,
        "addressLocality": "Meram",
        "addressRegion": "Konya",
        "postalCode": "42090",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.8746357,
        "longitude": 32.4565924
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        companyInfo.value?.instagram || fallbackData.companyInfo.socialMedia.instagram,
        companyInfo.value?.facebook || fallbackData.companyInfo.socialMedia.facebook,
        companyInfo.value?.twitter || fallbackData.companyInfo.socialMedia.twitter
      ].filter(Boolean),
      "medicalSpecialty": ["Dermatology", "Aesthetic Medicine"]
    }

    // Article schema (Blog yazıları için)
    if (type === 'article' && articleData) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.description,
        "image": articleData.image,
        "author": {
          "@type": "Person",
          "name": companyName.value || fallbackSEO.value.defaultTitle
        },
        "publisher": {
          "@type": "Organization",
          "name": companyName.value || fallbackSEO.value.defaultTitle,
          "logo": {
            "@type": "ImageObject",
            "url": companyInfo.value?.logoUrl || '/images/logo_beyaz.png'
          }
        },
        "datePublished": articleData.datePublished,
        "dateModified": articleData.dateModified || articleData.datePublished,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": getPageURL(url)
        }
      }
    }

    // Service schema (Hizmet detayları için)
    if (type === 'service' && serviceData) {
      return {
        "@context": "https://schema.org",
        "@type": "MedicalTherapy",
        "name": serviceData.title,
        "description": serviceData.description,
        "provider": {
          "@type": "MedicalBusiness",
          "name": companyName.value || fallbackSEO.value.defaultTitle,
          "address": baseSchema.address,
          "telephone": baseSchema.telephone
        },
        "category": serviceData.category,
        "image": serviceData.image || getOGImage(image)
      }
    }

    // WebPage schema (Diğer sayfalar için)
    if (type === 'website') {
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": getPageTitle(title),
        "description": getMetaDescription(description),
        "url": getPageURL(url),
        "isPartOf": {
          "@type": "WebSite",
          "name": companyName.value || fallbackSEO.value.defaultTitle,
          "url": window.location.origin
        },
        "about": baseSchema
      }
    }

    return baseSchema
  }

  // SEO head bilgilerini ayarla
  const setSEOHead = (options = {}) => {
    const {
      title = '',
      description = '',
      keywords = '',
      image = '',
      url = '',
      type = 'website',
      articleData = null,
      serviceData = null
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
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        {
          name: 'googlebot',
          content: 'index, follow'
        },
        {
          name: 'author',
          content: companyName.value || fallbackSEO.value.defaultTitle
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
          property: 'og:locale',
          content: 'tr_TR'
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
        },
        {
          name: 'theme-color',
          content: '#D4AF37'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: pageURL
        },
        {
          rel: 'alternate',
          hreflang: 'tr',
          href: getPageURL(url).replace(/\/[a-z]{2}\//, '/').replace(/\/[a-z]{2}$/, '/')
        },
        {
          rel: 'alternate',
          hreflang: 'en',
          href: getPageURL(url).replace(/\/[a-z]{2}\//, '/en/').replace(/\/[a-z]{2}$/, '/en')
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getPageURL(url).replace(/\/[a-z]{2}\//, '/').replace(/\/[a-z]{2}$/, '/')
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(getSchemaData({
            type,
            title,
            description,
            image,
            url,
            articleData,
            serviceData
          }))
        }
      ]
    })
  }

  return {
    seoInfo,
    companyName,
    companyInfo,
    getPageTitle,
    getMetaDescription,
    getMetaKeywords,
    getOGImage,
    getPageURL,
    getSchemaData,
    setSEOHead,
  }
}
