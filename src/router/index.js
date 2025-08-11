import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import AboutDetailView from '../views/AboutDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Ana Sayfa - Doç. Dr. Mehmet Ünal',
      metaTags: [
        {
          name: 'description',
          content: 'Doç. Dr. Mehmet Ünal - Dermatoloji ve Estetik Kliniği. Cilt gençleştirme, estetik uygulamalar ve tedaviler için uzman dermatoloji hizmeti.'
        },
        {
          property: 'og:description',
          content: 'Konya\'da profesyonel dermatoloji ve estetik hizmetleri. Modern teknoloji ve uzman kadro ile hizmetinizdeyiz.'
        }
      ]
    }
  },
  {
    path: '/hakkimizda-detay',
    name: 'aboutDetail',
    component: AboutDetailView,
    meta: {
      title: 'Hakkımızda - Doç. Dr. Mehmet Ünal',
      metaTags: [
        {
          name: 'description',
          content: 'Doç. Dr. Mehmet Ünal hakkında detaylı bilgi. Dermatoloji uzmanı, deneyimleri, eğitimi ve kliniğimiz hakkında bilgi alın.'
        }
      ]
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView,
    meta: {
      title: 'Blog - Doç. Dr. Mehmet Ünal'
    }
  },
  {
    path: '/blog/:id',
    name: 'blogDetail',
    component: BlogDetailView,
    meta: {
      title: 'Blog Detay - Doç. Dr. Mehmet Ünal'
    }
  },
  {
    path: '/hizmetler/:slug',
    name: 'serviceDetail',
    component: ServiceDetailView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Her sayfa değişiminde meta etiketlerini güncelle
router.beforeEach((to, from, next) => {
  // Sayfa başlığını güncelle
  document.title = to.meta.title || 'Doç. Dr. Mehmet Ünal - Dermatoloji ve Estetik Kliniği'

  // Mevcut meta etiketlerini kaldır
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.remove())

  // Yeni meta etiketlerini ekle
  if (to.meta.metaTags) {
    to.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta')
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })
      tag.setAttribute('data-vue-router-controlled', '')
      document.head.appendChild(tag)
    })
  }

  next()
})

export default router 