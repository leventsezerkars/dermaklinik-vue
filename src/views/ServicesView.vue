<template>
  <div class="services-page">
    <!-- Başlık Bölümü -->
    <section class="services-hero bg-light py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 mb-4">Hizmetlerimiz</h1>
            <p class="lead">
              Doç. Dr. Mehmet Ünal olarak, modern dermatoloji ve estetik tedavi yöntemleriyle
              sizlere en iyi hizmeti sunmayı amaçlıyoruz.
            </p>
          </div>
          <div class="col-lg-6">
            <img src="/images/services-hero.jpg" alt="Dermatoloji Hizmetleri" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </section>

    <!-- Hizmetler Listesi -->
    <section class="services-list py-5">
      <div class="container">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Yükleniyor...</span>
          </div>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <div v-else class="row g-4">
          <div v-for="service in services" :key="service.id" class="col-md-6 col-lg-4">
            <router-link :to="{ name: 'service-detail', params: { slug: service.slug }}" class="text-decoration-none">
              <div class="card h-100 service-card border-0 shadow-sm">
                <img :src="service.image" :alt="service.title" class="card-img-top">
                <div class="card-body">
                  <span class="badge bg-primary mb-2">{{ service.category }}</span>
                  <h3 class="card-title h5">{{ service.title }}</h3>
                  <p class="card-text text-muted">{{ service.shortDescription }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Bölümü -->
    <section class="cta-section bg-primary text-white py-5">
      <div class="container text-center">
        <h2 class="mb-4">Sağlıklı ve Güzel Bir Cilt İçin</h2>
        <p class="lead mb-4">
          Uzman kadromuz ve modern teknolojilerimizle sizlere en iyi hizmeti sunmaya hazırız.
        </p>
        <router-link to="/iletisim" class="btn btn-light btn-lg">
          Randevu Alın
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'

const store = useStore()
const services = ref([])
const loading = ref(true)
const error = ref(null)

// Sayfa başlığını ayarla
useHead({
  title: 'Hizmetlerimiz - Doç. Dr. Mehmet Ünal',
  meta: [
    {
      name: 'description',
      content: 'Doç. Dr. Mehmet Ünal dermatoloji kliniğinde sunulan tüm dermatoloji ve estetik tedavi hizmetleri hakkında detaylı bilgi.'
    }
  ]
})

onMounted(async () => {
  try {
    await store.dispatch('services/fetchServices')
    services.value = store.state.services.services
  } catch (err) {
    error.value = 'Hizmetler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card img {
  height: 200px;
  object-fit: cover;
}

.cta-section {
  background: linear-gradient(45deg, var(--bs-primary) 0%, var(--bs-primary-dark) 100%);
}
</style> 