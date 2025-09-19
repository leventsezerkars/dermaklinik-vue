import apiClient from '../api.js'

export const BlogAPI = {
  async getAll(page = 1, limit = 10, search = '', languageCode = 'tr') {
    try {
      const response = await apiClient.get(`/Blog?Page=${page}&Take=${limit}&Search=${search}&LanguageCode=${languageCode}`)
      return response
    } catch (error) {
      console.error('Blog API hatası:', error)
      throw new Error('Blog yazıları yüklenirken bir hata oluştu')
    }
  },

  async getById(id, languageCode = 'tr') {
    try {
      const response = await apiClient.get(`/Blog/${id}?languageId=${languageCode}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı yüklenirken bir hata oluştu')
    }
  },

  async getBySlug(slug, languageCode = 'tr') {
    try {
      // Slug API'sini kullan
      const response = await apiClient.get(`/Blog/slug/${slug}?languageId=${languageCode}`)
      return response
    } catch (error) {
      // Eğer slug API'si çalışmazsa fallback olarak eski yöntemi kullan
      try {
        const response = await apiClient.get(`/Blog?LanguageCode=${languageCode}`)
        const posts = response.data.data || response.data
        
        const post = posts.find(p => {
          if (!p.translations || !Array.isArray(p.translations)) return false
          return p.translations.some(t => t.slug === slug)
        })
        
        if (!post) {
          throw new Error('Blog yazısı bulunamadı')
        }
        
        return { data: post }
      } catch (fallbackError) {
        throw new Error('Blog yazısı yüklenirken bir hata oluştu')
      }
    }
  },

  async getRelated(slug, limit = 3) {
    try {
      const response = await apiClient.get(`/blog/${slug}/related?limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error('İlgili yazılar yüklenirken bir hata oluştu')
    }
  },

  async incrementView(id) {
    try {
      const response = await apiClient.post(`/Blog/${id}/increment-view`)
      return response.data
    } catch (error) {
      throw new Error('Görüntülenme sayısı artırılırken bir hata oluştu')
    }
  }
}

export const BlogCategoryAPI = {
  async getAll(languageCode = 'tr') {
    try {
      const response = await apiClient.get(`/BlogCategory?LanguageCode=${languageCode}`)
      return response
    } catch (error) {
      throw new Error('Blog kategorileri yüklenirken bir hata oluştu')
    }
  },

  async getById(id) {
    try {
      const response = await apiClient.get(`/BlogCategory/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi yüklenirken bir hata oluştu')
    }
  }
}