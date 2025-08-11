<template>
  <section id="sss" class="faq-section">
    <div class="container">
      <div class="section-title text-center" data-aos="fade-up">
        <h2>Sıkça Sorulan Sorular</h2>
        <p>Merak ettiğiniz soruların cevapları</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="accordion custom-accordion" id="faqAccordion">
            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  Randevu almak için ne yapmam gerekiyor?
                </button>
              </h2>
              <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Randevu almak için WhatsApp hattımızdan, telefon numaramızdan veya web sitemizdeki randevu formundan bize ulaşabilirsiniz. Size en uygun günü ve saati belirleyerek randevunuzu oluşturabiliriz.
                </div>
              </div>
            </div>

            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  İlk muayene ücreti ne kadar?
                </button>
              </h2>
              <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Muayene ücretlerimiz hakkında güncel bilgi almak için bize ulaşabilirsiniz. Farklı tedavi seçenekleri için özel fiyat politikamız bulunmaktadır.
                </div>
              </div>
            </div>

            <div class="accordion-item" data-aos="fade-up">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                  Tedavi süreleri ne kadar sürüyor?
                </button>
              </h2>
              <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Tedavi süreleri, uygulanacak tedavi yöntemine ve kişinin durumuna göre değişiklik gösterebilir. Detaylı bilgi için muayene sonrası doktorunuz size özel bir tedavi planı oluşturacaktır.
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