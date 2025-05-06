import axios from 'axios'

// Mock data
const mockServices = [
  {
    id: 1,
    title: 'Genel Dermatoloji',
    slug: 'genel-dermatoloji',
    shortDescription: 'Cilt, saç ve tırnak hastalıklarının teşhis ve tedavisi',
    image: '/images/services/genel-dermatoloji.jpg',
    category: 'Dermatoloji'
  },
  {
    id: 2,
    title: 'Botoks Uygulamaları',
    slug: 'botoks-uygulamalari',
    shortDescription: 'Kırışıklık tedavisi ve yüz gençleştirme',
    image: '/images/services/botoks.jpg',
    category: 'Estetik'
  },
  {
    id: 3,
    title: 'Dolgu Uygulamaları',
    slug: 'dolgu-uygulamalari',
    shortDescription: 'Yüz hatlarının belirginleştirilmesi ve hacim kazandırma',
    image: '/images/services/dolgu.jpg',
    category: 'Estetik'
  },
  {
    id: 4,
    title: 'Lazer Epilasyon',
    slug: 'lazer-epilasyon',
    shortDescription: 'Kalıcı tüy alma ve epilasyon',
    image: '/images/services/lazer.jpg',
    category: 'Lazer'
  },
  {
    id: 5,
    title: 'Akne Tedavisi',
    slug: 'akne-tedavisi',
    shortDescription: 'Akne ve sivilce tedavisi',
    image: '/images/services/akne.jpg',
    category: 'Dermatoloji'
  }
]

class ServiceService {
  async getAllServices() {
    try {
      // API entegrasyonu yapılana kadar mock data kullanıyoruz
      return mockServices
    } catch (error) {
      console.error('Hizmetler yüklenirken hata:', error)
      throw error
    }
  }

  async getServiceBySlug(slug) {
    try {
      // API entegrasyonu yapılana kadar mock data kullanıyoruz
      const service = mockServices.find(s => s.slug === slug)
      if (!service) {
        throw new Error('Hizmet bulunamadı')
      }
      return service
    } catch (error) {
      console.error('Hizmet detayı yüklenirken hata:', error)
      throw error
    }
  }

  // Mock data for development
  getMockServices() {
    return [
      {
        id: 1,
        title: 'Botoks Uygulamaları',
        slug: 'botoks-uygulamalari',
        shortDescription: 'Kırışıklık tedavisi ve yüz gençleştirme için botoks uygulamaları',
        image: '/images/services/botoks.jpg',
        category: 'Estetik Dermatoloji'
      },
      {
        id: 2,
        title: 'Mezoterapi',
        slug: 'mezoterapi',
        shortDescription: 'Cilt yenileme ve gençleştirme için mezoterapi uygulamaları',
        image: '/images/services/mezoterapi.jpg',
        category: 'Estetik Dermatoloji'
      },
      {
        id: 3,
        title: 'Leke Tedavisi',
        slug: 'leke-tedavisi',
        shortDescription: 'Cilt lekelerinin tedavisi ve önlenmesi',
        image: '/images/services/leke-tedavisi.jpg',
        category: 'Genel Dermatoloji'
      },
      {
        id: 4,
        title: 'Lazer Epilasyon',
        slug: 'lazer-epilasyon',
        shortDescription: 'Kalıcı tüy alma için lazer epilasyon uygulamaları',
        image: '/images/services/lazer-epilasyon.jpg',
        category: 'Estetik Dermatoloji'
      }
    ]
  }

  getMockServiceBySlug(slug) {
    const services = this.getMockServices()
    return services.find(service => service.slug === slug)
  }
}

export default new ServiceService() 