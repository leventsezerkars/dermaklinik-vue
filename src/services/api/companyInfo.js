import apiClient from '../api'

export const CompanyInfoAPI = {
  /**
   * Tüm şirket bilgilerini getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/CompanyInfo')
      return response.data
    } catch (error) {
      throw new Error('Şirket bilgileri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Sayfalanmış şirket bilgilerini getirir
   */
  async getPaged(page = 1, limit = 10, search = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })
      
      if (search) {
        params.append('search', search)
      }

      const response = await apiClient.get(`/CompanyInfo/paged?${params}`)
      return response.data
    } catch (error) {
      throw new Error('Şirket bilgileri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Aktif şirket bilgilerini getirir
   */
  async getActive() {
    try {
      const response = await apiClient.get('/CompanyInfo/active')
      return response.data
    } catch (error) {
      throw new Error('Aktif şirket bilgileri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Tek aktif şirket bilgisini getirir
   */
  async getActiveSingle() {
    try {
      const response = await apiClient.get('/CompanyInfo/active/single')
      return response.data
    } catch (error) {
      throw new Error('Aktif şirket bilgisi yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre şirket bilgisini getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/CompanyInfo/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Şirket bilgisi yüklenirken bir hata oluştu')
    }
  },

  /**
   * Şirket adının benzersiz olup olmadığını kontrol eder
   */
  async checkNameUnique(name, excludeId = null) {
    try {
      const params = new URLSearchParams({ name })
      if (excludeId) {
        params.append('excludeId', excludeId)
      }

      const response = await apiClient.get(`/CompanyInfo/check-name-unique?${params}`)
      return response.data
    } catch (error) {
      throw new Error('Şirket adı kontrol edilirken bir hata oluştu')
    }
  },

  /**
   * E-posta adresinin benzersiz olup olmadığını kontrol eder
   */
  async checkEmailUnique(email, excludeId = null) {
    try {
      const params = new URLSearchParams({ email })
      if (excludeId) {
        params.append('excludeId', excludeId)
      }

      const response = await apiClient.get(`/CompanyInfo/check-email-unique?${params}`)
      return response.data
    } catch (error) {
      throw new Error('E-posta adresi kontrol edilirken bir hata oluştu')
    }
  },

  /**
   * Şirket bilgisinin var olup olmadığını kontrol eder
   */
  async exists(id) {
    try {
      const response = await apiClient.get(`/CompanyInfo/${id}/exists`)
      return response.data
    } catch (error) {
      throw new Error('Şirket bilgisi kontrol edilirken bir hata oluştu')
    }
  }
}

export default CompanyInfoAPI
