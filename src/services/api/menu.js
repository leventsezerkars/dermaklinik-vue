import apiClient from '../api'

export const MenuAPI = {
  /**
   * Tüm menü öğelerini getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/Menu')
      return response.data
    } catch (error) {
      throw new Error('Menü öğeleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre menü öğesini getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/Menu/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Menü öğesi yüklenirken bir hata oluştu')
    }
  },

  /**
   * Menü öğesi oluşturur
   */
  async create(menuData) {
    try {
      const response = await apiClient.post('/Menu', menuData)
      return response.data
    } catch (error) {
      throw new Error('Menü öğesi oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Menü öğesini günceller
   */
  async update(id, menuData) {
    try {
      const response = await apiClient.put(`/Menu/${id}`, menuData)
      return response.data
    } catch (error) {
      throw new Error('Menü öğesi güncellenirken bir hata oluştu')
    }
  },

  /**
   * Menü öğesini siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/Menu/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Menü öğesi silinirken bir hata oluştu')
    }
  }
}

export default MenuAPI
