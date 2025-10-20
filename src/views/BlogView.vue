<template>
  <div class="blog-page">
    <!-- Blog Style Header -->
    <header class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>{{ t('serviceDetail.breadcrumb.home') }}</span>
            </router-link>
            <i class="fas fa-chevron-right separator"></i>
            <span class="current-page">{{ t('blog.title') }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="blog-main">
      <div class="container">
        <div class="blog-layout">
          <!-- Page Title -->
          <div class="page-title-section">
            <h1 class="page-title">{{ t('blog.title') }}</h1>
            <p class="page-subtitle">{{ t('blog.subtitle') }}</p>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="blog-loading">
            <div class="loading-content">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">{{ t('blog.loading') }}</span>
              </div>
              <p class="mt-3">{{ t('blog.loading') }}</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="hasError" class="blog-error">
            <div class="error-content">
              <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <h2 class="error-title">{{ t('blog.error') }}</h2>
              <p class="error-message">{{ error }}</p>
              <div class="error-actions">
                <button @click="loadBlogData" class="btn btn-primary">
                  <i class="fas fa-refresh me-2"></i>
                  {{ t('blog.retry') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Search and Filter Section -->
          <div v-if="blogPosts.length > 0" class="blog-filters">
            <div class="filters-container">
              <div class="search-box">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-search"></i>
                  </span>
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    class="form-control" 
                    :placeholder="$t('blog.searchPlaceholder')"
                    @input="handleSearch"
                  >
                </div>
              </div>
              <div class="category-filter">
                <select v-model="selectedCategory" @change="handleCategoryFilter" class="form-select">
                  <option value="">{{ $t('blog.allCategories') }}</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ getCategoryName(category) }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Blog Posts Grid -->
          <div v-if="filteredPosts.length > 0" class="blog-posts-grid">
            <div class="row">
              <div v-for="post in filteredPosts" :key="post.id" class="col-lg-4 col-md-6 mb-4">
                <article class="blog-card">
                  <div class="card-image">
                    <img 
                      :src="getPostImage(post)" 
                      :alt="getPostTitle(post)"
                      @error="handleImageError"
                    >
                    <div class="card-category">
                      <span class="category-badge">{{ getPostCategory(post) }}</span>
                    </div>
                  </div>
                  <div class="card-content">
                    <h3 class="card-title">{{ getPostTitle(post) }}</h3>
                    <p class="card-excerpt">{{ getPostExcerpt(post) }}</p>
                    <div class="card-meta">
                      <div class="meta-item">
                        <i class="far fa-calendar"></i>
                        <span>{{ formatDate(getPostDate(post)) }}</span>
                      </div>
                      <div class="meta-item">
                        <i class="far fa-eye"></i>
                        <span>{{ post.viewCount || 0 }}</span>
                      </div>
                    </div>
                    <div class="card-actions">
                      <router-link 
                        :to="{ name: 'blog-detail', params: { slug: getPostSlug(post) } }" 
                        class="btn btn-primary"
                      >
                        {{ t('blog.readMore') }}
                        <i class="fas fa-arrow-right ms-2"></i>
                      </router-link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- No Posts -->
          <div v-if="blogPosts.length === 0 && !isLoading && !hasError" class="blog-empty">
            <div class="empty-content">
              <div class="empty-icon">
                <i class="fas fa-newspaper"></i>
              </div>
              <h3 class="empty-title">{{ $t('blog.noPosts') }}</h3>
              <p class="empty-message">{{ $t('blog.noPosts') }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSEO } from '@/composables/useSEO'

const store = useStore()
const route = useRoute()
const { locale, t } = useI18n()
const { setSEOHead } = useSEO()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')

// Computed properties
const blogPosts = computed(() => store.getters['blog/blogPosts'])
const categories = computed(() => store.getters['blog/categories'])
const isLoading = computed(() => store.getters['blog/isLoading'])
const hasError = computed(() => store.getters['blog/hasError'])
const error = computed(() => store.getters['blog/error'])

// Filtered posts
const filteredPosts = computed(() => {
  let posts = blogPosts.value || []
  
  // Search filter
  if (searchQuery.value) {
    posts = posts.filter(post => {
      const title = getPostTitle(post).toLowerCase()
      const content = getPostExcerpt(post).toLowerCase()
      const query = searchQuery.value.toLowerCase()
      return title.includes(query) || content.includes(query)
    })
  }
  
  // Category filter
  if (selectedCategory.value) {
    posts = posts.filter(post => post.categoryId === selectedCategory.value)
  }
  
  return posts
})

// Helper functions
const getPostTranslation = (post) => {
  if (!post.translations || !Array.isArray(post.translations)) return null
  return post.translations.find(t => t.language?.code === locale.value) || post.translations[0] || null
}

const getPostTitle = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'Başlık Yok'
  return translation.title || 'Başlık Yok'
}

const getPostExcerpt = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'Özet bulunamadı'
  const content = translation.content || ''
  // HTML etiketlerini temizle ve özet oluştur
  const cleanContent = content.replace(/<[^>]*>/g, '').trim()
  return cleanContent.length > 120 ? cleanContent.substring(0, 120) + '...' : cleanContent
}

const getPostSlug = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return post.id
  return translation.slug || post.id
}


const getPostCategory = (post) => {
  // Kategori bilgisini farklı alanlardan al
  if (post.categoryName) return post.categoryName
  if (post.category?.name) return post.category.name
  if (post.category?.translations && post.category.translations.length > 0) {
    const translation = post.category.translations.find(t => t.language?.code === locale.value)
    return translation?.name || post.category.translations[0]?.name || 'Kategori'
  }
  return 'Kategori'
}

const getPostImage = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop'
  return translation.featuredImage || 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop'
}

const getCategoryName = (category) => {
  if (!category?.translations || !Array.isArray(category.translations)) {
    return category?.name || 'Kategori'
  }
  const translation = category.translations.find(t => t.language?.code === locale.value)
  return translation?.name || category.name || 'Kategori'
}

// Event handlers
const handleSearch = () => {
  // Search is handled by computed property
}

const handleCategoryFilter = () => {
  // Category filter is handled by computed property
}

const getPostDate = (post) => {
  return post.createdAt || new Date().toISOString()
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop'
}

// Load blog data
const loadBlogData = async () => {
  try {
    await store.dispatch('blog/fetchPosts', { languageCode: locale.value })
    await store.dispatch('blog/fetchCategories', locale.value)
  } catch (error) {
    console.error('Blog verileri yüklenirken hata:', error)
  }
}

// Watch for language changes
watch(locale, async (newLocale) => {
  await store.dispatch('blog/changeLanguage', newLocale)
})

// Load data on mount
onMounted(() => {
  loadBlogData()
  
  // URL'den kategori parametresini al
  const categoryParam = route.query.category
  if (categoryParam) {
    selectedCategory.value = categoryParam
  }
  
  // SEO bilgilerini ayarla
  setSEOHead({
    title: t('blog.title'),
    description: t('blog.subtitle'),
    keywords: 'blog, dermatoloji, cilt sağlığı, estetik, tedavi',
    type: 'website'
  })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/views/Blog.scss' as *;
</style> 