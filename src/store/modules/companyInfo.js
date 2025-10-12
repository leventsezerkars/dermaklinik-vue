import CompanyInfoAPI from '../../services/api/companyInfo'

export default {
  namespaced: true,
  
  state: {
    activeCompanyInfo: null,
    loading: false,
    error: null,
    lastFetch: null,
    isFetching: false // Tekrarlayan istekleri engellemek için
  },

  mutations: {
    setActiveCompanyInfo(state, companyInfo) {
      state.activeCompanyInfo = companyInfo
      state.lastFetch = new Date()
      // localStorage'a kaydet
      localStorage.setItem('activeCompanyInfo_cache', JSON.stringify({
        data: companyInfo,
        timestamp: new Date().toISOString()
      }))
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setFetching(state, status) {
      state.isFetching = status
    },
    // localStorage'dan veri yükle
    loadFromCache(state) {
      try {
        const activeCache = localStorage.getItem('activeCompanyInfo_cache')
        if (activeCache) {
          const { data, timestamp } = JSON.parse(activeCache)
          const cacheTime = new Date(timestamp)
          const now = new Date()
          const diffInHours = (now - cacheTime) / (1000 * 60 * 60)
          
          // 1 saatten eski değilse cache'den yükle
          if (diffInHours < 1) {
            state.activeCompanyInfo = data
            state.lastFetch = cacheTime
          } else {
            // Eski cache'i temizle
            localStorage.removeItem('activeCompanyInfo_cache')
            console.log('CompanyInfo: Eski cache temizlendi')
          }
        }
      } catch (error) {
        console.error('CompanyInfo: Cache yüklenirken hata:', error)
        localStorage.removeItem('activeCompanyInfo_cache')
      }
    }
  },

  actions: {
    async fetchActiveCompanyInfo({ commit, state }) {
      // İlk önce localStorage'dan cache'i yükle
      if (!state.activeCompanyInfo) {
        commit('loadFromCache')
      }

      // Eğer zaten istek atılıyorsa, mevcut isteği bekle
      if (state.isFetching) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (!state.isFetching) {
              clearInterval(checkInterval)
              resolve(state.activeCompanyInfo)
            }
          }, 100)
        })
      }

      // Cache kontrolü - 1 saatten eski değilse tekrar çekme
      if (state.activeCompanyInfo && state.lastFetch) {
        const now = new Date()
        const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60)
        if (diffInHours < 1) {
          return state.activeCompanyInfo
        }
      }

      commit('setFetching', true)
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await CompanyInfoAPI.getActiveSingle()
        commit('setActiveCompanyInfo', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        console.error('CompanyInfo: Hata oluştu:', error)
        throw error
      } finally {
        commit('setLoading', false)
        commit('setFetching', false)
      }
    },

  },

  getters: {
    activeCompanyInfo: state => state.activeCompanyInfo,
    isLoading: state => state.loading,
    isFetching: state => state.isFetching,
    hasError: state => state.error !== null,
    error: state => state.error,
    
    // Şirket bilgilerinden önemli alanları getiren getter'lar
    companyName: state => state.activeCompanyInfo?.name || '',
    companyAddress: state => state.activeCompanyInfo?.address || '',
    companyPhone: state => state.activeCompanyInfo?.phone || '',
    companyEmail: state => state.activeCompanyInfo?.email || '',
    companyLogo: state => state.activeCompanyInfo?.logoUrl || '',
    workingHours: state => state.activeCompanyInfo?.workingHours || '',
    companyDescription: state => state.activeCompanyInfo?.metaDescription || '',
    
    // Sosyal medya bilgileri
    socialMedia: state => ({
      facebook: state.activeCompanyInfo?.facebook || '',
      twitter: state.activeCompanyInfo?.twitter || '',
      instagram: state.activeCompanyInfo?.instagram || '',
      linkedIn: state.activeCompanyInfo?.linkedIn || ''
    }),
    
    // SEO bilgileri
    seoInfo: state => ({
      metaTitle: state.activeCompanyInfo?.metaTitle || '',
      metaDescription: state.activeCompanyInfo?.metaDescription || '',
      metaKeywords: state.activeCompanyInfo?.metaKeywords || ''
    }),
    
    // Google Maps URL
    googleMapsUrl: state => state.activeCompanyInfo?.googleMapsUrl || '',
    
    // Google Analytics kodu
    googleAnalyticsCode: state => state.activeCompanyInfo?.googleAnalyticsCode || ''
  }
}
