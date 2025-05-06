<template>
  <div class="blog-detail">
    <div class="blog-header" :style="{ backgroundImage: `url(${post.image})` }">
      <div class="container">
        <div class="blog-title">
          <h1>{{ post.title }}</h1>
          <div class="blog-meta">
            <span><i class="far fa-calendar"></i> {{ formatDate(post.date) }}</span>
            <span><i class="far fa-user"></i> {{ post.author }}</span>
            <span><i class="far fa-folder"></i> {{ post.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8">
          <div class="blog-detail-content">
            <div class="blog-excerpt">
              <p>{{ post.excerpt }}</p>
            </div>

            <div v-html="post.content"></div>

            <div class="blog-tags mt-5">
              <h3>Etiketler</h3>
              <router-link 
                v-for="tag in post.tags" 
                :key="tag"
                :to="`/blog/etiket/${tag}`"
                class="blog-tag"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <aside class="blog-sidebar">
            <div class="sidebar-widget">
              <h3>Son Yazılar</h3>
              <ul class="recent-posts">
                <li v-for="recentPost in recentPosts" :key="recentPost.id">
                  <router-link :to="`/blog/${recentPost.slug}`">
                    {{ recentPost.title }}
                  </router-link>
                  <span>{{ formatDate(recentPost.date) }}</span>
                </li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <h3>Kategoriler</h3>
              <ul class="blog-categories">
                <li v-for="category in categories" :key="category.name">
                  <router-link :to="`/blog/kategori/${category.slug}`">
                    {{ category.name }} <span>({{ category.count }})</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const store = useStore()
const route = useRoute()

onMounted(async () => {
  const slug = route.params.slug
  await store.dispatch('blog/fetchPostBySlug', slug)
  await store.dispatch('blog/fetchRecentPosts')
})

const post = computed(() => store.getters['blog/currentPost'])
const recentPosts = computed(() => store.getters['blog/recentPosts'])
const categories = computed(() => store.getters['blog/categories'])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: computed(() => `${post.value?.title} - Doç. Dr. Mehmet Ünal`),
  meta: [
    {
      name: 'description',
      content: computed(() => post.value?.excerpt || '')
    }
  ]
})
</script>

<style scoped>
.blog-header {
  position: relative;
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  color: white;
  padding: 50px 0;
}

.blog-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
}

.blog-title {
  position: relative;
  z-index: 1;
}

.blog-title h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  gap: 20px;
}

.blog-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
}

.blog-meta i {
  color: var(--secondary-color);
}

.blog-detail-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.blog-excerpt {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.blog-tags {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.blog-tag {
  display: inline-block;
  padding: 5px 15px;
  margin: 5px;
  background-color: var(--light-bg);
  color: var(--primary-color);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.blog-tag:hover {
  background-color: var(--primary-color);
  color: white;
}

.sidebar-widget {
  background: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.sidebar-widget h3 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color);
}

.recent-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-posts li {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.recent-posts li:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.recent-posts a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  margin-bottom: 5px;
}

.recent-posts a:hover {
  color: var(--primary-color);
}

.recent-posts span {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.blog-categories {
  list-style: none;
  padding: 0;
  margin: 0;
}

.blog-categories li {
  margin-bottom: 10px;
}

.blog-categories a {
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.blog-categories a:hover {
  background-color: var(--light-bg);
  color: var(--primary-color);
}

.blog-categories span {
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 991px) {
  .blog-sidebar {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .blog-header {
    height: 300px;
  }

  .blog-title h1 {
    font-size: 2rem;
  }

  .blog-meta {
    flex-direction: column;
    gap: 10px;
  }

  .blog-detail-content {
    padding: 20px;
  }
}
</style> 