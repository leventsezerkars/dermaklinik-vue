<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import TopBar from './components/layout/TopBar.vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import WhatsAppButton from './components/common/WhatsAppButton.vue'

const store = useStore()

onMounted(async () => {
  // Uygulama başlangıcında temel verileri çek
  try {
    await Promise.all([
      store.dispatch('fetchServices'),
      store.dispatch('companyInfo/fetchActiveCompanyInfo'),
      store.dispatch('menu/fetchMenuItems')
    ])
  } catch (error) {
    console.error('Uygulama verileri yüklenirken hata:', error)
  }
})
</script>

<template>
  <TopBar />
  <Navbar />
  <main class="main-content">
    <router-view />
  </main>
  <Footer />
  <WhatsAppButton />
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

#app {
  min-height: 100vh;
  background-color: $background-color;
}

.main-content {
  padding-top: 0;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background-color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
