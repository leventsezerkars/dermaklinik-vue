<template>
  <section class="blog-section py-5">
    <div class="container">
      <div class="section-title text-center mb-5">
        <h1>Blog</h1>
        <p>Dermatoloji ve Cilt Sağlığı Hakkında Güncel Bilgiler</p>
      </div>
      
      <div class="row g-4">
        <div v-for="post in posts" :key="post.id" class="col-lg-4 col-md-6">
          <BlogCard :post="post" />
        </div>
      </div>

      <!-- Pagination -->
      <nav class="mt-5" v-if="totalPages > 1">
        <ul class="pagination justify-content-center">
          <li :class="['page-item', { disabled: currentPage === 1 }]">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Önceki</a>
          </li>
          <li v-for="page in totalPages" :key="page" :class="['page-item', { active: page === currentPage }]">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li :class="['page-item', { disabled: currentPage === totalPages }]">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Sonraki</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BlogCard from './BlogCard.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('blog/fetchPosts')
})

const posts = computed(() => store.getters['blog/allPosts'])
const currentPage = computed(() => store.state.blog.pagination.currentPage)
const totalPages = computed(() => store.state.blog.pagination.totalPages)

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    store.dispatch('blog/fetchPosts', { page })
  }
}
</script>

<style scoped>
.blog-section {
  background-color: var(--light-bg);
}

.section-title h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-title p {
  color: var(--text-color);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.pagination {
  gap: 5px;
}

.page-link {
  color: var(--primary-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.page-link:hover {
  background-color: var(--primary-color);
  color: white;
}

.page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.page-item.disabled .page-link {
  color: var(--text-muted);
  pointer-events: none;
  background-color: transparent;
}

@media (max-width: 768px) {
  .section-title h1 {
    font-size: 2rem;
  }

  .page-link {
    padding: 8px 15px;
  }
}
</style> 