<template>
  <div class="blog-page">
    <div class="page-header">
      <div class="container">
        <h1>Blog</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Ana Sayfa</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Blog</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container py-5">
      <div class="row g-4">
        <div v-for="post in blogPosts" :key="post.id" class="col-md-6 col-lg-4">
          <div class="card blog-card h-100">
            <img :src="post.image" class="card-img-top" :alt="post.title">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.excerpt }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <router-link :to="{ name: 'blog-detail', params: { slug: post.slug }}" class="btn btn-primary">
                  Devamını Oku
                </router-link>
                <small class="text-muted">{{ post.date }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const blogPosts = ref([
  {
    id: 1,
    title: 'Akne Tedavisinde Yeni Yaklaşımlar',
    excerpt: 'Modern tıbbın akne tedavisinde sunduğu yeni çözümler ve etkili tedavi yöntemleri hakkında detaylı bilgi.',
    image: '/images/blog/akne-tedavisi.jpg',
    slug: 'akne-tedavisinde-yeni-yaklasimlar',
    date: '15 Ocak 2024'
  },
  {
    id: 2,
    title: 'Cilt Gençleştirme Yöntemleri',
    excerpt: 'Yaşlanma karşıtı tedaviler ve cilt gençleştirme uygulamaları hakkında kapsamlı rehber.',
    image: '/images/blog/cilt-genclestirme.jpg',
    slug: 'cilt-genclestirme-yontemleri',
    date: '10 Ocak 2024'
  },
  {
    id: 3,
    title: 'Leke Tedavisinde Doğru Bilinen Yanlışlar',
    excerpt: 'Cilt lekelerinin tedavisi konusunda sık karşılaşılan mitler ve gerçekler.',
    image: '/images/blog/leke-tedavisi.jpg',
    slug: 'leke-tedavisinde-dogru-bilinen-yanlislar',
    date: '5 Ocak 2024'
  }
])
</script>

<style scoped>
.page-header {
  background-color: var(--bs-light);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.blog-card {
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-card img {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.card-text {
  color: var(--bs-gray-700);
  margin-bottom: 1rem;
}

.breadcrumb {
  margin-bottom: 0;
}

.breadcrumb-item a {
  color: var(--bs-primary);
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}
</style> 