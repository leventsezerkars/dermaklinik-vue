<template>
  <section class="blog-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-header text-center mb-5">
            <h2 class="section-title">{{ $t('home.blog.title') }}</h2>
            <p class="section-subtitle">{{ $t('home.blog.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ $t('blog.loading') }}</span>
        </div>
      </div>

      <!-- Blog Posts Slider -->
      <div v-else-if="blogPosts.length > 0" class="blog-slider">
        <div class="blog-slider-container">
          <div class="blog-slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div 
              v-for="post in blogPosts" 
              :key="post.id" 
              class="blog-slide"
            >
              <div class="blog-card">
                <div class="blog-image">
                  <img 
                    :src="getPostImage(post)" 
                    :alt="getPostTitle(post)"
                    @error="handleImageError"
                  >
                  <div class="blog-overlay">
                    <div class="blog-category">
                      <span class="badge">{{ getPostCategory(post) }}</span>
                    </div>
                  </div>
                </div>
                <div class="blog-content">
                  <h3 class="blog-title">{{ getPostTitle(post) }}</h3>
                  <p class="blog-excerpt">{{ getPostExcerpt(post) }}</p>
                  <div class="blog-meta">
                    <div class="blog-date">
                      <i class="far fa-calendar"></i>
                      <span>{{ formatDate(getPostDate(post)) }}</span>
                    </div>
                    <div class="blog-views">
                      <i class="far fa-eye"></i>
                      <span>{{ post.viewCount || 0 }}</span>
                    </div>
                  </div>
                  <router-link 
                    :to="{ name: 'blog-detail', params: { slug: getPostSlug(post) } }" 
                    class="btn btn-primary"
                  >
                    {{ $t('blog.readMore') }}
                    <i class="fas fa-arrow-right ms-2"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button 
          @click="previousSlide" 
          class="slider-btn slider-btn-prev"
          :disabled="currentSlide === 0"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button 
          @click="nextSlide" 
          class="slider-btn slider-btn-next"
          :disabled="currentSlide >= maxSlides - 1"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Dots Indicator -->
        <div class="slider-dots">
          <button 
            v-for="(dot, index) in maxSlides" 
            :key="index"
            @click="goToSlide(index)"
            :class="{ active: currentSlide === index }"
            class="slider-dot"
          ></button>
        </div>
      </div>

      <!-- No Posts -->
      <div v-else class="text-center py-5">
        <p class="text-muted">{{ $t('blog.noPosts') }}</p>
      </div>
      <div v-if="blogPosts.length > 0" class="text-center mt-4" style="position: relative; z-index: 10;">
        <router-link to="/blog" class="btn btn-knowledge-home">
          {{ $t('home.blog.viewAll')}}
          <i class="fas fa-arrow-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const store = useStore()
const { locale, t } = useI18n()
const router = useRouter()

// Reactive data
const currentSlide = ref(0)
const autoSlideInterval = ref(null)

// Computed properties
const blogPosts = computed(() => {
  const posts = store.getters['blog/blogPosts']
  if (Array.isArray(posts)) {
    return posts.slice(0, 6)
  }
  return []
})
const isLoading = computed(() => store.getters['blog/isLoading'])
const maxSlides = computed(() => Math.ceil(blogPosts.value.length / 3)) // 3 posts per slide

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
  const cleanContent = content.replace(/<[^>]*>/g, '').trim()
  return cleanContent.length > 100 ? cleanContent.substring(0, 100) + '...' : cleanContent
}

const getPostSlug = (post) => {
  const translation = getPostTranslation(post)
  if (!translation) return post.id
  return translation.slug || post.id
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



// Slider functions
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = maxSlides.value - 1
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // 5 saniyede bir değişsin
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
  }
}

// Lifecycle
onMounted(async () => {
  try {
    await store.dispatch('blog/fetchPosts', { limit: 6, languageCode: locale.value })
    if (blogPosts.value.length > 3) {
      startAutoSlide()
    }
  } catch (error) {
    console.error('Home blog verileri yüklenirken hata:', error)
  }
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.blog-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba($dark, 0.95) 0%, rgba($dark, 0.9) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23dee2e6" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23dee2e6" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23dee2e6" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="%23dee2e6" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="%23dee2e6" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  .section-header {
    position: relative;
    z-index: 2;

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: $white;
      margin-bottom: 1rem;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: $gold-gradient-light;
        border-radius: 2px;
      }
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: rgba($white, 0.8);
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .blog-slider {
    position: relative;
    margin: 3rem 0;

    .blog-slider-container {
      overflow: hidden;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba($dark, 0.1);
    }

    .blog-slider-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .blog-slide {
      flex: 0 0 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 2rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .blog-card {
      background: $white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba($dark, 0.08);
      transition: all $transition-base;
      height: 100%;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba($dark, 0.15);
      }

      .blog-image {
        position: relative;
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform $transition-base;
        }

        .blog-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;

          .badge {
            background: $gold-gradient-light;
            color: $dark;
            font-weight: 600;
            padding: 0.4rem 0.8rem;
            border-radius: 15px;
            font-size: 0.75rem;
          }
        }

        &:hover img {
          transform: scale(1.05);
        }
      }

      .blog-content {
        padding: 1.5rem;

        .blog-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: $dark;
          margin-bottom: 0.8rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-excerpt {
          color: $gray-600;
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-top: 0.8rem;
          border-top: 1px solid $gray-200;

          .blog-date,
          .blog-views {
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            color: $gray-600;

            i {
              color: $gold;
              margin-right: 0.3rem;
              width: 12px;
            }
          }
        }

        .btn {
          width: 100%;
          font-size: 0.9rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all $transition-base;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba($primary, 0.3);
          }
        }
      }
    }

    .slider-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: $white;
      border: 2px solid $gray-200;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all $transition-base;
      z-index: 3;
      box-shadow: 0 4px 15px rgba($dark, 0.1);

      &:hover:not(:disabled) {
        background: $primary;
        border-color: $primary;
        color: $white;
        transform: translateY(-50%) scale(1.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.slider-btn-prev {
        left: -25px;
      }

      &.slider-btn-next {
        right: -25px;
      }

      @media (max-width: 768px) {
        width: 40px;
        height: 40px;

        &.slider-btn-prev {
          left: -20px;
        }

        &.slider-btn-next {
          right: -20px;
        }
      }
    }

    .slider-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;

      .slider-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: $gray-300;
        cursor: pointer;
        transition: all $transition-base;

        &.active {
          background: $primary;
          transform: scale(1.2);
        }

        &:hover:not(.active) {
          background: $gray-400;
        }
      }
    }
  }

  // Knowledge Home Button
  .btn-knowledge-home {
    background: linear-gradient(135deg, $gold, $gold-dark);
    color: $dark;
    border: none;
    padding: 1rem 2rem;
    border-radius: 30px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all $transition-base;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba($gold, 0.3);

    &:hover {
      background: linear-gradient(135deg, $gold-dark, $gold);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba($gold, 0.4);
      color: $dark;
    }

    i {
      transition: transform $transition-base;
    }

    &:hover i {
      transform: translateX(6px);
    }
  }
}
</style>
