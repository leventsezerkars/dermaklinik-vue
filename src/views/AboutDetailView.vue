<template>
  <div class="about-detail-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">{{ t('about.title') }}</h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Ana İçerik -->
    <section class="main-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- Doktor Hakkında -->
            <div class="content-section">
              <div class="doctor-profile">
                <div class="doctor-image">
                  <img src="/images/dr_mu.jpg" alt="Doç. Dr. Mehmet Ünal - Dermatoloji ve Estetik Uzmanı, 20+ yıllık deneyim" class="profile-img">
                </div>
                <div class="doctor-basic-info">
                  <h2>{{ t('about.doctorProfile.name') }}</h2>
                  <p class="lead">{{ t('about.doctorProfile.description') }}</p>
                </div>
              </div>
              
              <div class="doctor-info">
                <h3>Eğitim ve Uzmanlık</h3>
                <ul>
                  <li>Tıp Fakültesi - Uludağ Üniversitesi</li>
                  <li>Dermatoloji Uzmanlığı - Selçuk Üniversitesi</li>
                  <li>Doçentlik - NEU Deri ve Zührevi Hastalıklar Anabilim Dalı</li>
                  <li>50+ Ulusal ve Uluslararası Kongre Katılımı</li>
                </ul>
              </div>

              <div class="doctor-info">
                <h3>Kariyer Yolculuğu</h3>
                <div class="career-timeline">
                  <div class="timeline-item">
                    <div class="timeline-year">2002-2009</div>
                    <div class="timeline-content">
                      <h4>Uludağ Üniversitesi Tıp Fakültesi</h4>
                      <p>Tıp eğitimini tamamladım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2009</div>
                    <div class="timeline-content">
                      <h4>Mardin Kızıltepe 2 Nolu Sağlık Ocağı</h4>
                      <p>Pratisyen hekim olarak görev yaptım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2009-2014</div>
                    <div class="timeline-content">
                      <h4>Necmettin Erbakan Üniversitesi Meram Tıp Fakültesi</h4>
                      <p>Dahili Tıp Bilimleri Bölümü, Deri ve Zührevi Hastalıklar Anabilim Dalı'ndan uzmanlık aldım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2014-2016</div>
                    <div class="timeline-content">
                      <h4>Konya Numune Hastanesi</h4>
                      <p>Deri ve Zührevi Hastalıklar Kliniği'nde uzman doktor olarak çalıştım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2016-2017</div>
                    <div class="timeline-content">
                      <h4>Selçuk Üniversitesi Tıp Fakültesi</h4>
                      <p>Uzman doktor olarak görev yaptım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2017-2019</div>
                    <div class="timeline-content">
                      <h4>Selçuk Üniversitesi Tıp Fakültesi</h4>
                      <p>Dahili Tıp Bilimleri Bölümü, Deri ve Zührevi Hastalıklar Anabilim Dalı'nda öğretim görevlisi olarak görev aldım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2019</div>
                    <div class="timeline-content">
                      <h4>Özel Mardin Park Hastanesi</h4>
                      <p>Deri ve Zührevi Hastalıklar Uzmanı olarak çalıştım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2020</div>
                    <div class="timeline-content">
                      <h4>Doçentlik Ünvanı</h4>
                      <p>Dermatoloji alanında yapmış olduğum akademik çalışmalar sonucunda Doçentlik ünvanını almaya hak kazandım</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-year">2021-Günümüz</div>
                    <div class="timeline-content">
                      <h4>Dr. MU Klinik Konya</h4>
                      <p>2021 yılından bu yana Konya'da hizmet veren kliniğimiz, modern teknoloji ve uzman kadrosuyla dermatoloji alanında öncü kuruluşlardan biridir. Halen aktif olarak hekimlik ve yöneticilik görevimi sürdürmekteyim</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="doctor-info">
                <h3>Uzmanlık Alanları</h3>
                <ul>
                  <li>Genel Dermatoloji</li>
                  <li>Estetik Dermatoloji</li>
                  <li>Cilt Kanseri Tedavisi</li>
                  <li>Lazer Tedavileri</li>
                  <li>Kozmetik Dermatoloji</li>
                  <li>Pediatrik Dermatoloji</li>
                </ul>
              </div>
            </div>

            <!-- Klinik Hakkında -->
            <div class="content-section">
              <h2>{{ t('about.clinic.title') }}</h2>
              <p>{{ t('about.clinic.description') }}</p>
              
              <div class="clinic-features">
                <div class="feature-grid">
                  <div class="feature-item">
                    <i class="fas fa-microscope"></i>
                    <h4>{{ t('about.clinic.features.laboratory.title') }}</h4>
                    <p>{{ t('about.clinic.features.laboratory.description') }}</p>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-laser"></i>
                    <h4>{{ t('about.clinic.features.laser.title') }}</h4>
                    <p>{{ t('about.clinic.features.laser.description') }}</p>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-shield-alt"></i>
                    <h4>{{ t('about.clinic.features.sterile.title') }}</h4>
                    <p>{{ t('about.clinic.features.sterile.description') }}</p>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-clock"></i>
                    <h4>{{ t('about.clinic.features.service24.title') }}</h4>
                    <p>{{ t('about.clinic.features.service24.description') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Misyon ve Vizyon -->
            <div class="content-section">
              <div class="row">
                <div class="col-md-6">
                  <div class="mission-vision">
                    <h3>{{ t('about.mission.title') }}</h3>
                    <p>{{ t('about.mission.description') }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mission-vision">
                    <h3>{{ t('about.vision.title') }}</h3>
                    <p>{{ t('about.vision.description') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <div class="sidebar">
              <!-- İletişim Bilgileri -->
              <div class="sidebar-widget">
                <h3>{{ t('about.contactTitle') }}</h3>
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>{{ t('common.address') }}:</strong>
                      <p>{{ companyAddress }}</p>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <div>
                      <strong>{{ t('common.phone') }}:</strong>
                      <p>{{ companyPhone }}</p>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                      <strong>{{ t('common.email') }}:</strong>
                      <p>{{ companyEmail }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Çalışma Saatleri -->
              <div class="sidebar-widget">
                <h3>{{ t('common.workingHours') }}</h3>
                <div class="working-hours">
                  <div class="time-item">
                    <span>{{ workingHours }}</span>
                  </div>
                </div>
              </div>

              <!-- Randevu Butonu -->
              <div class="sidebar-widget">
                <a :href="`tel:${companyPhone}`" class="btn btn-primary btn-block">
                  <i class="fas fa-calendar-check me-2"></i>
                  {{ t('about.bookAppointment') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
// @ts-ignore
import fallbackData from '@/data/fallback-data.js'
// @ts-ignore
import { useSEO } from '@/composables/useSEO'

const store = useStore()
const { locale, t } = useI18n()
const { setSEOHead } = useSEO()

// CompanyInfo'dan veri çek
const companyAddress = computed(() => {
  const address = store.getters['companyInfo/companyAddress']
  const fallbackAddress = fallbackData.companyInfo.address
  return address || fallbackAddress
})

const companyPhone = computed(() => {
  const phone = store.getters['companyInfo/companyPhone']
  const fallbackPhone = fallbackData.companyInfo.phone
  return phone || fallbackPhone
})

const companyEmail = computed(() => {
  const email = store.getters['companyInfo/companyEmail']
  const fallbackEmail = fallbackData.companyInfo.email
  return email || fallbackEmail
})

const workingHours = computed(() => {
  const hours = store.getters['companyInfo/workingHours']
  const fallbackHours = fallbackData.companyInfo.workingHours
  return hours || fallbackHours
})

// Store'dan menü öğelerini al
const menuItems = computed(() => store.getters['menu/menuItems'])

// Target'i "/hakkimizda-detay" olan menü öğesini bul
const aboutMenu = computed(() => {
  return menuItems.value.find(item => item.target === '/hakkimizda-detay')
})

// About menüsünün translations content'ini dile göre al
const aboutMenuContent = computed(() => {
  if (!aboutMenu.value || !aboutMenu.value.translations) return ''
  
  const translation = aboutMenu.value.translations.find(t => t.language?.code === locale.value)
  return translation?.content || aboutMenu.value.content || ''
})

onMounted(async () => {
  // CompanyInfo'yu yükle
  await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  
  // SEO bilgilerini ayarla
  setSEOHead({
    title: 'Hakkımızda',
    description: 'Doç. Dr. Mehmet Ünal - Dermatoloji alanında 20+ yıllık deneyime sahip uzman doktorumuz hakkında bilgi alın.',
    keywords: 'hakkımızda, doktor, dermatoloji, uzman, deneyim, kariyer',
    type: 'website'
  })
  
  AOS.init({
    duration: 1000,
    once: true
  })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.about-detail-page {
  background-color: $about-background;
  min-height: 100vh;
  color: $white;
  padding-top: 120px; /* Header yüksekliği kadar üstten boşluk */

  .hero-section {
    background: $about-hero-bg;
    color: $white;
    padding: 4rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $about-hero-overlay;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: $font-weight-bold;
      color: $gold;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: rgba($white, 0.8);
      margin: 0;
    }
  }

  .main-content {
    padding: 4rem 0;
    background-color: $about-background;

    .content-section {
      background: $about-content-bg;
      padding: 2.5rem;
      border-radius: 15px;
      border: 1px solid rgba($gold, 0.2);
      margin-bottom: 2rem;
      transition: $transition-base;

      &:hover {
        background: rgba($white, 0.08);
        border-color: rgba($gold, 0.4);
        transform: translateY(-2px);
      }

      h2 {
        color: $gold;
        font-size: 2.5rem;
        font-weight: $font-weight-bold;
        margin-bottom: 1.5rem;
        border-bottom: 3px solid $gold;
        padding-bottom: 1rem;
      }

      h3 {
        color: $gold;
        font-size: 1.8rem;
        font-weight: $font-weight-semibold;
        margin-bottom: 1rem;
      }

      .lead {
        font-size: 1.2rem;
        color: rgba($white, 0.8);
        margin-bottom: 2rem;
      }

      .doctor-profile {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid rgba($gold, 0.2);

                 .doctor-image {
           flex-shrink: 0;
           width: 200px;
           height: 200px;
           border-radius: 15px;
           overflow: hidden;
           box-shadow: $shadow-lg;

           .profile-img {
             width: 100%;
             height: 100%;
             object-fit: cover;
           }
         }

        .doctor-basic-info {
          h2 {
            color: $gold;
            font-size: 2.5rem;
            font-weight: $font-weight-bold;
            margin-bottom: 0.5rem;
          }

          .lead {
            font-size: 1.2rem;
            color: rgba($white, 0.8);
            margin-bottom: 0;
          }
        }
      }

      // İçerideki doctor-info class'ları için stil
      :deep(.doctor-info) {
        margin-bottom: 2rem;
      }
      
      .doctor-info {
        margin-bottom: 2rem;

        ul {
          list-style: none;
          padding: 0;

          li {
            padding: 0.8rem 0;
            border-bottom: 1px solid rgba($gold, 0.2);
            color: rgba($white, 0.8);
            font-size: 1.1rem;
            transition: $transition-base;

            &:hover {
              color: $white;
              padding-left: 0.5rem;
            }

            &:before {
              content: '✓';
              color: $gold;
              font-weight: $font-weight-bold;
              margin-right: 1rem;
            }

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }

      .career-timeline {
        position: relative;
        padding-left: 7rem;
        margin-top: 1rem;

        &::before {
          content: '';
          position: absolute;
          left: 7rem;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: $gold;
          border-radius: 3px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 3.5rem;

          &:last-child {
            margin-bottom: 0;
          }

          &::before {
            content: '';
            position: absolute;
            left: -0.5rem;
            top: 1.5rem;
            width: 20px;
            height: 20px;
            background-color: $gold;
            border-radius: 50%;
            border: 4px solid $about-background;
            z-index: 1;
            box-shadow: 0 0 0 2px rgba($gold, 0.3);
          }

          .timeline-year {
            position: absolute;
            left: -137px;
            top: 0;
            width: 140px;
            text-align: left;
            color: $gold;
            font-size: 0.85rem;
            font-weight: $font-weight-semibold;
            margin-top: 1rem;
            background: rgba($gold, 0.15);
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            border: 1px solid rgba($gold, 0.4);
            white-space: nowrap;
            box-shadow: $shadow-sm;
          }

          .timeline-content {
            background: $about-timeline-bg;
            padding: 1.8rem;
            border-radius: 12px;
            border: 1px solid rgba($gold, 0.2);
            transition: $transition-base;
            position: relative;
            margin-left: 0;
            box-shadow: $shadow-md;

            &:hover {
              background: rgba($gold, 0.15);
              border-color: $gold;
              box-shadow: $shadow-lg;
              transform: translateX(8px);
            }

            h4 {
              color: $gold;
              font-size: 1.3rem;
              font-weight: $font-weight-semibold;
              margin-bottom: 0.8rem;
            }

            p {
              color: rgba($white, 0.8);
              margin: 0;
              line-height: 1.6;
              font-size: 1rem;
            }
          }
        }
      }

      .clinic-features {
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;

          .feature-item {
            text-align: center;
            padding: 1.5rem;
            background: $about-feature-bg;
            border-radius: 10px;
            border: 1px solid rgba($gold, 0.2);
            transition: $transition-base;

            &:hover {
              transform: translateY(-5px);
              background: rgba($gold, 0.15);
              border-color: $gold;
              box-shadow: $shadow-lg;
            }

            i {
              font-size: 2.5rem;
              color: $gold;
              margin-bottom: 1rem;
            }

            h4 {
              color: $gold;
              font-size: 1.3rem;
              font-weight: $font-weight-semibold;
              margin-bottom: 1rem;
            }

            p {
              color: rgba($white, 0.8);
              margin: 0;
            }
          }
        }
      }

      .mission-vision {
        background: rgba($gold, 0.1);
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid $gold;
        transition: $transition-base;

        &:hover {
          background: rgba($gold, 0.15);
          transform: translateX(5px);
        }

        h3 {
          color: $gold;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        p {
          color: rgba($white, 0.8);
          margin: 0;
        }
      }
    }

    .sidebar {
      .sidebar-widget {
        background: $about-content-bg;
        padding: 2rem;
        border-radius: 15px;
        border: 1px solid rgba($gold, 0.2);
        margin-bottom: 2rem;
        transition: $transition-base;

        &:hover {
          background: rgba($white, 0.08);
          border-color: rgba($gold, 0.4);
          transform: translateY(-2px);
        }

        h3 {
          color: $gold;
          font-size: 1.5rem;
          font-weight: $font-weight-semibold;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid $gold;
          padding-bottom: 0.5rem;
        }

        .contact-info {
          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 0.8rem;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
              background: rgba($gold, 0.1);
            }

            i {
              color: $gold;
              font-size: 1.2rem;
              margin-top: 0.2rem;
            }

            div {
              strong {
                color: $gold;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              p {
                color: rgba($white, 0.8);
                margin: 0.5rem 0 0 0;
              }
            }
          }
        }

        .working-hours {
          .time-item {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem;
            border-bottom: 1px solid rgba($gold, 0.2);
            transition: $transition-base;

            &:hover {
              background: rgba($gold, 0.1);
              padding-left: 1rem;
            }

            &:last-child {
              border-bottom: none;
            }

            span {
              color: rgba($white, 0.8);
              font-size: 1rem;

              &:first-child {
                font-weight: $font-weight-medium;
                color: $gold;
              }
            }
          }
        }

        .btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: $font-weight-semibold;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 50px;
          background: $gold;
          color: $dark;
          border: none;
          transition: $transition-base;

          &:hover {
            background: $white;
            color: $dark;
            transform: translateY(-2px);
            box-shadow: $shadow-lg;
          }
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .about-detail-page {
    .hero-section {
      .hero-title {
        font-size: 2.8rem;
      }
    }

    .main-content {
      .content-section {
        h2 {
          font-size: 2rem;
        }

                 .doctor-profile {
           .doctor-image {
             width: 180px;
             height: 180px;
           }

          .doctor-basic-info {
            h2 {
              font-size: 2.2rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .about-detail-page {
    padding-top: 100px; /* Mobilde daha az padding */
    
    .hero-section {
      padding: 3rem 0;

      .hero-title {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }
    }

    .main-content {
      padding: 2rem 0;

      .content-section {
        padding: 1.5rem;

                 .doctor-profile {
           flex-direction: column;
           align-items: flex-start;
           gap: 1rem;
           padding-bottom: 1rem;

           .doctor-image {
             width: 160px;
             height: 160px;
           }

          .doctor-basic-info {
            h2 {
              font-size: 2rem;
            }
            .lead {
              font-size: 1rem;
            }
          }
        }

        .career-timeline {
          padding-left: 1rem;

          &::before {
            left: 0.5rem;
          }

          .timeline-item {
            padding-left: 1.5rem;
            margin-bottom: 2rem;

            &::before {
              left: -0.75rem;
            }

            .timeline-year {
              position: static;
              width: auto;
              text-align: left;
              margin-bottom: 0.8rem;
              display: inline-block;
              left: auto;
              top: auto;
            }

            .timeline-content {
              margin-top: 0;
              margin-left: 0;
            }
          }
        }

        .clinic-features {
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      }

      .sidebar {
        margin-top: 2rem;
      }
    }
  }
}
</style>
