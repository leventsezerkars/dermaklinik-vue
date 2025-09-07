import CompanyInfoAPI from '../../services/api/companyInfo'

export default {
  namespaced: true,
  
  state: {
    companyInfo: null,
    activeCompanyInfo: null,
    loading: false,
    error: null,
    lastFetch: null
  },

  mutations: {
    setCompanyInfo(state, companyInfo) {
      state.companyInfo = companyInfo
      state.lastFetch = new Date()
    },
    setActiveCompanyInfo(state, companyInfo) {
      state.activeCompanyInfo = companyInfo
      state.lastFetch = new Date()
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },

  actions: {
    async fetchActiveCompanyInfo({ commit, state }) {
      // Cache kontrolü - 5 dakikadan eski değilse tekrar çekme
      if (state.activeCompanyInfo && state.lastFetch) {
        const now = new Date()
        const diffInMinutes = (now - state.lastFetch) / (1000 * 60)
        if (diffInMinutes < 5) {
          return state.activeCompanyInfo
        }
      }

      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await CompanyInfoAPI.getActiveSingle()
        commit('setActiveCompanyInfo', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchCompanyInfo({ commit, state }, id) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await CompanyInfoAPI.getById(id)
        commit('setCompanyInfo', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchAllCompanyInfo({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await CompanyInfoAPI.getAll()
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchPagedCompanyInfo({ commit }, { page = 1, limit = 10, search = '' } = {}) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await CompanyInfoAPI.getPaged(page, limit, search)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async checkNameUnique({ commit }, { name, excludeId = null }) {
      try {
        const response = await CompanyInfoAPI.checkNameUnique(name, excludeId)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },

    async checkEmailUnique({ commit }, { email, excludeId = null }) {
      try {
        const response = await CompanyInfoAPI.checkEmailUnique(email, excludeId)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },

  getters: {
    activeCompanyInfo: state => state.activeCompanyInfo,
    companyInfo: state => state.companyInfo,
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    error: state => state.error,
    
    // Şirket bilgilerinden önemli alanları getiren getter'lar
    companyName: state => state.activeCompanyInfo?.name || '',
    companyAddress: state => state.activeCompanyInfo?.address || '',
    companyPhone: state => state.activeCompanyInfo?.phone || '',
    companyEmail: state => state.activeCompanyInfo?.email || '',
    companyLogo: state => state.activeCompanyInfo?.logoUrl || '',
    workingHours: state => state.activeCompanyInfo?.workingHours || '',
    
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
