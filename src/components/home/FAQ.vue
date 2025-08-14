<template>
  <section id="sss" class="faq-section">
    <div class="container">
      <div class="section-title text-center" data-aos="fade-up">
        <h2>{{ $t('home.faq.title') }}</h2>
        <p>{{ $t('home.faq.subtitle') }}</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="accordion custom-accordion" id="faqAccordion">
            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  {{ $t('home.faq.questions.appointment.question') }}
                </button>
              </h2>
              <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  {{ $t('home.faq.questions.appointment.answer') }}
                </div>
              </div>
            </div>

            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  {{ $t('home.faq.questions.examinationFee.question') }}
                </button>
              </h2>
              <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  {{ $t('home.faq.questions.examinationFee.answer') }}
                </div>
              </div>
            </div>

            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                  {{ $t('home.faq.questions.treatmentDuration.question') }}
                </button>
              </h2>
              <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  {{ $t('home.faq.questions.treatmentDuration.answer') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50
  })
})
</script>

<style lang="scss">
@use '@/assets/styles/components/home/FAQ.scss';
</style> 