import { GalleryGroupAPI, GalleryImageAPI, GalleryImageGroupMapAPI } from '../../services/api/gallery'

// Sabit galeri grubu ID'si
const GALLERY_GROUP_ID = '9ed81090-088e-44c1-e6a2-08ddf1fc97e5'
// Hero grubu ID'si
const HERO_GROUP_ID = '2E04E209-BA5F-427F-A2B5-08DDF5EB9022'

// Resim URL'sini işle
const getProcessedImageUrl = (imageUrl) => {
  if (!imageUrl) return ''
  
  // Eğer URL zaten tam URL ise direkt döndür
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  // Resimler için base URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7078'
  const fullUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
  return fullUrl
}

export default {
  namespaced: true,
  
  state: {
    groups: [],
    images: [],
    groupImages: {},
    loading: false,
    error: null,
    lastFetch: null,
    galleryGroupId: GALLERY_GROUP_ID,
    heroGroupId: HERO_GROUP_ID,
    isFetchingGallery: false, // Galeri için tekrarlayan istekleri engellemek için
    isFetchingHero: false // Hero için tekrarlayan istekleri engellemek için
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
    setGalleryImages(state, images) {
      state.groupImages[state.galleryGroupId] = images
      state.lastFetch = new Date()
      // localStorage'a kaydet
      localStorage.setItem('galleryImages_cache', JSON.stringify({
        data: images,
        timestamp: new Date().toISOString()
      }))
    },
    setHeroImages(state, images) {
      state.groupImages[state.heroGroupId] = images
      state.lastFetch = new Date()
      // localStorage'a kaydet
      localStorage.setItem('heroImages_cache', JSON.stringify({
        data: images,
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
    setFetchingGallery(state, status) {
      state.isFetchingGallery = status
    },
    setFetchingHero(state, status) {
      state.isFetchingHero = status
    },
    // localStorage'dan veri yükle
    loadFromCache(state) {
      try {
        const galleryCache = localStorage.getItem('galleryImages_cache')
        if (galleryCache) {
          const { data, timestamp } = JSON.parse(galleryCache)
          const cacheTime = new Date(timestamp)
          const now = new Date()
          const diffInHours = (now - cacheTime) / (1000 * 60 * 60)
          
          // 1 saatten eski değilse cache'den yükle
          if (diffInHours < 1) {
            state.groupImages[state.galleryGroupId] = data
            state.lastFetch = cacheTime
          } else {
            // Eski cache'i temizle
            localStorage.removeItem('galleryImages_cache')
          }
        }
      } catch (error) {
        console.error('Gallery: Cache yüklenirken hata:', error)
        localStorage.removeItem('galleryImages_cache')
      }
    },
    // Hero resimlerini localStorage'dan yükle
    loadHeroFromCache(state) {
      try {
        const heroCache = localStorage.getItem('heroImages_cache')
        if (heroCache) {
          const { data, timestamp } = JSON.parse(heroCache)
          const cacheTime = new Date(timestamp)
          const now = new Date()
          const diffInHours = (now - cacheTime) / (1000 * 60 * 60)
          
          // 1 saatten eski değilse cache'den yükle
          if (diffInHours < 1) {
            state.groupImages[state.heroGroupId] = data
            state.lastFetch = cacheTime
          } else {
            // Eski cache'i temizle
            localStorage.removeItem('heroImages_cache')
            console.log('Hero: Eski cache temizlendi')
          }
        }
      } catch (error) {
        console.error('Hero: Cache yüklenirken hata:', error)
        localStorage.removeItem('heroImages_cache')
      }
    }
  },

  actions: {
    async fetchGroups({ commit, state }) {
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

    // Galeri resimlerini sabit grup ID ile çek
    async fetchGalleryImages({ commit, state }) {
      // İlk önce localStorage'dan cache'i yükle
      if (!state.groupImages[state.galleryGroupId]) {
        commit('loadFromCache')
      } 

      // Eğer zaten istek atılıyorsa, mevcut isteği bekle
      if (state.isFetchingGallery) {
        console.log('Gallery: Zaten istek atılıyor, bekleniyor...')
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (!state.isFetchingGallery) {
              clearInterval(checkInterval)
              resolve(state.groupImages[state.galleryGroupId] || [])
            }
          }, 100)
        })
      }

      // Cache kontrolü - 1 saatten eski değilse tekrar çekme
      if (state.groupImages[state.galleryGroupId] && state.lastFetch) {
        const now = new Date()
        const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60)
        if (diffInHours < 1) {
          return state.groupImages[state.galleryGroupId]
        }
      }

      commit('setFetchingGallery', true)
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryGroupAPI.getImages(state.galleryGroupId)
        
        commit('setGalleryImages', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
        commit('setFetchingGallery', false)
      }
    },

    // Hero resimlerini sabit grup ID ile çek
    async fetchHeroImages({ commit, state }) {
      // İlk önce localStorage'dan cache'i yükle
      if (!state.groupImages[state.heroGroupId]) {
        commit('loadHeroFromCache')
      }

      // Eğer zaten istek atılıyorsa, mevcut isteği bekle
      if (state.isFetchingHero) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (!state.isFetchingHero) {
              clearInterval(checkInterval)
              resolve(state.groupImages[state.heroGroupId] || [])
            }
          }, 100)
        })
      }

      // Cache kontrolü - 1 saatten eski değilse tekrar çekme
      if (state.groupImages[state.heroGroupId] && state.lastFetch) {
        const now = new Date()
        const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60)
        if (diffInHours < 1) {
          return state.groupImages[state.heroGroupId]
        }
      }

      commit('setFetchingHero', true)
      commit('setLoading', true)
      commit('clearError')
      
      try {
        const response = await GalleryGroupAPI.getImages(state.heroGroupId)
        commit('setHeroImages', response.data)
        return response.data
      } catch (error) {
        commit('setError', error.message)
        console.error('Hero: Hata oluştu:', error)
        throw error
      } finally {
        commit('setLoading', false)
        commit('setFetchingHero', false)
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
    isFetchingGallery: state => state.isFetchingGallery,
    isFetchingHero: state => state.isFetchingHero,
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
    
    // Galeri resimlerini getirir (sabit grup ID ile)
    galleryImages: state => {
      const images = state.groupImages[state.galleryGroupId] || []
      return images
        .filter(img => img.isActive && !img.isDeleted)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(img => ({
          ...img,
          imageUrl: getProcessedImageUrl(img.imageUrl)
        }))
    },
    
    // Hero resimlerini getirir (sabit grup ID ile)
    heroImages: state => {
      const images = state.groupImages[state.heroGroupId] || []
      return images
        .filter(img => img.isActive && !img.isDeleted)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(img => ({
          ...img,
          imageUrl: getProcessedImageUrl(img.imageUrl)
        }))
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
