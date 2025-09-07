// Bu dosya API servislerinin nasıl kullanılacağını gösterir
// Gerçek projede bu dosyayı silmeyi unutmayın

import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'

// Vue 3 Composition API ile kullanım örneği
export function useApiExample() {
  const store = useStore()

  // Store'dan verileri al
  const companyInfo = computed(() => store.getters['companyInfo/activeCompanyInfo'])
  const menuItems = computed(() => store.getters['menu/mainMenuItems'])
  const blogPosts = computed(() => store.getters['blog/activePosts'])
  const galleryGroups = computed(() => store.getters['gallery/activeGroups'])

  // Sayfa yüklendiğinde verileri çek
  onMounted(async () => {
    try {
      // Şirket bilgilerini ve menü öğelerini çek
      await store.dispatch('companyInfo/fetchActiveCompanyInfo')
      await store.dispatch('menu/fetchMenuItems')
      
      // Blog yazılarını çek
      await store.dispatch('blog/fetchPosts', { page: 1, limit: 10 })
      
      // Galeri gruplarını çek
      await store.dispatch('gallery/fetchGroups')
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error)
    }
  })

  return {
    companyInfo,
    menuItems,
    blogPosts,
    galleryGroups
  }
}

// Vue 2 Options API ile kullanım örneği
export const apiUsageMixin = {
  computed: {
    companyName() {
      return this.$store.getters['companyInfo/companyName']
    },
    companyAddress() {
      return this.$store.getters['companyInfo/companyAddress']
    },
    companyPhone() {
      return this.$store.getters['companyInfo/companyPhone']
    },
    companyEmail() {
      return this.$store.getters['companyInfo/companyEmail']
    },
    mainMenuItems() {
      return this.$store.getters['menu/mainMenuItems']
    },
    hierarchicalMenu() {
      return this.$store.getters['menu/hierarchicalMenu']
    },
    blogPosts() {
      return this.$store.getters['blog/activePosts']
    },
    galleryGroups() {
      return this.$store.getters['gallery/activeGroups']
    }
  },
  
  methods: {
    async loadSiteData() {
      try {
        // Tüm site verilerini yükle
        await this.$store.dispatch('fetchSiteInfo')
        
        // Blog yazılarını yükle
        await this.$store.dispatch('blog/fetchPosts', { page: 1, limit: 10 })
        
        // Galeri gruplarını yükle
        await this.$store.dispatch('gallery/fetchGroups')
      } catch (error) {
        console.error('Site verileri yüklenirken hata:', error)
      }
    },

    async loadBlogPosts(page = 1, limit = 10, search = '') {
      try {
        await this.$store.dispatch('blog/fetchPosts', { page, limit, search })
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error)
      }
    },

    async loadGalleryGroupImages(groupId) {
      try {
        await this.$store.dispatch('gallery/fetchGroupImages', groupId)
      } catch (error) {
        console.error('Galeri resimleri yüklenirken hata:', error)
      }
    }
  }
}

// Direkt API servislerini kullanma örneği
export async function directApiUsage() {
  // CompanyInfo servisini direkt kullanma
  const { CompanyInfoAPI } = await import('../services/api/companyInfo')
  
  try {
    const companyInfo = await CompanyInfoAPI.getActiveSingle()
    console.log('Şirket bilgileri:', companyInfo.data)
  } catch (error) {
    console.error('Şirket bilgileri alınırken hata:', error)
  }

  // Blog servisini direkt kullanma
  const { BlogAPI } = await import('../services/api/blog')
  
  try {
    const blogPosts = await BlogAPI.getAll(1, 10, 'dermatoloji')
    console.log('Blog yazıları:', blogPosts.data)
  } catch (error) {
    console.error('Blog yazıları alınırken hata:', error)
  }

  // Menu servisini direkt kullanma
  const { MenuAPI } = await import('../services/api/menu')
  
  try {
    const menuItems = await MenuAPI.getAll()
    console.log('Menü öğeleri:', menuItems.data)
  } catch (error) {
    console.error('Menü öğeleri alınırken hata:', error)
  }
}
