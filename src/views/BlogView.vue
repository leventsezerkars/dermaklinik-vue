<template>
  <div class="blog-page">
    <div class="page-header">
      <div class="container">
        <h1>{{ t('blog.title') }}</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">{{ t('serviceDetail.breadcrumb.home') }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ t('blog.title') }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container py-5">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ t('blog.loading') }}</span>
        </div>
        <p class="mt-3">{{ t('blog.loading') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center py-5">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">{{ t('blog.error') }}</h4>
          <p>{{ error }}</p>
          <button @click="loadBlogData" class="btn btn-outline-danger">
            {{ t('blog.retry') }}
          </button>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div v-if="blogPosts.length > 0" class="blog-filters mb-5">
        <div class="row">
          <div class="col-md-8">
            <div class="search-box">
              <div class="input-group">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  class="form-control" 
                  :placeholder="$t('blog.searchPlaceholder')"
                  @input="handleSearch"
                >
                <button class="btn btn-outline-primary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
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
      </div>

      <!-- Blog Posts - Modern Knowledge Base Layout -->
      <div v-if="filteredPosts.length > 0" class="knowledge-base">
        <div class="row">
          <div v-for="post in filteredPosts" :key="post.id" class="col-lg-4 col-md-6 mb-4">
            <div class="knowledge-card">
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
                    class="btn btn-knowledge"
                  >
                    <span>{{ $t('blog.readMore') }}</span>
                    <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- No Posts -->
      <div v-if="blogPosts.length === 0 && !isLoading && !hasError" class="text-center py-5">
        <div class="alert alert-info" role="alert">
          <h4 class="alert-heading">{{ $t('blog.noPosts') }}</h4>
          <p>{{ $t('blog.noPosts') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const store = useStore()
const route = useRoute()
const { locale, t } = useI18n()

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
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/views/Blog.scss' as *;

.page-header {
  @extend .blog-page-header;
}

.blog-loading {
  @extend .blog-loading;
}

.blog-error {
  @extend .blog-error;
}
</style> 