<template>
  <section class="services-section" id="hizmetler">
    <div class="container">
      <div class="section-title text-center" data-aos="fade-up">
        <h2>Hizmetlerimiz</h2>
        <p>Dermatoloji ve estetik alanında uzman kadromuzla yanınızdayız</p>
      </div>

      <!-- Cilt Gençleştirme ve Yenileme -->
      <div class="service-category mb-5" id="genel">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-content">
              <h3>Genel Dermatoloji</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/akne-sivilce-tedavisi">
                  <div class="service-item laser">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div class="service-content">
                      <h4>Akne(Sivilce) Tedavileri</h4>
                      <p>Yağ dengesini bozan sivilcelere etkili çözümler uyguluyoruz.</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/rosacea-gul-hastaligi-tedavisi">
                  <div class="service-item prp">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-droplet"></i>
                    </div>
                    <div class="service-content">
                      <h4>Rosasea(Gül) Hastalığı</h4>
                      <p>Yanaklardaki kızarıklı ve hassasiyeti kontrol altına alıyoruz</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/sigil-ben-tedavisi">
                  <div class="service-item mezo">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-syringe"></i>
                    </div>
                    <div class="service-content">
                      <h4>Siğil ve Ben Tedavileri</h4>
                      <p>Ciltteki istenmeyen oluşumları güvenle ve iz bırakmadan gideriyoruz.</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/sac-dokulmesi-ve-sac-tedavileri">
                  <div class="service-item dna">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-dna"></i>
                    </div>
                    <div class="service-content">
                      <h4>Saç Dökülmesi Tedavileri</h4>
                      <p>Güçsüzleşen saçlar için analiz ve kişiye özel tedavi uyguluyoruz.</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-image">
              <img 
                src="/images/w6.jpg" 
                alt="Cilt Gençleştirme ve Yenileme"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Estetik Uygulamalar -->
      <div class="service-category mb-5" id="estetik">
        <div class="row align-items-center flex-row-reverse">
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-content">
              <h3>Estetik Dermatoloji</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/botoks-uygulamasi">
                  <div class="service-item botox">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-wand-magic"></i>
                    </div>
                    <div class="service-content">
                      <h4>Botoks Uygulamaları</h4>
                      <p>Kırışıklık, migren, terleme ve diş sıkma gibi problemleri tedavi ediyoruz.</p>
                    </div>
                  </div>                  
                </router-link>
                <router-link class="service-link" to="/hizmetler/dolgu-uygulamasi">
                  <div class="service-item dolgu">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-fill-drip"></i>
                    </div>
                    <div class="service-content">
                      <h4>Dolgu Uygulamaları</h4>
                      <p>Dudak, çene, yanak, göz altı ve nazolobial çizgileri hafifleterek yüzünüze hacim ve ifade kazandırıyoruz</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/leke-tedavisi">
                  <div class="service-item genclik">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="service-content">
                      <h4>Leke Tedavileri</h4>
                      <p>Farklı cihazlarımızla güneş, yaş, kılcal damar ve akne lekelerini hedef alıyor, cilt tonunuzu eşitliyoruz.</p>
                    </div>
                  </div>
                </router-link>
                <router-link class="service-link" to="/hizmetler/iple-yuz-askilama">
                  <div class="service-item sikilastirma">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-arrows-to-circle"></i>
                    </div>
                    <div class="service-content">
                      <h4>Lifting & Yüz Germe</h4>
                      <p>İp askı veya cihazlarla yüz hatlarını toparlıyor cildinize genç ve sıkı bir görünüm kazandırıyoruz.</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-image">
              <img 
                src="/images/w1.jpg" 
                alt="Estetik Uygulamalar"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Saç ve Kaş Uygulamaları -->
      <div class="service-category" id="lazer">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="service-category-content">
              <h3>Lazer Tedavileri</h3>
              <div class="service-list">
                <router-link class="service-link" to="/hizmetler/veloce-bb-light">
                  <div class="service-item sac-mezo">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-spray-can"></i>
                    </div>
                    <div class="service-content">
                      <h4>Veloce BB Lazer</h4>
                      <p>Cilt tonunu eşitleyen, leke ve kızarıklıkları hedef alan son teknoloji lazer sistemidir</p>
                    </div>
                  </div>
                </router-link>

                <router-link class="service-link" to="/hizmetler/fraksiyonel-karbondioksit-co2-lazer">
                  <div class="service-item sac-prp">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-droplet"></i>
                    </div>
                    <div class="service-content">
                      <h4>Fraksiyonel Karbondioksit Lazer</h4>
                      <p>Cilt yenileme, leke, iz, gözenek ve kırışıklık tedavisinde etkili; cildi soyma ve yenileme sağlar.</p>
                    </div>
                  </div>
                </router-link>

                <router-link class="service-link" to="/hizmetler/secret-altin-igne-fraksiyonel-radyofrekans">
                  <div class="service-item kas">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="service-content">
                      <h4>Altın İğne (Fraksiyonel Radyofrekans)</h4>
                      <p>Kollajen üretimini arttırarak gözenek, iz ve sıkılaşma problemlerine çözüm sunar.</p>
                    </div>
                  </div>
                </router-link>
                
                <router-link class="service-link" to="/hizmetler/piko-saniye-lazer">
                  <div class="service-item kas">
                    <div class="service-icon-wrapper">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="service-content">
                      <h4>Pikosaniye Lazer</h4>
                      <p>Hızlı atış gücüyle dövme silmede izsiz ve etkili sonuçlar sunar</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="service-category-image">
              <img 
                src="/images/w7.jpg" 
                alt="Saç ve Kaş Uygulamaları"
                loading="lazy"
              >
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
    duration: 1000,
    once: true
  })
})
</script>

<style lang="scss">
@use '@/assets/styles/components/home/Services.scss';
</style> 