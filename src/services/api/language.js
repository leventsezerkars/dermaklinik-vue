import apiClient from '../api'

export const LanguageAPI = {
  /**
   * Tüm dilleri getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/Language')
      return response.data
    } catch (error) {
      throw new Error('Diller yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre dili getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/Language/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Dil yüklenirken bir hata oluştu')
    }
  },

  /**
   * Dil oluşturur
   */
  async create(languageData) {
    try {
      const response = await apiClient.post('/Language', languageData)
      return response.data
    } catch (error) {
      throw new Error('Dil oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Dili günceller
   */
  async update(id, languageData) {
    try {
      const response = await apiClient.put(`/Language/${id}`, languageData)
      return response.data
    } catch (error) {
      throw new Error('Dil güncellenirken bir hata oluştu')
    }
  },

  /**
   * Dili siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/Language/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Dil silinirken bir hata oluştu')
    }
  }
}

export default LanguageAPI
