import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || 'your-api-key-here'
  },
  timeout: 10000
})

// İstek interceptor'ı
apiClient.interceptors.request.use(
  config => {
    // İstek öncesi yapılacak işlemler (örn: token ekleme)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Yanıt interceptor'ı
apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Hata durumunda yapılacak işlemler
    if (error.response) {
      // Sunucu yanıtı ile dönen hata
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Yanıt alınamayan istek
      console.error('Network Error:', error.request)
    } else {
      // İstek yapılırken oluşan hata
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export const ServicesAPI = {
  async getAll() {
    try {
      const response = await apiClient.get('/services')
      return response.data
    } catch (error) {
      throw new Error('Hizmetler yüklenirken bir hata oluştu')
    }
  },

  async getBySlug(slug) {
    try {
      const response = await apiClient.get(`/services/${slug}`)
      return response.data
    } catch (error) {
      throw new Error('Hizmet detayları yüklenirken bir hata oluştu')
    }
  }
}

export const BlogAPI = {
  async getAll(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(`/blog?page=${page}&limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error('Blog yazıları yüklenirken bir hata oluştu')
    }
  },

  async getBySlug(slug) {
    try {
      const response = await apiClient.get(`/blog/${slug}`)
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
  }
}

export const ContactAPI = {
  async send(formData) {
    try {
      const response = await apiClient.post('/contact', formData)
      return response.data
    } catch (error) {
      throw new Error('İletişim formu gönderilirken bir hata oluştu')
    }
  }
}

export const AppointmentAPI = {
  async create(appointmentData) {
    try {
      const response = await apiClient.post('/appointments', appointmentData)
      return response.data
    } catch (error) {
      throw new Error('Randevu oluşturulurken bir hata oluştu')
    }
  }
}

export default apiClient 