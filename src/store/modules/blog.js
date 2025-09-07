import { BlogAPI, BlogCategoryAPI } from '../../services/api/blog';

const state = {
  posts: [],
  categories: [],
  currentPost: null,
  relatedPosts: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10
  },
  isLoading: false,
  error: null,
  lastFetch: null
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
    state.lastFetch = new Date();
  },
  setCategories(state, categories) {
    state.categories = categories;
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
  },
  clearError(state) {
    state.error = null;
  }
};

const actions = {
  async fetchPosts({ commit, state }, { page = 1, limit = 10, search = '' } = {}) {
    // Cache kontrolü - 5 dakikadan eski değilse tekrar çekme
    if (state.posts.length > 0 && state.lastFetch) {
      const now = new Date();
      const diffInMinutes = (now - state.lastFetch) / (1000 * 60);
      if (diffInMinutes < 5) {
        return state.posts;
      }
    }

    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogAPI.getAll(page, limit, search);
      
      commit('setPosts', response.data);
      commit('setPagination', {
        currentPage: page,
        totalPages: Math.ceil(response.data.total / limit),
        totalItems: response.data.total,
        itemsPerPage: limit
      });
      
      return response.data;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog posts yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchPostById({ commit }, id) {
    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogAPI.getById(id);
      
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

  async incrementPostView({ commit }, id) {
    try {
      await BlogAPI.incrementView(id);
    } catch (error) {
      console.error('Görüntülenme sayısı artırılırken hata oluştu:', error);
    }
  },

  async fetchCategories({ commit, state }) {
    // Cache kontrolü - 10 dakikadan eski değilse tekrar çekme
    if (state.categories.length > 0 && state.lastFetch) {
      const now = new Date();
      const diffInMinutes = (now - state.lastFetch) / (1000 * 60);
      if (diffInMinutes < 10) {
        return state.categories;
      }
    }

    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogCategoryAPI.getAll();
      
      commit('setCategories', response.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog kategorileri yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  }
};

const getters = {
  allPosts: state => state.posts,
  categories: state => state.categories,
  currentPost: state => state.currentPost,
  relatedPosts: state => state.relatedPosts,
  pagination: state => state.pagination,
  isLoading: state => state.isLoading,
  hasError: state => state.error !== null,
  error: state => state.error,
  
  // Aktif blog yazılarını getirir
  activePosts: state => {
    return state.posts.filter(post => post.isActive && !post.isDeleted);
  },
  
  // Aktif kategorileri getirir
  activeCategories: state => {
    return state.categories.filter(category => category.isActive && !category.isDeleted);
  },
  
  // Kategoriye göre blog yazılarını getirir
  getPostsByCategory: state => categoryId => {
    return state.posts.filter(post => post.categoryId === categoryId && post.isActive && !post.isDeleted);
  },
  
  // En çok görüntülenen blog yazılarını getirir
  mostViewedPosts: state => {
    return [...state.posts]
      .filter(post => post.isActive && !post.isDeleted)
      .sort((a, b) => b.viewCount - a.viewCount);
  },
  
  // En yeni blog yazılarını getirir
  latestPosts: state => {
    return [...state.posts]
      .filter(post => post.isActive && !post.isDeleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 