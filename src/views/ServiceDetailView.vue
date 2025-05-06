<template>
  <div class="service-detail">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Yükleniyor...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="container py-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Ana Sayfa</router-link></li>
          <li class="breadcrumb-item"><router-link to="/#hizmetler">Hizmetler</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ service.title }}</li>
        </ol>
      </nav>

      <!-- Service Header -->
      <div class="row mb-5">
        <div class="col-lg-6">
          <img :src="service.image" :alt="service.title" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-6">
          <h1 class="display-4 mb-4">{{ service.title }}</h1>
          <div class="service-info">
            <div v-if="service.duration" class="mb-3">
              <i class="fas fa-clock me-2"></i>
              <strong>Süre:</strong> {{ service.duration }}
            </div>
            <div v-if="service.session" class="mb-3">
              <i class="fas fa-calendar-check me-2"></i>
              <strong>Seans:</strong> {{ service.session }}
            </div>
            <div v-if="service.recovery" class="mb-3">
              <i class="fas fa-bed me-2"></i>
              <strong>İyileşme Süresi:</strong> {{ service.recovery }}
            </div>
            <div v-if="service.anesthesia" class="mb-3">
              <i class="fas fa-syringe me-2"></i>
              <strong>Anestezi:</strong> {{ service.anesthesia }}
            </div>
          </div>
        </div>
      </div>

      <!-- Service Content -->
      <div class="service-content mb-5" v-html="service.content"></div>

      <!-- FAQs -->
      <div v-if="service.faqs && service.faqs.length" class="service-faqs">
        <h2 class="mb-4">Sık Sorulan Sorular</h2>
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item" v-for="(faq, index) in service.faqs" :key="index">
            <h3 class="accordion-header">
              <button class="accordion-button" type="button" :data-bs-target="'#faq' + index" 
                      data-bs-toggle="collapse" :aria-expanded="index === 0">
                {{ faq.question }}
              </button>
            </h3>
            <div :id="'faq' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }" 
                 data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-5">
        <h3 class="mb-4">Detaylı Bilgi ve Randevu İçin</h3>
        <router-link to="/iletisim" class="btn btn-primary btn-lg">
          <i class="fas fa-calendar-alt me-2"></i>
          Randevu Alın
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ServiceService from '../services/ServiceService'
import { useHead } from '@vueuse/head'

const route = useRoute()
const service = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const slug = route.params.slug
    service.value = await ServiceService.getServiceBySlug(slug)
    useHead({
      title: `${service.value.title} - Doç. Dr. Mehmet Ünal`,
      meta: [
        {
          name: 'description',
          content: service.value.description
        }
      ]
    })
  } catch (err) {
    error.value = 'Hizmet detayları yüklenirken bir hata oluştu.'
    console.error('Hizmet detay hatası:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.service-detail {
  min-height: 60vh;
}

.service-content {
  line-height: 1.8;
}

.service-content h2 {
  color: var(--bs-primary);
  margin: 2rem 0 1rem;
}

.service-content ul {
  padding-left: 1.5rem;
}

.service-info {
  font-size: 1.1rem;
}

.service-info i {
  color: var(--bs-primary);
}

.accordion-button:not(.collapsed) {
  background-color: var(--bs-primary);
  color: white;
}

.btn-primary {
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .service-header h1 {
    font-size: 2rem;
    margin-top: 1.5rem;
  }
}
</style> 