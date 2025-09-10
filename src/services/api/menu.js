import apiClient from '../api'

export const MenuAPI = {
  /**
   * Tüm menü öğelerini getirir
   * @param {string} languageCode - Dil kodu (tr, en)
   */
  async getAll(languageCode = 'tr') {
    try {
      const response = await apiClient.get('/Menu', {
        params: {
          LanguageCode: languageCode,
          take : 10000
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Menü öğeleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre menü öğesini getirir
   * @param {string} id - Menü öğesi ID'si
   * @param {string} languageCode - Dil kodu (tr, en)
   */
  async getById(id, languageCode = 'tr') {
    try {
      const response = await apiClient.get(`/Menu/${id}`, {
        params: {
          LanguageCode: languageCode
        }
      })
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
