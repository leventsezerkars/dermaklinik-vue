# DermaKlinik Vue Frontend

Bu proje, DermaKlinik web sitesi için Vue 3 + Vite ile geliştirilmiş frontend uygulamasıdır.

## Özellikler

- Vue 3 Composition API
- Vite build tool
- Vuex state management
- Vue Router
- SCSS styling
- Çoklu dil desteği (i18n)
- Responsive tasarım

## API Entegrasyonu

Proje, backend API ile entegre edilmiştir. Aşağıdaki servisler mevcuttur:

### Servis Katmanı
- **CompanyInfoAPI**: Şirket bilgileri
- **MenuAPI**: Menü yönetimi
- **BlogAPI**: Blog yazıları ve kategorileri
- **GalleryAPI**: Galeri grupları ve resimler
- **LanguageAPI**: Dil yönetimi

### Store Modülleri
- **companyInfo**: Şirket bilgileri için state management
- **menu**: Menü öğeleri için state management
- **blog**: Blog yazıları için state management
- **gallery**: Galeri için state management

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## Environment Variables

`.env` dosyası oluşturun ve aşağıdaki değişkenleri ayarlayın:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=your-api-key-here
```

## Kullanım

### Store Kullanımı

```javascript
// Vue 3 Composition API
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    
    // Şirket bilgilerini çek
    store.dispatch('companyInfo/fetchActiveCompanyInfo')
    
    // Menü öğelerini çek
    store.dispatch('menu/fetchMenuItems')
    
    // Store'dan veri al
    const companyName = computed(() => store.getters['companyInfo/companyName'])
    const menuItems = computed(() => store.getters['menu/mainMenuItems'])
  }
}
```

### Direkt API Kullanımı

```javascript
import { CompanyInfoAPI } from '@/services/api/companyInfo'

// Şirket bilgilerini çek
const companyInfo = await CompanyInfoAPI.getActiveSingle()
```

## Proje Yapısı

```
src/
├── components/          # Vue bileşenleri
├── services/           # API servisleri
│   └── api/           # API servis dosyaları
├── store/             # Vuex store
│   └── modules/       # Store modülleri
├── views/             # Sayfa bileşenleri
├── router/            # Vue Router konfigürasyonu
├── locales/           # Çoklu dil dosyaları
└── assets/            # Statik dosyalar
```

## API Endpoints

Backend API aşağıdaki endpoint'leri sağlar:

- `/api/CompanyInfo` - Şirket bilgileri
- `/api/Menu` - Menü yönetimi
- `/api/Blog` - Blog yazıları
- `/api/BlogCategory` - Blog kategorileri
- `/api/GalleryGroup` - Galeri grupları
- `/api/GalleryImage` - Galeri resimleri
- `/api/Language` - Dil yönetimi

## Geliştirme

Proje geliştirme sürecinde aşağıdaki konulara dikkat edin:

1. **Cache Yönetimi**: Store modüllerinde cache mekanizması mevcuttur
2. **Error Handling**: Tüm API çağrılarında hata yönetimi yapılmıştır
3. **Loading States**: Yükleme durumları store'da takip edilir
4. **Type Safety**: API response'ları için tip güvenliği sağlanmıştır
