import { createStore } from 'vuex'
import services from './modules/services'
import blog from './modules/blog'
import companyInfo from './modules/companyInfo'
import menu from './modules/menu'
import gallery from './modules/gallery'

export default createStore({
  modules: {
    services,
    blog,
    companyInfo,
    menu,
    gallery
  },
  state: {
    siteInfo: {
      title: 'Doç. Dr. Mehmet Ünal - Dermatoloji Kliniği',
      description: 'Dermatoloji ve Estetik alanında uzman hekiminiz',
      address: 'Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya',
      phone: '+90 546 529 76 77',
      email: 'dr.munal1101@gmail.com',
      workingHours: {
        weekdays: '09:00 - 21:00',
        saturday: '09:00 - 21:00',
        sunday: 'Kapalı'
      },
      socialMedia: {
        instagram: 'https://instagram.com/dermaklinik',
        facebook: 'https://facebook.com/dermaklinik',
        twitter: 'https://twitter.com/dermaklinik',
        youtube: 'https://youtube.com/dermaklinik'
      }
    },
    menuItems: [
      {
        title: 'Ana Sayfa',
        path: '/',
        name: 'home'
      },
      {
        title: 'Hakkımızda',
        path: '/hakkimizda',
        name: 'about'
      },
      {
        title: 'Genel Dermatoloji',
        path: '/hizmetler/genel-dermatoloji',
        name: 'general-dermatology',
        children: [
          {
            title: 'Akne Tedavisi',
            path: '/hizmetler/akne-tedavisi',
            name: 'acne-treatment'
          },
          {
            title: 'Leke Tedavisi',
            path: '/hizmetler/leke-tedavisi',
            name: 'spot-treatment'
          }
        ]
      },
      {
        title: 'Estetik Dermatoloji',
        path: '/hizmetler/estetik-dermatoloji',
        name: 'aesthetic-dermatology',
        children: [
          {
            title: 'Botoks Uygulamaları',
            path: '/hizmetler/botoks-uygulamalari',
            name: 'botox'
          },
          {
            title: 'Dolgu Uygulamaları',
            path: '/hizmetler/dolgu-uygulamalari',
            name: 'fillers'
          },
          {
            title: 'Mezoterapi',
            path: '/hizmetler/mezoterapi',
            name: 'mesotherapy'
          },
          {
            title: 'Cilt Gençleştirme',
            path: '/hizmetler/cilt-genclestirme',
            name: 'skin-rejuvenation'
          }
        ]
      },
      {
        title: 'Blog',
        path: '/blog',
        name: 'blog'
      },
      {
        title: 'İletişim',
        path: '/iletisim',
        name: 'contact'
      }
    ],
    services: {
      services: [
        {
          id: 1,
          title: 'Genel Dermatoloji',
          slug: 'genel-dermatoloji',
          category: 'Dermatoloji'
        },
        {
          id: 2,
          title: 'Botoks Uygulamaları',
          slug: 'botoks-uygulamalari',
          category: 'Estetik'
        },
        {
          id: 3,
          title: 'Dolgu Uygulamaları',
          slug: 'dolgu-uygulamalari',
          category: 'Estetik'
        },
        {
          id: 4,
          title: 'Lazer Epilasyon',
          slug: 'lazer-epilasyon',
          category: 'Lazer'
        },
        {
          id: 5,
          title: 'Akne Tedavisi',
          slug: 'akne-tedavisi',
          category: 'Dermatoloji'
        }
      ],
      loading: false,
      error: null
    }
  },
  getters: {
    getSiteInfo: state => state.siteInfo,
    getMenuItems: state => state.menuItems,
    getWorkingHours: state => state.siteInfo.workingHours,
    getSocialMedia: state => state.siteInfo.socialMedia,
    getServices: state => state.services.services,
    getServicesLoading: state => state.services.loading,
    getServicesError: state => state.services.error,
    
    // CompanyInfo getters
    getCompanyInfo: (state, getters) => getters['companyInfo/activeCompanyInfo'],
    getCompanyName: (state, getters) => getters['companyInfo/companyName'],
    getCompanyAddress: (state, getters) => getters['companyInfo/companyAddress'],
    getCompanyPhone: (state, getters) => getters['companyInfo/companyPhone'],
    getCompanyEmail: (state, getters) => getters['companyInfo/companyEmail'],
    getCompanyLogo: (state, getters) => getters['companyInfo/companyLogo'],
    getCompanyWorkingHours: (state, getters) => getters['companyInfo/workingHours'],
    getCompanySocialMedia: (state, getters) => getters['companyInfo/socialMedia'],
    getCompanySeoInfo: (state, getters) => getters['companyInfo/seoInfo'],
    
    // Menu getters
    getMainMenuItems: (state, getters) => getters['menu/mainMenuItems'],
    getHierarchicalMenu: (state, getters) => getters['menu/hierarchicalMenu'],
    
    // Gallery getters
    getGalleryGroups: (state, getters) => getters['gallery/activeGroups'],
    getGalleryImages: (state, getters) => getters['gallery/activeImages'],
    getSortedGalleryGroups: (state, getters) => getters['gallery/sortedGroups']
  },
  mutations: {
    updateSiteInfo(state, payload) {
      state.siteInfo = { ...state.siteInfo, ...payload };
    },
    updateMenuItems(state, payload) {
      state.menuItems = payload;
    },
    SET_SERVICES(state, services) {
      state.services.services = services
    },
    SET_SERVICES_LOADING(state, loading) {
      state.services.loading = loading
    },
    SET_SERVICES_ERROR(state, error) {
      state.services.error = error
    }
  },
  actions: {
    async fetchSiteInfo({ commit, dispatch }) {
      try {
        // Şirket bilgilerini ve menü öğelerini çek
        await Promise.all([
          dispatch('companyInfo/fetchActiveCompanyInfo'),
          dispatch('menu/fetchMenuItems')
        ])
      } catch (error) {
        console.error('Site bilgileri yüklenirken hata:', error)
      }
    },
    async fetchServices({ commit }) {
      commit('SET_SERVICES_LOADING', true)
      try {
        // API entegrasyonu yapılana kadar mock data kullanıyoruz
        const mockServices = [
          {
            id: 1,
            title: 'Genel Dermatoloji',
            slug: 'genel-dermatoloji',
            category: 'Dermatoloji'
          },
          {
            id: 2,
            title: 'Botoks Uygulamaları',
            slug: 'botoks-uygulamalari',
            category: 'Estetik'
          },
          {
            id: 3,
            title: 'Dolgu Uygulamaları',
            slug: 'dolgu-uygulamalari',
            category: 'Estetik'
          },
          {
            id: 4,
            title: 'Lazer Epilasyon',
            slug: 'lazer-epilasyon',
            category: 'Lazer'
          },
          {
            id: 5,
            title: 'Akne Tedavisi',
            slug: 'akne-tedavisi',
            category: 'Dermatoloji'
          }
        ]
        commit('SET_SERVICES', mockServices)
        commit('SET_SERVICES_ERROR', null)
      } catch (error) {
        commit('SET_SERVICES_ERROR', error.message)
        console.error('Hizmetler yüklenirken hata:', error)
      } finally {
        commit('SET_SERVICES_LOADING', false)
      }
    }
  }
}) 