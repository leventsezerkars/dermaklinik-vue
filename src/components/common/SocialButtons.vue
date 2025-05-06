<!-- Social Buttons Component -->
<template>
  <div class="social-buttons">
    <a v-for="(url, platform) in socialMedia" 
       :key="platform"
       :href="url"
       :class="['social-button', platform]"
       target="_blank"
       rel="noopener noreferrer">
      <i :class="['fab', `fa-${platform}`]"></i>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const socialMedia = computed(() => store.getters.getSocialMedia)
</script>

<style scoped>
.social-buttons {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.social-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.social-button i {
  font-size: 20px;
}

.social-button:hover {
  transform: scale(1.1);
}

.social-button.instagram {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}

.social-button.facebook {
  background-color: #3b5998;
}

.social-button.twitter {
  background-color: #1da1f2;
}

.social-button.linkedin {
  background-color: #0077b5;
}

.social-button.youtube {
  background-color: #ff0000;
}

@media (max-width: 768px) {
  .social-buttons {
    bottom: 20px;
    right: 90px;
    top: auto;
    transform: none;
    flex-direction: row;
  }
}
</style> 