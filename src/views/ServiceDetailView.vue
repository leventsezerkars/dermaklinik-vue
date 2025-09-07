<template>
  <div class="service-detail-page">
    <!-- Blog Style Header -->
    <header class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>{{ $t('serviceDetail.breadcrumb.home') }}</span>
            </router-link>
            <i class="fas fa-chevron-right separator"></i>
            <span class="current-page">{{ currentService?.category || $t('serviceDetail.breadcrumb.service') }}</span>
          </div>
          
          <div class="service-meta" v-if="currentService">
            <div class="category-badge">
              <i class="fas fa-tag"></i>
              {{ currentService.category }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="blog-main">
      <div class="container">
        <div class="blog-layout">
          <!-- Main Content -->
          <article class="blog-content">
            <header class="content-header" v-if="currentService">
              <h1 class="blog-title">{{ currentService.title }}</h1>
              <div class="content-meta">
                <div class="meta-item">
                  <i class="fas fa-user-md"></i>
                  <span>{{ $t('serviceDetail.meta.expertDermatologist') }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ $t('serviceDetail.meta.updated') }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-eye"></i>
                  <span>{{ $t('serviceDetail.meta.professionalTreatment') }}</span>
                </div>
              </div>
            </header>

            <div class="content-body" v-if="currentService">
              <div class="service-intro">
                <div class="intro-icon">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <p class="intro-text">
                  {{ $t('serviceDetail.introText', { title: currentService.title.toLowerCase() }) }}
                </p>
              </div>

              <div class="service-content" v-html="currentService.content"></div>
            </div>
            
            <div v-else class="service-not-found">
              <div class="not-found-content">
                <div class="not-found-icon">
                  <i class="fas fa-search"></i>
                </div>
                <h2>{{ $t('serviceDetail.notFound.title') }}</h2>
                <p>{{ $t('serviceDetail.notFound.description') }}</p>
                <div class="not-found-actions">
                  <router-link to="/" class="btn btn-primary">
                    <i class="fas fa-home me-2"></i>
                    {{ $t('serviceDetail.notFound.homeLink') }}
                  </router-link>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="blog-sidebar">
            <!-- Quick Contact Card -->
            <div class="sidebar-card contact-card">
              <div class="card-header">
                <i class="fas fa-calendar-check"></i>
                <h3>{{ $t('serviceDetail.sidebar.quickAppointment.title') }}</h3>
              </div>
              <div class="card-content">
                <p>{{ $t('serviceDetail.sidebar.quickAppointment.description') }}</p>
                <div class="contact-stats">
                  <div class="stat-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ $t('serviceDetail.sidebar.quickAppointment.stats.quickResponse') }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-user-md"></i>
                    <span>{{ $t('serviceDetail.sidebar.quickAppointment.stats.expertStaff') }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span>{{ $t('serviceDetail.sidebar.quickAppointment.stats.reliableService') }}</span>
                  </div>
                </div>
                <div class="contact-actions">
                  <a href="https://wa.me/905465297677" class="btn btn-primary btn-full">
                    <i class="fas fa-calendar-alt me-2"></i>
                    {{ $t('serviceDetail.sidebar.quickAppointment.actions.bookAppointment') }}
                  </a>
                  <a href="tel:+905465297677" class="btn btn-outline btn-full">
                    <i class="fas fa-phone me-2"></i>
                    {{ $t('serviceDetail.sidebar.quickAppointment.actions.callNow') }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Related Services -->
            <div class="sidebar-card related-services" v-if="currentService">
              <div class="card-header">
                <i class="fas fa-link"></i>
                <h3>{{ $t('serviceDetail.sidebar.relatedServices.title') }}</h3>
              </div>
              <div class="card-content">
                <div class="related-list">
                  <router-link 
                    v-for="service in relatedServices" 
                    :key="service.slug"
                    :to="`/hizmetler/${service.slug}`"
                    class="related-item"
                  >
                    <div class="related-icon">
                      <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="related-content">
                      <h4>{{ service.title }}</h4>
                      <span class="related-category">{{ service.category }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="sidebar-card contact-info">
              <div class="card-header">
                <i class="fas fa-info-circle"></i>
                <h3>{{ $t('serviceDetail.sidebar.contactInfo.title') }}</h3>
              </div>
              <div class="card-content">
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.address') }}</strong>
                    <span> Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-phone"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.phone') }}</strong>
                    <span>+90 546 529 76 77</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.email') }}</strong>
                    <span>dr.munal1101@gmail.com</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <strong>{{ $t('serviceDetail.sidebar.contactInfo.workingHours') }}</strong>
                    <span>{{ $t('serviceDetail.sidebar.contactInfo.workingHoursValue') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()
const loading = ref(false)
const error = ref(null)

// Hizmetler verisi - local array
const services = ref([
  {
    slug: 'akne-sivilce-tedavisi',
    title: 'Akne (Sivilce) Tedavisi',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Akne Nedir?</h4>
        <p>Akne, cildin yağ bezlerinin fazla sebum üretmesi ve gözeneklerin tıkanması sonucu ortaya çıkan iltihaplı bir cilt hastalığıdır. Özellikle yüz, sırt, omuz ve göğüs bölgelerinde sık görülür. Gençlik döneminde yaygın olsa da yetişkinlikte de görülebilir ve kişinin yaşam kalitesini olumsuz etkileyebilir. Akne, sadece estetik bir sorun değil, aynı zamanda cilt sağlığını da etkileyen önemli bir dermatolojik durumdur.</p>
        
        <h4>Akne Türleri ve Nedenleri</h4>
        <p>Akne, farklı türlerde ortaya çıkabilir: komedonlar (siyah ve beyaz noktalar), papül ve püstüller (kırmızı ve iltihaplı sivilceler), nodüller ve kistler (derin ve ağrılı sivilceler). Akne oluşumunda genetik faktörler, hormonal değişiklikler, stres, beslenme alışkanlıkları, kozmetik ürünler ve çevresel faktörler rol oynar. Özellikle ergenlik döneminde artan androjen hormonları, yağ bezlerinin aşırı çalışmasına neden olur.</p>
        
        <h4>Modern Akne Tedavi Yöntemleri</h4>
        <p>Kliniğimizde akne tedavisi için en güncel ve etkili yöntemleri kullanıyoruz. Tedavi planı, aknenin şiddetine, türüne ve hastanın cilt tipine göre kişiselleştirilir. Kombine tedavi yaklaşımı ile hem mevcut akneleri tedavi ediyor hem de yeni akne oluşumunu önlüyoruz.</p>
        
        <h4>Fraksiyonel Lazer Tedavisi</h4>
        <p>Fraksiyonel lazer tedavisi, akne izi tedavisinde devrim niteliğinde bir yöntemdir. Bu teknoloji, cildin derin katmanlarına kontrollü mikro hasarlar oluşturarak vücudun doğal iyileşme mekanizmasını harekete geçirir. Lazer ışınları, ciltteki yağ bezlerini hedef alarak sebum üretimini azaltır ve gözenekleri sıkılaştırır. Aynı zamanda, akne sonrası oluşan izlerin ve lekelerin tedavisinde de son derece etkilidir.</p>
        
        <p>Fraksiyonel lazer tedavisinin avantajları:</p>
        <ul>
          <li>Yağ bezlerinin aktivitesini azaltır</li>
          <li>Gözenekleri sıkılaştırır</li>
          <li>Akne izlerini ve lekelerini azaltır</li>
          <li>Kolajen üretimini artırır</li>
          <li>İz bırakmadan tedavi sağlar</li>
        </ul>
        
        <h4>Altın İğne (Secret Altın İğne) Tedavisi</h4>
        <p>Secret Altın İğne teknolojisi, akne tedavisinde özellikle akne sonrası oluşan izlerin ve cilt dokusunun yenilenmesinde kullanılan ileri düzey bir yöntemdir. Bu tedavi, mikro iğneler ve radyo frekans enerjisini birleştirerek cildin kendi iyileşme sürecini hızlandırır. Altın iğne tedavisi, ciltteki hasarlı dokuları hedef alarak yeni, sağlıklı hücrelerin oluşumunu teşvik eder.</p>
        
        <p>Altın İğne tedavisinin faydaları:</p>
        <ul>
          <li>Akne izlerini derinlemesine tedavi eder</li>
          <li>Cilt dokusunu yeniler ve sıkılaştırır</li>
          <li>Gözenekleri küçültür</li>
          <li>Cilt tonunu eşitler</li>
          <li>Uzun süreli sonuçlar sağlar</li>
        </ul>
        
        <h4>Kolajen Aşısı (Kolajen Stimülasyonu)</h4>
        <p>Kolajen aşısı, akne tedavisinde cildin yapısal bütünlüğünü destekleyen önemli bir tedavi yöntemidir. Bu yöntem, cildin doğal kolajen üretimini artırarak akne sonrası oluşan çukurları ve izleri doldurur. Kolajen aşısı, hem akne tedavisinde hem de tedavi sonrası cilt yenilenmesinde kullanılan etkili bir yaklaşımdır.</p>
        
        <p>Kolajen aşısının etkileri:</p>
        <ul>
          <li>Akne izlerini doldurur ve yumuşatır</li>
          <li>Cildin elastikiyetini artırır</li>
          <li>Gözenekleri sıkılaştırır</li>
          <li>Cilt dokusunu yeniler</li>
          <li>Doğal ve kalıcı sonuçlar verir</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde akne tedavisinde en iyi sonuçları almak için farklı yöntemleri birleştiren kombine tedavi yaklaşımını benimsiyoruz. Bu yaklaşım, her hastanın ihtiyacına göre özelleştirilir.</p>
        <h4>Akne Tedavisinde Beslenme ve Yaşam Tarzı</h4>
        <p>Akne tedavisinde başarılı sonuçlar almak için sadece medikal tedaviler yeterli değildir. Beslenme alışkanlıkları, stres yönetimi ve cilt bakımı da önemlidir. Yüksek glisemik indeksli gıdalardan, süt ürünlerinden ve işlenmiş gıdalardan kaçınmak akne şikayetlerini azaltabilir. Ayrıca düzenli uyku, stres azaltma teknikleri ve uygun cilt bakım ürünleri kullanımı tedavi sürecini destekler.</p>
        
        <h4>Tedavi Sonrası Bakım ve Korunma</h4>
        <p>Akne tedavisi sonrası cildin korunması ve yeni akne oluşumunun önlenmesi çok önemlidir. Güneş koruyucu kullanımı, düzenli cilt temizliği ve nemlendirme tedavi sonuçlarının kalıcılığını sağlar. Kliniğimizde her hastaya kişiselleştirilmiş bakım programı hazırlanır ve düzenli kontroller ile tedavi sonuçları takip edilir.</p>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde akne tedavisi için en güncel teknolojileri ve uzman dermatolog ekibimizi kullanarak, her hastaya özel tedavi planları hazırlıyoruz. Fraksiyonel lazer, Altın İğne ve Kolajen aşısı gibi modern yöntemlerle, akne ve akne sonrası oluşan problemleri etkili şekilde çözüyoruz. Deneyimli ekibimiz ve gelişmiş cihazlarımızla, güvenli ve sonuç odaklı tedavi hizmeti sunuyoruz.</p>
      </div>
    `
  },
  {
    slug: 'rosacea-gul-hastaligi-tedavisi',
    title: 'Rosacea (Gül Hastalığı) Tedavisi',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Rosacea (Gül Hastalığı) Nedir?</h4>
        <p>Rosacea, yüzün merkezinde kızarıklık, damar genişlemeleri ve iltihaplı lezyonlarla kendini gösteren kronik bir cilt hastalığıdır. Bu hastalık, genellikle 30-50 yaş arası yetişkinlerde görülür ve kadınlarda daha sık rastlanır. Rosacea, sadece estetik bir problem değil, aynı zamanda cilt sağlığını da etkileyen önemli bir dermatolojik durumdur.</p>
        
        <h4>Rosacea Belirtileri ve Evreleri</h4>
        <p>Rosacea, farklı evrelerde farklı belirtilerle kendini gösterir:</p>
        
        <h5>Erken Evre (Pre-rosacea)</h5>
        <ul>
          <li>Yüzde geçici kızarıklık ve yanma hissi</li>
          <li>Güneş, sıcak, baharatlı yiyecekler ve alkol ile tetiklenen ataklar</li>
          <li>Hassas ve reaktif cilt</li>
        </ul>
        
        <h5>Vasküler Rosacea</h5>
        <ul>
          <li>Kalıcı kızarıklık ve damar genişlemeleri</li>
          <li>Yüzde sıcaklık hissi ve yanma</li>
          <li>Gözlerde kuruluk ve hassasiyet</li>
        </ul>
        
        <h5>İnflamatuar Rosacea</h5>
        <ul>
          <li>Kırmızı papüller ve püstüller</li>
          <li>Yüzde şişlik ve ödem</li>
          <li>Göz çevresinde iltihap</li>
        </ul>
        
        <h5>İleri Evre Rosacea</h5>
        <ul>
          <li>Rinofima (burunda kalınlaşma)</li>
          <li>Kalıcı damar genişlemeleri</li>
          <li>Cilt kalınlaşması ve nodüller</li>
        </ul>
        
        <h4>Rosacea Nedenleri ve Tetikleyicileri</h4>
        <p>Rosacea'nın kesin nedeni bilinmemekle birlikte, birçok faktör hastalığın gelişiminde rol oynar:</p>
        
        <h5>Genetik Faktörler</h5>
        <ul>
          <li>Aile öyküsünde rosacea olan kişilerde risk artar</li>
          <li>Belirli genetik yatkınlıklar</li>
          <li>Irksal faktörler (açık tenli kişilerde daha sık)</li>
        </ul>
        
        <h5>Çevresel Tetikleyiciler</h5>
        <ul>
          <li>Güneş ışınları ve UV radyasyon</li>
          <li>Sıcak hava ve nem</li>
          <li>Rüzgar ve soğuk hava</li>
          <li>Stres ve duygusal faktörler</li>
        </ul>
        
        <h5>Yaşam Tarzı Faktörleri</h5>
        <ul>
          <li>Baharatlı ve sıcak yiyecekler</li>
          <li>Alkol tüketimi</li>
          <li>Kafeinli içecekler</li>
          <li>Yoğun egzersiz</li>
        </ul>
        
        <h4>Rosacea Tanısı</h4>
        <p>Rosacea tanısı, dermatolog muayenesi ile konulur. Tanı sürecinde şu adımlar izlenir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Yüzdeki lezyonların değerlendirilmesi</li>
          <li>Damar genişlemelerinin tespiti</li>
          <li>Cilt kalınlığının ölçülmesi</li>
          <li>Göz muayenesi (oküler rosacea için)</li>
        </ul>
        
        <h5>Hasta Öyküsü</h5>
        <ul>
          <li>Belirtilerin başlangıç zamanı</li>
          <li>Tetikleyici faktörlerin belirlenmesi</li>
          <li>Aile öyküsü</li>
          <li>Önceki tedaviler</li>
        </ul>
        
        <h5>Diferansiyel Tanı</h5>
        <ul>
          <li>Akne vulgaris ile ayrımı</li>
          <li>Seboreik dermatit ile karıştırılmaması</li>
          <li>Lupus eritematozus ile ayırımı</li>
        </ul>
        
        <h4>Modern Rosacea Tedavi Yöntemleri</h4>
        <p>Kliniğimizde rosacea tedavisi için en güncel ve etkili yöntemleri kullanıyoruz. Tedavi planı, hastalığın evresine, şiddetine ve hastanın ihtiyaçlarına göre kişiselleştirilir.</p>
        
        <h4>Topikal Tedaviler</h4>
        <p>Rosacea'nın erken evrelerinde topikal tedaviler etkili sonuçlar verir:</p>
        
        <h5>Metronidazol</h5>
        <p>Antibiyotik özelliği olan bu ilaç, rosacea'daki inflamasyonu azaltır ve kızarıklığı hafifletir. %0.75 ve %1 konsantrasyonlarda kullanılır.</p>
        
        <h5>İvermektin</h5>
        <p>Demodex akarlarına karşı etkili olan bu ilaç, rosacea semptomlarını azaltır ve cildi yatıştırır.</p>
        
        <h5>Azelaik Asit</h5>
        <p>%15 ve %20 konsantrasyonlarda kullanılan bu asit, inflamasyonu azaltır ve cilt tonunu iyileştirir.</p>
        
        <h5>Brimonidin</h5>
        <p>Vazokonstriktör etkisi ile damar genişlemelerini azaltır ve kızarıklığı geçici olarak hafifletir.</p>
        
        <h4>Sistemik Tedaviler</h4>
        <p>Orta ve şiddetli rosacea vakalarında sistemik tedaviler gerekebilir:</p>
        
        <h5>Oral Antibiyotikler</h5>
        <ul>
          <li>Doksisiklin: En sık kullanılan antibiyotik</li>
          <li>Minosiklin: Alternatif antibiyotik seçeneği</li>
          <li>Azitromisin: Kısa süreli tedaviler için</li>
        </ul>
        
        <h5>İzotretinoin</h5>
        <p>Şiddetli ve dirençli rosacea vakalarında düşük dozlarda kullanılır. Uzun süreli remisyon sağlar.</p>
        
        <h4>Lazer ve Işık Tedavileri</h4>
        <p>Rosacea tedavisinde lazer ve ışık tedavileri özellikle damar genişlemeleri ve kızarıklık için etkilidir:</p>
        
        <h5>Pulsed Dye Laser (PDL)</h5>
        <p>Genişlemiş kılcal damarları hedef alarak kızarıklığı azaltır. 3-6 seans arası uygulanır.</p>
        
        <h5>Intense Pulsed Light (IPL)</h5>
        <p>Farklı dalga boylarında ışık kullanarak hem damarları hem de pigmentasyonu tedavi eder.</p>
        
        <h5>Nd:YAG Lazer</h5>
        <p>Derin damarları hedef alarak kalıcı sonuçlar verir.</p>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı yöntemleri birleştiriyoruz:</p>
        <ul>
          <li>Topikal tedavi + Lazer tedavisi</li>
          <li>Sistemik tedavi + Topikal tedavi</li>
          <li>Lazer + IPL kombinasyonu</li>
          <li>Medikal tedavi + Yaşam tarzı değişiklikleri</li>
        </ul>
        
        <h4>Rosacea'da Yaşam Tarzı Değişiklikleri</h4>
        <p>Rosacea tedavisinde başarılı sonuçlar almak için yaşam tarzı değişiklikleri çok önemlidir:</p>
        
        <h5>Cilt Bakımı</h5>
        <ul>
          <li>Nazik temizleyiciler kullanın</li>
          <li>Alkolsüz ve parfümsüz ürünler tercih edin</li>
          <li>Güneş koruyucu kullanımı şarttır (SPF 30+)</li>
          <li>Fiziksel peeling'den kaçının</li>
        </ul>
        
        <h5>Beslenme Önerileri</h5>
        <ul>
          <li>Baharatlı yiyeceklerden kaçının</li>
          <li>Sıcak içecekleri soğutarak için</li>
          <li>Alkol tüketimini sınırlayın</li>
          <li>Histamin içeren gıdalardan uzak durun</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Güneşten korunun</li>
          <li>Ekstrem sıcak ve soğuktan kaçının</li>
          <li>Stres yönetimi yapın</li>
          <li>Düzenli uyku düzeni oluşturun</li>
        </ul>
        
        <h4>Rosacea Tedavi Sonuçları</h4>
        <p>Rosacea tedavisinde sonuçlar genellikle 4-8 hafta içinde görülmeye başlar:</p>
        
        <h5>Kısa Vadeli Sonuçlar (1-2 ay)</h5>
        <ul>
          <li>Kızarıklıkta azalma</li>
          <li>İnflamasyonun hafiflemesi</li>
          <li>Yanma ve batma hissinin azalması</li>
          <li>Cilt hassasiyetinde iyileşme</li>
        </ul>
        
        <h5>Uzun Vadeli Sonuçlar (3-6 ay)</h5>
        <ul>
          <li>Damar genişlemelerinde belirgin azalma</li>
          <li>Kalıcı kızarıklığın hafiflemesi</li>
          <li>Atak sıklığında azalma</li>
          <li>Genel cilt görünümünde iyileşme</li>
        </ul>
        
        <h4>Rosacea Tedavi Sonrası Bakım</h4>
        <p>Rosacea tedavisi sonrası düzenli bakım ve takip çok önemlidir:</p>
        
        <h5>Düzenli Kontroller</h5>
        <ul>
          <li>3-6 ayda bir dermatolog kontrolü</li>
          <li>Tedavi etkinliğinin değerlendirilmesi</li>
          <li>Gerekirse tedavi planının güncellenmesi</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Güneş koruyucu kullanımının sürdürülmesi</li>
          <li>Tetikleyici faktörlerden kaçınma</li>
          <li>Düzenli cilt bakımı</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Rosacea Komplikasyonları</h4>
        <p>Rosacea tedavi edilmediğinde çeşitli komplikasyonlar gelişebilir:</p>
        
        <h5>Oküler Rosacea</h5>
        <ul>
          <li>Göz kuruluğu ve yanma</li>
          <li>Konjonktivit</li>
          <li>Kornea hasarı (nadir)</li>
          <li>Görme bozuklukları</li>
        </ul>
        
        <h5>Rinofima</h5>
        <ul>
          <li>Burunda kalınlaşma</li>
          <li>Şekil bozukluğu</li>
          <li>Estetik kaygılar</li>
          <li>Nefes alma güçlüğü</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde rosacea tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Rosacea konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel lazer ve ışık tedavi sistemleri</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
          <li><strong>Uzun Vadeli Sonuçlar:</strong> Kalıcı iyileşme hedefi</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Rosacea, doğru tedavi ve yaşam tarzı değişiklikleri ile kontrol altına alınabilen bir hastalıktır. Kliniğimizde uzman ekibimizle birlikte, size en uygun rosacea tedavi planını hazırlayarak, kızarıklık, damar genişlemeleri ve inflamasyon gibi şikayetlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, rosacea ile yaşamayı öğrenmenize yardımcı oluyoruz.</p>
      </div>
    `
  }
])

// Mevcut hizmeti bul
const currentService = computed(() => {
  return services.value.find(service => service.slug === route.params.slug)
})

// İlgili hizmetleri bul
const relatedServices = computed(() => {
  if (!currentService.value) return []
  
  return services.value
    .filter(service => 
      service.slug !== currentService.value.slug && 
      service.category === currentService.value.category
    )
    .slice(0, 3)
})

// SEO için head bilgilerini ayarla
useHead({
  title: computed(() => currentService.value ? `${currentService.value.title} - Dermaklinik` : 'Hizmet Bulunamadı - Dermaklinik'),
  meta: [
    {
      name: 'description',
      content: computed(() => currentService.value ? `${currentService.value.title} hakkında detaylı bilgi. Uzman dermatolog ekibimizle modern tedavi yöntemleri.` : 'Aradığınız hizmet bulunamadı.')
    },
    {
      name: 'keywords',
      content: computed(() => currentService.value ? `${currentService.value.title}, dermatoloji, cilt hastalıkları, tedavi` : 'dermatoloji, cilt hastalıkları')
    }
  ]
})

onMounted(() => {
  // Sayfa yüklendiğinde gerekli işlemler
  if (!currentService.value) {
    error.value = 'Hizmet bulunamadı'
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/views/ServiceDetailView.scss';
</style>
