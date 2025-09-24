<template>
  <nav class="navbar navbar-expand-lg" >
    <div class="container">
      <button class="navbar-toggler order-0 me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand d-flex align-items-center order-1" to="/">
        <img 
          :src="companyLogo || '/images/logo_beyaz.png'" 
          :alt="companyName || 'Doç. Dr. Mehmet Ünal Logo'" 
          height="70"
        >
        <span class="ms-3 brand-text">{{ companyName || $t('header.brand') }}</span>
      </router-link>
      <div class="collapse navbar-collapse order-2" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- API'den gelen menü öğeleri varsa onları kullan -->
          <template v-if="hierarchicalMenu && hierarchicalMenu.length > 0">
            <li 
              v-for="menuItem in hierarchicalMenu" 
              :key="menuItem.id" 
              class="nav-item"
              :class="{ 'dropdown': menuItem.children && menuItem.children.length > 0 }"
            >
              <!-- Alt menüsü olan öğeler için dropdown -->
              <template v-if="menuItem.children && menuItem.children.length > 0">
                <router-link 
                  class="nav-link dropdown-toggle" 
                  :to="getMenuLink(menuItem)" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {{ menuItem.title }}
                </router-link>
                <ul class="dropdown-menu">
                  <li v-for="child in menuItem.children" :key="child.id">
                    <router-link 
                      class="dropdown-item" 
                      :to="getMenuLink(child)"
                      @click="closeNavbar"
                    >
                      {{ child.title }}
                    </router-link>
                  </li>
                </ul>
              </template>
              <!-- Alt menüsü olmayan öğeler için normal link -->
              <template v-else>
                <router-link 
                  class="nav-link" 
                  :to="getMenuLink(menuItem)"
                  @click="closeNavbar"
                >
                  {{ menuItem.title }}
                </router-link>
              </template>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import fallbackData from '@/data/fallback-data' // TypeScript'ın modül çözümlemesini doğru yapabilmesi için .js uzantısı kaldırıldı.

const router = useRouter()
const store = useStore()
const { locale } = useI18n()

// Store'dan şirket bilgilerini al
const companyName = computed(() => {
  const apiName = store.getters['companyInfo/companyName']
  if (apiName) {
    console.log('[Navbar] Company Name: API verisi kullanılıyor')
    return apiName
  }
  console.log('[Navbar] Company Name: Fallback verisi kullanılıyor')
  return fallbackData.companyInfo.name
})
const companyLogo = computed(() => {
  const apiLogo = store.getters['companyInfo/companyLogo']
  if (apiLogo) {
    console.log('[Navbar] Company Logo: API verisi kullanılıyor')
    return apiLogo
  }
  console.log('[Navbar] Company Logo: Fallback verisi kullanılıyor')
  return fallbackData.companyInfo.logo
})

// Store'dan menü verilerini al
const hierarchicalMenu = computed(() => {
  const apiMenu = store.getters['menu/hierarchicalMenu']
  
  if (apiMenu && apiMenu.length > 0) {
    console.log('[Navbar] Menu: API verisi kullanılıyor (' + apiMenu.length + ' menü öğesi)')
    return apiMenu
  }
  
  // Loading durumunda fallback kullanılıyor mesajını farklı göster
  if (menuLoading.value) {
    console.log('[Navbar] Menu: Loading durumunda fallback verisi kullanılıyor')
  } else {
    console.log('[Navbar] Menu: Fallback verisi kullanılıyor (API\'den menü verisi gelmedi)')
  }
  
  return fallbackData.menu.items
})
const menuLoading = computed(() => store.getters['menu/isLoading'])
const menuError = computed(() => store.getters['menu/error'])

// Menü linkini oluştur
const getMenuLink = (menuItem: any) => {
  if (!menuItem) return '#'
  // MenuType'a göre link oluştur
  switch (menuItem.type) {
    case 0: // Page
      return menuItem.slug ? `/${menuItem.target}/${menuItem.slug}` : '#'
    case 1: // Link
      return menuItem.target || '#'
    case 2: // Anchor
      // Anchor linkler için ana sayfaya yönlendir
      return menuItem.target && menuItem.target !== '' ? `/#${menuItem.target}` : '/'
    default:
      return menuItem.slug ? `${menuItem.slug}` : '#'
  }
}

