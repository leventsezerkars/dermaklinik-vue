import axios from 'axios';

const state = {
  posts: [],
  currentPost: null,
  relatedPosts: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10
  },
  isLoading: false,
  error: null
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setCurrentPost(state, post) {
    state.currentPost = post;
  },
  setRelatedPosts(state, posts) {
    state.relatedPosts = posts;
  },
  setPagination(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  setLoading(state, status) {
    state.isLoading = status;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchPosts({ commit }, { page = 1, limit = 10 } = {}) {
    try {
      commit('setLoading', true);
      commit('setError', null);
      
      // API endpoint'i projenize göre güncelleyin
      const response = await axios.get(`/api/blog/posts?page=${page}&limit=${limit}`);
      
      commit('setPosts', response.data.posts);
      commit('setPagination', {
        currentPage: page,
        totalPages: Math.ceil(response.data.total / limit),
        totalItems: response.data.total,
        itemsPerPage: limit
      });
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog posts yüklenirken hata oluştu:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchPostBySlug({ commit }, slug) {
    try {
      commit('setLoading', true);
      commit('setError', null);
      
      // API endpoint'i projenize göre güncelleyin
      const response = await axios.get(`/api/blog/posts/${slug}`);
      
      commit('setCurrentPost', response.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog post detayı yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchRelatedPosts({ commit }, { postId, limit = 3 }) {
    try {
      commit('setLoading', true);
      commit('setError', null);
      
      // API endpoint'i projenize göre güncelleyin
      const response = await axios.get(`/api/blog/posts/${postId}/related?limit=${limit}`);
      
      commit('setRelatedPosts', response.data);
    } catch (error) {
      commit('setError', error.message);
      console.error('İlgili blog postları yüklenirken hata oluştu:', error);
    } finally {
      commit('setLoading', false);
    }
  }
};

const getters = {
  allPosts: state => state.posts,
  currentPost: state => state.currentPost,
  relatedPosts: state => state.relatedPosts,
  pagination: state => state.pagination,
  isLoading: state => state.isLoading,
  hasError: state => state.error !== null,
  error: state => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 