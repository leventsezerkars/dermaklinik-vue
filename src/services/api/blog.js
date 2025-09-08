import apiClient from '../api.js'

export const BlogAPI = {
  async getAll(page = 1, limit = 10, search = '') {
    try {
      const response = await apiClient.get(`/blog?page=${page}&limit=${limit}&search=${search}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazıları yüklenirken bir hata oluştu')
    }
  },

  async getById(id) {
    try {
      const response = await apiClient.get(`/blog/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı yüklenirken bir hata oluştu')
    }
  },

  async getBySlug(slug) {
    try {
      const response = await apiClient.get(`/blog/slug/${slug}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı yüklenirken bir hata oluştu')
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
      const response = await apiClient.post(`/blog/${id}/view`)
      return response.data
    } catch (error) {
      throw new Error('Görüntülenme sayısı artırılırken bir hata oluştu')
    }
  }
}

export const BlogCategoryAPI = {
  async getAll() {
    try {
      const response = await apiClient.get('/blog/categories')
      return response.data
    } catch (error) {
      throw new Error('Blog kategorileri yüklenirken bir hata oluştu')
    }
  },

  async getById(id) {
    try {
      const response = await apiClient.get(`/blog/categories/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi yüklenirken bir hata oluştu')
    }
  }
}