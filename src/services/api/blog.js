import apiClient from '../api'

export const BlogAPI = {
  /**
   * Tüm blog yazılarını getirir
   */
  async getAll(page = 1, limit = 10, search = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })
      
      if (search) {
        params.append('search', search)
      }

      const response = await apiClient.get(`/Blog?${params}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazıları yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre blog yazısını getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/Blog/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı yüklenirken bir hata oluştu')
    }
  },

  /**
   * Blog yazısının görüntülenme sayısını artırır
   */
  async incrementView(id) {
    try {
      const response = await apiClient.post(`/Blog/${id}/increment-view`)
      return response.data
    } catch (error) {
      throw new Error('Görüntülenme sayısı artırılırken bir hata oluştu')
    }
  },

  /**
   * Blog yazısı oluşturur
   */
  async create(blogData) {
    try {
      const response = await apiClient.post('/Blog', blogData)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Blog yazısını günceller
   */
  async update(id, blogData) {
    try {
      const response = await apiClient.put(`/Blog/${id}`, blogData)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı güncellenirken bir hata oluştu')
    }
  },

  /**
   * Blog yazısını siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/Blog/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazısı silinirken bir hata oluştu')
    }
  }
}

export const BlogCategoryAPI = {
  /**
   * Tüm blog kategorilerini getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/BlogCategory')
      return response.data
    } catch (error) {
      throw new Error('Blog kategorileri yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre blog kategorisini getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/BlogCategory/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi yüklenirken bir hata oluştu')
    }
  },

  /**
   * Blog kategorisi oluşturur
   */
  async create(categoryData) {
    try {
      const response = await apiClient.post('/BlogCategory', categoryData)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Blog kategorisini günceller
   */
  async update(id, categoryData) {
    try {
      const response = await apiClient.put(`/BlogCategory/${id}`, categoryData)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi güncellenirken bir hata oluştu')
    }
  },

  /**
   * Blog kategorisini siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/BlogCategory/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Blog kategorisi silinirken bir hata oluştu')
    }
  }
}

export default BlogAPI