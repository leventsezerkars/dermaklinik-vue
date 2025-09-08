# Environment Dosyası Kurulum Rehberi

## .env Dosyası Oluşturma

Proje ana dizininde `.env` dosyası oluşturun ve aşağıdaki içeriği ekleyin:

```env
# API Konfigürasyonu
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=your-api-key-here

# Site Konfigürasyonu
VITE_SITE_NAME=DermaKlinik
VITE_SITE_DESCRIPTION=Dermatoloji ve Estetik Dermatoloji Kliniği

# Diğer ayarlar
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

## Alternatif Yöntemler

### 1. .env.local Dosyası
`.env.local` dosyası oluşturun (git'e commit edilmez):
```env
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=your-api-key-here
```

### 2. .env.development Dosyası
Geliştirme ortamı için:
```env
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=dev-api-key
```

### 3. .env.production Dosyası
Production ortamı için:
```env
VITE_API_URL=https://api.dermaklinik.com/api
VITE_API_KEY=prod-api-key
```

## Dosya Konumu

Environment dosyası proje ana dizininde olmalıdır:
```
dermaklinik-vue/
├── .env                 <- Burada
├── .env.local          <- Veya burada
├── .env.development    <- Veya burada
├── package.json
├── vite.config.js
└── src/
```

## Vite Environment Değişkenleri

Vite'da environment değişkenleri `VITE_` prefix'i ile başlamalıdır:

- ✅ `VITE_API_URL` - Çalışır
- ✅ `VITE_API_KEY` - Çalışır
- ❌ `API_URL` - Çalışmaz
- ❌ `REACT_APP_API_URL` - Çalışmaz

## Debug Etme

Uygulamayı çalıştırdığınızda browser console'da environment değişkenlerini görebilirsiniz:

```javascript
console.log('Environment Variables Debug:')
console.log('import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL)
console.log('import.meta.env.VITE_API_KEY:', import.meta.env.VITE_API_KEY)
```

## Sorun Giderme

### 1. Dosya Bulunamıyor
- Dosyanın proje ana dizininde olduğundan emin olun
- Dosya adının `.env` olduğundan emin olun (nokta ile başlar)

### 2. Değişkenler Okunmuyor
- Değişken adının `VITE_` ile başladığından emin olun
- Uygulamayı yeniden başlatın (`npm run dev`)

### 3. Git'e Commit Edilmemeli
`.gitignore` dosyasına ekleyin:
```
.env
.env.local
.env.*.local
```

## Test Etme

1. `.env` dosyasını oluşturun
2. Uygulamayı çalıştırın: `npm run dev`
3. Browser console'da debug mesajlarını kontrol edin
4. `/test` sayfasına giderek API bağlantısını test edin
