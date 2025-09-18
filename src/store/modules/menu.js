import MenuAPI from '../../services/api/menu'

export default {
  namespaced: true,
  
  state: {
    menuItems: [], // Ham menu verisi (tüm diller dahil)
    loading: false,
    error: null,
    lastFetch: null,
    isFetching: false, // Tekrarlayan istekleri engellemek için
    currentLanguage: 'tr' // Mevcut dil
  },

  mutations: {
    setMenuItems(state, { menuItems, language }) {
      state.menuItems = menuItems
      state.currentLanguage = language
      state.lastFetch = new Date()
      
      // localStorage'a tek cache olarak kaydet
      localStorage.setItem('menuItems_cache', JSON.stringify({
        data: menuItems,
        language: language,
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
    loadFromCache(state, language = 'tr') {
      try {
        const menuCache = localStorage.getItem('menuItems_cache')
        if (menuCache) {
          const { data, language: cachedLanguage, timestamp } = JSON.parse(menuCache)
          const cacheTime = new Date(timestamp)
          const now = new Date()
          const diffInHours = (now - cacheTime) / (1000 * 60 * 60)
          
          // 1 saatten eski değilse ve veri geçerliyse cache'i yükle
          if (diffInHours < 1 && data && Array.isArray(data)) {
            state.menuItems = data
            state.currentLanguage = language
            state.lastFetch = cacheTime
          } else {
            // Eski cache'i temizle
            localStorage.removeItem('menuItems_cache')
          }
        }
      } catch (error) {
        localStorage.removeItem('menuItems_cache')
      }
    },
    
    // Dil değiştir
    setLanguage(state, language) {
      state.currentLanguage = language
    }
  },

  actions: {
    async fetchMenuItems({ commit, state }, languageCode = null) {
      const currentLanguage = languageCode || state.currentLanguage || 'tr'
      
      // İlk önce localStorage'dan cache'i yükle
      if (state.menuItems.length === 0) {
        commit('loadFromCache', currentLanguage)
      }

      // Eğer zaten istek atılıyorsa, mevcut isteği bekle
      if (state.isFetching) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (!state.isFetching) {
              clearInterval(checkInterval)
              resolve(state.menuItems)
            }
          }, 100)
        })
      }

      // Cache kontrolü - 1 saatten eski değilse tekrar çekme
      if (state.menuItems.length > 0 && state.lastFetch) {
        const now = new Date()
        const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60)
        if (diffInHours < 1) {
          return state.menuItems
        }
      }

      commit('setFetching', true)
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await MenuAPI.getAll(currentLanguage)
        commit('setMenuItems', { menuItems: response.data, language: currentLanguage })
        return response.data
      } catch (error) {
        commit('setError', error.message)
        console.error('Menu: Hata oluştu:', error)
        throw error
      } finally {
        commit('setLoading', false)
        commit('setFetching', false)
      }
    },

    async fetchMenuItemById({ commit, state }, { id, languageCode = null }) {
      const currentLanguage = languageCode || state.currentLanguage || 'tr'
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await MenuAPI.getById(id, currentLanguage)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    // Dil değiştir ve menüyü yenile
    async changeLanguage({ commit, state, dispatch }, languageCode) {
      
      commit('setLanguage', languageCode)
      
      // i18n locale'ini güncelle
      if (window.i18n && window.i18n.global) {
        window.i18n.global.locale.value = languageCode
      }
      
      // localStorage'a kaydet
      localStorage.setItem('locale', languageCode)
      
      // Eğer menu verisi varsa, sadece dil değiştir (API'ye istek atma)
      if (state.menuItems.length > 0) {
        return state.menuItems
      }
      
      // Menu verisi yoksa API'den çek
      await dispatch('fetchMenuItems', languageCode)
    }
  },

  getters: {
    menuItems: state => state.menuItems,
    isLoading: state => state.loading,
    isFetching: state => state.isFetching,
    hasError: state => state.error !== null,
    error: state => state.error,
    currentLanguage: state => state.currentLanguage,
    
    // Ana menü öğelerini getirir (parentId null olanlar)
    mainMenuItems: state => {
      return state.menuItems
        .filter(item => !item.parentId && item.isActive && !item.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(item => ({
          ...item,
          // Mevcut dildeki çeviriyi bul
          title: item.translations?.find(t => t.language?.code === state.currentLanguage)?.title || item.title,
          content: item.translations?.find(t => t.language?.code === state.currentLanguage)?.content || item.content,
          slug: item.translations?.find(t => t.language?.code === state.currentLanguage)?.slug || item.slug
        }))
    },
    
    // Alt menü öğelerini getirir
    subMenuItems: state => parentId => {
      return state.menuItems
        .filter(item => item.parentId === parentId && item.isActive && !item.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(item => ({
          ...item,
          // Mevcut dildeki çeviriyi bul
          title: item.translations?.find(t => t.language?.code === state.currentLanguage)?.title || item.title,
          content: item.translations?.find(t => t.language?.code === state.currentLanguage)?.content || item.content,
          slug: item.translations?.find(t => t.language?.code === state.currentLanguage)?.slug || item.slug
        }))
    },
    
    // Menü öğesini slug'a göre bulur
    getMenuItemBySlug: state => slug => {
      return state.menuItems.find(item => item.slug === slug)
    },
    
    // Menü öğesini ID'ye göre bulur
    getMenuItemById: state => id => {
      return state.menuItems.find(item => item.id === id)
    },
    
    // Hiyerarşik menü yapısını oluşturur
    hierarchicalMenu: state => {
      const mainItems = state.menuItems
        .filter(item => !item.parentId && item.isActive && !item.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
      
      return mainItems.map(item => {
        const children = state.menuItems
          .filter(child => child.parentId === item.id && child.isActive && !child.isDeleted)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(child => ({
            ...child,
            // Mevcut dildeki çeviriyi bul
            title: child.translations?.find(t => t.language?.code === state.currentLanguage)?.title || child.title,
            content: child.translations?.find(t => t.language?.code === state.currentLanguage)?.content || child.content,
            slug: child.translations?.find(t => t.language?.code === state.currentLanguage)?.slug || child.slug
          }))
        
        return {
          ...item,
          // Mevcut dildeki çeviriyi bul
          title: item.translations?.find(t => t.language?.code === state.currentLanguage)?.title || item.title,
          content: item.translations?.find(t => t.language?.code === state.currentLanguage)?.content || item.content,
          slug: item.translations?.find(t => t.language?.code === state.currentLanguage)?.slug || item.slug,
          children: children.length > 0 ? children : null
        }
      })
    },
    
    // Aktif menü öğelerini getirir
    activeMenuItems: state => {
      return state.menuItems.filter(item => item.isActive && !item.isDeleted)
    },
    
    // Silinebilir menü öğelerini getirir
    deletableMenuItems: state => {
      return state.menuItems.filter(item => item.isDeletable)
    }
  }
}
