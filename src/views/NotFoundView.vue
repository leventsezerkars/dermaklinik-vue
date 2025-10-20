<template>
  <div class="not-found-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">404</h1>
            <h2 class="hero-subtitle">Sayfa Bulunamadı</h2>
            <p class="hero-description">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="error-content">
              <div class="error-icon">
                <i class="fas fa-search"></i>
              </div>
              
              <h3>Ne aramıştınız?</h3>
              <p class="error-message">
                Aradığınız sayfa bulunamadı. Belki aşağıdaki linklerden birini aradınız:
              </p>

              <div class="suggested-links">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <router-link to="/" class="suggested-link">
                      <i class="fas fa-home"></i>
                      <span>Ana Sayfa</span>
                    </router-link>
                  </div>
                  <div class="col-md-4 mb-3">
                    <router-link to="/hakkimizda-detay" class="suggested-link">
                      <i class="fas fa-user-md"></i>
                      <span>Hakkımızda</span>
                    </router-link>
                  </div>
                  <div class="col-md-4 mb-3">
                    <router-link to="/blog" class="suggested-link">
                      <i class="fas fa-blog"></i>
                      <span>Blog</span>
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="search-box">
                <h4>Hızlı Arama</h4>
                <div class="input-group">
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    class="form-control" 
                    placeholder="Aradığınızı yazın..."
                    @keyup.enter="performSearch"
                  >
                  <button @click="performSearch" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <div class="contact-info">
                <h4>Yardıma mı ihtiyacınız var?</h4>
                <p>Bizimle iletişime geçin:</p>
                <div class="contact-links">
                  <a :href="`tel:${contactInfo.phone}`" class="contact-link">
                    <i class="fas fa-phone"></i>
                    {{ contactInfo.phone }}
                  </a>
                  <a :href="`mailto:${contactInfo.email}`" class="contact-link">
                    <i class="fas fa-envelope"></i>
                    {{ contactInfo.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import fallbackData from '@/data/fallback-data'

const store = useStore()
const router = useRouter()
const { setSEOHead } = useSEO()

const searchQuery = ref('')

// Company bilgilerini store'dan al
const companyInfo = computed(() => store.getters['companyInfo/activeCompanyInfo'])

// İletişim bilgileri - önce companyInfo'dan, yoksa fallback'ten
const contactInfo = computed(() => {
  const company = companyInfo.value
  const fallback = fallbackData.companyInfo
  
  return {
    phone: company?.phone || fallback.phone,
    email: company?.email || fallback.email
  }
})

// Arama fonksiyonu
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Basit arama - ana sayfaya yönlendir ve arama terimini query olarak gönder
    router.push({
      path: '/',
      query: { search: searchQuery.value.trim() }
    })
  }
}

onMounted(async () => {
  // CompanyInfo'yu yükle
  await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  
  // SEO bilgilerini ayarla
  setSEOHead({
    title: 'Sayfa Bulunamadı - 404',
    description: 'Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya bizimle iletişime geçin.',
    keywords: '404, sayfa bulunamadı, hata, dermatoloji',
    type: 'website'
  })
})
</script>

<style lang="scss" scoped>
.not-found-page {
  background-color: #111111;
  min-height: 100vh;
  color: #ffffff;
  padding-top: 120px;

  .hero-section {
    background: linear-gradient(135deg, #111111 0%, #2c2c2c 100%);
    color: white;
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
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 8rem;
      font-weight: 700;
      color: #D4AF37;
      margin-bottom: 1rem;
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
    }

    .hero-subtitle {
      font-size: 2.5rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 1rem;
    }

    .hero-description {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }

  .main-content {
    padding: 4rem 0;
    background-color: #111111;

    .error-content {
      background: rgba(255, 255, 255, 0.05);
      padding: 3rem;
      border-radius: 15px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(212, 175, 55, 0.4);
        transform: translateY(-2px);
      }

      .error-icon {
        font-size: 4rem;
        color: #D4AF37;
        margin-bottom: 2rem;
      }

      h3 {
        color: #D4AF37;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .error-message {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }

      .suggested-links {
        margin: 2rem 0;

        .suggested-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(212, 175, 55, 0.2);
            border-color: #D4AF37;
            transform: translateY(-5px);
            color: #D4AF37;
          }

          i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          span {
            font-weight: 600;
          }
        }
      }

      .search-box {
        margin: 2rem 0;
        padding: 2rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(212, 175, 55, 0.2);

        h4 {
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .input-group {
          .form-control {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            color: #ffffff;
            border-radius: 25px 0 0 25px;

            &::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }

            &:focus {
              background: rgba(255, 255, 255, 0.15);
              border-color: #D4AF37;
              box-shadow: 0 0 0 0.2rem rgba(212, 175, 55, 0.25);
              color: #ffffff;
            }
          }

          .btn {
            background: #D4AF37;
            border: 1px solid #D4AF37;
            color: #111111;
            border-radius: 0 25px 25px 0;
            font-weight: 600;

            &:hover {
              background: #ffffff;
              border-color: #ffffff;
              color: #111111;
            }
          }
        }
      }

      .contact-info {
        margin-top: 2rem;
        padding: 2rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(212, 175, 55, 0.2);

        h4 {
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .contact-links {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;

          .contact-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #D4AF37;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;

            &:hover {
              color: #ffffff;
              transform: translateY(-2px);
            }

            i {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .not-found-page {
    padding-top: 100px;
    
    .hero-section {
      padding: 3rem 0;

      .hero-title {
        font-size: 6rem;
      }

      .hero-subtitle {
        font-size: 2rem;
      }
    }

    .main-content {
      padding: 2rem 0;

      .error-content {
        padding: 2rem;

        .suggested-links {
          .suggested-link {
            padding: 1rem;
          }
        }

        .contact-info {
          .contact-links {
            flex-direction: column;
            gap: 1rem;
          }
        }
      }
    }
  }
}
</style>
