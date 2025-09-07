import MenuAPI from '../../services/api/menu'

export default {
  namespaced: true,
  
  state: {
    menuItems: [],
    loading: false,
    error: null,
    lastFetch: null
  },

  mutations: {
    setMenuItems(state, menuItems) {
      state.menuItems = menuItems
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
    async fetchMenuItems({ commit, state }) {
      // Cache kontrolü - 10 dakikadan eski değilse tekrar çekme
      if (state.menuItems.length > 0 && state.lastFetch) {
        const now = new Date()
        const diffInMinutes = (now - state.lastFetch) / (1000 * 60)
        if (diffInMinutes < 10) {
          return state.menuItems
        }
      }

      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await MenuAPI.getAll()
        commit('setMenuItems', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
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
