import { GalleryGroupAPI, GalleryImageAPI, GalleryImageGroupMapAPI } from '../../services/api/gallery'

export default {
  namespaced: true,
  
  state: {
    groups: [],
    images: [],
    groupImages: {},
    loading: false,
    error: null,
    lastFetch: null
  },

  mutations: {
    setGroups(state, groups) {
      state.groups = groups
      state.lastFetch = new Date()
    },
    setImages(state, images) {
      state.images = images
      state.lastFetch = new Date()
    },
    setGroupImages(state, { groupId, images }) {
      state.groupImages[groupId] = images
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
    async fetchGroups({ commit, state }) {
      // Cache kontrolü - 10 dakikadan eski değilse tekrar çekme
      if (state.groups.length > 0 && state.lastFetch) {
        const now = new Date()
        const diffInMinutes = (now - state.lastFetch) / (1000 * 60)
        if (diffInMinutes < 10) {
          return state.groups
        }
      }

      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryGroupAPI.getAll()
        commit('setGroups', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchImages({ commit, state }) {
      // Cache kontrolü - 5 dakikadan eski değilse tekrar çekme
      if (state.images.length > 0 && state.lastFetch) {
        const now = new Date()
        const diffInMinutes = (now - state.lastFetch) / (1000 * 60)
        if (diffInMinutes < 5) {
          return state.images
        }
      }

      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryImageAPI.getAll()
        commit('setImages', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchGroupImages({ commit }, groupId) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryGroupAPI.getImages(groupId)
        commit('setGroupImages', { groupId, images: response.data })
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchGroupById({ commit }, id) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryGroupAPI.getById(id)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchImageById({ commit }, id) {
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryImageAPI.getById(id)
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
    groups: state => state.groups,
    images: state => state.images,
    groupImages: state => state.groupImages,
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    error: state => state.error,
    
    // Aktif galeri gruplarını getirir
    activeGroups: state => {
      return state.groups.filter(group => group.isActive && !group.isDeleted)
    },
    
    // Aktif galeri resimlerini getirir
    activeImages: state => {
      return state.images.filter(image => image.isActive && !image.isDeleted)
    },
    
    // Belirli bir grubun resimlerini getirir
    getGroupImages: state => groupId => {
      return state.groupImages[groupId] || []
    },
    
    // Grup ID'sine göre grubu bulur
    getGroupById: state => id => {
      return state.groups.find(group => group.id === id)
    },
    
    // Resim ID'sine göre resmi bulur
    getImageById: state => id => {
      return state.images.find(image => image.id === id)
    },
    
    // Tüm grupları resimleriyle birlikte getirir
    groupsWithImages: state => {
      return state.groups.map(group => ({
        ...group,
        images: state.groupImages[group.id] || []
      }))
    },
    
    // Galeri gruplarını sıralı şekilde getirir
    sortedGroups: state => {
      return state.groups
        .filter(group => group.isActive && !group.isDeleted)
        .sort((a, b) => a.sortOrder - b.sortOrder)
    }
  }
}
