<template>
  <nav class="navbar navbar-expand-lg" >
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/images/logo.png" alt="Doç. Dr. Mehmet Ünal Logo" height="40">
        <span class="ms-3 brand-text">DOÇ. DR. MEHMET ÜNAL</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Ana Sayfa</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/genel-dermatoloji" role="button" data-bs-toggle="dropdown">
              Genel Dermatoloji
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/akne-tedavisi">Akne (Sivilce)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/rozasea-tedavisi">Rosasea(Gül) Hastalığı</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/sigil-ben-tedavisi">Siğil ve Ben Tedavileri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/egzama-tedavisi">Egzama Türleri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/urtiker-tedavisi">Ürtiker (Kurdeşen)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/sac-dokulmesi">Saç Dökülmesi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/mantar-tedavisi">Mantar Enfeksiyonları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/seberoik-dermatit">Seberoik Dermatit</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/alerjik-hastaliklar">Alerjik Hastalıklar</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/deri-enfeksiyonlari">Deri Enfeksiyonları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/tirnak-hastaliklari">Tırnak Hastalıkları</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/estetik-dermatoloji" role="button" data-bs-toggle="dropdown">
              Estetik Dermatoloji
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/botoks">Botoks Uygulamaları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/dolgu">Dolgu Uygulamaları</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/prp-tedavisi">PRP Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/mezoterapiler">Mezoterapiler</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/leke-tedavisi">Leke Tedavileri</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/akne-iz-tedavisi">Akne İz Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/yara-iz-tedavisi">Yara İz Tedavisi</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/medikal-cilt-bakimi">Medikal Cilt Bakımı</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/iple-yuz-askilama">İple Yüz Askılama</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/kilcal-damar-tedavisi">Kılcal Damar Tedavisi</router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/lazer-tedavileri" role="button" data-bs-toggle="dropdown">
              Lazer Tedavileri
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/hizmetler/veloce-bb-lazer">Veloce BB Lazer</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/fraksiyonel-lazer">Fraksiyonel Karbondioksit Lazer</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/altin-igne">Altın İğne</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/aqua-peel">Aqua-Peel Cilt Bakımı</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/piko-saniye-lazer">Piko Saniye Lazer</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/hifu">HI-FU (Ameliyatsız Yüz Germe)</router-link></li>
              <li><router-link class="dropdown-item" to="/hizmetler/kok-hucre-tedavisi">Regenera Activa (Kök Hücre Tedavisi)</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#hakkimizda">Hakkımızda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#blog">Blog</router-link>
          </li>
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