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
  lastFetch: null,
  currentLanguage: 'tr',
  isFetching: false
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
  },
  setLanguage(state, language) {
    state.currentLanguage = language;
  },
  setFetching(state, status) {
    state.isFetching = status;
  }
};

const actions = {
  async fetchPosts({ commit, state }, { page = 1, limit = 10, search = '', languageCode = null } = {}) {
    const currentLanguage = languageCode || state.currentLanguage || 'tr';

    // Cache kontrolü - 1 saatten eski değilse tekrar çekme
    if (state.posts.length > 0 && state.lastFetch) {
      const now = new Date();
      const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60);
      if (diffInHours < 1) {
        return state.posts;
      }
    }

    if (state.isFetching) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!state.isFetching) {
            clearInterval(checkInterval);
            resolve(state.posts);
          }
        }, 100);
      });
    }

    try {
      commit('setFetching', true);
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogAPI.getAll(page, limit, search, currentLanguage,true);
      
      // API response'undan data array'ini al
      const posts = response.data.data || response.data;
      
      commit('setPosts', posts);
      commit('setPagination', {
        currentPage: page,
        totalPages: Math.ceil(posts.length / limit),
        totalItems: posts.length,
        itemsPerPage: limit
      });
      
      return posts;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog posts yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
      commit('setFetching', false);
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

  async fetchPostBySlug({ commit }, { slug, languageCode = 'tr' }) {
    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogAPI.getBySlug(slug, languageCode);
      
      // API response'undan data'yı al
      const post = response.data.data || response.data;
      commit('setCurrentPost', post);
      return post;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog post detayı yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchRecentPosts({ commit }, { limit = 5, languageCode = 'tr' } = {}) {
    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogAPI.getAll(1, limit, '', languageCode);
      commit('setRelatedPosts', response.data.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message);
      console.error('Son blog yazıları yüklenirken hata oluştu:', error);
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

  async fetchCategories({ commit, state }, languageCode = null) {
    const currentLanguage = languageCode || state.currentLanguage || 'tr';

    // Cache kontrolü - 1 saatten eski değilse tekrar çekme
    if (state.categories.length > 0 && state.lastFetch) {
      const now = new Date();
      const diffInHours = (now - state.lastFetch) / (1000 * 60 * 60);
      if (diffInHours < 1) {
        return state.categories;
      }
    }

    try {
      commit('setLoading', true);
      commit('clearError');
      
      const response = await BlogCategoryAPI.getAll(currentLanguage);
      
      // API response'undan data array'ini al
      const categories = response.data.data || response.data;
      commit('setCategories', categories);
      return categories;
    } catch (error) {
      commit('setError', error.message);
      console.error('Blog kategorileri yüklenirken hata oluştu:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  async changeLanguage({ commit, state, dispatch }, languageCode) {
    commit('setLanguage', languageCode);
    
    // Mevcut veri varsa dil değiştir, yoksa API'den çek
    if (state.posts.length > 0) {
      return state.posts;
    }
    
    await dispatch('fetchPosts', { languageCode });
    await dispatch('fetchCategories', languageCode);
  }
};

const getters = {
  allPosts: state => state.posts,
  blogPosts: state => state.posts, // BlogView ve Home için
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