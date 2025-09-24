import apiClient from '../api'

export const GalleryGroupAPI = {
  /**
   * Tüm galeri gruplarını getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/GalleryGroup')
      return response.data
    } catch (error) {
      throw new Error('Galeri grupları yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre galeri grubunu getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/GalleryGroup/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Galeri grubu yüklenirken bir hata oluştu')
    }
  },

  /**
   * Galeri grubunun resimlerini getirir
   */
  async getImages(id) {
    try {
      const response = await apiClient.get(`/GalleryGroup/${id}/images?take=999`)
      return response.data
    } catch (error) {
      throw new Error('Galeri grubu resimleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Galeri grubu oluşturur
   */
  async create(groupData) {
    try {
      const response = await apiClient.post('/GalleryGroup', groupData)
      return response.data
    } catch (error) {
      throw new Error('Galeri grubu oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Galeri grubunu günceller
   */
  async update(id, groupData) {
    try {
      const response = await apiClient.put(`/GalleryGroup/${id}`, groupData)
      return response.data
    } catch (error) {
      throw new Error('Galeri grubu güncellenirken bir hata oluştu')
    }
  },

  /**
   * Galeri grubunu siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/GalleryGroup/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Galeri grubu silinirken bir hata oluştu')
    }
  }
}

export const GalleryImageAPI = {
  /**
   * Tüm galeri resimlerini getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/GalleryImage')
      return response.data
    } catch (error) {
      throw new Error('Galeri resimleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre galeri resmini getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/GalleryImage/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Galeri resmi yüklenirken bir hata oluştu')
    }
  },

  /**
   * Galeri resmi oluşturur
   */
  async create(imageData) {
    try {
      const response = await apiClient.post('/GalleryImage', imageData)
      return response.data
    } catch (error) {
      throw new Error('Galeri resmi oluşturulurken bir hata oluştu')
    }
  },

  /**
   * Galeri resmini günceller
   */
  async update(id, imageData) {
    try {
      const response = await apiClient.put(`/GalleryImage/${id}`, imageData)
      return response.data
    } catch (error) {
      throw new Error('Galeri resmi güncellenirken bir hata oluştu')
    }
  },

  /**
   * Galeri resmini siler
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/GalleryImage/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Galeri resmi silinirken bir hata oluştu')
    }
  },

  /**
   * Resmi gruba ekler
   */
  async addToGroup(imageId, groupId, sortOrder = 0) {
    try {
      const response = await apiClient.post('/GalleryImage/add-to-group', {
        imageId,
        groupId,
        sortOrder
      })
      return response.data
    } catch (error) {
      throw new Error('Resim gruba eklenirken bir hata oluştu')
    }
  },

  /**
   * Resmi gruptan çıkarır
   */
  async removeFromGroup(imageId, groupId) {
    try {
      const response = await apiClient.post('/GalleryImage/remove-from-group', {
        imageId,
        groupId
      })
      return response.data
    } catch (error) {
      throw new Error('Resim gruptan çıkarılırken bir hata oluştu')
    }
  },

  /**
   * Resim sıralamasını günceller
   */
  async updateOrder(imageId, sortOrder) {
    try {
      const response = await apiClient.post('/GalleryImage/update-order', {
        imageId,
        sortOrder
      })
      return response.data
    } catch (error) {
      throw new Error('Resim sıralaması güncellenirken bir hata oluştu')
    }
  }
}

export const GalleryImageGroupMapAPI = {
  /**
   * Tüm resim-grup eşleşmelerini getirir
   */
  async getAll() {
    try {
      const response = await apiClient.get('/GalleryImageGroupMap')
      return response.data
    } catch (error) {
      throw new Error('Resim-grup eşleşmeleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * ID'ye göre resim-grup eşleşmesini getirir
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/GalleryImageGroupMap/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Resim-grup eşleşmesi yüklenirken bir hata oluştu')
    }
  },

  /**
   * Resim ID'sine göre eşleşmeleri getirir
   */
  async getByImageId(imageId) {
    try {
      const response = await apiClient.get(`/GalleryImageGroupMap/by-image/${imageId}`)
      return response.data
    } catch (error) {
      throw new Error('Resim eşleşmeleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Grup ID'sine göre eşleşmeleri getirir
   */
  async getByGroupId(groupId) {
    try {
      const response = await apiClient.get(`/GalleryImageGroupMap/by-group/${groupId}`)
      return response.data
    } catch (error) {
      throw new Error('Grup eşleşmeleri yüklenirken bir hata oluştu')
    }
  },

  /**
   * Sıralama günceller
   */
  async updateSortOrder(mappings) {
    try {
      const response = await apiClient.post('/GalleryImageGroupMap/update-sort-order', mappings)
      return response.data
    } catch (error) {
      throw new Error('Sıralama güncellenirken bir hata oluştu')
    }
  }
}

export default {
  GalleryGroupAPI,
  GalleryImageAPI,
  GalleryImageGroupMapAPI
}
