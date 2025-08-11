<template>
  <nav class="navbar navbar-expand-lg" >
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/images/logo_beyaz.png" alt="Doç. Dr. Mehmet Ünal Logo" height="70">
        <span class="ms-3 brand-text">DOÇ. DR. MEHMET ÜNAL</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Ana Sayfa</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#genel" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Genel Dermatoloji
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/akne-sivilce-tedavisi">Akne (Sivilce) Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/rosacea-gul-hastaligi-tedavisi">Rosacea (Gül) Hastalığı Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/sac-dokulmesi-ve-sac-tedavileri">Saç Dökülmesi ve Saç Tedavileri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/sigil-ben-tedavisi">Siğil (Ben) Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/tirnak-hastaliklari-ve-tedavisi">Tırnak Hastalıkları ve Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/deri-enfeksiyonlari">Deri Enfeksiyonları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/mantar-enfeksiyonlari">Mantar Enfeksiyonları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/alerji-ve-egzama-turleri">Alerji/Egzama Türleri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/urtiker-kurdesen">Ürtiker (Kurdeşen)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/dermatit">Dermatit</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/alerjik-hastaliklar">Alerjik Hastalıklar</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#estetik" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estetik Dermatoloji
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/botoks-uygulamasi">Botoks Uygulamaları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/dolgu-uygulamasi">Dolgu Uygulamaları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/regenera-activa-kok-hucre-tedavisi">Regenera Activa (Kök Hücre Tedavisi)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/prp-platelet-rich-plasma-tedavisi">PRP (Platelet Rich Plasma) Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/mezoterapi-uygulamasi">Mezoterapiler</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/leke-tedavisi">Leke Tedavileri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/akne-iz-tedavisi">Akne İz Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/yara-iz-tedavisi">Yara İz Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/sivi-yuz-germe">Sıvı Yüz Germe</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/medikal-cilt-bakimi">Medikal Cilt Bakımı</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/iple-yuz-askilama">İple Yüz Askılama</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/kilcal-damar-tedavisi">Kılcal Damar Tedavisi</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#lazer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Lazer Tedavileri
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/veloce-bb-light">Veloce BB LİGHT</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/fraksiyonel-karbondioksit-co2-lazer">Fraksiyonel Karbondioksit (CO2) Lazer</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/secret-altin-igne-fraksiyonel-radyofrekans">Secret Altın İğne (Fraksiyonel Radyo Frekans)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/aqua-peel-medikal-cilt-bakimi">Aqua-Peel Medikal Cilt Bakımı</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/piko-saniye-lazer">Piko Saniye Lazer</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/hifu-ameliyatsiz-yuz-germe">HI-FU (Ameliyatsız Yüz Germe)</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#hakkimizda">Hakkımızda</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="#blog">Blog</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="#contact">İletişim</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@use '@/assets/styles/components/layout/Navbar';
</style> 