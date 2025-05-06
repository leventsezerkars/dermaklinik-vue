import axios from 'axios'
import { API_URL } from '@/config'

export const BlogAPI = {
  async getAll(page = 1, limit = 10) {
    try {
      const response = await axios.get(`${API_URL}/blog`, {
        params: { page, limit }
      })
      return response.data
    } catch (error) {
      console.error('Blog yazıları getirilirken hata oluştu:', error)
      throw new Error('Blog yazıları yüklenirken bir hata oluştu.')
    }
  },

  async getBySlug(slug) {
    try {
      const response = await axios.get(`${API_URL}/blog/${slug}`)
      return response.data
    } catch (error) {
      console.error('Blog yazısı getirilirken hata oluştu:', error)
      throw new Error('Blog yazısı yüklenirken bir hata oluştu.')
    }
  },

  async getRelated(slug, limit = 3) {
    try {
      const response = await axios.get(`${API_URL}/blog/${slug}/related`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('İlgili blog yazıları getirilirken hata oluştu:', error)
      throw new Error('İlgili blog yazıları yüklenirken bir hata oluştu.')
    }
  }
} 