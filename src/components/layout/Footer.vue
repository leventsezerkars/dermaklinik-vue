<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="footer-info">
              <div class="footer-logo">
                <img src="/images/logo_beyaz.png" alt="Logo" height="70">
                <span class="brand-text">DOÇ. DR. MEHMET ÜNAL</span>
              </div>
              <p class="mt-3">20 yıllık tecrübemizle modern dermatoloji çözümleri sunuyoruz. Sağlıklı ve güzel bir cilt için yanınızdayız.</p>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-links">
              <h4>Hızlı Bağlantılar</h4>
              <ul>
                <li><router-link to="/">Ana Sayfa</router-link></li>
                <li><router-link to="#hakkimizda">Hakkımızda</router-link></li>
                <li><router-link to="#hizmetler">Hizmetler</router-link></li>
                <li><router-link to="#galeri">Galeri</router-link></li>
                <li><router-link to="#contact">İletişim</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="footer-links">
              <h4>Hizmetlerimiz</h4>
              <ul>
                <li><router-link to="#genel">Genel Dermatoloji</router-link></li>
                <li><router-link to="#estetik">Estetik Dermatoloji</router-link></li>
                <li><router-link to="#lazer">Lazer Tedavileri</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="footer-contact">
              <h4>İletişim Bilgileri</h4>
              <div class="contact-info">
                <p><i class="fas fa-map-marker-alt"></i> Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya</p>
                <p><i class="fas fa-phone"></i> +90 546 529 76 77</p>
                <p><i class="fas fa-envelope"></i> dr.munal1101@gmail.com</p>
                <p><i class="fas fa-clock"></i> Pazartesi - Cumartesi: 09:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">&copy; 2024 Doç. Dr. Mehmet Ünal. Tüm hakları saklıdır.</p>
          </div>
          <div class="col-md-6 text-end">
            <div class="footer-bottom-links">
              <a href="#">Gizlilik Politikası</a>
              <a href="#">Kullanım Koşulları</a>
              <a href="#">KVKK</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import '@/assets/styles/components/layout/_Footer.scss';
</script>

<style lang="scss">
@use "sass:color";

.footer {
  .social-links {
    a {
      &:hover {
        background-color: color.adjust(#D4AF37, $lightness: -10%);
        border-color: color.adjust(#D4AF37, $lightness: -10%);
      }
    }
  }

  .footer-links {
    a {
      &:hover {
        color: color.adjust(#D4AF37, $lightness: -10%);
      }
    }
  }
}
</style> 