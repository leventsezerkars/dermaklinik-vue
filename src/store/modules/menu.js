import MenuAPI from '../../services/api/menu'

export default {
  namespaced: true,
  
  state: {
    menuItems: [],
    loading: false,
    error: null,
    lastFetch: null,
    isFetching: false // Tekrarlayan istekleri engellemek için
  },

  mutations: {
    setMenuItems(state, menuItems) {
      state.menuItems = menuItems
      state.lastFetch = new Date()
      // localStorage'a kaydet
      localStorage.setItem('menuItems_cache', JSON.stringify({
        data: menuItems,
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
        const menuCache = localStorage.getItem('menuItems_cache')
        if (menuCache) {
          const { data, timestamp } = JSON.parse(menuCache)
          const cacheTime = new Date(timestamp)
          const now = new Date()
          const diffInHours = (now - cacheTime) / (1000 * 60 * 60)
          
          // 1 saatten eski değilse cache'den yükle
          if (diffInHours < 1) {
            state.menuItems = data
            state.lastFetch = cacheTime
            console.log('Menu: localStorage cache\'den yüklendi')
          } else {
            // Eski cache'i temizle
            localStorage.removeItem('menuItems_cache')
            console.log('Menu: Eski cache temizlendi')
          }
        }
      } catch (error) {
        console.error('Menu: Cache yüklenirken hata:', error)
        localStorage.removeItem('menuItems_cache')
      }
    }
  },

  actions: {
    async fetchMenuItems({ commit, state }) {
      // İlk önce localStorage'dan cache'i yükle
      if (state.menuItems.length === 0) {
        commit('loadFromCache')
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
          console.log('Menu: Cache\'den döndürülüyor (1 saat geçmedi)')
          return state.menuItems
        }
      }

      commit('setFetching', true)
      commit('setLoading', true)
      commit('clearError')
      
      try {
        console.log('Menu: API\'den yeni veri çekiliyor...')
        const response = await MenuAPI.getAll()
        commit('setMenuItems', response.data)
        console.log('Menu: Veri başarıyla yüklendi ve localStorage\'a kaydedildi')
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

    async fetchMenuItemById({ commit }, id) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await MenuAPI.getById(id)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    }
  },

  getters: {
    menuItems: state => state.menuItems,
    isLoading: state => state.loading,
    isFetching: state => state.isFetching,
    hasError: state => state.error !== null,
    error: state => state.error,
    
    // Ana menü öğelerini getirir (parentId null olanlar)
    mainMenuItems: state => {
      return state.menuItems
        .filter(item => !item.parentId && item.isActive && !item.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
    },
    
    // Alt menü öğelerini getirir
    subMenuItems: state => parentId => {
      return state.menuItems
        .filter(item => item.parentId === parentId && item.isActive && !item.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
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
        
        return {
          ...item,
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
