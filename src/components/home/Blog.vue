<template>
  <!-- Blog yoksa component hiç render edilmez -->
  <section v-if="shouldShowBlog" class="blog-section">
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
        <swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
          :slides-per-view="1"
          :space-between="20"
          :loop="blogPosts.length > 3"
          :autoplay="blogPosts.length > 3 ? {
            delay: 5000,
            disableOnInteraction: false
          } : false"
          :pagination="blogPosts.length > 3 ? {
            clickable: true
          } : false"
          :navigation="blogPosts.length > 3"
          :breakpoints="{
            '640': {
              slidesPerView: 1,
            },
            '768': {
              slidesPerView: 2,
            },
            '1024': {
              slidesPerView: 3,
            }
          }"
        >
          <swiper-slide v-for="post in blogPosts" :key="post.id">
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
          </swiper-slide>
        </swiper>
      </div>

      <!-- View All Button - Sadece 3'ten fazla blog varsa göster -->
      <div v-if="blogPosts.length > 3" class="text-center mt-4" style="position: relative; z-index: 10;">
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation

const store = useStore()
const { locale, t } = useI18n()
const router = useRouter()

// Computed properties
const blogPosts = computed(() => {
  const posts = store.getters['blog/blogPosts']
  if (Array.isArray(posts)) {
    return posts.slice(0, 6)
  }
  return []
})
const isLoading = computed(() => store.getters['blog/isLoading'])

// Blog gösterilip gösterilmeyeceğini belirle
const shouldShowBlog = computed(() => {
  // Loading durumunda göster
  if (isLoading.value) return true
  
  // Blog postları varsa göster
  if (blogPosts.value.length > 0) return true
  
  // Hiç blog yoksa gösterme
  return false
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




// Lifecycle
onMounted(async () => {
  try {
    await store.dispatch('blog/fetchPosts', { limit: 6, languageCode: locale.value })
  } catch (error) {
    console.error('Home blog verileri yüklenirken hata:', error)
  }
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
    padding: 0 2rem;

    // Swiper navigation butonları için özel stiller
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
      color: $gold;
      background: rgba($dark, 0.9);
      border: 2px solid rgba($gold, 0.3);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      backdrop-filter: blur(10px);
      
      &:after {
        font-size: 18px;
        font-weight: bold;
      }
      
      &:hover {
        background: $gold;
        color: $dark;
        border-color: $gold;
      }
    }

    // Swiper pagination için özel stiller
    :deep(.swiper-pagination-bullet) {
      background: rgba($gold, 0.3);
      opacity: 1;
      
      &.swiper-pagination-bullet-active {
        background: $gold;
        box-shadow: 0 0 10px rgba($gold, 0.5);
      }
    }

    .blog-card {
      background: linear-gradient(135deg, rgba($dark, 0.9) 0%, rgba($dark, 0.95) 100%);
      border: 1px solid rgba($gold, 0.2);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba($dark, 0.3);
      transition: all $transition-base;
      height: 100%;
      backdrop-filter: blur(10px);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba($gold, 0.2);
        border-color: rgba($gold, 0.4);
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
          color: $white;
          margin-bottom: 0.8rem;
          line-height: 1.4;
          height: 1.4em; // Sabit yükseklik - 1 satır
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blog-excerpt {
          color: rgba($white, 0.8);
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          height: 3em; // Sabit yükseklik - 2 satır (1.5 * 2)
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-top: 0.8rem;
          border-top: 1px solid rgba($gold, 0.2);

          .blog-date,
          .blog-views {
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            color: rgba($white, 0.7);

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
          background: linear-gradient(135deg, $gold, $gold-dark);
          color: $dark;
          border: none;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba($gold, 0.4);
            background: linear-gradient(135deg, $gold-dark, $gold);
            color: $dark;
          }
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
