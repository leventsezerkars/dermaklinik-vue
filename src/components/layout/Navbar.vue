<template>
  <nav class="navbar navbar-expand-lg" >
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/images/logo_beyaz.png" alt="Doç. Dr. Mehmet Ünal Logo" height="70">
        <span class="ms-3 brand-text">{{ $t('header.brand') }}</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
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
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="#blog">{{ $t('common.blog') }}</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="#contact">{{ $t('common.contact') }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<script setup lang="ts">

</script>

<style lang="scss">
@use '@/assets/styles/components/layout/Navbar';
</style> 