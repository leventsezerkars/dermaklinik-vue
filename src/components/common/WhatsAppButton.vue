<!-- Social Media Buttons Component -->
<template>
  <div class="social-buttons">
    <a :href="whatsappUrl" class="social-button whatsapp" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://www.instagram.com/doc.dr.mehmetunall" class="social-button instagram" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-instagram"></i>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const phone = computed(() => store.state.siteInfo.phone.replace(/\D/g, ''))
const whatsappUrl = computed(() => `https://wa.me/${phone.value}`)
</script>

<style scoped>
.social-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.social-button {
  width: 60px;
  height: 60px;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.social-button i {
  font-size: 32px;
}

.whatsapp {
  background-color: #25d366;
}

.whatsapp:hover {
  transform: scale(1.1);
  background-color: #128c7e;
}

.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.instagram:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .social-buttons {
    bottom: 15px;
    right: 15px;
  }

  .social-button {
    width: 50px;
    height: 50px;
  }

  .social-button i {
    font-size: 24px;
  }
}
</style> 