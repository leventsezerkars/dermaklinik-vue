<template>
  <div class="blog-detail-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ $t('blog.loading') }}</span>
          </div>
      <p class="mt-3">{{ $t('blog.loading') }}</p>
        </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="text-center py-5">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">{{ $t('blog.error') }}</h4>
        <p>{{ error }}</p>
        <button @click="loadBlogData" class="btn btn-outline-danger">
          {{ $t('blog.retry') }}
        </button>
      </div>
    </div>

    <!-- Blog Detail Content -->
    <div v-else-if="post">
      <!-- Blog Style Header -->
      <header class="blog-header">
        <div class="container">
          <div class="header-content">
            <div class="breadcrumb">
              <router-link to="/" class="breadcrumb-link">
                <i class="fas fa-home"></i>
                <span>{{ $t('serviceDetail.breadcrumb.home') }}</span>
              </router-link>
              <i class="fas fa-chevron-right separator"></i>
              <router-link to="/blog" class="breadcrumb-link">
                <span>{{ $t('blog.title') }}</span>
              </router-link>
              <i class="fas fa-chevron-right separator"></i>
              <span class="current-page">{{ getPostTitle(post) }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="blog-main">
        <div class="container">
          <div class="blog-layout">
            <!-- Main Content -->
            <article class="blog-content">
              <header class="content-header">
                <h1 class="blog-title">{{ getPostTitle(post) }}</h1>
                <div class="content-meta">
                  <div class="meta-item">
                    <i class="fas fa-folder"></i>
                    <span>{{ getPostCategory(post) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>{{ formatDate(getPostDate(post)) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-eye"></i>
                    <span>{{ post.viewCount || 0 }} {{ $t('blog.views') }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-user-md"></i>
                    <span>{{ $t('blog.author') }}</span>
                  </div>
                </div>
              </header>

              <div class="content-body">
                <div class="blog-featured-image">
                  <img :src="getPostImage(post)" :alt="getPostTitle(post)" class="img-fluid">
                </div>

                <div class="blog-content-text" v-html="getPostContent(post)"></div>
              </div>
            </article>

            <!-- Sidebar -->
          <aside class="blog-sidebar">
            <div class="sidebar-widget">
                <h3>{{ $t('blog.categories') }}</h3>
              <ul class="blog-categories">
                  <li v-for="category in categories" :key="category.id">
                    <a @click="goToCategory(category)" href="#" class="category-link">
                      {{ getCategoryName(category) }} <span>({{ getCategoryCount(category) }})</span>
                    </a>
                </li>
              </ul>
            </div>
            <div class="sidebar-widget">
                <h3>{{ $t('blog.recentPosts') }}</h3>
              <ul class="recent-posts">
                <li v-for="recentPost in recentPosts" :key="recentPost.id">
                    <router-link :to="{ name: 'blog-detail', params: { slug: getPostSlug(recentPost) }}">
                      {{ getPostTitle(recentPost) }}
                  </router-link>
                    <span>{{ formatDate(recentPost.createdAt) }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        </div>
      </main>
    </div>

    <!-- No Post Found -->
    <div v-else class="text-center py-5">
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">{{ $t('blog.noPosts') }}</h4>
        <p>{{ $t('blog.noPosts') }}</p>
        <router-link to="/blog" class="btn btn-outline-primary">
          {{ $t('blog.title') }}'a Dön
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

const store = useStore()
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// Computed properties
const post = computed(() => store.getters['blog/currentPost'])
const recentPosts = computed(() => store.getters['blog/relatedPosts'])
const categories = computed(() => store.getters['blog/categories'])
const isLoading = computed(() => store.getters['blog/isLoading'])
const hasError = computed(() => store.getters['blog/hasError'])
const error = computed(() => store.getters['blog/error'])

// Helper functions
const getPostTranslation = (post) => {
  if (!post?.translations || !Array.isArray(post.translations)) return null
  return post.translations.find(t => t.language?.code === locale.value) || post.translations[0] || null
}

const getPostTitle = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'Başlık Yok'
  return translation.title || 'Başlık Yok'
}

const getPostContent = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'İçerik bulunamadı'
  return translation.content || 'İçerik bulunamadı'
}

const getPostSlug = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return post?.id
  return translation.slug || post?.id
}

const getPostImage = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop'
  return translation.featuredImage || 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop'
}

const getPostCategory = (post) => {
  if (post.category?.translations && post.category.translations.length > 0) {
    const translation = post.category.translations.find(t => t.language?.code === locale.value)
    return translation?.name || post.category.translations[0]?.name || 'Kategori'
  }
  return 'Kategori'
}



const getPostDate = (post) => {
  return post?.createdAt || new Date().toISOString()
}

const getCategoryName = (category) => {
  if (!category?.translations || !Array.isArray(category.translations)) return category?.name || 'Kategori'
  const translation = category.translations.find(t => t.language?.code === locale.value)
  return translation?.name || category.name || 'Kategori'
}

const getCategoryCount = (category) => {
  return category?.blogs?.length || 0
}

const goToCategory = (category) => {
  // Blog sayfasına git ve kategoriyi seç
  router.push({
    name: 'blog',
    query: { category: category.id }
  })
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

// Load blog data
const loadBlogData = async () => {
  try {
    const slug = route.params.slug
    await store.dispatch('blog/fetchPostBySlug', { slug, languageCode: locale.value })
    await store.dispatch('blog/fetchRecentPosts', { languageCode: locale.value })
    await store.dispatch('blog/fetchCategories', locale.value)
  } catch (error) {
    console.error('Blog detay verileri yüklenirken hata:', error)
  }
}

// Watch for language changes
watch(locale, async (newLocale) => {
  await loadBlogData()
})

// Load data on mount
onMounted(async () => {
  await loadBlogData()
  // Blog detayı yüklendikten sonra görüntülenme sayısını artır
  if (post.value?.id) {
    await store.dispatch('blog/incrementPostView', post.value.id)
  }
})

// SEO
useHead({
  title: computed(() => `${getPostTitle(post.value)} - Doç. Dr. Mehmet Ünal`),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        const translation = getPostTranslation(post.value)
        if (!translation) return 'Blog yazısı'
        const content = translation.content || ''
        const cleanContent = content.replace(/<[^>]*>/g, '').trim()
        return cleanContent.length > 160 ? cleanContent.substring(0, 160) + '...' : cleanContent
      })
    },
    {
      name: 'keywords',
      content: computed(() => {
        const translation = getPostTranslation(post.value)
        if (!translation) return 'dermatoloji, cilt sağlığı'
        return translation.tags?.join(', ') || 'dermatoloji, cilt sağlığı'
      })
    },
    {
      property: 'og:title',
      content: computed(() => getPostTitle(post.value))
    },
    {
      property: 'og:description',
      content: computed(() => {
        const translation = getPostTranslation(post.value)
        if (!translation) return 'Blog yazısı'
        const content = translation.content || ''
        const cleanContent = content.replace(/<[^>]*>/g, '').trim()
        return cleanContent.length > 160 ? cleanContent.substring(0, 160) + '...' : cleanContent
      })
    },
    {
      property: 'og:image',
      content: computed(() => getPostImage(post.value))
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: computed(() => getPostTitle(post.value))
    },
    {
      name: 'twitter:description',
      content: computed(() => {
        const translation = getPostTranslation(post.value)
        if (!translation) return 'Blog yazısı'
        const content = translation.content || ''
        const cleanContent = content.replace(/<[^>]*>/g, '').trim()
        return cleanContent.length > 160 ? cleanContent.substring(0, 160) + '...' : cleanContent
      })
    },
    {
      name: 'twitter:image',
      content: computed(() => getPostImage(post.value))
    }
  ]
})
</script>

<style lang="scss">
@use '@/assets/styles/views/BlogDetailView.scss';
</style> 