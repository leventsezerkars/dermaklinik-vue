# Google Analytics Entegrasyonu

Bu proje, CompanyInfo store'undaki `googleAnalyticsCode` bilgisini kullanarak Google Analytics 4 (GA4) entegrasyonu içerir.

## Özellikler

- ✅ Otomatik Google Analytics script yükleme
- ✅ Sayfa görüntüleme takibi (SPA route değişiklikleri dahil)
- ✅ Custom event takibi
- ✅ Form gönderimi takibi
- ✅ Blog okuma takibi
- ✅ Hizmet görüntüleme takibi
- ✅ Galeri görüntüleme takibi
- ✅ WhatsApp/Instagram tıklama takibi
- ✅ Telefon arama takibi
- ✅ E-posta tıklama takibi

## Kullanım

### 1. Composable Kullanımı

```javascript
import { useGoogleAnalytics } from '@/composables/useGoogleAnalytics'

const { 
  trackPageView, 
  trackEvent, 
  trackContactForm,
  trackBlogRead,
  trackServiceView,
  trackGalleryView,
  trackWhatsAppClick,
  trackPhoneCall,
  trackEmailClick
} = useGoogleAnalytics()
```

### 2. Mevcut Entegrasyonlar

#### App.vue
- Route değişikliklerini otomatik takip eder
- Her sayfa değişikliğinde `trackPageView` çağrılır

#### Contact.vue
- Form gönderimi: `trackContactForm('contact')`
- Telefon arama: `trackPhoneCall('+905465297677')`

#### BlogDetailView.vue
- Blog okuma: `trackBlogRead(postTitle, postId)`

#### ServiceDetailView.vue
- Hizmet görüntüleme: `trackServiceView(serviceTitle, serviceId)`

#### Gallery.vue
- Galeri görüntüleme: `trackGalleryView(imageTitle, imageId)`

#### WhatsAppButton.vue
- WhatsApp tıklama: `trackWhatsAppClick(phoneNumber)`
- Instagram tıklama: `trackEvent('instagram_click', { instagram_url })`

### 3. Custom Event Gönderme

```javascript
// Basit event
trackEvent('button_click', {
  button_name: 'header_cta',
  page: 'home'
})

// E-ticaret eventi
trackPurchase('order_123', 150.00, 'TRY', [
  {
    item_id: 'service_1',
    item_name: 'Dermatoloji Konsültasyonu',
    category: 'Hizmet',
    quantity: 1,
    price: 150.00
  }
])

// Form gönderimi
trackFormSubmit('newsletter', 'footer_newsletter')
```

### 4. Mevcut Event Türleri

| Event | Açıklama | Parametreler |
|-------|----------|--------------|
| `page_view` | Sayfa görüntüleme | `page_title`, `page_location` |
| `contact_form_submit` | İletişim formu | `form_type` |
| `appointment_form_submit` | Randevu formu | `form_type` |
| `blog_read` | Blog okuma | `blog_title`, `blog_id` |
| `service_view` | Hizmet görüntüleme | `service_name`, `service_id` |
| `gallery_view` | Galeri görüntüleme | `image_name`, `image_id` |
| `whatsapp_click` | WhatsApp tıklama | `phone_number` |
| `phone_call` | Telefon arama | `phone_number` |
| `email_click` | E-posta tıklama | `email_address` |
| `instagram_click` | Instagram tıklama | `instagram_url` |
| `purchase` | Satın alma | `transaction_id`, `value`, `currency`, `items` |

## Yapılandırma

### CompanyInfo Store
Google Analytics kodu `companyInfo` store'unda `googleAnalyticsCode` getter'ı ile alınır:

```javascript
// Store getter
googleAnalyticsCode: state => state.activeCompanyInfo?.googleAnalyticsCode || ''
```

### Otomatik Başlatma
Google Analytics, uygulama başlatıldığında `main.js`'de otomatik olarak initialize edilir:

```javascript
// main.js
const initializeGoogleAnalytics = async () => {
  await store.dispatch('companyInfo/fetchActiveCompanyInfo')
  const analyticsCode = store.getters['companyInfo/googleAnalyticsCode']
  // ... Google Analytics script yükleme ve konfigürasyon
}
```

## Debugging

Google Analytics'in çalışıp çalışmadığını kontrol etmek için:

1. Browser Developer Tools > Network sekmesinde `gtag` isteklerini kontrol edin
2. Console'da `window.gtag` fonksiyonunun tanımlı olduğunu kontrol edin
3. Google Analytics Real-time raporlarında eventleri görüntüleyin

## Notlar

- Google Analytics kodu yoksa hiçbir script yüklenmez ve hata vermez
- Tüm eventler asenkron olarak gönderilir
- CompanyInfo değiştiğinde Google Analytics otomatik olarak yeniden initialize edilir
- SPA route değişiklikleri otomatik olarak takip edilir
