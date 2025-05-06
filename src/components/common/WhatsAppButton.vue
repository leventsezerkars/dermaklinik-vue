<!-- WhatsApp Button Component -->
<template>
  <a :href="whatsappUrl" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-whatsapp"></i>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const phone = computed(() => store.state.siteInfo.phone.replace(/\D/g, ''))
const whatsappUrl = computed(() => `https://wa.me/${phone.value}`)
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
}

.whatsapp-button i {
  font-size: 32px;
}

.whatsapp-button:hover {
  transform: scale(1.1);
  background-color: #128c7e;
  color: white;
}
</style> 