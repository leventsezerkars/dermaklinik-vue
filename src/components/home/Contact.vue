<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="contact-form-wrapper">
            <h2>Doktorunuza Sorun</h2>
            <p>Sorularınız için formu doldurun, en kısa sürede size dönüş yapalım.</p>
            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="form.firstName" placeholder="Adınız">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="form.lastName" placeholder="Soyadınız">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" v-model="form.email" placeholder="E-posta Adresiniz">
              </div>
              <div class="form-group">
                <input type="tel" class="form-control" v-model="form.phone" placeholder="Telefon Numaranız">
              </div>
              <div class="form-group">
                <select class="form-select" v-model="form.service">
                  <option value="">Hizmet Seçiniz</option>
                  <option value="genel">Genel Dermatoloji</option>
                  <option value="estetik">Estetik Dermatoloji</option>
                  <option value="lazer">Lazer Tedavileri</option>
                  <option value="sac">Saç Tedavileri</option>
                </select>
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="5" v-model="form.message" placeholder="Mesajınız"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Gönder</button>
            </form>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="map-wrapper h-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1324.3769308986002!2d32.44742075994305!3d37.8622338918696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08506268d51bd%3A0xd23e3de31bae298!2sDo%C3%A7.%20Dr.%20Mehmet%20Unal%20Dermatoloji%20Klini%C4%9Fi!5e0!3m2!1str!2str!4v1676893648669!5m2!1str!2str"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="map-info">
              <div class="map-buttons">
                <a href="https://www.google.com/maps/dir//Ate%C5%9Fbaz+Veli+Mahallesi,+Yeni+Meram+Cd.+No:83+D:4,+42090+Meram%2FKonya/@37.8746357,32.4565924,17z" 
                   target="_blank" 
                   class="btn btn-primary">
                  <i class="fas fa-directions"></i>
                  <span>Yol Tarifi Al</span>
                </a>
                <a href="tel:+905465297677" 
                   class="btn btn-outline-primary">
                  <i class="fas fa-phone"></i>
                  <span>Hemen Ara</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const handleSubmit = async () => {
  try {
    console.log('Form submitted:', form.value)
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    }
  } catch (error) {
    console.error('Form submission error:', error)
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Contact.scss';
</style> 