const closeNavbar = () => {
  const navbar = document.getElementById('navbarNav')
  if (!navbar) return
  
  console.log('Closing navbar...')
  
  // Bootstrap 5 Collapse API'sini kullan
  const bsCollapse = (window as any).bootstrap?.Collapse
  if (bsCollapse) {
    const instance = bsCollapse.getInstance(navbar)
    if (instance) {
      instance.hide()
    } else {
      // Instance yoksa yeni oluştur ve kapat
      const newInstance = new bsCollapse(navbar, { toggle: false })
      newInstance.hide()
    }
  } else {
    // Bootstrap yoksa manuel olarak kapat
    navbar.classList.remove('show')
    navbar.classList.add('collapse')
  }
  
  // Sadece navbar dropdown menülerini kapat (LanguageSelector'ı koru)
  const navbarDropdowns = document.querySelectorAll('.navbar .dropdown-menu.show')
  navbarDropdowns.forEach(dropdown => {
    dropdown.classList.remove('show')
  })
  
  // Toggle butonunun aria-expanded özelliğini güncelle
  const toggleButton = document.querySelector('[data-bs-target="#navbarNav"]')
  if (toggleButton) {
    toggleButton.setAttribute('aria-expanded', 'false')
  }
  
  // Sadece navbar dropdown toggle butonlarının aria-expanded özelliğini güncelle
  const navbarDropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle')
  navbarDropdownToggles.forEach(toggle => {
    toggle.setAttribute('aria-expanded', 'false')
  })
}

// Dil değişikliğini izle
watch(locale, async (newLocale) => {
  try {
    await store.dispatch('menu/changeLanguage', newLocale)
  } catch (error) {
    console.error('Menü dil değişikliğinde hata:', error)
  }
})

onMounted(async () => {
  // Şirket bilgilerini çek
  try {
    await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  } catch (error) {
    console.error('Şirket bilgileri yüklenirken hata:', error)
  }

  // Mevcut dili kontrol et ve menu store'u güncelle
  const currentLocale = locale.value
  const storeLocale = store.getters['menu/currentLanguage']
  
  
  // Eğer store'daki dil ile i18n'deki dil farklıysa store'u güncelle
  if (currentLocale !== storeLocale) {
    await store.dispatch('menu/changeLanguage', currentLocale)
  } else {
    // Aynı dil ise sadece menü verilerini çek (eğer yoksa)
    if (store.getters['menu/menuItems'].length === 0) {
      try {
        await store.dispatch('menu/fetchMenuItems', currentLocale)
      } catch (error) {
        console.error('Menü verileri yüklenirken hata:', error)
      }
    } else {
      await store.dispatch('menu/changeLanguage', currentLocale)
    }
  }

  // Route değişince menüyü kapat
  router.afterEach(() => {
    closeNavbar()
  })

  // Ana sayfada özel event listener'lar
  const isHomePage = router.currentRoute.value.path === '/'
  if (isHomePage) {
    // Document click listener for closing dropdowns
    const handleDocumentClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target) return

      // LanguageSelector'ı koru
      const isLanguageSelector = target.closest('.language-selector')
      if (isLanguageSelector) return

      const isNavbarClick = target.closest('.navbar')
      if (!isNavbarClick) {
        closeNavbar()
      }
    }

    // Click ve touch event listener'ları
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('touchstart', handleDocumentClick)

    // Scroll event listener (throttled - performans için)
    let scrollTimeout: number | null = null
    document.addEventListener('scroll', () => {
      if (scrollTimeout) return
      scrollTimeout = window.setTimeout(() => {
        closeNavbar()
        scrollTimeout = null
      }, 100)
    })

    // Resize event listener (throttled - performans için)
    let resizeTimeout: number | null = null
    window.addEventListener('resize', () => {
      if (resizeTimeout) return
      resizeTimeout = window.setTimeout(() => {
        closeNavbar()
        resizeTimeout = null
      }, 100)
    })
  }

  // Dropdown item'ına tıklanınca kısa gecikme ile menüyü kapat
  const navbar = document.getElementById('navbarNav')
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      console.log('Navbar click detected:', target)
      
      // Dropdown toggle butonuna tıklanmışsa menüyü kapatma
      const isToggle = target.closest('a.dropdown-toggle, button.dropdown-toggle')
      if (isToggle) {
        console.log('Dropdown toggle clicked, not closing')
        return
      }
      
      // Router-link veya normal link'e tıklanmışsa menüyü kapat
      const isRouterLink = target.closest('a[href]') || target.tagName === 'A'
      const isNavLink = target.closest('a.nav-link:not(.dropdown-toggle)')
      const isDropdownItem = target.closest('a.dropdown-item')
      
      if (isRouterLink || isNavLink || isDropdownItem) {
        console.log('Link clicked, closing navbar')
        // Kısa bir gecikme ile menüyü kapat (router navigation'ın tamamlanması için)
        setTimeout(() => {
          closeNavbar()
        }, 150)
      }
    })
  }
})
</script>


<style lang="scss">
@use '@/assets/styles/components/layout/Navbar';
</style> 