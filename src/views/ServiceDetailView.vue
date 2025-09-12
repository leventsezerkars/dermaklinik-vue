<template>
  <div class="service-detail-page">
    <!-- Blog Style Header -->
    <header class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>{{ $t('serviceDetail.breadcrumb.home') }}</span>
            </router-link>
            <i class="fas fa-chevron-right separator"></i>
            <span class="current-page">{{ currentService?.category || $t('serviceDetail.breadcrumb.service') }}</span>
          </div>
          
          <div class="service-meta" v-if="currentService">
            <div class="category-badge">
              <i class="fas fa-tag"></i>
              {{ currentService.category }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="blog-main">
      <div class="container">
        <div class="blog-layout">
          <!-- Main Content -->
          <article class="blog-content">
            <header class="content-header" v-if="currentService">
              <h1 class="blog-title">{{ currentService.title }}</h1>
              <div class="content-meta">
                <div class="meta-item">
                  <i class="fas fa-user-md"></i>
                  <span>{{ $t('serviceDetail.meta.expertDermatologist') }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ $t('serviceDetail.meta.updated') }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-eye"></i>
                  <span>{{ $t('serviceDetail.meta.professionalTreatment') }}</span>
                </div>
              </div>
            </header>

            <div class="content-body" v-if="currentService">
              <div class="service-intro">
                <div class="intro-icon">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <p class="intro-text">
                  {{ $t('serviceDetail.introText', { title: currentService.title.toLowerCase() }) }}
                </p>
              </div>

              <!-- İçerik uyarısı - eğer içerik yoksa -->
              <div v-if="!currentService.content || currentService.content.trim() === ''" class="content-warning">
                <div class="warning-content">
                  <div class="warning-icon">
                    <i :class="$t('serviceDetail.contentWarning.icon')"></i>
                  </div>
                  <h3>{{ $t('serviceDetail.contentWarning.title') }}</h3>
                  <p>{{ $t('serviceDetail.contentWarning.message') }}</p>
                </div>
              </div>

              <!-- Normal içerik - eğer içerik varsa -->
              <div v-else class="service-content">
                <div class="service-content-detail" v-html="currentService.content"></div>
              </div>
            </div>
            
            <div v-else-if="loading" class="service-loading">
              <div class="loading-content">
                <div class="loading-spinner">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>{{ $t('serviceDetail.loading') }}</p>
              </div>
            </div>
            
            <div v-else-if="error" class="service-error">
              <div class="error-content">
                <div class="error-icon">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2>{{ $t('serviceDetail.error.title') }}</h2>
                <p>{{ error }}</p>
                <div class="error-actions">
                  <button @click="fetchServiceData" class="btn btn-primary">
                    <i class="fas fa-refresh me-2"></i>
                    {{ $t('serviceDetail.error.retry') }}
                  </button>
                  <router-link to="/" class="btn btn-secondary">
                    <i class="fas fa-home me-2"></i>
                    {{ $t('serviceDetail.error.homeLink') }}
                  </router-link>
                </div>
              </div>
            </div>
            
            <div v-else class="service-not-found">
              <div class="not-found-content">
                <div class="not-found-icon">
                  <i class="fas fa-search"></i>
                </div>
                <h2>{{ $t('serviceDetail.notFound.title') }}</h2>
                <p>{{ $t('serviceDetail.notFound.description') }}</p>
                <div class="not-found-actions">
                  <router-link to="/" class="btn btn-primary">
                    <i class="fas fa-home me-2"></i>
                    {{ $t('serviceDetail.notFound.homeLink') }}
                  </router-link>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="blog-sidebar">
            <!-- Quick Contact Card -->
            <div class="sidebar-card contact-card">
              <div class="card-header">
                <i class="fas fa-calendar-check"></i>
                <h3>{{ t('serviceDetail.sidebar.quickAppointment.title') }}</h3>
              </div>
              <div class="card-content">
                <p>{{ t('serviceDetail.sidebar.quickAppointment.description') }}</p>
                <div class="contact-stats">
                  <div class="stat-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ t('serviceDetail.sidebar.quickAppointment.stats.quickResponse') }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-user-md"></i>
                    <span>{{ t('serviceDetail.sidebar.quickAppointment.stats.expertStaff') }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span>{{ t('serviceDetail.sidebar.quickAppointment.stats.highSatisfaction') }}</span>
                  </div>
                </div>
                <div class="contact-actions">
                  <a :href="`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`" class="btn btn-whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    {{ t('serviceDetail.sidebar.quickAppointment.whatsapp') }}
                  </a>
                  <a :href="`tel:${contactInfo.phone}`" class="btn btn-phone">
                    <i class="fas fa-phone"></i>
                    {{ t('serviceDetail.sidebar.quickAppointment.call') }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Related Services Card -->
            <div class="sidebar-card" v-if="relatedServices.length > 0">
              <div class="card-header">
                <i class="fas fa-link"></i>
                <h3>{{ $t('serviceDetail.sidebar.relatedServices.title') }}</h3>
              </div>
              <div class="card-content">
                <div class="related-list">
                  <router-link 
                    v-for="service in relatedServices" 
                    :key="service.id"
                    :to="`/hizmetler/${service.slug}`"
                    class="related-item"
                  >
                    <div class="related-icon">
                      <i class="fas fa-stethoscope"></i>
                    </div>
                    <div class="related-content">
                      <h4 class="related-title">{{ service.title }}</h4>
                      <span class="related-category">{{ service.category }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Contact Info Card -->
            <div class="sidebar-card">
              <div class="card-header">
                <i class="fas fa-info-circle"></i>
                <h3>{{ $t('serviceDetail.sidebar.contactInfo.title') }}</h3>
              </div>
              <div class="card-content">
                <div class="info-list">
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.address') }}</strong>
                      <span>{{ contactInfo.address }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-phone"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.phone') }}</strong>
                      <span>{{ contactInfo.phone }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.email') }}</strong>
                      <span>{{ contactInfo.email }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.workingHours') }}</strong>
                      <span>{{ contactInfo.workingHours }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { MenuAPI } from '@/services/api/menu'

const route = useRoute()
const router = useRouter()
const store = useStore()
const { locale, t } = useI18n({ useScope: 'global' })
const loading = ref(false)
const error = ref(null)

// Hizmet verisi - API'den gelecek
const currentService = ref(null)
const relatedServices = ref([])

// Dil değiştiğinde slug'ı güncelle
const updateSlugForNewLanguage = async (newLocale) => {
  try {
    if (!currentService.value) return
    
    loading.value = true
    
    // Mevcut hizmetin ID'sini kullanarak yeni dildeki slug'ını bul
    const response = await MenuAPI.getAll(newLocale)
    const menuItems = response.data || response
    const service = menuItems.find(item => item.id === currentService.value.id)
    
    if (service && service.translations) {
      const translation = service.translations.find(t => t.language?.code === newLocale)
      
      if (translation && translation.slug) {
        // URL'yi yeni slug ile güncelle
        const newPath = `/hizmetler/${translation.slug}`
        await router.replace(newPath)
        
        // Veriyi yeniden yükle
        await fetchServiceData()
      } else {
        // Çeviri bulunamadı, sadece veriyi yeniden yükle
        await fetchServiceData()
      }
    } else {
      // Hizmet bulunamadı, sadece veriyi yeniden yükle
      await fetchServiceData()
    }
  } catch (err) {
    console.error('Slug update error:', err)
    // Hata durumunda sadece veriyi yeniden yükle
    await fetchServiceData()
  }
}

// API'den hizmet verilerini çek
const fetchServiceData = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Mevcut dil kodunu al
    const currentLanguage = locale.value || 'tr'
    
    // Tüm menü öğelerini çek
    const response = await MenuAPI.getAll(currentLanguage)
    const menuItems = response.data || response
    
    // Slug'a göre hizmeti bul
    const service = menuItems.find(item => 
      item.translations && 
      item.translations.some(translation => translation.slug === route.params.slug)
    )
    
    if (service) {
      // Mevcut dildeki çeviriyi bul
      const translation = service.translations.find(t => t.language?.code === currentLanguage)
      
      if (translation) {
        currentService.value = {
          id: service.id,
          slug: translation.slug,
          title: translation.title,
          content: translation.content,
          seoTitle: translation.seoTitle,
          seoDescription: translation.seoDescription,
          seoKeywords: translation.seoKeywords,
          category: service.type === 1 ? 'Genel Dermatoloji' : 'Lazer Tedavileri' // Type'a göre kategori belirle
        }
        
        // İlgili hizmetleri bul (aynı kategorideki diğer hizmetler)
        relatedServices.value = menuItems.data
          .filter(item => 
            item.id !== service.id && 
            item.type === service.type &&
            item.translations && 
            item.translations.some(t => t.language?.code === currentLanguage)
          )
          .map(item => {
            const itemTranslation = item.translations.find(t => t.language?.code === currentLanguage)
            return {
              id: item.id,
              slug: itemTranslation.slug,
              title: itemTranslation.title,
              category: item.type === 1 ? 'Genel Dermatoloji' : 'Lazer Tedavileri'
            }
          })
          .slice(0, 3)
      } else {
        error.value = 'Hizmet bulunamadı'
      }
    } else {
      error.value = 'Hizmet bulunamadı'
    }
  } catch (err) {
    error.value = 'Hizmet verileri yüklenirken bir hata oluştu'
    console.error('Service fetch error:', err)
  } finally {
    loading.value = false
  }
}

// Company bilgilerini store'dan al
const companyInfo = computed(() => store.getters['companyInfo/activeCompanyInfo'])

// İletişim bilgileri
const contactInfo = computed(() => ({
  address: companyInfo.value?.address || 'Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya',
  phone: companyInfo.value?.phone || '+90 546 529 76 77',
  email: companyInfo.value?.email || 'dr.munal1101@gmail.com',
  workingHours: companyInfo.value?.workingHours || 'Pazartesi - Cumartesi: 09:00 - 18:00'
}))

// SEO için head bilgilerini ayarla
useHead({
  title: computed(() => currentService.value ? `${currentService.value.seoTitle || currentService.value.title} - Dermaklinik` : 'Hizmet Bulunamadı - Dermaklinik'),
  meta: [
    {
      name: 'description',
      content: computed(() => currentService.value ? currentService.value.seoDescription || `${currentService.value.title} hakkında detaylı bilgi. Uzman dermatolog ekibimizle modern tedavi yöntemleri.` : 'Aradığınız hizmet bulunamadı.')
    },
    {
      name: 'keywords',
      content: computed(() => currentService.value ? currentService.value.seoKeywords || `${currentService.value.title}, dermatoloji, cilt hastalıkları, tedavi` : 'dermatoloji, cilt hastalıkları')
    }
  ]
})

// Route parametrelerini dinle ve veriyi yeniden yükle
watch(
  () => route.params.slug,
  async (newSlug, oldSlug) => {
    if (newSlug && newSlug !== oldSlug) {
      // Slug değiştiğinde veriyi yeniden yükle
      await fetchServiceData()
    }
  },
  { immediate: true }
)

// Dil değişikliklerini dinle
watch(
  () => locale.value,
  async (newLocale, oldLocale) => {
    if (newLocale && newLocale !== oldLocale && currentService.value) {
      // DOM güncellemesini bekle
      await nextTick()
      // Dil değiştiğinde önce mevcut hizmetin yeni dildeki slug'ını bul
      await updateSlugForNewLanguage(newLocale)
    }
  }
)

onMounted(async () => {
  // Company bilgilerini yükle
  await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  
  // Hizmet verilerini yükle (watch zaten çalışacak ama emin olmak için)
  if (route.params.slug) {
    await fetchServiceData()
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/views/ServiceDetailView.scss';
</style>