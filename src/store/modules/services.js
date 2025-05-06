import ServiceService from '../../services/ServiceService'

export default {
  namespaced: true,
  
  state: {
    services: [],
    currentService: null,
    loading: false,
    error: null
  },

  mutations: {
    setServices(state, services) {
      state.services = services
    },
    setCurrentService(state, service) {
      state.currentService = service
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchServices({ commit }) {
      commit('setLoading', true)
      try {
        const services = await ServiceService.getAllServices()
        commit('setServices', services)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchServiceBySlug({ commit }, slug) {
      commit('setLoading', true)
      try {
        const service = await ServiceService.getServiceBySlug(slug)
        commit('setCurrentService', service)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    }
  },

  getters: {
    allServices: state => state.services,
    currentService: state => state.currentService,
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    getError: state => state.error
  }
} 