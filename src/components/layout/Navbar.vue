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
          <!-- API'den veri gelmezse varsayılan menü -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/">{{ $t('common.home') }}</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="#genel" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('header.generalDermatology') }}
              </router-link>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/hizmetler/akne-sivilce-tedavisi">{{ $t('services.general.items.acne') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/rosacea-gul-hastaligi-tedavisi">{{ $t('services.general.items.rosacea') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/sac-dokulmesi-ve-sac-tedavileri">{{ $t('services.general.items.hairLoss') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/sigil-ben-tedavisi">{{ $t('services.general.items.wart') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/tirnak-hastaliklari-ve-tedavisi">{{ $t('services.general.items.nailDiseases') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/deri-enfeksiyonlari">{{ $t('services.general.items.skinInfections') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/mantar-enfeksiyonlari">{{ $t('services.general.items.fungalInfections') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/alerji-ve-egzama-turleri">{{ $t('services.general.items.allergyEczema') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/urtiker-kurdesen">{{ $t('services.general.items.urticaria') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/dermatit">{{ $t('services.general.items.dermatitis') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/alerjik-hastaliklar">{{ $t('services.general.items.allergicDiseases') }}</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="#estetik" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('header.aestheticDermatology') }}
              </router-link>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/hizmetler/botoks-uygulamasi">{{ $t('services.aesthetic.items.botox') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/dolgu-uygulamasi">{{ $t('services.aesthetic.items.filler') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/regenera-activa-kok-hucre-tedavisi">{{ $t('services.aesthetic.items.regeneraActiva') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/prp-platelet-rich-plasma-tedavisi">{{ $t('services.aesthetic.items.prp') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/mezoterapi-uygulamasi">{{ $t('services.aesthetic.items.mesotherapy') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/leke-tedavisi">{{ $t('services.aesthetic.items.spotTreatment') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/akne-iz-tedavisi">{{ $t('services.aesthetic.items.acneScar') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/yara-iz-tedavisi">{{ $t('services.aesthetic.items.scarTreatment') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/sivi-yuz-germe">{{ $t('services.aesthetic.items.liquidFaceLift') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/medikal-cilt-bakimi-aquapeel">{{ $t('services.aesthetic.items.medicalSkinCare') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/iple-yuz-askilama">{{ $t('services.aesthetic.items.threadLifting') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/kilcal-damar-tedavisi">{{ $t('services.aesthetic.items.capillaryTreatment') }}</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="#lazer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('header.laserTreatments') }}
              </router-link>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/hizmetler/veloce-bb-light">{{ $t('services.laser.items.veloceBB') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/fraksiyonel-karbondioksit-co2-lazer">{{ $t('services.laser.items.fractionalCO2') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/secret-altin-igne-fraksiyonel-radyofrekans">{{ $t('services.laser.items.secretGoldenNeedle') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/aqua-peel-medikal-cilt-bakimi">{{ $t('services.laser.items.aquaPeel') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/piko-saniye-lazer">{{ $t('services.laser.items.picoSecond') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/hizmetler/hifu-ameliyatsiz-yuz-germe">{{ $t('services.laser.items.hifu') }}</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#hakkimizda">{{ $t('common.about') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#contact">{{ $t('common.contact') }}</router-link>
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

const router = useRouter()
const store = useStore()
const { locale } = useI18n()

// Store'dan şirket bilgilerini al
const companyName = computed(() => store.getters['companyInfo/companyName'])
const companyLogo = computed(() => store.getters['companyInfo/companyLogo'])

// Store'dan menü verilerini al
const hierarchicalMenu = computed(() => store.getters['menu/hierarchicalMenu'])
const menuLoading = computed(() => store.getters['menu/isLoading'])
const menuError = computed(() => store.getters['menu/error'])

// Menü linkini oluştur
const getMenuLink = (menuItem: any) => {
  if (!menuItem) return '#'
  
  // MenuType'a göre link oluştur
  switch (menuItem.type) {
    case 0: // Page
      return menuItem.slug ? `/hizmetler/${menuItem.slug}` : '#'
    case 1: // Link
      return menuItem.target || '#'
    case 2: // Anchor
      // Anchor linkler için ana sayfaya yönlendir
      return menuItem.target && menuItem.target !== '' ? `/#${menuItem.target}` : '/'
    default:
      return menuItem.slug ? `/hizmetler/${menuItem.slug}` : '#'
  }
}

const closeNavbar = () => {
  const navbar = document.getElementById('navbarNav')
  if (!navbar) return
  
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

  // Dropdown item'ına tıklanınca kısa gecikme ile menüyü kapat
  const navbar = document.getElementById('navbarNav')
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      // Dropdown toggle butonuna tıklanmışsa menüyü kapatma
      const isToggle = target.closest('a.dropdown-toggle, button.dropdown-toggle')
      if (isToggle) return
      
      // Router-link veya normal link'e tıklanmışsa menüyü kapat
      const isRouterLink = target.closest('a[href]') || target.tagName === 'A'
      const isNavLink = target.closest('a.nav-link:not(.dropdown-toggle)')
      const isDropdownItem = target.closest('a.dropdown-item')
      
      if (isRouterLink || isNavLink || isDropdownItem) {
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