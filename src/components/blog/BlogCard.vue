<template>
  <div class="blog-card">
    <div class="blog-image">
      <img :src="post.image" :alt="post.title">
    </div>
    <div class="blog-content">
      <div class="blog-meta">
        <span><i class="far fa-calendar"></i> {{ formatDate(post.date) }}</span>
        <span><i class="far fa-user"></i> {{ post.author }}</span>
      </div>
      <h3><router-link :to="postLink">{{ post.title }}</router-link></h3>
      <p>{{ post.excerpt }}</p>
      <router-link :to="postLink" class="btn btn-outline-primary">Devamını Oku</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const postLink = computed(() => `/blog/${props.post.slug}`)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.1);
}

.blog-content {
  padding: 25px;
}

.blog-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.blog-meta span {
  color: var(--text-muted);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.blog-meta i {
  color: var(--primary-color);
}

.blog-content h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
}

.blog-content h3 a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-content h3 a:hover {
  color: var(--secondary-color);
}

.blog-content p {
  color: var(--text-color);
  margin-bottom: 20px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .blog-image {
    height: 200px;
  }

  .blog-content {
    padding: 20px;
  }

  .blog-content h3 {
    font-size: 1.25rem;
  }

  .blog-meta {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 