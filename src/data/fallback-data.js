export default {
  "hero": {
    "slides": [
      {
        "id": "fallback-1",
        "title": "Dermatoloji ve Estetik Uzmanı",
        "subtitle": "20+ yıllık deneyimle cilt sağlığınız için buradayız",
        "imageUrl": "images/dr_mu2.jpg",
        "order": 1,
        "isActive": true
      },
      {
        "id": "fallback-2", 
        "title": "Modern Tedavi Yöntemleri",
        "subtitle": "En son teknoloji ile güvenli ve etkili tedaviler",
        "imageUrl": "images/woman2.jpg",
        "order": 2,
        "isActive": true
      },
      {
        "id": "fallback-3",
        "title": "Kişisel Bakım Çözümleri",
        "subtitle": "Size özel tedavi planları ile doğal güzelliğinizi ortaya çıkarın",
        "imageUrl": "images/woman3.jpg", 
        "order": 3,
        "isActive": true
      }
    ]
  },
  "menu": {
    "items": [
      {
        "id": "home",
        "title": "Ana Sayfa1",
        "slug": "",
        "target": "/",
        "type": 0,
        "order": 1,
        "isActive": true,
        "children": []
      },
      {
        "id": "general-dermatology",
        "title": "Genel Dermatoloji1",
        "slug": "genel-dermatoloji",
        "target": "#genel",
        "type": 2,
        "order": 2,
        "isActive": true,
        "children": [
          {
            "id": "acne-treatment",
            "title": "Akne ve Sivilce Tedavisi",
            "slug": "akne-sivilce-tedavisi",
            "target": "/hizmetler/akne-sivilce-tedavisi",
            "type": 0,
            "order": 1,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "rosacea-treatment",
            "title": "Rozasea (Gül Hastalığı) Tedavisi",
            "slug": "rosacea-gul-hastaligi-tedavisi",
            "target": "/hizmetler/rosacea-gul-hastaligi-tedavisi",
            "type": 0,
            "order": 2,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "hair-loss-treatment",
            "title": "Saç Dökülmesi ve Saç Tedavileri",
            "slug": "sac-dokulmesi-ve-sac-tedavileri",
            "target": "/hizmetler/sac-dokulmesi-ve-sac-tedavileri",
            "type": 0,
            "order": 3,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "wart-treatment",
            "title": "Siğil ve Ben Tedavisi",
            "slug": "sigil-ben-tedavisi",
            "target": "/hizmetler/sigil-ben-tedavisi",
            "type": 0,
            "order": 4,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "nail-diseases",
            "title": "Tırnak Hastalıkları ve Tedavisi",
            "slug": "tirnak-hastaliklari-ve-tedavisi",
            "target": "/hizmetler/tirnak-hastaliklari-ve-tedavisi",
            "type": 0,
            "order": 5,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "skin-infections",
            "title": "Deri Enfeksiyonları",
            "slug": "deri-enfeksiyonlari",
            "target": "/hizmetler/deri-enfeksiyonlari",
            "type": 0,
            "order": 6,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "fungal-infections",
            "title": "Mantar Enfeksiyonları",
            "slug": "mantar-enfeksiyonlari",
            "target": "/hizmetler/mantar-enfeksiyonlari",
            "type": 0,
            "order": 7,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "allergy-eczema",
            "title": "Alerji ve Egzama Türleri",
            "slug": "alerji-ve-egzama-turleri",
            "target": "/hizmetler/alerji-ve-egzama-turleri",
            "type": 0,
            "order": 8,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "urticaria",
            "title": "Ürtiker (Kurdeşen)",
            "slug": "urtiker-kurdesen",
            "target": "/hizmetler/urtiker-kurdesen",
            "type": 0,
            "order": 9,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "dermatitis",
            "title": "Dermatit",
            "slug": "dermatit",
            "target": "/hizmetler/dermatit",
            "type": 0,
            "order": 10,
            "isActive": true,
            "parentId": "general-dermatology"
          },
          {
            "id": "allergic-diseases",
            "title": "Alerjik Hastalıklar",
            "slug": "alerjik-hastaliklar",
            "target": "/hizmetler/alerjik-hastaliklar",
            "type": 0,
            "order": 11,
            "isActive": true,
            "parentId": "general-dermatology"
          }
        ]
      },
      {
        "id": "aesthetic-dermatology",
        "title": "Estetik Dermatoloji",
        "slug": "estetik-dermatoloji",
        "target": "#estetik",
        "type": 2,
        "order": 3,
        "isActive": true,
        "children": [
          {
            "id": "botox-treatment",
            "title": "Botoks Uygulaması",
            "slug": "botoks-uygulamasi",
            "target": "/hizmetler/botoks-uygulamasi",
            "type": 0,
            "order": 1,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "filler-treatment",
            "title": "Dolgu Uygulaması",
            "slug": "dolgu-uygulamasi",
            "target": "/hizmetler/dolgu-uygulamasi",
            "type": 0,
            "order": 2,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "regenera-activa",
            "title": "Regenera Activa Kök Hücre Tedavisi",
            "slug": "regenera-activa-kok-hucre-tedavisi",
            "target": "/hizmetler/regenera-activa-kok-hucre-tedavisi",
            "type": 0,
            "order": 3,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "prp-treatment",
            "title": "PRP (Platelet Rich Plasma) Tedavisi",
            "slug": "prp-platelet-rich-plasma-tedavisi",
            "target": "/hizmetler/prp-platelet-rich-plasma-tedavisi",
            "type": 0,
            "order": 4,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "mesotherapy",
            "title": "Mezoterapi Uygulaması",
            "slug": "mezoterapi-uygulamasi",
            "target": "/hizmetler/mezoterapi-uygulamasi",
            "type": 0,
            "order": 5,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "spot-treatment",
            "title": "Leke Tedavisi",
            "slug": "leke-tedavisi",
            "target": "/hizmetler/leke-tedavisi",
            "type": 0,
            "order": 6,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "acne-scar-treatment",
            "title": "Akne İzi Tedavisi",
            "slug": "akne-iz-tedavisi",
            "target": "/hizmetler/akne-iz-tedavisi",
            "type": 0,
            "order": 7,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "scar-treatment",
            "title": "Yara İzi Tedavisi",
            "slug": "yara-iz-tedavisi",
            "target": "/hizmetler/yara-iz-tedavisi",
            "type": 0,
            "order": 8,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "liquid-face-lift",
            "title": "Sıvı Yüz Germe",
            "slug": "sivi-yuz-germe",
            "target": "/hizmetler/sivi-yuz-germe",
            "type": 0,
            "order": 9,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "medical-skin-care",
            "title": "Medikal Cilt Bakımı (AquaPeel)",
            "slug": "medikal-cilt-bakimi-aquapeel",
            "target": "/hizmetler/medikal-cilt-bakimi-aquapeel",
            "type": 0,
            "order": 10,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "thread-lifting",
            "title": "İPLe Yüz Askılama",
            "slug": "iple-yuz-askilama",
            "target": "/hizmetler/iple-yuz-askilama",
            "type": 0,
            "order": 11,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          },
          {
            "id": "capillary-treatment",
            "title": "Kılcal Damar Tedavisi",
            "slug": "kilcal-damar-tedavisi",
            "target": "/hizmetler/kilcal-damar-tedavisi",
            "type": 0,
            "order": 12,
            "isActive": true,
            "parentId": "aesthetic-dermatology"
          }
        ]
      },
      {
        "id": "laser-treatments",
        "title": "Lazer Tedavileri",
        "slug": "lazer-tedavileri",
        "target": "#lazer",
        "type": 2,
        "order": 4,
        "isActive": true,
        "children": [
          {
            "id": "veloce-bb-light",
            "title": "Veloce BB Light",
            "slug": "veloce-bb-light",
            "target": "/hizmetler/veloce-bb-light",
            "type": 0,
            "order": 1,
            "isActive": true,
            "parentId": "laser-treatments"
          },
          {
            "id": "fractional-co2-laser",
            "title": "Fraksiyonel Karbondioksit (CO2) Lazer",
            "slug": "fraksiyonel-karbondioksit-co2-lazer",
            "target": "/hizmetler/fraksiyonel-karbondioksit-co2-lazer",
            "type": 0,
            "order": 2,
            "isActive": true,
            "parentId": "laser-treatments"
          },
          {
            "id": "secret-golden-needle",
            "title": "Secret Altın İğne Fraksiyonel Radyofrekans",
            "slug": "secret-altin-igne-fraksiyonel-radyofrekans",
            "target": "/hizmetler/secret-altin-igne-fraksiyonel-radyofrekans",
            "type": 0,
            "order": 3,
            "isActive": true,
            "parentId": "laser-treatments"
          },
          {
            "id": "aqua-peel",
            "title": "Aqua Peel Medikal Cilt Bakımı",
            "slug": "aqua-peel-medikal-cilt-bakimi",
            "target": "/hizmetler/aqua-peel-medikal-cilt-bakimi",
            "type": 0,
            "order": 4,
            "isActive": true,
            "parentId": "laser-treatments"
          },
          {
            "id": "pico-second-laser",
            "title": "Piko Saniye Lazer",
            "slug": "piko-saniye-lazer",
            "target": "/hizmetler/piko-saniye-lazer",
            "type": 0,
            "order": 5,
            "isActive": true,
            "parentId": "laser-treatments"
          },
          {
            "id": "hifu-treatment",
            "title": "HIFU Ameliyatsız Yüz Germe",
            "slug": "hifu-ameliyatsiz-yuz-germe",
            "target": "/hizmetler/hifu-ameliyatsiz-yuz-germe",
            "type": 0,
            "order": 6,
            "isActive": true,
            "parentId": "laser-treatments"
          }
        ]
      },
      {
        "id": "about",
        "title": "Hakkımızda",
        "slug": "hakkimizda",
        "target": "#hakkimizda",
        "type": 2,
        "order": 5,
        "isActive": true,
        "children": []
      },
      {
        "id": "contact",
        "title": "İletişim",
        "slug": "iletisim",
        "target": "#contact",
        "type": 2,
        "order": 6,
        "isActive": true,
        "children": []
      }
    ]
  },
  "gallery": {
    "images": [
      {
        "id": "fallback-gallery-1",
        "title": "Klinik Görünümü",
        "titleEn": "Clinic View",
        "altText": "Modern klinik ortamı",
        "imageUrl": "/images/clinic_images/DSCF4172.JPG",
        "sortOrder": 1,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-2",
        "title": "Muayene Odası",
        "titleEn": "Examination Room",
        "altText": "Profesyonel muayene ortamı",
        "imageUrl": "/images/clinic_images/DSCF4217.JPG",
        "sortOrder": 2,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-3",
        "title": "Bekleme Salonu",
        "titleEn": "Waiting Room",
        "altText": "Konforlu bekleme alanı",
        "imageUrl": "/images/clinic_images/DSCF4218.JPG",
        "sortOrder": 3,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-4",
        "title": "Tedavi Odası",
        "titleEn": "Treatment Room",
        "altText": "Modern tedavi ekipmanları",
        "imageUrl": "/images/clinic_images/DSCF4231.JPG",
        "sortOrder": 4,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-5",
        "title": "Lazer Tedavi Ünitesi",
        "titleEn": "Laser Treatment Unit",
        "altText": "Gelişmiş lazer teknolojisi",
        "imageUrl": "/images/clinic_images/DSCF4235.JPG",
        "sortOrder": 5,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-6",
        "title": "Estetik Uygulama Alanı",
        "titleEn": "Aesthetic Application Area",
        "altText": "Güvenli estetik uygulamalar",
        "imageUrl": "/images/clinic_images/DSCF4254.JPG",
        "sortOrder": 6,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-7",
        "title": "Konsültasyon Odası",
        "titleEn": "Consultation Room",
        "altText": "Hasta danışmanlık alanı",
        "imageUrl": "/images/clinic_images/DSCF4267.JPG",
        "sortOrder": 7,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-8",
        "title": "Cilt Analiz Merkezi",
        "titleEn": "Skin Analysis Center",
        "altText": "Dijital cilt analiz sistemi",
        "imageUrl": "/images/clinic_images/DSCF4268.JPG",
        "sortOrder": 8,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-9",
        "title": "Sterilizasyon Ünitesi",
        "titleEn": "Sterilization Unit",
        "altText": "Hijyenik sterilizasyon alanı",
        "imageUrl": "/images/clinic_images/DSCF4285.JPG",
        "sortOrder": 9,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-10",
        "title": "Giriş Holü",
        "titleEn": "Entrance Hall",
        "altText": "Modern ve şık giriş alanı",
        "imageUrl": "/images/clinic_images/DSCF4295.JPG",
        "sortOrder": 10,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-11",
        "title": "Dinlenme Alanı",
        "titleEn": "Rest Area",
        "altText": "Hastalar için konforlu dinlenme",
        "imageUrl": "/images/clinic_images/DSCF4301.JPG",
        "sortOrder": 11,
        "isActive": true,
        "isDeleted": false
      },
      {
        "id": "fallback-gallery-12",
        "title": "Resepsiyon",
        "titleEn": "Reception",
        "altText": "Profesyonel resepsiyon hizmeti",
        "imageUrl": "/images/clinic_images/DSCF4303.JPG",
        "sortOrder": 12,
        "isActive": true,
        "isDeleted": false
      }
    ]
  },
  "companyInfo": {
    "name": "Doç. Dr. Mehmet Ünal",
    "title": "Dermatoloji ve Estetik Uzmanı",
    "phone": "+90 546 529 76 77",
    "email": "dr.munal1101@gmail.com",
    "address": "Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya",
    "workingHours": "Pazartesi-Cumartesi: 09:00-21:00",
    "logo": "/images/logo_beyaz.png",
    "description": "Dermatoloji alanında 20+ yıllık deneyime sahip uzman doktorumuz, modern tıp teknolojilerini kullanarak hastalarına en iyi tedavi hizmetini sunmaktadır.",
    "socialMedia": {
      "instagram": "https://www.instagram.com/doc.dr.mehmetunall",
      "facebook": "https://www.facebook.com/doc.dr.mehmetunall",
      "twitter": "https://www.twitter.com/doc.dr.mehmetunall",
      "linkedIn": "https://www.linkedin.com/in/doc.dr.mehmetunall"
    },
    "seo": {
      "defaultTitle": "Doç. Dr. Mehmet Ünal - Dermatoloji ve Estetik Uzmanı",
      "defaultDescription": "Dermatoloji ve estetik alanında uzman hekimimizle modern tedavi yöntemleri. Cilt sağlığınız için profesyonel hizmet.",
      "defaultKeywords": "dermatoloji, estetik, cilt sağlığı, tedavi, uzman doktor"
    },
    "googleMapsUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1324.3769308986002!2d32.44742075994305!3d37.8622338918696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08506268d51bd%3A0xd23e3de31bae298!2sDo%C3%A7.%20Dr.%20Mehmet%20Unal%20Dermatoloji%20Klini%C4%9Fi!5e0!3m2!1str!2str!4v1676893648669!5m2!1str!2str",
    "directionsUrl": "https://www.google.com/maps/dir//Ate%C5%9Fbaz+Veli+Mahallesi,+Yeni+Meram+Cd.+No:83+D:4,+42090+Meram%2FKonya/@37.8746357,32.4565924,17z"
  }
}
