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
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
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
  },
  {
    slug: 'sac-dokulmesi-ve-sac-tedavileri',
    title: 'Saç Dökülmesi ve Saç Tedavileri',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Saç Dökülmesi Nedir?</h4>
        <p>Saç dökülmesi, günlük yaşamda herkesin karşılaştığı normal bir durumdur. Günde 50-100 saç telinin dökülmesi normal kabul edilir. Ancak bu sayının artması, saç yoğunluğunda azalma, saç tellerinde incelme veya belirli bölgelerde açılma gibi durumlar patolojik saç dökülmesi olarak değerlendirilir. Saç dökülmesi, sadece estetik bir sorun değil, aynı zamanda altta yatan sağlık problemlerinin de göstergesi olabilir.</p>
        
        <h4>Saç Dökülmesinin Nedenleri</h4>
        <p>Saç dökülmesi birçok farklı faktöre bağlı olarak gelişebilir. En yaygın nedenler şunlardır:</p>
        <ul>
          <li><strong>Genetik Faktörler:</strong> Aile öyküsünde saç dökülmesi olan kişilerde daha sık görülür</li>
          <li><strong>Hormonal Değişiklikler:</strong> Gebelik, menopoz, tiroid hastalıkları, polikistik over sendromu</li>
          <li><strong>Stres ve Psikolojik Faktörler:</strong> Yoğun stres, anksiyete, depresyon</li>
          <li><strong>Beslenme Bozuklukları:</strong> Demir, çinko, B12 vitamini eksiklikleri, protein yetersizliği</li>
          <li><strong>İlaç Kullanımı:</strong> Kemoterapi, antidepresanlar, kan sulandırıcılar</li>
          <li><strong>Saç Bakım Uygulamaları:</strong> Sık boyama, perma, sıcak fön, sıkı saç modelleri</li>
          <li><strong>Deri Hastalıkları:</strong> Saçkıran, sedef hastalığı, egzama</li>
          <li><strong>Sistemik Hastalıklar:</strong> Lupus, diyabet, böbrek hastalıkları</li>
        </ul>
        
        <h4>Saç Dökülmesi Türleri</h4>
        <p>Saç dökülmesi farklı şekillerde ortaya çıkabilir ve her türün kendine özgü özellikleri vardır:</p>
        
        <h5>Androjenetik Alopesi (Erkek/Kadın Tipi Kellik)</h5>
        <p>En yaygın saç dökülmesi türüdür. Erkeklerde alın çizgisinin geriye çekilmesi ve tepe bölgesinde açılma, kadınlarda ise saç ayrım çizgisinde genişleme ve genel saç yoğunluğunda azalma şeklinde görülür. Genetik yatkınlık ve androjen hormonların etkisi ile gelişir.</p>
        
        <h5>Alopesi Areata (Saçkıran)</h5>
        <p>Bağışıklık sisteminin saç köklerine saldırması sonucu oluşan yuvarlak veya oval şekilli saçsız alanlarla karakterizedir. Aniden başlar ve bazen tüm vücut kıllarının dökülmesine neden olabilir.</p>
        
        <h4>Saç Dökülmesi Tanısı</h4>
        <p>Saç dökülmesinin doğru tedavi edilebilmesi için öncelikle nedeninin belirlenmesi gerekir. Kliniğimizde kapsamlı bir değerlendirme yapılır:</p>
        <ul>
          <li><strong>Detaylı Hasta Öyküsü:</strong> Aile öyküsü, ilaç kullanımı, beslenme alışkanlıkları</li>
          <li><strong>Fizik Muayene:</strong> Saç yoğunluğu, saç kalınlığı, dökülme paterni</li>
          <li><strong>Saç Çekme Testi:</strong> Saç köklerinin durumunun değerlendirilmesi</li>
          <li><strong>Laboratuvar Testleri:</strong> Kan sayımı, demir, B12, folik asit, tiroid hormonları</li>
          <li><strong>Saç Analizi:</strong> Saç kalınlığı, yoğunluk ve büyüme hızının ölçülmesi</li>
        </ul>
        
        <h4>Modern Saç Tedavi Yöntemleri</h4>
        <p>Kliniğimizde saç dökülmesi tedavisinde en güncel ve etkili yöntemleri kullanıyoruz. Tamamen medikal ve invaziv olmayan tedavi seçenekleri sunuyoruz. Her hasta için kişiselleştirilmiş tedavi planı hazırlanır ve tedavi sonuçları düzenli olarak takip edilir.</p>
        
        <h4>Kök Hücre Tedavisi (Regenera Activa)</h4>
        <p>Regenera Activa, saç dökülmesi tedavisinde devrim niteliğinde bir yöntemdir. Bu tedavi, kişinin kendi dokusundan alınan kök hücrelerin mikrogreft yöntemiyle saçlı deriye uygulanmasıyla gerçekleştirilir. Kök hücre tedavisi, saç köklerinin yeniden canlanmasını ve yeni saç oluşumunu teşvik eder.</p>
        
        <p>Kök hücre tedavisinin avantajları:</p>
        <ul>
          <li>Kişinin kendi dokusundan elde edilir, alerji riski yoktur</li>
          <li>Saç köklerini yeniden uyarır</li>
          <li>Saç kalınlığını ve yoğunluğunu artırır</li>
          <li>Doğal ve kalıcı sonuçlar verir</li>
          <li>Minimal invaziv, ağrısız uygulama</li>
          <li>Hızlı iyileşme süreci</li>
        </ul>
        
        <h4>Mezoterapi Tedavisi</h4>
        <p>Saç mezoterapisi, saç köklerini besleyen vitamin, mineral ve aminoasit karışımlarının mikro iğnelerle saçlı deriye enjekte edilmesi yöntemidir. Bu tedavi, saç köklerinin beslenmesini iyileştirir ve saç büyüme döngüsünü normalize eder.</p>
        
        <p>Mezoterapi tedavisinin faydaları:</p>
        <ul>
          <li>Saç köklerini besler ve güçlendirir</li>
          <li>Kan dolaşımını artırır</li>
          <li>Saç büyüme hızını artırır</li>
          <li>Saç kalınlığını artırır</li>
          <li>Saç dökülmesini azaltır</li>
          <li>Saç kalitesini iyileştirir</li>
        </ul>
        
        <h4>Medikal Saç Tedavileri</h4>
        <p>Kliniğimizde saç dökülmesi tedavisinde kanıtlanmış etkinliği olan medikal tedaviler de uygulanmaktadır. Bu tedaviler, saç dökülmesinin nedenine ve türüne göre seçilir:</p>
        
        <h5>Topikal Tedaviler</h5>
        <p>Saçlı deriye uygulanan kremler ve losyonlar ile saç köklerinin beslenmesi ve güçlendirilmesi sağlanır. Minoksidil gibi etken maddeler içeren ürünler, saç büyüme döngüsünü uyarır.</p>
        
        <h5>Oral Tedaviler</h5>
        <p>Vitamin ve mineral takviyeleri, demir preparatları, biotin gibi besin destekleri ile saç sağlığı desteklenir. Gerekli durumlarda hormon düzenleyici ilaçlar da kullanılabilir.</p>

        <h4>Saç Tedavisinde Beslenme ve Yaşam Tarzı</h4>
        <p>Saç tedavisinde başarılı sonuçlar almak için sadece medikal tedaviler yeterli değildir. Beslenme alışkanlıkları ve yaşam tarzı değişiklikleri de önemlidir:</p>
        
        <h5>Beslenme Önerileri</h5>
        <ul>
          <li>Protein açısından zengin besinler (et, balık, yumurta, süt ürünleri)</li>
          <li>Demir içeren gıdalar (kırmızı et, ıspanak, mercimek)</li>
          <li>Omega-3 yağ asitleri (balık, ceviz, keten tohumu)</li>
          <li>B vitaminleri (tam tahıllar, yeşil yapraklı sebzeler)</li>
          <li>Çinko içeren besinler (kabuklu yemişler, deniz ürünleri)</li>
        </ul>
        
        <h5>Yaşam Tarzı Değişiklikleri</h5>
        <ul>
          <li>Düzenli uyku ve stres yönetimi</li>
          <li>Saç bakımında nazik yaklaşım</li>
          <li>Güneş ve kimyasal hasarlardan korunma</li>
          <li>Düzenli egzersiz ve sağlıklı yaşam</li>
        </ul>
        
        <h4>Tedavi Sonrası Bakım ve Takip</h4>
        <p>Saç tedavisi sonrası düzenli bakım ve takip çok önemlidir. Kliniğimizde her hasta için kişiselleştirilmiş bakım programı hazırlanır:</p>
        <ul>
          <li>Düzenli kontroller ve tedavi sonuçlarının değerlendirilmesi</li>
          <li>Saç bakım ürünleri önerileri</li>
          <li>Beslenme ve yaşam tarzı danışmanlığı</li>
          <li>Gerekli durumlarda tedavi protokolünün güncellenmesi</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde saç dökülmesi tedavisi için en güncel ve etkili yöntemleri kullanarak, her hastaya özel tedavi planları hazırlıyoruz. Tamamen medikal ve invaziv olmayan yöntemlerle güvenli sonuçlar elde ediyoruz. Deneyimli dermatolog ekibimiz ve gelişmiş tedavi protokollerimizle, saç dökülmesi problemlerinde kalıcı çözümler sunuyoruz.</p>
        
        <p>Kök hücre tedavisi, mezoterapi ve PRP gibi modern yöntemlerle, saçlarınızın yeniden canlanmasını ve güçlenmesini sağlıyoruz. Her hasta için özel olarak tasarlanan tedavi programları ile, saç dökülmesi şikayetlerinizde etkili ve uzun süreli sonuçlar elde ediyoruz.</p>
      </div>
    `
  },
  {
    slug: 'sigil-ben-tedavisi',
    title: 'Siğil (Ben) Tedavisi',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Siğil (Ben) Nedir?</h4>
        <p>Siğiller, Human Papilloma Virüsü (HPV) kaynaklı, cilt yüzeyinde kabarık ve pütürlü yapılar olarak oluşan bulaşıcı cilt lezyonlarıdır. Bu viral enfeksiyonlar, vücudun farklı bölgelerinde ortaya çıkabilir ve hem estetik hem de sağlık açısından önem taşır. Siğiller, bulaşıcı olması nedeniyle erken tedavi edilmesi gereken cilt problemleridir.</p>
        
        <h4>Siğil Türleri ve Özellikleri</h4>
        <p>Siğiller, bulundukları bölgeye ve görünümlerine göre farklı türlerde sınıflandırılır:</p>
        
        <h5>Yaygın Siğiller (Verruca Vulgaris)</h5>
        <ul>
          <li>En sık görülen siğil türü</li>
          <li>El, parmak ve tırnak çevresinde oluşur</li>
          <li>Kaba, pütürlü yüzey yapısı</li>
          <li>Gri-kahverengi renkte</li>
        </ul>
        
        <h5>Ayak Tabanı Siğilleri (Plantar Warts)</h5>
        <ul>
          <li>Ayak tabanında ve parmak altlarında görülür</li>
          <li>Basınç nedeniyle içe doğru büyür</li>
          <li>Yürürken ağrıya neden olabilir</li>
          <li>Kalın, nasır benzeri görünüm</li>
        </ul>
        
        <h5>Düz Siğiller (Flat Warts)</h5>
        <ul>
          <li>Yüz, boyun ve el sırtında görülür</li>
          <li>Küçük, düz ve yumuşak yapıda</li>
          <li>Ten renginde veya hafif kahverengi</li>
          <li>Çok sayıda olabilir</li>
        </ul>
        
        <h5>Filiform Siğiller</h5>
        <ul>
          <li>Yüz, boyun ve dudak çevresinde görülür</li>
          <li>Uzun, iplik benzeri çıkıntılar</li>
          <li>Estetik kaygıya neden olur</li>
          <li>Kolayca travmatize olabilir</li>
        </ul>
        
        <h5>Genital Siğiller (Condyloma Acuminata)</h5>
        <ul>
          <li>Genital bölge ve çevresinde görülür</li>
          <li>Karnabahar benzeri görünüm</li>
          <li>Bulaşıcılığı yüksektir</li>
          <li>Erken tedavi gerektirir</li>
        </ul>
        
        <h4>Siğil Nedenleri ve Bulaşma Yolları</h4>
        <p>Siğiller, HPV virüsünün neden olduğu enfeksiyonlardır ve çeşitli yollarla bulaşabilir:</p>
        
        <h5>Bulaşma Yolları</h5>
        <ul>
          <li><strong>Direkt Temas:</strong> Enfekte kişi ile doğrudan temas</li>
          <li><strong>Ortak Eşya Kullanımı:</strong> Havlu, terlik, ayakkabı paylaşımı</li>
          <li><strong>Ortak Alanlar:</strong> Havuz, sauna, spor salonu zeminleri</li>
          <li><strong>Kendine Bulaştırma:</strong> Vücudun farklı bölgelerine yayılma</li>
          <li><strong>Cinsel Temas:</strong> Genital siğiller için</li>
        </ul>
        
        <h5>Risk Faktörleri</h5>
        <ul>
          <li>Bağışıklık sisteminin zayıf olması</li>
          <li>Ciltte kesik, çizik veya yaralar</li>
          <li>Nemli ve sıcak ortamlar</li>
          <li>Ortak eşya kullanımı</li>
          <li>Stres ve yorgunluk</li>
        </ul>
        
        <h4>Siğil Tanısı</h4>
        <p>Siğil tanısı genellikle dermatolog muayenesi ile konulur:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Görsel inceleme</li>
          <li>Dokunma ile değerlendirme</li>
          <li>Büyüteç ile detaylı inceleme</li>
        </ul>
        
        <h5>Dermatoskopi</h5>
        <ul>
          <li>Özel cihaz ile yakın inceleme</li>
          <li>Siğil yapısının detaylı analizi</li>
          <li>Malignite şüphesi olan durumlarda</li>
        </ul>
        
        <h5>Biyopsi (Gerekirse)</h5>
        <ul>
          <li>Şüpheli durumlarda</li>
          <li>Kanser şüphesi olan vakalarda</li>
          <li>Tedaviye dirençli siğillerde</li>
        </ul>
        
        <h4>Modern Siğil Tedavi Yöntemleri</h4>
        <p>Kliniğimizde siğil tedavisi için en güncel ve etkili yöntemleri kullanıyoruz. Tedavi seçimi, siğilin türüne, büyüklüğüne, yerleşim yerine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Lazer Tedavisi</h4>
        <p>Lazer tedavisi, siğil tedavisinde en modern ve etkili yöntemlerden biridir:</p>
        
        <h5>Karbondioksit (CO2) Lazer</h5>
        <ul>
          <li>Siğilin köküne kadar etkili</li>
          <li>Sağlıklı dokulara minimal zarar</li>
          <li>Tek seansta sonuç</li>
          <li>Hızlı iyileşme süreci</li>
        </ul>
        
        <h5>Erbium YAG Lazer</h5>
        <ul>
          <li>Daha hassas kesim</li>
          <li>Yüzeysel siğiller için ideal</li>
          <li>Minimal yan etki</li>
          <li>Hızlı iyileşme</li>
        </ul>
        
        <h4>Kriyoterapi (Dondurma Tedavisi)</h4>
        <p>Sıvı azot kullanılarak yapılan dondurma tedavisi:</p>
        <ul>
          <li>Yüzeysel siğiller için etkili</li>
          <li>Minimal ağrı</li>
          <li>Hızlı uygulama</li>
          <li>Birkaç seans gerekebilir</li>
        </ul>
        
        <h4>Elektrokoter (Yakma Tedavisi)</h4>
        <p>Elektrik akımı ile siğilin yakılması:</p>
        <ul>
          <li>Küçük siğiller için uygun</li>
          <li>Lokal anestezi ile uygulanır</li>
          <li>Hızlı sonuç</li>
          <li>Hafif iz bırakabilir</li>
        </ul>
        
        <h4>Topikal Tedaviler</h4>
        <p>Hafif siğiller için topikal tedaviler kullanılabilir:</p>
        
        <h5>Salicylic Acid</h5>
        <ul>
          <li>Siğil yüzeyini yumuşatır</li>
          <li>Düzenli uygulama gerekir</li>
          <li>Evde kullanım için uygun</li>
          <li>Birkaç hafta sürebilir</li>
        </ul>
        
        <h5>Podophyllin</h5>
        <ul>
          <li>Genital siğiller için</li>
          <li>Doktor kontrolünde uygulanır</li>
          <li>Hızlı etki</li>
          <li>Yan etki riski</li>
        </ul>
        
        <h5>Imiquimod</h5>
        <ul>
          <li>Bağışıklık sistemini uyarır</li>
          <li>Genital siğiller için</li>
          <li>Uzun süreli tedavi</li>
          <li>Yan etki riski düşük</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı yöntemleri birleştiriyoruz:</p>
        <ul>
          <li>Lazer + Topikal tedavi</li>
          <li>Kriyoterapi + Lazer</li>
          <li>Elektrokoter + Topikal tedavi</li>
          <li>Medikal tedavi + Lazer</li>
        </ul>
        
        <h4>Siğil Tedavi Süreci</h4>
        <p>Siğil tedavisi, uzman dermatologlar tarafından steril koşullarda uygulanır:</p>
        
        <h5>1. Konsültasyon ve Planlama</h5>
        <ul>
          <li>Siğil türünün belirlenmesi</li>
          <li>Uygun tedavi yönteminin seçimi</li>
          <li>Hasta bilgilendirmesi</li>
          <li>Tedavi planının hazırlanması</li>
        </ul>
        
        <h5>2. Tedavi Uygulaması</h5>
        <ul>
          <li>Steril ortam hazırlığı</li>
          <li>Lokal anestezi uygulaması</li>
          <li>Seçilen yöntemle tedavi</li>
          <li>Gerekli bakım önerileri</li>
        </ul>
        
        <h5>3. Tedavi Sonrası Takip</h5>
        <ul>
          <li>İyileşme sürecinin takibi</li>
          <li>Gerekirse ek seanslar</li>
          <li>Nüks önleme önerileri</li>
          <li>Düzenli kontroller</li>
        </ul>
        
        <h4>Siğil Tedavi Sonrası Bakım</h4>
        <p>Siğil tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>İlk 24 Saat</h5>
        <ul>
          <li>Uygulama bölgesini kuru tutun</li>
          <li>Su ile temas ettirmeyin</li>
          <li>Bandaj kullanımı (gerekirse)</li>
          <li>Ağrı kesici kullanımı (gerekirse)</li>
        </ul>
        
        <h5>İlk Hafta</h5>
        <ul>
          <li>Güneş koruyucu kullanın</li>
          <li>Kabuk oluşumunu bekleyin</li>
          <li>Kabuğu zorla çıkarmayın</li>
          <li>Hijyen kurallarına dikkat edin</li>
        </ul>
        
        <h5>Uzun Vadeli Bakım</h5>
        <ul>
          <li>Düzenli cilt kontrolü</li>
          <li>Yeni siğil oluşumunu takip</li>
          <li>Koruyucu önlemler</li>
          <li>Düzenli dermatolog kontrolü</li>
        </ul>
        
        <h4>Siğil Nüksünü Önleme</h4>
        <p>Siğil tedavisi sonrası nüksü önlemek için dikkat edilmesi gerekenler:</p>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Elleri sık sık yıkayın</li>
          <li>Ortak eşya kullanımından kaçının</li>
          <li>Havlu ve terlik paylaşmayın</li>
          <li>Ayakları kuru tutun</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Havuz ve saunada terlik kullanın</li>
          <li>Spor salonunda hijyene dikkat edin</li>
          <li>Ortak alanlarda koruyucu önlemler alın</li>
        </ul>
        
        <h5>Bağışıklık Sistemi</h5>
        <ul>
          <li>Düzenli beslenme</li>
          <li>Yeterli uyku</li>
          <li>Stres yönetimi</li>
          <li>Düzenli egzersiz</li>
        </ul>
        
        <h4>Siğil Tedavi Sonuçları</h4>
        <p>Siğil tedavisinde sonuçlar genellikle hızlı görülür:</p>
        
        <h5>Lazer Tedavisi</h5>
        <ul>
          <li>Tek seansta %90+ başarı oranı</li>
          <li>1-2 hafta iyileşme süreci</li>
          <li>Minimal iz riski</li>
          <li>Hızlı sosyal yaşama dönüş</li>
        </ul>
        
        <h5>Kriyoterapi</h5>
        <ul>
          <li>2-4 seans gerekebilir</li>
          <li>3-4 hafta iyileşme süreci</li>
          <li>Hafif ağrı olabilir</li>
          <li>Etkili sonuçlar</li>
        </ul>
        
        <h5>Topikal Tedaviler</h5>
        <ul>
          <li>4-12 hafta sürebilir</li>
          <li>Düzenli uygulama gerekir</li>
          <li>Yan etki riski düşük</li>
          <li>Evde uygulanabilir</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde siğil tedavisi için en güncel teknolojileri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Modern Teknolojiler:</strong> En güncel lazer sistemleri</li>
          <li><strong>Uzman Ekip:</strong> Deneyimli dermatologlar</li>
          <li><strong>Steril Ortam:</strong> Hijyenik ve güvenli uygulama</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel plan</li>
          <li><strong>Hızlı Sonuçlar:</strong> Etkili ve güvenli tedavi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Siğiller, modern tedavi yöntemleri ile başarıyla tedavi edilebilen cilt problemleridir. Kliniğimizde lazer teknolojisi, kriyoterapi ve diğer modern yöntemlerle, siğillerinizi güvenli ve etkili şekilde tedavi ediyoruz. Uzman ekibimiz ve gelişmiş cihazlarımızla, size en uygun tedavi planını hazırlayarak, hızlı ve kalıcı sonuçlar elde etmenizi sağlıyoruz.</p>
      </div>
    `
  },
  {
    slug: 'tirnak-hastaliklari-ve-tedavisi',
    title: 'Tırnak Hastalıkları ve Tedavisi',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Tırnak Hastalıkları Nedir?</h4>
        <p>Tırnak hastalıkları, tırnakların yapısını, rengini, şeklini ve işlevini etkileyen çeşitli dermatolojik durumlardır. Bu hastalıklar, sadece estetik problemlere değil, aynı zamanda ağrı, enfeksiyon ve fonksiyonel bozukluklara da neden olabilir. Tırnak hastalıkları, her yaş grubunda görülebilir ve erken tanı ile tedavi edilmesi önemlidir.</p>
        
        <h4>Tırnak Hastalıkları Türleri</h4>
        <p>Tırnak hastalıkları, nedenlerine ve belirtilerine göre farklı kategorilerde sınıflandırılır:</p>
        
        <h5>Mantar Enfeksiyonları (Onychomycosis)</h5>
        <ul>
          <li><strong>Distal Subungual Onychomycosis:</strong> Tırnak ucundan başlayan en yaygın mantar enfeksiyonu</li>
          <li><strong>Proximal Subungual Onychomycosis:</strong> Tırnak kökünden başlayan enfeksiyon</li>
          <li><strong>Superficial White Onychomycosis:</strong> Tırnak yüzeyinde beyaz lekeler</li>
          <li><strong>Candida Onychomycosis:</strong> Maya mantarı kaynaklı enfeksiyon</li>
        </ul>
        
        <h5>Tırnak Batması (Ingrown Nail)</h5>
        <ul>
          <li>Tırnak kenarının yumuşak dokuya gömülmesi</li>
          <li>Şiddetli ağrı ve enfeksiyon riski</li>
          <li>Yanlış tırnak kesimi ve dar ayakkabı nedeniyle oluşur</li>
          <li>Ayak başparmağında sık görülür</li>
        </ul>
        
        <h5>Tırnak Deformiteleri</h5>
        <ul>
          <li><strong>Koilonychia:</strong> Kaşık şeklinde tırnak</li>
          <li><strong>Beau Çizgileri:</strong> Tırnakta yatay çizgiler</li>
          <li><strong>Onycholysis:</strong> Tırnak yatağından ayrılma</li>
          <li><strong>Pitting:</strong> Tırnak yüzeyinde küçük çukurlar</li>
        </ul>
        
        <h5>Psoriatik Tırnak Hastalığı</h5>
        <ul>
          <li>Sedef hastalığına bağlı tırnak değişiklikleri</li>
          <li>Tırnak yüzeyinde pitting ve kalınlaşma</li>
          <li>Renk değişiklikleri ve şekil bozuklukları</li>
          <li>Sedef hastalığının şiddeti ile ilişkili</li>
        </ul>
        
        <h4>Tırnak Hastalıklarının Nedenleri</h4>
        <p>Tırnak hastalıkları birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Enfeksiyonlar</h5>
        <ul>
          <li>Mantar enfeksiyonları (dermatofitler, mayalar)</li>
          <li>Bakteriyel enfeksiyonlar</li>
          <li>Viral enfeksiyonlar (siğil)</li>
        </ul>
        
        <h5>Fiziksel Travmalar</h5>
        <ul>
          <li>Yanlış tırnak kesimi</li>
          <li>Dar ayakkabı kullanımı</li>
          <li>Tekrarlayan travmalar</li>
          <li>Spor yaralanmaları</li>
        </ul>
        
        <h5>Sistemik Hastalıklar</h5>
        <ul>
          <li>Diyabet</li>
          <li>Tiroid hastalıkları</li>
          <li>Anemi</li>
          <li>Bağışıklık sistemi bozuklukları</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Nemli ortamlar</li>
          <li>Kimyasal maddeler</li>
          <li>Güneş ışınları</li>
          <li>Mesleki maruziyetler</li>
        </ul>
        
        <h4>Tırnak Hastalıkları Tanısı</h4>
        <p>Tırnak hastalıklarının doğru tedavi edilebilmesi için kapsamlı bir tanı süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Tırnak yapısının detaylı incelenmesi</li>
          <li>Renk, şekil ve kalınlık değişikliklerinin tespiti</li>
          <li>Çevre dokuların değerlendirilmesi</li>
          <li>Ağrı ve hassasiyet kontrolü</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li><strong>Mantar Kültürü:</strong> Enfeksiyon etkeninin belirlenmesi</li>
          <li><strong>KOH Testi:</strong> Hızlı mantar tanısı</li>
          <li><strong>PAS Boyaması:</strong> Mantar hiflerinin görülmesi</li>
          <li><strong>Biyopsi:</strong> Şüpheli durumlarda</li>
        </ul>
        
        <h5>Görüntüleme Yöntemleri</h5>
        <ul>
          <li>Dermatoskopi ile detaylı inceleme</li>
          <li>Gerekirse radyolojik görüntüleme</li>
        </ul>
        
        <h4>Modern Tırnak Hastalıkları Tedavi Yöntemleri</h4>
        <p>Kliniğimizde tırnak hastalıkları için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, hastalığın türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Mantar Enfeksiyonları Tedavisi</h4>
        <p>Tırnak mantarı tedavisinde farklı yaklaşımlar kullanılır:</p>
        
        <h5>Topikal Tedaviler</h5>
        <ul>
          <li><strong>Antifungal Kremler:</strong> Amorolfine, ciclopirox</li>
          <li><strong>Antifungal Tırnak Losyonları:</strong> Günlük uygulama</li>
          <li><strong>Antifungal Tırnak Vernikleri:</strong> Haftalık uygulama</li>
        </ul>
        
        <h5>Sistemik Tedaviler</h5>
        <ul>
          <li><strong>Terbinafine:</strong> En etkili oral antifungal</li>
          <li><strong>İtraconazole:</strong> Alternatif tedavi seçeneği</li>
          <li><strong>Fluconazole:</strong> Candida enfeksiyonları için</li>
        </ul>
        
        <h5>Lazer Tedavisi</h5>
        <ul>
          <li>Mantar hiflerini hedef alan lazer</li>
          <li>Topikal tedavi ile kombinasyon</li>
          <li>Hızlı sonuç ve minimal yan etki</li>
        </ul>
        
        <h4>Tırnak Batması Tedavisi</h4>
        <p>Tırnak batması tedavisinde farklı yaklaşımlar uygulanır:</p>
        
        <h5>Konservatif Tedavi</h5>
        <ul>
          <li>Doğru tırnak kesimi teknikleri</li>
          <li>Uygun ayakkabı seçimi</li>
          <li>Antiseptik banyolar</li>
          <li>Bandaj uygulaması</li>
        </ul>
        
        <h5>Cerrahi Tedavi</h5>
        <ul>
          <li><strong>Kısmi Tırnak Çekimi:</strong> Sadece batık kısmın alınması</li>
          <li><strong>Fenol Uygulaması:</strong> Tekrar büyümeyi önleme</li>
          <li><strong>Lazer ile Tedavi:</strong> Minimal invaziv yaklaşım</li>
        </ul>
        
        <h4>Psoriatik Tırnak Hastalığı Tedavisi</h4>
        <p>Sedef hastalığına bağlı tırnak değişikliklerinin tedavisinde:</p>
        <ul>
          <li>Topikal kortikosteroidler</li>
          <li>Vitamin D analogları</li>
          <li>Retinoidler</li>
          <li>Biyolojik tedaviler (gerekirse)</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Topikal + Sistemik tedavi</li>
          <li>Lazer + Medikal tedavi</li>
          <li>Cerrahi + Medikal tedavi</li>
          <li>Yaşam tarzı değişiklikleri + Medikal tedavi</li>
        </ul>
        
        <h4>Tırnak Hastalıkları Tedavi Sonrası Bakım</h4>
        <p>Tırnak hastalıkları tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Hijyen Kuralları</h5>
        <ul>
          <li>Günlük tırnak temizliği</li>
          <li>Antiseptik solüsyonlar</li>
          <li>Kuru tutma</li>
          <li>Düzenli tırnak kesimi</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Uygun ayakkabı seçimi</li>
          <li>Çorap değişimi</li>
          <li>Ortak eşya kullanımından kaçınma</li>
          <li>Düzenli kontroller</li>
        </ul>
        
        <h4>Tırnak Sağlığını Korumak İçin Öneriler</h4>
        <p>Tırnak sağlığını korumak için dikkat edilmesi gerekenler:</p>
        
        <h5>Doğru Tırnak Bakımı</h5>
        <ul>
          <li>Düzenli ve doğru tırnak kesimi</li>
          <li>Nemlendirici kullanımı</li>
          <li>Kimyasal maddelerden korunma</li>
          <li>Güneş koruyucu kullanımı</li>
        </ul>
        
        <h5>Beslenme ve Yaşam Tarzı</h5>
        <ul>
          <li>Protein açısından zengin beslenme</li>
          <li>Biotin takviyesi</li>
          <li>Yeterli su tüketimi</li>
          <li>Düzenli egzersiz</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Nemli ortamlardan kaçınma</li>
          <li>Koruyucu eldiven kullanımı</li>
          <li>Düzenli havalandırma</li>
          <li>Temizlik ürünlerinde dikkat</li>
        </ul>
        
        <h4>Tırnak Hastalıkları Tedavi Sonuçları</h4>
        <p>Tırnak hastalıkları tedavisinde sonuçlar genellikle zamanla görülür:</p>
        
        <h5>Mantar Enfeksiyonları</h5>
        <ul>
          <li>3-6 ay tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Tekrar enfeksiyon riski</li>
          <li>Düzenli takip gerekli</li>
        </ul>
        
        <h5>Tırnak Batması</h5>
        <ul>
          <li>1-2 hafta iyileşme süreci</li>
          <li>%90+ başarı oranı</li>
          <li>Tekrar oluşum riski</li>
          <li>Koruyucu önlemler önemli</li>
        </ul>
        
        <h5>Psoriatik Tırnak</h5>
        <ul>
          <li>3-6 ay tedavi süresi</li>
          <li>Sedef hastalığı kontrolü ile ilişkili</li>
          <li>Uzun vadeli tedavi gerekli</li>
          <li>Düzenli dermatolog kontrolü</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde tırnak hastalıkları tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Tırnak hastalıkları konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel lazer ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı laboratuvar ve görüntüleme</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Tırnak hastalıkları, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun tırnak hastalıkları tedavi planını hazırlayarak, ağrı, enfeksiyon ve estetik problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, tırnak sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'deri-enfeksiyonlari',
    title: 'Deri Enfeksiyonları',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Deri Enfeksiyonları Nedir?</h4>
        <p>Deri enfeksiyonları, bakteri, virüs, mantar veya parazit kaynaklı olarak ciltte meydana gelen enfeksiyonlardır. Bu enfeksiyonlar, cildin farklı katmanlarını etkileyebilir ve çeşitli belirtilerle kendini gösterir. Deri enfeksiyonları, sadece lokal problemlere değil, aynı zamanda sistemik komplikasyonlara da neden olabilir. Erken tanı ve tedavi, enfeksiyonun yayılmasını önlemek ve komplikasyonları azaltmak için kritik öneme sahiptir.</p>
        
        <h4>Deri Enfeksiyonları Türleri</h4>
        <p>Deri enfeksiyonları, etken mikroorganizmaya ve etkilenen cilt katmanına göre sınıflandırılır:</p>
        
        <h5>Bakteriyel Deri Enfeksiyonları</h5>
        <ul>
          <li><strong>İmpetigo:</strong> Yüzeysel bakteriyel enfeksiyon, sarı kabuklarla karakterize</li>
          <li><strong>Selülit:</strong> Derin doku enfeksiyonu, kızarıklık ve şişlik ile</li>
          <li><strong>Fronkül:</strong> Kıl kökü enfeksiyonu, ağrılı nodül</li>
          <li><strong>Karbunkül:</strong> Birden fazla fronkülün birleşmesi</li>
          <li><strong>Erizipel:</strong> Yüzeysel lenfatik enfeksiyon, belirgin sınırlar</li>
        </ul>
        
        <h5>Viral Deri Enfeksiyonları</h5>
        <ul>
          <li><strong>Herpes Simplex:</strong> Uçuk ve genital herpes</li>
          <li><strong>Herpes Zoster:</strong> Zona hastalığı, ağrılı döküntü</li>
          <li><strong>Molluscum Contagiosum:</strong> İnci benzeri papüller</li>
          <li><strong>Viral Siğiller:</strong> HPV kaynaklı cilt lezyonları</li>
        </ul>
        
        <h5>Mantar Deri Enfeksiyonları</h5>
        <ul>
          <li><strong>Dermatofitoz:</strong> Ringworm, tinea enfeksiyonları</li>
          <li><strong>Candida:</strong> Maya enfeksiyonları, intertrigo</li>
          <li><strong>Pityriasis Versicolor:</strong> Renk değişikliği yapan mantar</li>
        </ul>
        
        <h5>Paraziter Deri Enfeksiyonları</h5>
        <ul>
          <li><strong>Uyuz:</strong> Sarcoptes scabiei akarı</li>
          <li><strong>Bit:</strong> Saç ve vücut biti</li>
          <li><strong>Larva Migrans:</strong> Hayvan parazitleri</li>
        </ul>
        
        <h4>Deri Enfeksiyonlarının Nedenleri</h4>
        <p>Deri enfeksiyonları birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Mikrobiyolojik Faktörler</h5>
        <ul>
          <li>Bakteri, virüs, mantar ve parazitler</li>
          <li>Antibiyotik direnci</li>
          <li>Virülans faktörleri</li>
          <li>Biyofilm oluşumu</li>
        </ul>
        
        <h5>Konak Faktörleri</h5>
        <ul>
          <li>Bağışıklık sistemi zayıflığı</li>
          <li>Diyabet ve metabolik hastalıklar</li>
          <li>Kronik hastalıklar</li>
          <li>İleri yaş ve çocukluk dönemi</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Nemli ve sıcak ortamlar</li>
          <li>Kötü hijyen koşulları</li>
          <li>Ortak eşya kullanımı</li>
          <li>Hayvan teması</li>
        </ul>
        
        <h5>Yaşam Tarzı Faktörleri</h5>
        <ul>
          <li>Yanlış cilt bakımı</li>
          <li>Dar ve sentetik kıyafetler</li>
          <li>Yoğun egzersiz ve terleme</li>
          <li>Stres ve yorgunluk</li>
        </ul>
        
        <h4>Deri Enfeksiyonları Belirtileri</h4>
        <p>Deri enfeksiyonlarında görülen belirtiler enfeksiyon türüne göre değişiklik gösterir:</p>
        
        <h5>Genel Belirtiler</h5>
        <ul>
          <li>Kızarıklık ve inflamasyon</li>
          <li>Şişlik ve ödem</li>
          <li>Ağrı ve hassasiyet</li>
          <li>Sıcaklık artışı</li>
          <li>Kaşıntı ve yanma hissi</li>
        </ul>
        
        <h5>Özel Belirtiler</h5>
        <ul>
          <li><strong>Bakteriyel:</strong> İrin, kabuklanma, ülserasyon</li>
          <li><strong>Viral:</strong> Su dolu kabarcıklar, ağrı</li>
          <li><strong>Mantar:</strong> Pullanma, renk değişikliği, halka şeklinde lezyonlar</li>
          <li><strong>Paraziter:</strong> Tünel izleri, yoğun kaşıntı</li>
        </ul>
        
        <h5>Sistemik Belirtiler</h5>
        <ul>
          <li>Ateş ve titreme</li>
          <li>Halsizlik ve yorgunluk</li>
          <li>Lenf bezi büyümesi</li>
          <li>İştahsızlık</li>
        </ul>
        
        <h4>Deri Enfeksiyonları Tanısı</h4>
        <p>Deri enfeksiyonlarının doğru tedavi edilebilmesi için kapsamlı bir tanı süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Lezyonların detaylı incelenmesi</li>
          <li>Yayılım paterni ve sınırların belirlenmesi</li>
          <li>Lenf bezi kontrolü</li>
          <li>Genel durum değerlendirmesi</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li><strong>Mikroskopi:</strong> Direkt inceleme</li>
          <li><strong>Kültür:</strong> Mikroorganizma üretimi</li>
          <li><strong>Antibiyogram:</strong> Antibiyotik duyarlılığı</li>
          <li><strong>Seroloji:</strong> Viral enfeksiyonlar için</li>
        </ul>
        
        <h5>Görüntüleme Yöntemleri</h5>
        <ul>
          <li>Dermatoskopi</li>
          <li>Ultrasonografi (derin enfeksiyonlar için)</li>
          <li>Manyetik rezonans görüntüleme (MRG)</li>
        </ul>
        
        <h4>Modern Deri Enfeksiyonları Tedavi Yöntemleri</h4>
        <p>Kliniğimizde deri enfeksiyonları için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, enfeksiyonun türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Bakteriyel Enfeksiyonlar Tedavisi</h4>
        <p>Bakteriyel deri enfeksiyonlarının tedavisinde:</p>
        
        <h5>Topikal Tedaviler</h5>
        <ul>
          <li><strong>Antibiyotik Kremler:</strong> Mupirocin, fusidic acid</li>
          <li><strong>Antiseptik Solüsyonlar:</strong> Povidone-iodine, chlorhexidine</li>
          <li><strong>Antibiyotik Merhemler:</strong> Neomycin, bacitracin</li>
        </ul>
        
        <h5>Sistemik Antibiyotikler</h5>
        <ul>
          <li><strong>Beta-laktamlar:</strong> Penisilin, sefalosporin</li>
          <li><strong>Makrolidler:</strong> Eritromisin, klaritromisin</li>
          <li><strong>Florokinolonlar:</strong> Siprofloksasin, levofloksasin</li>
          <li><strong>Linkozamidler:</strong> Klindamisin</li>
        </ul>
        
        <h5>Cerrahi Tedavi</h5>
        <ul>
          <li>Apse drenajı</li>
          <li>Nekrotik doku temizliği</li>
          <li>Debridman</li>
        </ul>
        
        <h4>Viral Enfeksiyonlar Tedavisi</h4>
        <p>Viral deri enfeksiyonlarının tedavisinde:</p>
        
        <h5>Antiviral İlaçlar</h5>
        <ul>
          <li><strong>Asiklovir:</strong> Herpes enfeksiyonları için</li>
          <li><strong>Valasiklovir:</strong> Oral herpes tedavisi</li>
          <li><strong>Famiklovir:</strong> Zona tedavisi</li>
        </ul>
        
        <h5>Destekleyici Tedaviler</h5>
        <ul>
          <li>Ağrı kesiciler</li>
          <li>Kaşıntı önleyiciler</li>
          <li>Nemlendiriciler</li>
          <li>Soğuk kompresler</li>
        </ul>
        
        <h4>Mantar Enfeksiyonları Tedavisi</h4>
        <p>Mantar deri enfeksiyonlarının tedavisinde:</p>
        
        <h5>Topikal Antifungaller</h5>
        <ul>
          <li><strong>Azol Türevleri:</strong> Klotrimazol, mikonazol</li>
          <li><strong>Alilaminler:</strong> Terbinafine</li>
          <li><strong>Pirimidinler:</strong> Siklopiroks</li>
        </ul>
        
        <h5>Sistemik Antifungaller</h5>
        <ul>
          <li><strong>Terbinafine:</strong> Dermatofit enfeksiyonları</li>
          <li><strong>İtrakonazole:</strong> Candida enfeksiyonları</li>
          <li><strong>Fluconazole:</strong> Sistemik mantar enfeksiyonları</li>
        </ul>
        
        <h4>Paraziter Enfeksiyonlar Tedavisi</h4>
        <p>Paraziter deri enfeksiyonlarının tedavisinde:</p>
        
        <h5>Uyuz Tedavisi</h5>
        <ul>
          <li>Permetrin kremi</li>
          <li>İvermektin (oral)</li>
          <li>Lindane losyonu</li>
          <li>Çevresel temizlik</li>
        </ul>
        
        <h5>Bit Tedavisi</h5>
        <ul>
          <li>Permetrin şampuan</li>
          <li>Malathion losyonu</li>
          <li>Fiziksel temizlik</li>
          <li>Çevresel dezenfeksiyon</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Antimikrobiyal + Destekleyici tedavi</li>
          <li>Topikal + Sistemik tedavi</li>
          <li>Medikal + Cerrahi tedavi</li>
          <li>Hijyen + Medikal tedavi</li>
        </ul>
        
        <h4>Deri Enfeksiyonları Tedavi Sonrası Bakım</h4>
        <p>Deri enfeksiyonları tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Hijyen Kuralları</h5>
        <ul>
          <li>Günlük cilt temizliği</li>
          <li>Antiseptik solüsyonlar</li>
          <li>Kuru tutma</li>
          <li>Düzenli bandaj değişimi</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Ortak eşya kullanımından kaçınma</li>
          <li>Kişisel hijyen ürünleri</li>
          <li>Düzenli el yıkama</li>
          <li>Çevresel temizlik</li>
        </ul>
        
        <h4>Deri Enfeksiyonlarından Korunma</h4>
        <p>Deri enfeksiyonlarından korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Düzenli el yıkama</li>
          <li>Günlük duş alma</li>
          <li>Kişisel eşya kullanımı</li>
          <li>Düzenli cilt bakımı</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Temiz ve kuru ortam</li>
            <li>Düzenli havalandırma</li>
            <li>Ortak alanlarda dikkat</li>
            <li>Hayvan temasında korunma</li>
        </ul>
        
        <h5>Yaşam Tarzı</h5>
        <ul>
          <li>Sağlıklı beslenme</li>
          <li>Düzenli egzersiz</li>
          <li>Yeterli uyku</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Deri Enfeksiyonları Tedavi Sonuçları</h4>
        <p>Deri enfeksiyonları tedavisinde sonuçlar genellikle hızlı görülür:</p>
        
        <h5>Bakteriyel Enfeksiyonlar</h5>
        <ul>
          <li>1-2 hafta tedavi süresi</li>
          <li>%85-95 başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Düzenli takip gerekli</li>
        </ul>
        
        <h5>Viral Enfeksiyonlar</h5>
        <ul>
          <li>1-3 hafta tedavi süresi</li>
          <li>%70-90 başarı oranı</li>
          <li>Tekrar atak riski</li>
          <li>Uzun vadeli tedavi gerekebilir</li>
        </ul>
        
        <h5>Mantar Enfeksiyonları</h5>
        <ul>
          <li>2-6 hafta tedavi süresi</li>
          <li>%80-90 başarı oranı</li>
          <li>Tekrar enfeksiyon riski</li>
          <li>Koruyucu önlemler önemli</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde deri enfeksiyonları tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Deri enfeksiyonları konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel tanı ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı laboratuvar ve görüntüleme</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Deri enfeksiyonları, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun deri enfeksiyonları tedavi planını hazırlayarak, ağrı, enfeksiyon ve komplikasyonlarınızda etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, cilt sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'mantar-enfeksiyonlari',
    title: 'Mantar Enfeksiyonları',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Mantar Enfeksiyonları Nedir?</h4>
        <p>Mantar enfeksiyonları, dermatofit, maya ve küf mantarlarının neden olduğu yaygın cilt hastalıklarıdır. Bu enfeksiyonlar, vücudun nemli ve sıcak bölgelerinde gelişir ve çeşitli belirtilerle kendini gösterir. Mantar enfeksiyonları, sadece estetik problemlere değil, aynı zamanda kaşıntı, ağrı ve ikincil enfeksiyonlara da neden olabilir. Erken tanı ve tedavi, enfeksiyonun yayılmasını önlemek ve komplikasyonları azaltmak için kritik öneme sahiptir.</p>
        
        <h4>Mantar Enfeksiyonları Türleri</h4>
        <p>Mantar enfeksiyonları, etken mantar türüne ve etkilenen vücut bölgesine göre sınıflandırılır:</p>
        
        <h5>Dermatofit Enfeksiyonları (Tinea)</h5>
        <ul>
          <li><strong>Tinea Pedis (Ayak Mantarı):</strong> Ayak parmak araları ve tabanında görülen enfeksiyon</li>
          <li><strong>Tinea Unguium (Tırnak Mantarı):</strong> Tırnaklarda kalınlaşma ve renk değişikliği</li>
          <li><strong>Tinea Cruris (Kasık Mantarı):</strong> Kasık bölgesinde kırmızı, kaşıntılı lezyonlar</li>
          <li><strong>Tinea Corporis (Vücut Mantarı):</strong> Gövdede halka şeklinde lezyonlar</li>
          <li><strong>Tinea Capitis (Saç Mantarı):</strong> Saçlı deride pullanma ve saç dökülmesi</li>
          <li><strong>Tinea Faciei (Yüz Mantarı):</strong> Yüzde kırmızı, pullu lezyonlar</li>
          <li><strong>Tinea Manuum (El Mantarı):</strong> El avuç içi ve parmaklarda enfeksiyon</li>
        </ul>
        
        <h5>Maya Enfeksiyonları (Candida)</h5>
        <ul>
          <li><strong>Kandidiyazis:</strong> Nemli vücut kıvrımlarında gelişen enfeksiyon</li>
          <li><strong>Intertrigo:</strong> Vücut kıvrımlarında kızarıklık ve pullanma</li>
          <li><strong>Oral Kandidiyazis:</strong> Ağızda beyaz plaklar</li>
          <li><strong>Vajinal Kandidiyazis:</strong> Kadınlarda vajinal enfeksiyon</li>
        </ul>
        
        <h5>Küf Mantarı Enfeksiyonları</h5>
        <ul>
          <li><strong>Aspergillozis:</strong> Nadir görülen derin mantar enfeksiyonu</li>
          <li><strong>Mukormikozis:</strong> Şiddetli sistemik mantar enfeksiyonu</li>
        </ul>
        
        <h4>Mantar Enfeksiyonlarının Nedenleri</h4>
        <p>Mantar enfeksiyonları birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Mikrobiyolojik Faktörler</h5>
        <ul>
          <li>Dermatofit mantarları (Trichophyton, Microsporum, Epidermophyton)</li>
          <li>Candida albicans ve diğer maya türleri</li>
          <li>Küf mantarları (Aspergillus, Mucor)</li>
          <li>Mantar sporlarının çevrede bulunması</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Nemli ve sıcak ortamlar</li>
          <li>Havalandırması yetersiz alanlar</li>
          <li>Ortak kullanım alanları (havuz, sauna, spor salonu)</li>
          <li>Dar ve sentetik kıyafetler</li>
        </ul>
        
        <h5>Konak Faktörleri</h5>
        <ul>
          <li>Bağışıklık sistemi zayıflığı</li>
          <li>Diyabet ve metabolik hastalıklar</li>
          <li>Hormonal değişiklikler</li>
          <li>İleri yaş ve çocukluk dönemi</li>
        </ul>
        
        <h5>Yaşam Tarzı Faktörleri</h5>
        <ul>
          <li>Yanlış cilt bakımı</li>
          <li>Uzun süre ıslak kalma</li>
          <li>Ortak eşya kullanımı</li>
          <li>Yoğun egzersiz ve terleme</li>
        </ul>
        
        <h4>Mantar Enfeksiyonları Belirtileri</h4>
        <p>Mantar enfeksiyonlarında görülen belirtiler enfeksiyon türüne ve yerleşim yerine göre değişiklik gösterir:</p>
        
        <h5>Genel Belirtiler</h5>
        <ul>
          <li>Kızarıklık ve inflamasyon</li>
          <li>Kaşıntı ve yanma hissi</li>
          <li>Pullanma ve kabuklanma</li>
          <li>Ciltte çatlaklar</li>
          <li>Kötü koku (özellikle ayak mantarında)</li>
        </ul>
        
        <h5>Bölgesel Belirtiler</h5>
        <ul>
          <li><strong>Ayak Mantarı:</strong> Parmak aralarında beyazlaşma, çatlaklar, kaşıntı</li>
          <li><strong>Tırnak Mantarı:</strong> Tırnakta kalınlaşma, renk değişikliği, kırılganlık</li>
          <li><strong>Kasık Mantarı:</strong> Kırmızı, kaşıntılı, halka şeklinde lezyonlar</li>
          <li><strong>Vücut Mantarı:</strong> Halka şeklinde, kenarları kırmızı, ortası açık lezyonlar</li>
          <li><strong>Saç Mantarı:</strong> Saçlı deride pullanma, saç dökülmesi, kırık saçlar</li>
        </ul>
        
        <h5>Komplikasyonlar</h5>
        <ul>
          <li>İkincil bakteriyel enfeksiyonlar</li>
          <li>Lenfanjit ve lenfadenit</li>
          <li>Selülit</li>
          <li>Mantar alerjisi</li>
        </ul>
        
        <h4>Mantar Enfeksiyonları Tanısı</h4>
        <p>Mantar enfeksiyonlarının doğru tedavi edilebilmesi için kapsamlı bir tanı süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Lezyonların detaylı incelenmesi</li>
          <li>Yayılım paterni ve sınırların belirlenmesi</li>
          <li>Wood lambası incelemesi</li>
          <li>Dermatoskopi ile detaylı görünüm</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li><strong>KOH Testi:</strong> Hızlı mantar tanısı</li>
          <li><strong>Mantar Kültürü:</strong> Etken mantar türünün belirlenmesi</li>
          <li><strong>PAS Boyaması:</strong> Mantar hiflerinin görülmesi</li>
          <li><strong>Biyopsi:</strong> Şüpheli durumlarda</li>
        </ul>
        
        <h5>Görüntüleme Yöntemleri</h5>
        <ul>
          <li>Dermatoskopi</li>
          <li>Gerekirse radyolojik görüntüleme</li>
        </ul>
        
        <h4>Modern Mantar Enfeksiyonları Tedavi Yöntemleri</h4>
        <p>Kliniğimizde mantar enfeksiyonları için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, enfeksiyonun türüne, yerleşim yerine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Topikal Tedaviler</h4>
        <p>Hafif ve yüzeysel mantar enfeksiyonlarında topikal tedaviler etkili sonuçlar verir:</p>
        
        <h5>Antifungal Kremler</h5>
        <ul>
          <li><strong>Azol Türevleri:</strong> Klotrimazol, mikonazol, ketokonazol</li>
          <li><strong>Alilaminler:</strong> Terbinafine, naftifine</li>
          <li><strong>Pirimidinler:</strong> Siklopiroks</li>
          <li><strong>Benzilaminler:</strong> Butenafine</li>
        </ul>
        
        <h5>Antifungal Solüsyonlar</h5>
        <ul>
          <li>Günlük uygulama</li>
          <li>Hızlı emilim</li>
          <li>Kıyafet lekesi yapmaz</li>
          <li>Uzun süreli etki</li>
        </ul>
        
        <h5>Antifungal Merhemler</h5>
        <ul>
          <li>Nemlendirici etki</li>
          <li>Çatlak ve kuruluk için uygun</li>
          <li>Uzun süreli uygulama</li>
        </ul>
        
        <h4>Sistemik Tedaviler</h5>
        <p>Orta ve şiddetli mantar enfeksiyonlarında sistemik tedaviler gerekebilir:</p>
        
        <h5>Oral Antifungaller</h5>
        <ul>
          <li><strong>Terbinafine:</strong> Dermatofit enfeksiyonları için en etkili</li>
          <li><strong>İtrakonazole:</strong> Candida ve dermatofit enfeksiyonları</li>
          <li><strong>Fluconazole:</strong> Candida enfeksiyonları</li>
          <li><strong>Griseofulvin:</strong> Saç mantarı için klasik tedavi</li>
        </ul>
        
        <h5>İntravenöz Tedaviler</h5>
        <ul>
          <li>Şiddetli sistemik enfeksiyonlar için</li>
          <li>Hastane ortamında uygulanır</li>
          <li>Yan etki takibi gerekli</li>
        </ul>
        
        <h4>Lazer Tedavisi</h4>
        <p>Mantar enfeksiyonlarında lazer tedavisi özellikle tırnak mantarı için etkilidir:</p>
        <ul>
          <li>Mantar hiflerini hedef alan lazer</li>
          <li>Topikal tedavi ile kombinasyon</li>
          <li>Hızlı sonuç ve minimal yan etki</li>
          <li>Tekrar enfeksiyon riskini azaltır</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Topikal + Sistemik tedavi</li>
          <li>Lazer + Medikal tedavi</li>
          <li>Antifungal + Destekleyici tedavi</li>
          <li>Hijyen + Medikal tedavi</li>
        </ul>
        
        <h4>Mantar Enfeksiyonları Tedavi Sonrası Bakım</h4>
        <p>Mantar enfeksiyonları tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Hijyen Kuralları</h5>
        <ul>
          <li>Günlük cilt temizliği</li>
          <li>Antifungal solüsyonlar</li>
          <li>Kuru tutma</li>
          <li>Düzenli kıyafet değişimi</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Ortak eşya kullanımından kaçınma</li>
          <li>Kişisel hijyen ürünleri</li>
          <li>Düzenli çorap değişimi</li>
          <li>Çevresel temizlik</li>
        </ul>
        
        <h4>Mantar Enfeksiyonlarından Korunma</h4>
        <p>Mantar enfeksiyonlarından korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Düzenli el ve ayak yıkama</li>
          <li>Günlük duş alma</li>
          <li>Kişisel eşya kullanımı</li>
          <li>Düzenli cilt bakımı</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Temiz ve kuru ortam</li>
          <li>Düzenli havalandırma</li>
          <li>Ortak alanlarda dikkat</li>
          <li>Havuz ve sauna sonrası duş</li>
        </ul>
        
        <h5>Yaşam Tarzı</h5>
        <ul>
          <li>Pamuklu kıyafetler</li>
          <li>Uygun ayakkabı seçimi</li>
          <li>Düzenli egzersiz</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Mantar Enfeksiyonları Tedavi Sonuçları</h4>
        <p>Mantar enfeksiyonları tedavisinde sonuçlar genellikle zamanla görülür:</p>
        
        <h5>Yüzeysel Enfeksiyonlar</h5>
        <ul>
          <li>2-4 hafta tedavi süresi</li>
          <li>%80-90 başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Düzenli takip gerekli</li>
        </ul>
        
        <h5>Tırnak Mantarı</h5>
        <ul>
          <li>3-6 ay tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Yavaş iyileşme</li>
          <li>Uzun vadeli tedavi gerekli</li>
        </ul>
        
        <h5>Sistemik Enfeksiyonlar</h5>
        <ul>
          <li>6-12 ay tedavi süresi</li>
          <li>%60-80 başarı oranı</li>
          <li>Yoğun tedavi gerekli</li>
          <li>Yan etki takibi önemli</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde mantar enfeksiyonları tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Mantar enfeksiyonları konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel lazer ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı laboratuvar ve görüntüleme</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Mantar enfeksiyonları, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun mantar enfeksiyonları tedavi planını hazırlayarak, kaşıntı, ağrı ve estetik problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, cilt sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'alerji-ve-egzama-turleri',
    title: 'Alerji ve Egzama Türleri',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Alerji ve Egzama Nedir?</h4>
        <p>Alerji ve egzama, ciltte kuruluk, kaşıntı, kızarıklık ve kabuklanma ile karakterize kronik cilt hastalıklarıdır. Bu durumlar, sadece estetik problemlere değil, aynı zamanda yaşam kalitesini önemli ölçüde etkileyen sağlık sorunlarıdır. Alerji ve egzama, her yaş grubunda görülebilir ve erken tanı ile tedavi edilmesi önemlidir. Kliniğimizde bu hastalıklar için modern ve etkili tedavi yöntemleri kullanılmaktadır.</p>
        
        <h4>Egzama Türleri ve Özellikleri</h4>
        <p>Egzama, farklı nedenlere ve belirtilere göre çeşitli türlerde sınıflandırılır:</p>
        
        <h5>Atopik Dermatit (Atopik Egzama)</h5>
        <ul>
          <li><strong>En yaygın egzama türü:</strong> Çocukluk döneminde başlar</li>
          <li><strong>Genetik yatkınlık:</strong> Aile öyküsünde alerjik hastalıklar</li>
          <li><strong>Belirtiler:</strong> Kızarıklık, kaşıntı, kuruluk, kabuklanma</li>
          <li><strong>Yerleşim:</strong> Yüz, boyun, dirsek ve diz kıvrımları</li>
          <li><strong>Ataklar:</strong> Stres, alerjenler ve çevresel faktörlerle tetiklenir</li>
        </ul>
        
        <h5>Kontakt Dermatit (Temas Egzaması)</h5>
        <ul>
          <li><strong>İrritan Kontakt Dermatit:</strong> Kimyasal maddelerle temas</li>
          <li><strong>Alerjik Kontakt Dermatit:</strong> Alerjik reaksiyon</li>
          <li><strong>Belirtiler:</strong> Kızarıklık, şişlik, kaşıntı, kabarcıklar</li>
          <li><strong>Tetikleyiciler:</strong> Nikel, krom, kozmetik ürünler, deterjanlar</li>
          <li><strong>Yerleşim:</strong> Temas eden bölgelerde</li>
        </ul>
        
        <h5>Seboreik Dermatit</h5>
        <ul>
          <li><strong>Yağlı cilt bölgelerinde:</strong> Saçlı deri, yüz, göğüs</li>
          <li><strong>Belirtiler:</strong> Sarımsı kabuklar, pullanma, kızarıklık</li>
          <li><strong>Nedenler:</strong> Maya mantarı, yağ üretimi, stres</li>
          <li><strong>Mevsimsel değişim:</strong> Kış aylarında artış</li>
        </ul>
        
        <h5>Nummular Egzama</h5>
        <ul>
          <li><strong>Para şeklinde lezyonlar:</strong> Yuvarlak veya oval</li>
          <li><strong>Belirtiler:</strong> Kaşıntılı, kırmızı, pullu lezyonlar</li>
          <li><strong>Yerleşim:</strong> Bacaklar, kollar, gövde</li>
          <li><strong>Kronik seyir:</strong> Uzun süreli tedavi gerekebilir</li>
        </ul>
        
        <h5>Dishidrotik Egzama</h5>
        <ul>
          <li><strong>El ve ayaklarda:</strong> Avuç içi ve ayak tabanı</li>
          <li><strong>Belirtiler:</strong> Su dolu kabarcıklar, kaşıntı, pullanma</li>
          <li><strong>Tetikleyiciler:</strong> Stres, nem, alerjenler</li>
          <li><strong>Mevsimsel özellik:</strong> Yaz aylarında artış</li>
        </ul>
        
        <h4>Alerji Türleri ve Nedenleri</h4>
        <p>Alerjik reaksiyonlar, bağışıklık sisteminin normalde zararsız olan maddelere aşırı tepki vermesi sonucu oluşur:</p>
        
        <h5>Gıda Alerjileri</h5>
        <ul>
          <li><strong>Süt ve süt ürünleri:</strong> İnek sütü, peynir, yoğurt</li>
          <li><strong>Yumurta:</strong> Özellikle yumurta beyazı</li>
          <li><strong>Kuruyemişler:</strong> Fındık, ceviz, badem</li>
          <li><strong>Deniz ürünleri:</strong> Balık, karides, midye</li>
          <li><strong>Gluten:</strong> Buğday, arpa, çavdar</li>
        </ul>
        
        <h5>Çevresel Alerjiler</h5>
        <ul>
          <li><strong>Polen alerjisi:</strong> Ağaç, çimen, yabani ot polenleri</li>
          <li><strong>Ev tozu akarları:</strong> Toz, halı, yastık</li>
          <li><strong>Hayvan alerjileri:</strong> Kedi, köpek, kuş tüyleri</li>
          <li><strong>Küf alerjisi:</strong> Nemli ortamlarda gelişen mantarlar</li>
        </ul>
        
        <h5>Kimyasal Alerjiler</h5>
        <ul>
          <li><strong>Kozmetik ürünler:</strong> Parfüm, koruyucu maddeler</li>
          <li><strong>Deterjanlar:</strong> Çamaşır deterjanı, bulaşık deterjanı</li>
          <li><strong>Metaller:</strong> Nikel, krom, kobalt</li>
          <li><strong>Lateks:</strong> Eldiven, balon, tıbbi malzemeler</li>
        </ul>
        
        <h4>Alerji ve Egzama Belirtileri</h4>
        <p>Alerji ve egzama belirtileri, hastalığın türüne ve şiddetine göre değişiklik gösterir:</p>
        
        <h5>Cilt Belirtileri</h5>
        <ul>
          <li><strong>Kızarıklık ve inflamasyon:</strong> Ciltte kırmızı alanlar</li>
          <li><strong>Kaşıntı:</strong> Hafiften şiddetliye değişen kaşıntı</li>
          <li><strong>Kuruluk ve pullanma:</strong> Cilt yüzeyinde pullanma</li>
          <li><strong>Kabuklanma:</strong> İltihaplı alanlarda kabuk oluşumu</li>
          <li><strong>Çatlaklar:</strong> Özellikle kuru ciltlerde</li>
        </ul>
        
        <h5>Sistemik Belirtiler</h5>
        <ul>
          <li><strong>Burun akıntısı ve hapşırık:</strong> Solunum yolu alerjileri</li>
          <li><strong>Gözlerde kaşıntı ve kızarıklık:</strong> Konjonktivit</li>
          <li><strong>Nefes darlığı:</strong> Astım belirtileri</li>
          <li><strong>Mide bulantısı ve kusma:</strong> Gıda alerjileri</li>
          <li><strong>Baş ağrısı:</strong> Sinüs tıkanıklığı</li>
        </ul>
        
        <h5>Komplikasyonlar</h5>
        <ul>
          <li><strong>İkincil enfeksiyonlar:</strong> Bakteriyel ve viral</li>
          <li><strong>Lichenifikasyon:</strong> Ciltte kalınlaşma</li>
          <li><strong>Pigmentasyon değişiklikleri:</strong> Leke oluşumu</li>
          <li><strong>Uyku bozuklukları:</strong> Kaşıntı nedeniyle</li>
          <li><strong>Psikolojik etkiler:</strong> Depresyon, anksiyete</li>
        </ul>
        
        <h4>Alerji ve Egzama Tanısı</h4>
        <p>Alerji ve egzama tanısı için kapsamlı bir değerlendirme süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Lezyonların detaylı incelenmesi</li>
          <li>Yayılım paterni ve sınırların belirlenmesi</li>
          <li>Kaşıntı şiddetinin değerlendirilmesi</li>
          <li>Genel cilt durumunun kontrolü</li>
        </ul>
        
        <h5>Alerji Testleri</h5>
        <ul>
          <li><strong>Prick Testi:</strong> Cilt üzerinde alerjen testi</li>
          <li><strong>Patch Testi:</strong> Kontakt alerji tespiti</li>
          <li><strong>Kan Testleri:</strong> IgE seviyesi ve spesifik alerjenler</li>
          <li><strong>Eliminasyon Testi:</strong> Gıda alerjileri için</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li>Tam kan sayımı</li>
          <li>Eozinofil sayısı</li>
          <li>CRP ve sedimantasyon</li>
          <li>Gerekirse biyopsi</li>
        </ul>
        
        <h4>Modern Alerji ve Egzama Tedavi Yöntemleri</h4>
        <p>Kliniğimizde alerji ve egzama için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, hastalığın türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Topikal Tedaviler</h4>
        <p>Hafif ve orta şiddetli alerji ve egzama vakalarında topikal tedaviler etkili sonuçlar verir:</p>
        
        <h5>Nemlendiriciler</h5>
        <ul>
          <li><strong>Vazelin bazlı:</strong> Yoğun nemlendirme</li>
          <li><strong>Üre içeren:</strong> Keratolitik etki</li>
          <li><strong>Seramid içeren:</strong> Cilt bariyerini güçlendirme</li>
          <li><strong>Hiyalüronik asit:</strong> Hızlı nemlendirme</li>
        </ul>
        
        <h5>Kortikosteroidler</h5>
        <ul>
          <li><strong>Hafif:</strong> Hidrokortizon %1</li>
          <li><strong>Orta:</strong> Betametazon, mometazon</li>
          <li><strong>Şiddetli:</strong> Klobetasol, halobetasol</li>
          <li><strong>Uygulama:</strong> Günde 1-2 kez</li>
        </ul>
        
        <h5>Kalsinörin İnhibitörleri</h5>
        <ul>
          <li><strong>Tacrolimus:</strong> %0.03 ve %0.1 konsantrasyonlar</li>
          <li><strong>Pimekrolimus:</strong> %1 krem</li>
          <li><strong>Etki:</strong> İnflamasyonu azaltma</li>
          <li><strong>Avantaj:</strong> Uzun süreli kullanım güvenli</li>
        </ul>
        
        <h4>Sistemik Tedaviler</h4>
        <p>Orta ve şiddetli alerji ve egzama vakalarında sistemik tedaviler gerekebilir:</p>
        
        <h5>Antihistaminikler</h5>
        <ul>
          <li><strong>Birinci Nesil:</strong> Difenhidramin, klorfeniramin</li>
          <li><strong>İkinci Nesil:</strong> Seterizin, loratadin, feksofenadin</li>
          <li><strong>Etki:</strong> Kaşıntı ve alerjik belirtileri azaltma</li>
          <li><strong>Uygulama:</strong> Günlük veya gerektiğinde</li>
        </ul>
        
        <h5>İmmünomodülatörler</h5>
        <ul>
          <li><strong>Siklosporin:</strong> Şiddetli atopik dermatit</li>
          <li><strong>Metotreksat:</strong> Kronik egzama</li>
          <li><strong>Azatioprin:</strong> Alternatif tedavi</li>
          <li><strong>Takip:</strong> Düzenli laboratuvar kontrolü</li>
        </ul>
        
        <h5>Biyolojik Tedaviler</h5>
        <ul>
          <li><strong>Dupilumab:</strong> IL-4 ve IL-13 inhibitörü</li>
          <li><strong>Tralokinumab:</strong> IL-13 inhibitörü</li>
          <li><strong>Nemolizumab:</strong> IL-31 inhibitörü</li>
          <li><strong>Uygulama:</strong> Enjeksiyon ile</li>
        </ul>
        
        <h4>Fototerapi (Işık Tedavisi)</h4>
        <p>Orta ve şiddetli alerji ve egzama vakalarında fototerapi etkili bir tedavi seçeneğidir:</p>
        
        <h5>UVB Tedavisi</h5>
        <ul>
          <li><strong>Narrowband UVB:</strong> En etkili UVB tedavisi</li>
          <li><strong>Broadband UVB:</strong> Geleneksel UVB tedavisi</li>
          <li><strong>Uygulama:</strong> Haftada 2-3 kez</li>
          <li><strong>Süre:</strong> 6-12 hafta</li>
        </ul>
        
        <h5>PUVA Tedavisi</h5>
        <ul>
          <li><strong>Psoralen + UVA:</strong> Kombine tedavi</li>
          <li><strong>Etki:</strong> Güçlü immünosupresyon</li>
          <li><strong>Uygulama:</strong> Haftada 2-3 kez</li>
          <li><strong>Yan etki:</strong> Mide bulantısı, güneş yanığı</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Topikal + Sistemik tedavi</li>
          <li>Fototerapi + Medikal tedavi</li>
          <li>Biyolojik + Destekleyici tedavi</li>
          <li>Yaşam tarzı değişiklikleri + Medikal tedavi</li>
        </ul>
        
        <h4>Alerji ve Egzama Tedavi Sonrası Bakım</h4>
        <p>Alerji ve egzama tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Cilt Bakımı</h5>
        <ul>
          <li>Günlük nemlendirici kullanımı</li>
          <li>Nazik temizleyiciler</li>
          <li>Güneş koruyucu (SPF 30+)</li>
          <li>Düzenli cilt kontrolü</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Alerjenlerden kaçınma</li>
          <li>Uygun kıyafet seçimi</li>
          <li>Çevresel faktörlere dikkat</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Alerji ve Egzamadan Korunma</h4>
        <p>Alerji ve egzamadan korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Çevresel Kontrol</h5>
        <ul>
          <li>Ev tozu akarlarını azaltma</li>
          <li>Polen maruziyetini minimize etme</li>
          <li>Hayvan alerjilerinde dikkat</li>
          <li>Nem kontrolü</li>
        </ul>
        
        <h5>Yaşam Tarzı Değişiklikleri</h5>
        <ul>
          <li>Sağlıklı beslenme</li>
          <li>Düzenli egzersiz</li>
          <li>Yeterli uyku</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Düzenli el yıkama</li>
          <li>Uygun cilt bakımı</li>
          <li>Kimyasal maddelerden korunma</li>
          <li>Düzenli kontroller</li>
        </ul>
        
        <h4>Alerji ve Egzama Tedavi Sonuçları</h4>
        <p>Alerji ve egzama tedavisinde sonuçlar genellikle zamanla görülür:</p>
        
        <h5>Topikal Tedaviler</h5>
        <ul>
          <li>1-2 hafta tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Düzenli uygulama gerekli</li>
        </ul>
        
        <h5>Sistemik Tedaviler</h5>
        <ul>
          <li>2-4 hafta tedavi süresi</li>
          <li>%80-90 başarı oranı</li>
          <li>Orta hızda iyileşme</li>
          <li>Yan etki takibi önemli</li>
        </ul>
        
        <h5>Fototerapi</h5>
        <ul>
          <li>6-12 hafta tedavi süresi</li>
          <li>%75-85 başarı oranı</li>
          <li>Yavaş ama kalıcı iyileşme</li>
          <li>Uzun vadeli sonuçlar</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde alerji ve egzama tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Alerji ve egzama konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel tanı ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı alerji testleri ve laboratuvar</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Alerji ve egzama, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun alerji ve egzama tedavi planını hazırlayarak, kaşıntı, kızarıklık ve yaşam kalitesi problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, cilt sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'urtiker-kurdesen',
    title: 'Ürtiker (Kurdeşen)',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Ürtiker (Kurdeşen) Nedir?</h4>
        <p>Ürtiker, ciltte aniden ortaya çıkan, kaşıntılı, kırmızı ve şişkin lezyonlarla karakterize bir cilt hastalığıdır. Bu lezyonlar genellikle birkaç saat içinde kaybolur ve vücudun farklı bölgelerinde tekrar ortaya çıkabilir. Ürtiker, alerjik reaksiyonlar, enfeksiyonlar, stres veya fiziksel uyaranlar sonucu gelişebilir. Hastaların yaşam kalitesini önemli ölçüde etkileyebilen bu durum, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir.</p>
        
        <h4>Ürtiker Türleri ve Özellikleri</h4>
        <p>Ürtiker, süresine ve nedenine göre farklı kategorilerde sınıflandırılır:</p>
        
        <h5>Akut Ürtiker</h5>
        <ul>
          <li><strong>Süre:</strong> 6 haftadan kısa süren</li>
          <li><strong>Nedenler:</strong> Alerjik reaksiyonlar, enfeksiyonlar, ilaçlar</li>
          <li><strong>Belirtiler:</strong> Ani başlangıç, şiddetli kaşıntı</li>
          <li><strong>Prognoz:</strong> Genellikle iyi, kendiliğinden düzelir</li>
          <li><strong>Tedavi:</strong> Antihistaminikler, tetikleyici faktörlerden kaçınma</li>
        </ul>
        
        <h5>Kronik Ürtiker</h5>
        <ul>
          <li><strong>Süre:</strong> 6 haftadan uzun süren</li>
          <li><strong>Nedenler:</strong> Otoimmün hastalıklar, kronik enfeksiyonlar</li>
          <li><strong>Belirtiler:</strong> Tekrarlayan ataklar, yaşam kalitesini etkiler</li>
          <li><strong>Prognoz:</strong> Uzun vadeli tedavi gerekebilir</li>
          <li><strong>Tedavi:</strong> Kapsamlı yaklaşım, immünomodülatörler</li>
        </ul>
        
        <h5>Fiziksel Ürtiker</h5>
        <ul>
          <li><strong>Dermografik Ürtiker:</strong> Cilt çizildiğinde oluşan</li>
          <li><strong>Soğuk Ürtiker:</strong> Soğuk maruziyeti ile tetiklenen</li>
          <li><strong>Sıcak Ürtiker:</strong> Sıcak maruziyeti ile tetiklenen</li>
          <li><strong>Güneş Ürtiker:</strong> Güneş ışınları ile tetiklenen</li>
          <li><strong>Vibrasyon Ürtiker:</strong> Titreşim ile tetiklenen</li>
        </ul>
        
        <h5>Kolinerjik Ürtiker</h5>
        <ul>
          <li><strong>Neden:</strong> Terleme, sıcak banyo, egzersiz</li>
          <li><strong>Belirtiler:</strong> Küçük, kaşıntılı papüller</li>
          <li><strong>Yerleşim:</strong> Gövde, boyun, yüz</li>
          <li><strong>Süre:</strong> 30-60 dakika</li>
          <li><strong>Tedavi:</strong> Antihistaminikler, tetikleyici faktörlerden kaçınma</li>
        </ul>
        
        <h4>Ürtiker Nedenleri ve Tetikleyicileri</h4>
        <p>Ürtiker birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Alerjik Nedenler</h5>
        <ul>
          <li><strong>Gıda Alerjileri:</strong> Fındık, deniz ürünleri, yumurta, süt</li>
          <li><strong>İlaç Alerjileri:</strong> Antibiyotikler, ağrı kesiciler, aspirin</li>
          <li><strong>Böcek Isırıkları:</strong> Arı, eşek arısı, sivrisinek</li>
          <li><strong>Lateks Alerjisi:</strong> Eldiven, balon, tıbbi malzemeler</li>
        </ul>
        
        <h5>Enfeksiyonlar</h5>
        <ul>
          <li><strong>Viral Enfeksiyonlar:</strong> Üst solunum yolu enfeksiyonları</li>
          <li><strong>Bakteriyel Enfeksiyonlar:</strong> Diş apsesi, sinüzit</li>
          <li><strong>Paraziter Enfeksiyonlar:</strong> Bağırsak parazitleri</li>
          <li><strong>Mantar Enfeksiyonları:</strong> Candida, dermatofitler</li>
        </ul>
        
        <h5>Fiziksel Faktörler</h5>
        <ul>
          <li><strong>Basınç:</strong> Dar kıyafetler, çanta askısı</li>
          <li><strong>Sıcaklık:</strong> Soğuk, sıcak, güneş ışınları</li>
          <li><strong>Vibrasyon:</strong> Elektrikli aletler, araç kullanımı</li>
          <li><strong>Su:</strong> Su ile temas (aquajenik ürtiker)</li>
        </ul>
        
        <h5>Sistemik Hastalıklar</h5>
        <ul>
          <li><strong>Otoimmün Hastalıklar:</strong> Lupus, romatoid artrit</li>
          <li><strong>Tiroid Hastalıkları:</strong> Hashimoto, Graves</li>
          <li><strong>Kanser:</strong> Lenfoma, lösemi</li>
          <li><strong>Endokrin Hastalıklar:</strong> Diyabet, adrenal yetmezlik</li>
        </ul>
        
        <h4>Ürtiker Belirtileri ve Klinik Bulgular</h4>
        <p>Ürtiker belirtileri, hastalığın türüne ve şiddetine göre değişiklik gösterir:</p>
        
        <h5>Cilt Belirtileri</h5>
        <ul>
          <li><strong>Lezyonlar:</strong> Kırmızı, pembe veya ten renginde</li>
          <li><strong>Şekil:</strong> Yuvarlak, oval veya düzensiz</li>
          <li><strong>Boyut:</strong> Birkaç milimetre ile birkaç santimetre</li>
          <li><strong>Yüzey:</strong> Düz, hafif kabarık</li>
          <li><strong>Kaşıntı:</strong> Hafiften şiddetliye değişen</li>
        </ul>
        
        <h5>Genel Belirtiler</h5>
        <ul>
          <li><strong>Yanma ve batma hissi:</strong> Özellikle fiziksel ürtikerde</li>
          <li><strong>Şişlik:</strong> Anjiyoödem ile birlikte olabilir</li>
          <li><strong>Kızarıklık:</strong> Lezyon çevresinde</li>
          <li><strong>Isı artışı:</strong> Enflamasyon nedeniyle</li>
        </ul>
        
        <h5>Anjiyoödem</h5>
        <ul>
          <li><strong>Derin doku şişliği:</strong> Göz kapakları, dudaklar, dil</li>
          <li><strong>Solunum sıkıntısı:</strong> Larinks tutulumunda</li>
          <li><strong>Karın ağrısı:</strong> Bağırsak tutulumunda</li>
          <li><strong>Tehlike:</strong> Acil müdahale gerekebilir</li>
        </ul>
        
        <h4>Ürtiker Tanısı</h4>
        <p>Ürtiker tanısı için kapsamlı bir değerlendirme süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Lezyonların detaylı incelenmesi</li>
          <li>Yayılım paterni ve sınırların belirlenmesi</li>
          <li>Kaşıntı şiddetinin değerlendirilmesi</li>
          <li>Anjiyoödem varlığının kontrolü</li>
        </ul>
        
        <h5>Alerji Testleri</h5>
        <ul>
          <li><strong>Prick Testi:</strong> Gıda ve inhalan alerjenler</li>
          <li><strong>Patch Testi:</strong> Kontakt alerjenler</li>
          <li><strong>Kan Testleri:</strong> IgE seviyesi ve spesifik alerjenler</li>
          <li><strong>Eliminasyon Testi:</strong> Gıda alerjileri için</li>
        </ul>
        
        <h5>Fiziksel Testler</h5>
        <ul>
          <li><strong>Dermografik Test:</strong> Cilt çizme ile</li>
          <li><strong>Soğuk Test:</strong> Buz küpü uygulaması</li>
          <li><strong>Güneş Testi:</strong> UV ışınları ile</li>
          <li><strong>Basınç Testi:</strong> Ağırlık uygulaması</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li>Tam kan sayımı</li>
          <li>Eozinofil sayısı</li>
          <li>CRP ve sedimantasyon</li>
          <li>Tiroid fonksiyon testleri</li>
          <li>Otoantikor testleri</li>
        </ul>
        
        <h4>Modern Ürtiker Tedavi Yöntemleri</h4>
        <p>Kliniğimizde ürtiker için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, hastalığın türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Birinci Basamak Tedavi</h4>
        <p>Hafif ve orta şiddetli ürtiker vakalarında birinci basamak tedaviler etkili sonuçlar verir:</p>
        
        <h5>Antihistaminikler</h5>
        <ul>
          <li><strong>Birinci Nesil:</strong> Difenhidramin, klorfeniramin</li>
          <li><strong>İkinci Nesil:</strong> Seterizin, loratadin, feksofenadin</li>
          <li><strong>Üçüncü Nesil:</strong> Desloratadin, levosetirizin</li>
          <li><strong>Uygulama:</strong> Günlük veya gerektiğinde</li>
          <li><strong>Etki:</strong> Kaşıntı ve şişliği azaltma</li>
        </ul>
        
        <h5>H2 Blokerleri</h5>
        <ul>
          <li><strong>Ranitidin:</strong> H2 reseptör antagonisti</li>
          <li><strong>Famotidin:</strong> Alternatif H2 bloker</li>
          <li><strong>Kombinasyon:</strong> H1 ve H2 blokerlerle</li>
          <li><strong>Etki:</strong> Ek antihistaminik etki</li>
        </ul>
        
        <h4>İkinci Basamak Tedavi</h4>
        <p>Birinci basamak tedaviye yanıt vermeyen vakalarda ikinci basamak tedaviler kullanılır:</p>
        
        <h5>Kortikosteroidler</h5>
        <ul>
          <li><strong>Prednizolon:</strong> Kısa süreli kullanım</li>
          <li><strong>Methylprednizolon:</strong> İntravenöz uygulama</li>
          <li><strong>Süre:</strong> 3-7 gün</li>
          <li><strong>Yan etki:</strong> Uzun süreli kullanımda dikkat</li>
        </ul>
        
        <h5>Montelukast</h5>
        <ul>
          <li><strong>Etki:</strong> Lökotrien reseptör antagonisti</li>
          <li><strong>Kullanım:</strong> Kronik ürtikerde</li>
          <li><strong>Avantaj:</strong> Uzun süreli kullanım güvenli</li>
          <li><strong>Kombinasyon:</strong> Antihistaminiklerle</li>
        </ul>
        
        <h4>Üçüncü Basamak Tedavi</h4>
        <p>Şiddetli ve dirençli ürtiker vakalarında üçüncü basamak tedaviler gerekebilir:</p>
        
        <h5>İmmünomodülatörler</h5>
        <ul>
          <li><strong>Siklosporin:</strong> T hücre inhibitörü</li>
          <li><strong>Metotreksat:</strong> Folat antagonisti</li>
          <li><strong>Azatioprin:</strong> Purin antagonisti</li>
          <li><strong>Takip:</strong> Düzenli laboratuvar kontrolü</li>
        </ul>
        
        <h5>Biyolojik Tedaviler</h5>
        <ul>
          <li><strong>Omalizumab:</strong> Anti-IgE antikoru</li>
          <li><strong>Etki:</strong> IgE seviyesini düşürme</li>
          <li><strong>Uygulama:</strong> Ayda bir enjeksiyon</li>
          <li><strong>Avantaj:</strong> Yüksek etkinlik, güvenli</li>
        </ul>
        
        <h4>Fiziksel Ürtiker Tedavisi</h4>
        <p>Fiziksel ürtiker türlerinde özel tedavi yaklaşımları uygulanır:</p>
        
        <h5>Dermografik Ürtiker</h5>
        <ul>
          <li>Antihistaminikler</li>
          <li>Fototerapi (UVB)</li>
          <li>Basınçtan kaçınma</li>
          <li>Nazik cilt bakımı</li>
        </ul>
        
        <h5>Soğuk Ürtiker</h5>
        <ul>
          <li>Antihistaminikler</li>
          <li>Soğuktan korunma</li>
          <li>Kademeli soğuk adaptasyonu</li>
          <li>Epinefrin (acil durumlar için)</li>
        </ul>
        
        <h5>Kolinerjik Ürtiker</h5>
        <ul>
          <li>Antihistaminikler</li>
          <li>Egzersizden kaçınma</li>
          <li>Serin ortamda kalma</li>
          <li>Beta blokerler (gerekirse)</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Antihistaminik + H2 bloker</li>
          <li>Medikal + Fiziksel tedavi</li>
          <li>Biyolojik + Destekleyici tedavi</li>
          <li>Yaşam tarzı değişiklikleri + Medikal tedavi</li>
        </ul>
        
        <h4>Ürtiker Tedavi Sonrası Bakım</h4>
        <p>Ürtiker tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Tetikleyici faktörlerden kaçınma</li>
          <li>Düzenli antihistaminik kullanımı</li>
          <li>Stres yönetimi</li>
          <li>Düzenli kontroller</li>
        </ul>
        
        <h5>Yaşam Tarzı Değişiklikleri</h5>
        <ul>
          <li>Sağlıklı beslenme</li>
          <li>Düzenli egzersiz</li>
          <li>Yeterli uyku</li>
          <li>Alkol ve sigaradan kaçınma</li>
        </ul>
        
        <h4>Ürtikerden Korunma</h4>
        <p>Ürtikerden korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Alerjen Kontrolü</h5>
        <ul>
          <li>Gıda alerjenlerinden kaçınma</li>
          <li>İlaç alerjilerinde dikkat</li>
          <li>Çevresel alerjenlerden korunma</li>
          <li>Böcek ısırıklarından kaçınma</li>
        </ul>
        
        <h5>Fiziksel Faktörler</h5>
        <ul>
          <li>Uygun kıyafet seçimi</li>
          <li>Çevresel sıcaklık kontrolü</li>
          <li>Güneş koruyucu kullanımı</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Ürtiker Tedavi Sonuçları</h4>
        <p>Ürtiker tedavisinde sonuçlar genellikle hızlı görülür:</p>
        
        <h5>Akut Ürtiker</h5>
        <ul>
          <li>1-7 gün tedavi süresi</li>
          <li>%90+ başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Tekrar riski düşük</li>
        </ul>
        
        <h5>Kronik Ürtiker</h5>
        <ul>
          <li>3-12 ay tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Uzun vadeli tedavi gerekli</li>
          <li>Tekrar atak riski</li>
        </ul>
        
        <h5>Fiziksel Ürtiker</h5>
        <ul>
          <li>6-12 ay tedavi süresi</li>
          <li>%60-80 başarı oranı</li>
          <li>Tetikleyici faktörlerden kaçınma önemli</li>
          <li>Uzun vadeli takip gerekli</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde ürtiker tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Ürtiker konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel tanı ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı alerji testleri ve laboratuvar</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Ürtiker, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun ürtiker tedavi planını hazırlayarak, kaşıntı, şişlik ve yaşam kalitesi problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, cilt sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'dermatit',
    title: 'Dermatit',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Dermatit Nedir?</h4>
        <p>Dermatit, cildin iltihaplanması anlamına gelir ve farklı türleri bulunur. Bu hastalık, ciltte kaşıntı, kızarıklık, kabuklanma ve bazen sızıntıyla kendini gösterir. Dermatit, sadece estetik problemlere değil, aynı zamanda yaşam kalitesini önemli ölçüde etkileyen sağlık sorunlarıdır. Erken tanı ve tedavi, hastalığın ilerlemesini önlemek ve komplikasyonları azaltmak için kritik öneme sahiptir.</p>
        
        <h4>Dermatit Türleri ve Özellikleri</h4>
        <p>Dermatit, nedenlerine ve belirtilerine göre farklı kategorilerde sınıflandırılır:</p>
        
        <h5>Atopik Dermatit (Atopik Egzama)</h5>
        <ul>
          <li><strong>En yaygın tür:</strong> Çocukluk döneminde başlar</li>
          <li><strong>Genetik yatkınlık:</strong> Aile öyküsünde alerjik hastalıklar</li>
          <li><strong>Belirtiler:</strong> Kızarıklık, kaşıntı, kuruluk, kabuklanma</li>
          <li><strong>Yerleşim:</strong> Yüz, boyun, dirsek ve diz kıvrımları</li>
          <li><strong>Ataklar:</strong> Stres, alerjenler ve çevresel faktörlerle tetiklenir</li>
        </ul>
        
        <h5>Kontakt Dermatit</h5>
        <ul>
          <li><strong>İrritan Kontakt Dermatit:</strong> Kimyasal maddelerle temas</li>
          <li><strong>Alerjik Kontakt Dermatit:</strong> Alerjik reaksiyon</li>
          <li><strong>Belirtiler:</strong> Kızarıklık, şişlik, kaşıntı, kabarcıklar</li>
          <li><strong>Tetikleyiciler:</strong> Nikel, krom, kozmetik ürünler, deterjanlar</li>
          <li><strong>Yerleşim:</strong> Temas eden bölgelerde</li>
        </ul>
        
        <h5>Seboreik Dermatit</h5>
        <ul>
          <li><strong>Yağlı cilt bölgelerinde:</strong> Saçlı deri, yüz, göğüs</li>
          <li><strong>Belirtiler:</strong> Sarımsı kabuklar, pullanma, kızarıklık</li>
          <li><strong>Nedenler:</strong> Maya mantarı, yağ üretimi, stres</li>
          <li><strong>Mevsimsel değişim:</strong> Kış aylarında artış</li>
        </ul>
        
        <h5>Nummular Dermatit</h5>
        <ul>
          <li><strong>Para şeklinde lezyonlar:</strong> Yuvarlak veya oval</li>
          <li><strong>Belirtiler:</strong> Kaşıntılı, kırmızı, pullu lezyonlar</li>
          <li><strong>Yerleşim:</strong> Bacaklar, kollar, gövde</li>
          <li><strong>Kronik seyir:</strong> Uzun süreli tedavi gerekebilir</li>
        </ul>
        
        <h5>Dishidrotik Dermatit</h5>
        <ul>
          <li><strong>El ve ayaklarda:</strong> Avuç içi ve ayak tabanı</li>
          <li><strong>Belirtiler:</strong> Su dolu kabarcıklar, kaşıntı, pullanma</li>
          <li><strong>Tetikleyiciler:</strong> Stres, nem, alerjenler</li>
          <li><strong>Mevsimsel özellik:</strong> Yaz aylarında artış</li>
        </ul>
        
        <h4>Dermatit Nedenleri ve Tetikleyicileri</h4>
        <p>Dermatit birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Genetik Faktörler</h5>
        <ul>
          <li>Aile öyküsünde alerjik hastalıklar</li>
          <li>Atopik yapı</li>
          <li>Bağışıklık sistemi bozuklukları</li>
          <li>Metabolik hastalıklar</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Hava kirliliği</li>
          <li>İklim değişiklikleri</li>
          <li>UV radyasyon</li>
          <li>Kimyasal maddeler</li>
        </ul>
        
        <h5>Yaşam Tarzı Faktörleri</h5>
        <ul>
          <li>Stres ve anksiyete</li>
          <li>Uyku düzensizliği</li>
          <li>Yanlış beslenme</li>
          <li>Sigara ve alkol kullanımı</li>
        </ul>
        
        <h5>Mesleki Faktörler</h5>
        <ul>
          <li>Kimyasal maddelerle temas</li>
          <li>Su ve nem maruziyeti</li>
          <li>Lateks ve plastik ürünler</li>
          <li>Tekrarlayan travmalar</li>
        </ul>
        
        <h4>Dermatit Belirtileri ve Klinik Bulgular</h4>
        <p>Dermatit belirtileri, hastalığın türüne ve şiddetine göre değişiklik gösterir:</p>
        
        <h5>Cilt Belirtileri</h5>
        <ul>
          <li><strong>Kızarıklık:</strong> Hafif pembe ile koyu kırmızı arası</li>
          <li><strong>Kaşıntı:</strong> Hafiften şiddetliye değişen</li>
          <li><strong>Kuruluk:</strong> Cilt yüzeyinde pullanma</li>
          <li><strong>Kabuklanma:</strong> İltihaplı alanlarda</li>
          <li><strong>Çatlaklar:</strong> Özellikle kuru ciltlerde</li>
        </ul>
        
        <h5>İnflamatuar Belirtiler</h5>
        <ul>
          <li><strong>Şişlik:</strong> Ödem ve inflamasyon</li>
          <li><strong>Sıcaklık artışı:</strong> Enflamasyon nedeniyle</li>
          <li><strong>Ağrı:</strong> Hafif ağrı ve hassasiyet</li>
          <li><strong>Sızıntı:</strong> Şiddetli vakalarda</li>
        </ul>
        
        <h5>Komplikasyonlar</h5>
        <ul>
          <li><strong>İkincil enfeksiyonlar:</strong> Bakteriyel ve viral</li>
          <li><strong>Lichenifikasyon:</strong> Ciltte kalınlaşma</li>
          <li><strong>Pigmentasyon değişiklikleri:</strong> Leke oluşumu</li>
          <li><strong>Uyku bozuklukları:</strong> Kaşıntı nedeniyle</li>
        </ul>
        
        <h4>Dermatit Tanısı</h4>
        <p>Dermatit tanısı için kapsamlı bir değerlendirme süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Lezyonların detaylı incelenmesi</li>
          <li>Yayılım paterni ve sınırların belirlenmesi</li>
          <li>Kaşıntı şiddetinin değerlendirilmesi</li>
          <li>Genel cilt durumunun kontrolü</li>
        </ul>
        
        <h5>Alerji Testleri</h5>
        <ul>
          <li><strong>Prick Testi:</strong> Gıda ve inhalan alerjenler</li>
          <li><strong>Patch Testi:</strong> Kontakt alerji tespiti</li>
          <li><strong>Kan Testleri:</strong> IgE seviyesi ve spesifik alerjenler</li>
          <li><strong>Eliminasyon Testi:</strong> Gıda alerjileri için</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li>Tam kan sayımı</li>
          <li>Eozinofil sayısı</li>
          <li>CRP ve sedimantasyon</li>
          <li>Gerekirse biyopsi</li>
        </ul>
        
        <h4>Modern Dermatit Tedavi Yöntemleri</h4>
        <p>Kliniğimizde dermatit için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, hastalığın türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>Topikal Tedaviler</h4>
        <p>Hafif ve orta şiddetli dermatit vakalarında topikal tedaviler etkili sonuçlar verir:</p>
        
        <h5>Nemlendiriciler</h5>
        <ul>
          <li><strong>Vazelin bazlı:</strong> Yoğun nemlendirme</li>
          <li><strong>Üre içeren:</strong> Keratolitik etki</li>
          <li><strong>Seramid içeren:</strong> Cilt bariyerini güçlendirme</li>
          <li><strong>Hiyalüronik asit:</strong> Hızlı nemlendirme</li>
        </ul>
        
        <h5>Kortikosteroidler</h5>
        <ul>
          <li><strong>Hafif:</strong> Hidrokortizon %1</li>
          <li><strong>Orta:</strong> Betametazon, mometazon</li>
          <li><strong>Şiddetli:</strong> Klobetasol, halobetasol</li>
          <li><strong>Uygulama:</strong> Günde 1-2 kez</li>
        </ul>
        
        <h5>Kalsinörin İnhibitörleri</h5>
        <ul>
          <li><strong>Tacrolimus:</strong> %0.03 ve %0.1 konsantrasyonlar</li>
          <li><strong>Pimekrolimus:</strong> %1 krem</li>
          <li><strong>Etki:</strong> İnflamasyonu azaltma</li>
          <li><strong>Avantaj:</strong> Uzun süreli kullanım güvenli</li>
        </ul>
        
        <h4>Sistemik Tedaviler</h4>
        <p>Orta ve şiddetli dermatit vakalarında sistemik tedaviler gerekebilir:</p>
        
        <h5>Antihistaminikler</h5>
        <ul>
          <li><strong>Birinci Nesil:</strong> Difenhidramin, klorfeniramin</li>
          <li><strong>İkinci Nesil:</strong> Seterizin, loratadin, feksofenadin</li>
          <li><strong>Etki:</strong> Kaşıntı ve alerjik belirtileri azaltma</li>
          <li><strong>Uygulama:</strong> Günlük veya gerektiğinde</li>
        </ul>
        
        <h5>İmmünomodülatörler</h5>
        <ul>
          <li><strong>Siklosporin:</strong> Şiddetli atopik dermatit</li>
          <li><strong>Metotreksat:</strong> Kronik dermatit</li>
          <li><strong>Azatioprin:</strong> Alternatif tedavi</li>
          <li><strong>Takip:</strong> Düzenli laboratuvar kontrolü</li>
        </ul>
        
        <h5>Biyolojik Tedaviler</h5>
        <ul>
          <li><strong>Dupilumab:</strong> IL-4 ve IL-13 inhibitörü</li>
          <li><strong>Tralokinumab:</strong> IL-13 inhibitörü</li>
          <li><strong>Nemolizumab:</strong> IL-31 inhibitörü</li>
          <li><strong>Uygulama:</strong> Enjeksiyon ile</li>
        </ul>
        
        <h4>Fototerapi (Işık Tedavisi)</h4>
        <p>Orta ve şiddetli dermatit vakalarında fototerapi etkili bir tedavi seçeneğidir:</p>
        
        <h5>UVB Tedavisi</h5>
        <ul>
          <li><strong>Narrowband UVB:</strong> En etkili UVB tedavisi</li>
          <li><strong>Broadband UVB:</strong> Geleneksel UVB tedavisi</li>
          <li><strong>Uygulama:</strong> Haftada 2-3 kez</li>
          <li><strong>Süre:</strong> 6-12 hafta</li>
        </ul>
        
        <h5>PUVA Tedavisi</h5>
        <ul>
          <li><strong>Psoralen + UVA:</strong> Kombine tedavi</li>
          <li><strong>Etki:</strong> Güçlü immünosupresyon</li>
          <li><strong>Uygulama:</strong> Haftada 2-3 kez</li>
          <li><strong>Yan etki:</strong> Mide bulantısı, güneş yanığı</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>Topikal + Sistemik tedavi</li>
          <li>Fototerapi + Medikal tedavi</li>
          <li>Biyolojik + Destekleyici tedavi</li>
          <li>Yaşam tarzı değişiklikleri + Medikal tedavi</li>
        </ul>
        
        <h4>Dermatit Tedavi Sonrası Bakım</h4>
        <p>Dermatit tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Cilt Bakımı</h5>
        <ul>
          <li>Günlük nemlendirici kullanımı</li>
          <li>Nazik temizleyiciler</li>
          <li>Güneş koruyucu (SPF 30+)</li>
          <li>Düzenli cilt kontrolü</li>
        </ul>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Alerjenlerden kaçınma</li>
          <li>Uygun kıyafet seçimi</li>
          <li>Çevresel faktörlere dikkat</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h4>Dermatitten Korunma</h4>
        <p>Dermatitten korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Çevresel Kontrol</h5>
        <ul>
          <li>Ev tozu akarlarını azaltma</li>
          <li>Polen maruziyetini minimize etme</li>
          <li>Hayvan alerjilerinde dikkat</li>
          <li>Nem kontrolü</li>
        </ul>
        
        <h5>Yaşam Tarzı Değişiklikleri</h5>
        <ul>
          <li>Sağlıklı beslenme</li>
          <li>Düzenli egzersiz</li>
          <li>Yeterli uyku</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Düzenli el yıkama</li>
          <li>Uygun cilt bakımı</li>
          <li>Kimyasal maddelerden korunma</li>
          <li>Düzenli kontroller</li>
        </ul>
        
        <h4>Dermatit Tedavi Sonuçları</h4>
        <p>Dermatit tedavisinde sonuçlar genellikle zamanla görülür:</p>
        
        <h5>Topikal Tedaviler</h5>
        <ul>
          <li>1-2 hafta tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Düzenli uygulama gerekli</li>
        </ul>
        
        <h5>Sistemik Tedaviler</h5>
        <ul>
          <li>2-4 hafta tedavi süresi</li>
          <li>%80-90 başarı oranı</li>
          <li>Orta hızda iyileşme</li>
          <li>Yan etki takibi önemli</li>
        </ul>
        
        <h5>Fototerapi</h5>
        <ul>
          <li>6-12 hafta tedavi süresi</li>
          <li>%75-85 başarı oranı</li>
          <li>Yavaş ama kalıcı iyileşme</li>
          <li>Uzun vadeli sonuçlar</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde dermatit tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Dermatit konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel tanı ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı alerji testleri ve laboratuvar</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Dermatit, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun dermatit tedavi planını hazırlayarak, kaşıntı, kızarıklık ve yaşam kalitesi problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, cilt sağlığınızı korumaya ve iyileştirmeye yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'alerjik-hastaliklar',
    title: 'Alerjik Hastalıklar',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Alerjik Hastalıklar Nedir?</h4>
        <p>Alerjik hastalıklar, bağışıklık sisteminin normalde zararsız olan maddelere (alerjenlere) karşı aşırı tepki vermesi sonucu ortaya çıkan kronik sağlık sorunlarıdır. Bu hastalıklar, sadece cilt problemlerine değil, aynı zamanda solunum yolu, sindirim sistemi ve genel sağlık üzerinde de önemli etkilere sahiptir. Alerjik hastalıklar, her yaş grubunda görülebilir ve erken tanı ile tedavi edilmesi önemlidir. Kliniğimizde bu hastalıklar için modern ve etkili tedavi yöntemleri kullanılmaktadır.</p>
        
        <h4>Alerjik Hastalıklar Türleri ve Özellikleri</h4>
        <p>Alerjik hastalıklar, etkilenen organ sistemine ve alerjen türüne göre farklı kategorilerde sınıflandırılır:</p>
        
        <h5>Solunum Yolu Alerjileri</h5>
        <ul>
          <li><strong>Alerjik Rinit (Saman Nezlesi):</strong> Burun akıntısı, hapşırık, burun tıkanıklığı</li>
          <li><strong>Alerjik Konjonktivit:</strong> Gözlerde kaşıntı, kızarıklık, sulanma</li>
          <li><strong>Alerjik Astım:</strong> Nefes darlığı, hırıltı, öksürük</li>
          <li><strong>Sinüzit:</strong> Burun tıkanıklığı, baş ağrısı, yüz ağrısı</li>
        </ul>
        
        <h5>Cilt Alerjileri</h5>
        <ul>
          <li><strong>Atopik Dermatit:</strong> Kronik cilt iltihabı, kaşıntı, kuruluk</li>
          <li><strong>Kontakt Dermatit:</strong> Temas sonrası cilt reaksiyonu</li>
          <li><strong>Ürtiker (Kurdeşen):</strong> Ani cilt döküntüleri, kaşıntı</li>
          <li><strong>Anjiyoödem:</strong> Derin doku şişliği</li>
        </ul>
        
        <h5>Gıda Alerjileri</h5>
        <ul>
          <li><strong>Süt Alerjisi:</strong> İnek sütü proteinlerine karşı reaksiyon</li>
          <li><strong>Yumurta Alerjisi:</strong> Yumurta beyazı ve sarısı alerjisi</li>
          <li><strong>Kuruyemiş Alerjisi:</strong> Fındık, ceviz, badem alerjisi</li>
          <li><strong>Deniz Ürünleri Alerjisi:</strong> Balık, karides, midye alerjisi</li>
          <li><strong>Gluten Alerjisi:</strong> Buğday, arpa, çavdar alerjisi</li>
        </ul>
        
        <h5>İlaç Alerjileri</h5>
        <ul>
          <li><strong>Antibiyotik Alerjisi:</strong> Penisilin, sefalosporin alerjisi</li>
          <li><strong>Ağrı Kesici Alerjisi:</strong> Aspirin, ibuprofen alerjisi</li>
          <li><strong>Kemoterapi Alerjisi:</strong> Antikanser ilaçlarına reaksiyon</li>
          <li><strong>Anestezi Alerjisi:</strong> Lokal ve genel anestezik alerjisi</li>
        </ul>
        
        <h5>Böcek Alerjileri</h5>
        <ul>
          <li><strong>Arı Alerjisi:</strong> Bal arısı, eşek arısı alerjisi</li>
          <li><strong>Sivrisinek Alerjisi:</strong> Böcek ısırığı reaksiyonu</li>
          <li><strong>Hamam Böceği Alerjisi:</strong> Ev tozu akarları ile ilişkili</li>
        </ul>
        
        <h4>Alerjik Hastalıkların Nedenleri</h4>
        <p>Alerjik hastalıklar birçok farklı faktöre bağlı olarak gelişebilir:</p>
        
        <h5>Genetik Faktörler</h5>
        <ul>
          <li>Aile öyküsünde alerjik hastalıklar</li>
          <li>Atopik yapı</li>
          <li>Bağışıklık sistemi genleri</li>
          <li>HLA genotipi</li>
        </ul>
        
        <h5>Çevresel Faktörler</h5>
        <ul>
          <li>Hava kirliliği</li>
          <li>İklim değişiklikleri</li>
          <li>UV radyasyon</li>
          <li>Endüstriyel kimyasallar</li>
        </ul>
        
        <h5>Yaşam Tarzı Faktörleri</h5>
        <ul>
          <li>Hijyen hipotezi</li>
          <li>Beslenme alışkanlıkları</li>
          <li>Stres ve anksiyete</li>
          <li>Sigara ve alkol kullanımı</li>
        </ul>
        
        <h5>Mesleki Faktörler</h5>
        <ul>
          <li>Kimyasal maddelerle temas</li>
          <li>Toz ve partikül maruziyeti</li>
          <li>Lateks ve plastik ürünler</li>
          <li>Biyolojik ajanlar</li>
        </ul>
        
        <h4>Alerjik Hastalıklar Belirtileri</h4>
        <p>Alerjik hastalıklarda görülen belirtiler, etkilenen organ sistemine göre değişiklik gösterir:</p>
        
        <h5>Solunum Yolu Belirtileri</h5>
        <ul>
          <li><strong>Burun:</strong> Akıntı, tıkanıklık, hapşırık, kaşıntı</li>
          <li><strong>Gözler:</strong> Kızarıklık, kaşıntı, sulanma, şişlik</li>
          <li><strong>Boğaz:</strong> Kaşıntı, yanma, ses kısıklığı</li>
          <li><strong>Akciğerler:</strong> Nefes darlığı, hırıltı, öksürük</li>
        </ul>
        
        <h5>Cilt Belirtileri</h5>
        <ul>
          <li><strong>Kızarıklık:</strong> Hafif pembe ile koyu kırmızı arası</li>
          <li><strong>Kaşıntı:</strong> Hafiften şiddetliye değişen</li>
          <li><strong>Döküntü:</strong> Ürtiker, egzama, dermatit</li>
          <li><strong>Şişlik:</strong> Anjiyoödem, yüz şişmesi</li>
        </ul>
        
        <h5>Sindirim Sistemi Belirtileri</h5>
        <ul>
          <li><strong>Mide:</strong> Bulantı, kusma, ağrı</li>
          <li><strong>Bağırsak:</strong> İshal, karın ağrısı, kramp</li>
          <li><strong>Ağız:</strong> Kaşıntı, şişlik, uyuşma</li>
        </ul>
        
        <h5>Genel Belirtiler</h5>
        <ul>
          <li>Halsizlik ve yorgunluk</li>
          <li>Baş ağrısı</li>
          <li>Uyku bozuklukları</li>
          <li>Konsantrasyon güçlüğü</li>
        </ul>
        
        <h5>Anafilaksi (Acil Durum)</h5>
        <ul>
          <li>Nefes darlığı ve boğulma hissi</li>
          <li>Kan basıncında düşme</li>
          <li>Bilinç kaybı</li>
          <li>Kalp durması</li>
        </ul>
        
        <h4>Alerjik Hastalıklar Tanısı</h4>
        <p>Alerjik hastalıkların doğru tanısı için kapsamlı bir değerlendirme süreci gerekir:</p>
        
        <h5>Klinik Muayene</h5>
        <ul>
          <li>Detaylı hasta öyküsü</li>
          <li>Fizik muayene</li>
          <li>Belirtilerin değerlendirilmesi</li>
          <li>Aile öyküsü</li>
        </ul>
        
        <h5>Alerji Testleri</h5>
        <ul>
          <li><strong>Prick Testi:</strong> Cilt üzerinde alerjen testi</li>
          <li><strong>Patch Testi:</strong> Kontakt alerji tespiti</li>
          <li><strong>Intradermal Test:</strong> Deri içi alerjen testi</li>
          <li><strong>Provokasyon Testi:</strong> Alerjen maruziyet testi</li>
        </ul>
        
        <h5>Laboratuvar Testleri</h5>
        <ul>
          <li><strong>Kan Testleri:</strong> IgE seviyesi, spesifik alerjenler</li>
          <li><strong>Tam Kan Sayımı:</strong> Eozinofil sayısı</li>
          <li><strong>CRP ve Sedimantasyon:</strong> İnflamasyon belirteçleri</li>
          <li><strong>Tiroid Fonksiyon Testleri:</strong> Endokrin değerlendirme</li>
        </ul>
        
        <h5>Görüntüleme Yöntemleri</h5>
        <ul>
          <li>Akciğer grafisi</li>
          <li>Sinüs tomografisi</li>
          <li>Endoskopi (gerekirse)</li>
          <li>Deri biyopsisi (gerekirse)</li>
        </ul>
        
        <h4>Modern Alerjik Hastalıklar Tedavi Yöntemleri</h4>
        <p>Kliniğimizde alerjik hastalıklar için en güncel ve etkili tedavi yöntemlerini kullanıyoruz. Tedavi seçimi, hastalığın türüne, şiddetine ve hastanın durumuna göre belirlenir.</p>
        
        <h4>İlaç Tedavileri</h4>
        <p>Hafif ve orta şiddetli alerjik hastalıklarda ilaç tedavileri etkili sonuçlar verir:</p>
        
        <h5>Antihistaminikler</h5>
        <ul>
          <li><strong>Birinci Nesil:</strong> Difenhidramin, klorfeniramin</li>
          <li><strong>İkinci Nesil:</strong> Seterizin, loratadin, feksofenadin</li>
          <li><strong>Üçüncü Nesil:</strong> Desloratadin, levosetirizin</li>
          <li><strong>Uygulama:</strong> Günlük veya gerektiğinde</li>
          <li><strong>Etki:</strong> Alerjik belirtileri azaltma</li>
        </ul>
        
        <h5>Kortikosteroidler</h5>
        <ul>
          <li><strong>Topikal:</strong> Krem, merhem, sprey</li>
          <li><strong>Oral:</strong> Tablet, şurup</li>
          <li><strong>İnhalasyon:</strong> Astım tedavisi için</li>
          <li><strong>Uygulama:</strong> Kısa süreli, düzenli takip ile</li>
        </ul>
        
        <h5>Lökotrien Antagonistleri</h5>
        <ul>
          <li><strong>Montelukast:</strong> Astım ve alerjik rinit</li>
          <li><strong>Zafirlukast:</strong> Alternatif tedavi</li>
          <li><strong>Etki:</strong> İnflamasyonu azaltma</li>
          <li><strong>Avantaj:</strong> Uzun süreli kullanım güvenli</li>
        </ul>
        
        <h4>İmmünoterapi (Alerji Aşısı)</h4>
        <p>Orta ve şiddetli alerjik hastalıklarda immünoterapi etkili bir tedavi seçeneğidir:</p>
        
        <h5>Subkutan İmmünoterapi (SCIT)</h5>
        <ul>
          <li><strong>Uygulama:</strong> Cilt altına enjeksiyon</li>
          <li><strong>Süre:</strong> 3-5 yıl</li>
          <li><strong>Frekans:</strong> Haftalık, aylık</li>
          <li><strong>Etki:</strong> Alerjik reaksiyonları azaltma</li>
        </ul>
        
        <h5>Sublingual İmmünoterapi (SLIT)</h5>
        <ul>
          <li><strong>Uygulama:</strong> Dil altına damla/tablet</li>
          <li><strong>Süre:</strong> 3-5 yıl</li>
          <li><strong>Frekans:</strong> Günlük</li>
          <li><strong>Avantaj:</strong> Evde uygulanabilir</li>
        </ul>
        
        <h4>Biyolojik Tedaviler</h4>
        <p>Şiddetli ve dirençli alerjik hastalıklarda biyolojik tedaviler kullanılır:</p>
        
        <h5>Anti-IgE Tedavisi</h5>
        <ul>
          <li><strong>Omalizumab:</strong> IgE seviyesini düşürme</li>
          <li><strong>Uygulama:</strong> Ayda bir enjeksiyon</li>
          <li><strong>Endikasyon:</strong> Şiddetli astım, kronik ürtiker</li>
          <li><strong>Avantaj:</strong> Yüksek etkinlik</li>
        </ul>
        
        <h5>Anti-IL-4/IL-13 Tedavisi</h5>
        <ul>
          <li><strong>Dupilumab:</strong> Atopik dermatit, astım</li>
          <li><strong>Etki:</strong> İnflamasyonu azaltma</li>
          <li><strong>Uygulama:</strong> 2 haftada bir enjeksiyon</li>
        </ul>
        
        <h4>Kombine Tedavi Yaklaşımı</h4>
        <p>Kliniğimizde en iyi sonuçları almak için farklı tedavi yöntemlerini birleştiriyoruz:</p>
        <ul>
          <li>İlaç + İmmünoterapi</li>
          <li>Biyolojik + Destekleyici tedavi</li>
          <li>Yaşam tarzı değişiklikleri + Medikal tedavi</li>
          <li>Çevresel kontrol + Farmakolojik tedavi</li>
        </ul>
        
        <h4>Alerjik Hastalıklar Tedavi Sonrası Bakım</h4>
        <p>Alerjik hastalıklar tedavisi sonrası düzenli bakım çok önemlidir:</p>
        
        <h5>Koruyucu Önlemler</h5>
        <ul>
          <li>Alerjenlerden kaçınma</li>
          <li>Düzenli ilaç kullanımı</li>
          <li>Çevresel kontrol</li>
          <li>Stres yönetimi</li>
        </ul>
        
        <h5>Yaşam Tarzı Değişiklikleri</h5>
        <ul>
          <li>Sağlıklı beslenme</li>
          <li>Düzenli egzersiz</li>
          <li>Yeterli uyku</li>
          <li>Sigara ve alkolden kaçınma</li>
        </ul>
        
        <h4>Alerjik Hastalıklardan Korunma</h4>
        <p>Alerjik hastalıklardan korunmak için dikkat edilmesi gerekenler:</p>
        
        <h5>Çevresel Kontrol</h5>
        <ul>
          <li>Ev tozu akarlarını azaltma</li>
          <li>Polen maruziyetini minimize etme</li>
          <li>Hayvan alerjilerinde dikkat</li>
          <li>Nem ve küf kontrolü</li>
        </ul>
        
        <h5>Beslenme Önerileri</h5>
        <ul>
          <li>Antioksidan açısından zengin beslenme</li>
          <li>Omega-3 yağ asitleri</li>
          <li>Probiyotik gıdalar</li>
          <li>Vitamin D takviyesi</li>
        </ul>
        
        <h5>Kişisel Hijyen</h5>
        <ul>
          <li>Düzenli el yıkama</li>
          <li>Uygun cilt bakımı</li>
          <li>Düzenli kontroller</li>
          <li>Acil durum planı</li>
        </ul>
        
        <h4>Alerjik Hastalıklar Tedavi Sonuçları</h4>
        <p>Alerjik hastalıklar tedavisinde sonuçlar genellikle zamanla görülür:</p>
        
        <h5>İlaç Tedavileri</h5>
        <ul>
          <li>1-2 hafta tedavi süresi</li>
          <li>%70-80 başarı oranı</li>
          <li>Hızlı iyileşme</li>
          <li>Düzenli kullanım gerekli</li>
        </ul>
        
        <h5>İmmünoterapi</h5>
        <ul>
          <li>3-5 yıl tedavi süresi</li>
          <li>%80-90 başarı oranı</li>
          <li>Uzun vadeli sonuçlar</li>
          <li>Kalıcı iyileşme</li>
        </ul>
        
        <h5>Biyolojik Tedaviler</h5>
        <ul>
          <li>3-6 ay tedavi süresi</li>
          <li>%85-95 başarı oranı</li>
          <li>Hızlı ve etkili sonuçlar</li>
          <li>Yüksek maliyet</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde alerjik hastalıklar tedavisi için en güncel yöntemleri ve uzman dermatolog ekibimizi kullanarak, her hasta için özel tedavi planları hazırlıyoruz:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Alerjik hastalıklar konusunda deneyimli dermatologlar</li>
          <li><strong>Modern Teknolojiler:</strong> En güncel tanı ve tedavi sistemleri</li>
          <li><strong>Kapsamlı Tanı:</strong> Detaylı alerji testleri ve laboratuvar</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Kombine Tedavi:</strong> Farklı yöntemlerin birleştirilmesi</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
        </ul>
        
        <h4>Sonuç</h4>
        <p>Alerjik hastalıklar, doğru tanı ve tedavi ile başarıyla kontrol altına alınabilir. Kliniğimizde uzman ekibimizle birlikte, size en uygun alerjik hastalıklar tedavi planını hazırlayarak, yaşam kalitesi problemlerinizde etkili ve kalıcı sonuçlar elde etmenizi sağlıyoruz. Modern tedavi yöntemleri ve kişiselleştirilmiş yaklaşımımızla, alerjik hastalıklarla yaşamayı öğrenmenize yardımcı oluyoruz.</p>
      </div>
    `
  },
  {
    slug: 'botoks-uygulamasi',
    title: 'Botoks Uygulaması',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Botoks Nedir?</h4>
        <p>Botoks, mimik kaslarının hareketini geçici olarak durdurarak kırışıklıkların azalmasını sağlayan güvenli ve etkili bir estetik uygulamadır. Özellikle alın, kaş arası ve göz çevresinde yaşlanma belirtilerini hafifletmek için kullanılır.</p>
        
        <h4>Uygulama Bölgeleri ve Süreci</h4>
        <p>Kaş arası çizgileri, alın kırışıklıkları, kaz ayakları ve boyun bantları botoksla düzeltilebilen başlıca alanlardır. İşlem 10-15 dakika sürer ve sosyal hayatı kesintiye uğratmaz.</p>
        
        <h4>Doğal ve Kontrollü Gençleşme</h4>
        <p>Kliniğimizde kişiye özel dozlarla yapılan botoks uygulamaları, yüz ifadesini bozmadan, doğal bir gençleşme sağlar. Donukluk yaratmadan mimiklerin korunması önceliğimizdir.</p>
        
        <h4>Uzman Hekimlerle Güvenli Sonuçlar</h4>
        <p>Uygulama, dermatoloji uzmanlarımız tarafından steril koşullarda gerçekleştirilir. Orijinal ve FDA onaylı botulinum toksin ürünleri kullanılır. Etkisi ortalama 4-6 ay devam eder.</p>
      </div>
    `
  },
  {
    slug: 'dolgu-uygulamasi',
    title: 'Dolgu Uygulaması',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Dolgu Nedir?</h4>
        <p>Dolgu, yaşla birlikte hacim kaybına uğrayan yüz bölgelerinde volüm kazandırmak, çizgileri doldurmak ve yüz hatlarını belirginleştirmek amacıyla uygulanan estetik bir enjeksiyon işlemidir.</p>
        
        <h4>Dolgu Hangi Bölgelere Uygulanır?</h4>
        <p>Dolgu uygulamaları, dudaklar, yanaklar, elmacık kemikleri, çene ucu, burun, göz altı ve nazolabial çizgiler gibi yüzün birçok alanında kullanılabilir. Doğal ve dengeli sonuçlar elde edilir.</p>
        
        <h4>Kliniğimizde Hangi Dolgu Ürünleri Kullanılıyor?</h4>
        <p>Kliniğimizde yalnızca FDA onaylı, yüksek saflıkta ve uzun ömürlü hyalüronik asit dolguları kullanılmaktadır. Cilde uyumlu bu maddeler ile maksimum güvenlik sağlanır.</p>
        
        <h4>Dolgu Uygulaması Nasıl Yapılır?</h4>
        <p>Dolgu işlemi, lokal anestezik krem sonrası çok ince iğnelerle cilt altına enjekte edilerek gerçekleştirilir. Uygulama yaklaşık 15-30 dakika sürer ve hemen etkisini gösterir.</p>
        
        <h4>Dolgu Sonrası Nelere Dikkat Edilmeli?</h4>
        <p>Dolgu uygulaması sonrası bölgede hafif kızarıklık ya da ödem olabilir, bu durum genellikle birkaç saat içinde geçer. İşlem sonrası aynı gün sosyal yaşama dönülebilir.</p>
        
        <h4>Dolgu Ne Kadar Kalıcıdır?</h4>
        <p>Uygulanan bölgeye ve kullanılan dolgu tipine göre etkisi 9 ila 18 ay arasında sürer. Düzenli aralıklarla tekrar edildiğinde dolgu etkisi daha uzun kalıcılık sağlar.</p>
        
        <h4>Dolgu ile Yüz Gençleştirme Mümkün mü?</h4>
        <p>Evet, dolgu tedavisi ile yüz kontürleri şekillendirilir, hacim kayıpları yerine konur ve yaşa bağlı çökmeler giderilir. Sonuç; daha genç, dinamik ve dinlenmiş bir yüz görünümüdür.</p>
        
        <h4>Dolgu ile Ameliyatsız Estetik Mümkün mü?</h4>
        <p>Dolgu uygulamaları, cerrahi işlem gerektirmeden yüz hatlarını düzeltmek isteyenler için hızlı ve etkili bir çözümdür. Kliniğimizde en çok tercih edilen medikal estetik işlemler arasındadır.</p>
        
        <h4>Dolgu Kimlere Uygulanabilir?</h4>
        <p>18 yaş üzeri, genel sağlık durumu uygun olan herkese dolgu tedavisi yapılabilir. Hamilelik ve emzirme döneminde önerilmez. Uygulama öncesi detaylı analiz yapılır.</p>
        
        <h4>Dolgu Uygulaması Neden Kliniğimizde Tercih Edilmeli?</h4>
        <p>Alanında uzman hekimlerimiz, yüz oranlarını dikkatle analiz ederek kişiye özel dolgu planlaması yapar. Steril, güvenli ve teknolojik altyapımızla estetik sonuçlar sunarız.</p>
      </div>
    `
  },
  {
    slug: 'regenera-activa-kok-hucre-tedavisi',
    title: 'Regenera Activa (Kök Hücre Tedavisi)',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Regenera Activa Nedir?</h4>
        <p>Regenera Activa, saç dökülmesini durdurmak ve saç kalitesini artırmak için kişinin kendi dokusundan alınan kök hücrelerin mikrogreft yöntemiyle saçlı deriye uygulanmasıyla yapılan özel bir tedavidir.</p>
        
        <h4>Kök Hücre ile Saç Dökülmesi Tedavisi Nasıl Çalışır?</h4>
        <p>Regenera Activa, saç köklerinin uyarılmasını sağlayan özel hücreleri içeren mikrogreftleri doğrudan saç derisine enjekte ederek dökülmeyi durdurur ve yeni saç oluşumunu teşvik eder.</p>
        
        <h4>Kimler Regenera Activa İçin Uygundur?</h4>
        <p>Erkek tipi saç dökülmesi (androgenetik alopesi) yaşayan erkekler ve saç yoğunluğu azalmış kadınlar için Regenera Activa tedavisi ideal ve doğal bir çözümdür.</p>
        
        <h4>Kliniğimizde Regenera Activa Nasıl Uygulanıyor?</h4>
        <p>Kliniğimizde bu özel kök hücre tedavisi, lokal anestezi altında, steril koşullarda, tek seansta uygulanır. İşlem yaklaşık 30 dakika sürer, aynı gün sosyal yaşama dönüş mümkündür.</p>
        
        <h4>Regenera Activa Ne Zaman Etki Gösterir?</h4>
        <p>İlk etkiler 4-6 hafta içinde görülmeye başlar. Saç dökülmesi azalır, saç kalınlığı ve yoğunluğu artar. Sonuçlar 6 ay-1 yıl arasında devam eder.</p>
        
        <h4>Regenera Activa Kalıcı Bir Tedavi Midir?</h4>
        <p>Regenera Activa, saç dökülmesini geçici olarak yavaşlatır ve kökleri güçlendirir. Etkinin devamı için yılda bir tekrar önerilir.</p>
        
        <h4>Neden Kök Hücre ile Saç Tedavisi?</h4>
        <p>Çünkü kök hücre tedavisi, kimyasal madde içermez ve vücutla tamamen uyumludur. Doğal ve yan etkisiz bir tedavi süreci sunar.</p>
        
        <h4>Regenera Activa ile Diğer Tedaviler Birlikte Uygulanabilir mi?</h4>
        <p>Evet, Regenera Activa uygulaması PRP ve mezoterapi ile kombine edildiğinde sonuçlar daha da güçlenir.</p>
        
        <h4>Lazer Destekli Saç Tedavileriyle Etki Artar mı?</h4>
        <p>Kliniğimizde kullanılan lazer cihazları, saç derisini uyararak kök hücre tedavisi sonrası etkilerin kalıcılığını artırır.</p>
        
        <h4>Regenera Activa Neden Kliniğimizde Tercih Edilmeli?</h4>
        <p>Çünkü Regenera Activa uygulaması, uzman dermatologlar tarafından, son teknoloji cihazlar ve steril ortamda güvenle gerçekleştirilir. Kalıcı ve doğal çözümler arayanlar için doğru adrestir.</p>
      </div>
    `
  },
  {
    slug: 'prp-platelet-rich-plasma-tedavisi',
    title: 'PRP (Platelet Rich Plasma) Tedavisi',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>PRP tedavisi nedir?</h4>
        <p>PRP, kişinin kendi kanından elde edilen plazmanın cilt ya da saçlı deriye enjekte edilmesiyle yapılan doğal bir yenilenme tedavisidir.</p>
        
        <h4>PRP nasıl uygulanır?</h4>
        <p>Kişiden alınan kan özel tüplerde ayrıştırılır, trombositten zengin plazma mikro iğnelerle hedef bölgeye enjekte edilir.</p>
        
        <h4>PRP hangi alanlarda kullanılır?</h4>
        <p>Cilt gençleştirme, ince kırışıklıklar, akne izleri, saç dökülmesi ve göz altı morluklarında PRP tedavisi yaygın kullanılır.</p>
        
        <h4>PRP kaç seans yapılır?</h4>
        <p>Genellikle 3-4 seans önerilir. Ciltte parlaklık, sıkılık ve saçta canlanma 2. seanstan itibaren fark edilir.</p>
        
        <h4>Kliniğinizde PRP uygulaması nasıldır?</h4>
        <p>Steril ortamda, CE belgeli tüplerle ve uzman ekip tarafından yapılan PRP uygulaması, yüksek güvenlik ve etki sunar.</p>
      </div>
    `
  },
  {
    slug: 'mezoterapi-uygulamasi',
    title: 'Mezoterapi Uygulaması',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Mezoterapi nedir?</h4>
        <p>Mezoterapi, vitamin, mineral, aminoasit ve enzim karışımlarının cilt altına mikro iğnelerle enjekte edilmesidir.</p>
        
        <h4>Mezoterapi nerelerde kullanılır?</h4>
        <p>Yüz gençleştirme, leke tedavisi, saç dökülmesi ve selülit gibi birçok estetik problemde mezoterapi tedavisi uygulanabilir.</p>
        
        <h4>Mezoterapi nasıl etki eder?</h4>
        <p>Mezoterapi, uygulandığı bölgedeki hücreleri yeniler, kan dolaşımını artırır ve cildin nem dengesini sağlar.</p>
        
        <h4>Seanslar nasıl planlanır?</h4>
        <p>İhtiyaca göre 4-6 seans uygulanır. Uygulama süresi kısa, iyileşme süreci yok denecek kadar azdır.</p>
        
        <h4>Kliniğinizde mezoterapi farkı nedir?</h4>
        <p>Kişiye özel içeriklerle yapılan mezoterapi uygulamaları, uzman hekimlerimizce steril ortamda gerçekleştirilir.</p>
      </div>
    `
  },
  {
    slug: 'leke-tedavisi',
    title: 'Leke Tedavisi',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Cilt lekeleri neden oluşur?</h4>
        <p>Güneş, hormonlar, yaşlanma ve akne sonrası izler, ciltte kalıcı renk değişikliklerine neden olabilir.</p>
        
        <h4>Leke tedavisi ile cildiniz nasıl değişir?</h4>
        <p>Leke tedavisi, cilt tonunu dengeler, donuk görünümü giderir ve ışıl ışıl, sağlıklı bir cilde kavuşmanızı sağlar.</p>
        
        <h4>Neden kliniğimizde çok sayıda leke hastamız var?</h4>
        <p>Çünkü hastalarımıza kişiye özel tedavi planı sunuyor, en yeni ve etkili cihazlarla üstün sonuçlar elde ediyoruz.</p>
        
        <h4>Hangi cihazlarla tedavi yapılır?</h4>
        <p>Gelişmiş teknolojik cihazlarımız sayesinde, her leke tipine uygun farklı yöntemlerle, maksimum etkinlik sağlanır.</p>
        
        <h4>Tedavi süreci ve sonuçlar nasıldır?</h4>
        <p>İlk seanslardan itibaren lekelerde belirgin açılma görülür. 4-6 seansta cilt yenilenir, aydınlık ve eşit tonda bir görünüm oluşur.</p>
      </div>
    `
  },
  {
    slug: 'akne-iz-tedavisi',
    title: 'Akne İz Tedavisi',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Akne izleri neden oluşur?</h4>
        <p>Sivilceler ciltte iltihaplanmaya ve doku hasarına neden olabilir. Bu hasar sonrası cilt yüzeyinde çukurlar, kabarıklıklar ve renk farklılıkları oluşur; bunlar akne izleri olarak adlandırılır.</p>
        
        <h4>Akne izleri nasıl tedavi edilir?</h4>
        <p>Akne iz tedavisi, cildin yenilenmesini hızlandırarak, kollajen üretimini artıran yöntemlerle izlerin görünümünü azaltır ve cilt dokusunu pürüzsüzleştirir.</p>
        
        <h4>Kliniğimizde hangi yöntemler tercih edilir?</h4>
        <p>Son teknoloji lazer cihazları ve mikroiğneleme (dermaroller) ile yapılan uygulamalarla, her cilt tipine uygun, kişiye özel akne iz tedavisi uygulanır.</p>
        
        <h4>Tedavi süreci nasıldır?</h4>
        <p>Genellikle 4-6 seans arası yapılan uygulamalar sonrası, cilt dokusunda belirgin iyileşme ve izlerin hafiflemesi sağlanır.</p>
        
        <h4>Neden kliniğimizi tercih etmelisiniz?</h4>
        <p>Uzman dermatologlarımız, ileri teknolojili cihazlarımız ve steril ortamımızla, doğal görünümlü, uzun süre kalıcı akne iz tedavisi sonuçları sunuyoruz.</p>
      </div>
    `
  },
  {
    slug: 'yara-iz-tedavisi',
    title: 'Yara İz Tedavisi',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Yara izleri neden oluşur?</h4>
        <p>Travma, cerrahi müdahale veya yanık sonrası ciltte oluşan kalıcı dokusal değişiklikler, yara izlerini meydana getirir. Bu izler hem estetik hem de fonksiyonel sorun yaratabilir.</p>
        
        <h4>Yara izleri nasıl tedavi edilir?</h4>
        <p>Yara iz tedavisi, ciltteki sertlikleri azaltır, izlerin rengini açar ve dokuyu yumuşatarak daha az görünür hale getirir.</p>
        
        <h4>Kliniğimizde hangi yöntemler kullanılır?</h4>
        <p>Mezoterapiler ve lazer tedavileri gibi ileri teknolojik cihazlarla, kişiye özel kombine yara izi tedavisi planları uygulanır.</p>
        
        <h4>Tedavi süreci nasıldır?</h4>
        <p>Çoğunlukla 4-8 seans gerektiren uygulamalarda, her seansta ciltte esneklik artar ve yara izlerinin görünümü azalır.</p>
        
        <h4>Kliniğimizin avantajları nelerdir?</h4>
        <p>Uzman hekimlerimiz ve yüksek teknolojili cihazlarımızla, güvenli, etkili ve doğal sonuçlar veren yara izi tedavisi sunmaktayız.</p>
      </div>
    `
  },
  {
    slug: 'medikal-cilt-bakimi-aquapeel',
    title: 'Medikal Cilt Bakımı (Aquapeel)',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Aquapeel nedir?</h4>
        <p>Medikal cilt bakımı Aquapeel, cildi derinlemesine temizleyen, peeling ve nemlendirme işlemini bir arada sunan gelişmiş bir tedavi yöntemidir.</p>
        
        <h4>Aquapeel nasıl çalışır?</h4>
        <p>Özel uçlar ve vakum sistemiyle cilt yüzeyindeki ölü hücreler nazikçe uzaklaştırılır, cilt besleyici serumlarla derinlemesine nemlendirilir ve yenilenir.</p>
        
        <h4>Aquapeel hangi cilt tipleri için uygundur?</h4>
        <p>Tüm cilt tipleri için güvenlidir. Akne, yağlı cilt, donuk ve yorgun ciltlerde belirgin iyileşme sağlar.</p>
        
        <h4>Aquapeel'in etkileri nelerdir?</h4>
        <p>Ciltte pürüzsüzlük, parlaklık ve canlılık artar; gözenekler küçülür, ince kırışıklıklar azalır.</p>
        
        <h4>Kliniğimizde Aquapeel farkı nedir?</h4>
        <p>Son teknoloji cihazlarımız ve uzman ekibimizle, kişiye özel programlar sunarak, uzun süre kalıcı ve etkili medikal cilt bakımı sağlamaktayız.</p>
      </div>
    `
  },
  {
    slug: 'iple-yuz-askilama',
    title: 'İple Yüz Askılama',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>İple yüz askılama nedir?</h4>
        <p>İple yüz askılama, ciltte sarkmaları ve gevşemeleri azaltmak için uygulanan, cildi gençleştiren minimal invaziv bir estetik yöntemdir.</p>
        
        <h4>Nasıl uygulanır?</h4>
        <p>Cilde yerleştirilen özel ipler sayesinde cilt dokusu yukarı doğru kaldırılır, aynı zamanda kolajen üretimi tetiklenir.</p>
        
        <h4>Kimler için uygundur?</h4>
        <p>Yüz, boyun ve çene hattında hafif-orta dereceli sarkması olan, cerrahi müdahaleden kaçınmak isteyen kişiler için ideal bir çözümdür.</p>
        
        <h4>İple yüz askılama ne kadar sürer?</h4>
        <p>İşlem genellikle 30-45 dakika sürer ve iyileşme süreci oldukça kısadır.</p>
        
        <h4>Kliniğimizde uygulamanın avantajları nelerdir?</h4>
        <p>Uzman doktorumuz tarafından steril koşullarda yapılan iple yüz askılama, doğal ve kalıcı sonuçlar sunar, aynı zamanda cihaz ve teknik çeşitliliğimizle hastalarımıza en uygun tedaviyi sağlar.</p>
      </div>
    `
  },
  {
    slug: 'kilcal-damar-tedavisi',
    title: 'Kılcal Damar Tedavisi',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Kılcal damarlar nedir?</h4>
        <p>Yüzde cilt yüzeyine yakın, ince ve kırmızı-mor renkte görülen damarlara kılcal damarlar denir. Estetik açıdan rahatsızlık verebilir.</p>
        
        <h4>Kılcal damarlar neden oluşur?</h4>
        <p>Genetik yatkınlık, güneşe fazla maruz kalma, hormonal değişiklikler ve yaşlanma, yüz bölgesinde kılcal damarların ortaya çıkmasına neden olur.</p>
        
        <h4>Kılcal damar tedavisi nasıl yapılır?</h4>
        <p>Kliniğimizde son teknoloji lazer ve ışık cihazları kullanılarak, ciltteki görünür kılcal damarlar etkili şekilde hedef alınır ve yok edilir.</p>
        
        <h4>Tedavi süreci nasıldır?</h4>
        <p>Genellikle 1-4 seans arası yapılan uygulamalarla, ciltte belirgin iyileşme sağlanır, damarlardaki kızarıklık ve görünürlük azalır.</p>
        
        <h4>Kliniğimizde kılcal damar tedavisinin avantajları nelerdir?</h4>
        <p>Uzman hekimlerimiz, ileri cihazlarımız ve steril ortamımız sayesinde, konforlu, kalıcı ve doğal sonuçlar sunan etkili kılcal damar tedavisi gerçekleştiriyoruz.</p>
      </div>
    `
  },
  {
    slug: 'sivi-yuz-germe',
    title: 'Sıvı Yüz Germe',
    category: 'Estetik Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Sıvı Yüz Germe Nedir?</h4>
        <p>Sıvı yüz germe, cerrahi müdahale gerektirmeden yüz hatlarını toparlayan, sarkmaları azaltan ve cildi gençleştiren modern bir estetik yöntemdir. Bu tedavi, özel formülasyonlu dolgu maddeleri ve cilt sıkılaştırıcı ajanlar kullanılarak gerçekleştirilir. Sıvı yüz germe, ameliyatsız yüz gençleştirme arayanlar için güvenli ve etkili bir alternatif sunar.</p>
        
        <h4>Sıvı Yüz Germe Nasıl Çalışır?</h4>
        <p>Sıvı yüz germe tedavisi, cildin farklı katmanlarına uygulanan özel formülasyonlarla çalışır. Bu yöntem, cildin doğal yapısını destekleyerek kolajen ve elastin üretimini artırır. Aynı zamanda, cilt altındaki hacim kayıplarını doldurarak yüz hatlarını yeniden şekillendirir ve sarkmaları azaltır.</p>
        
        <h4>Sıvı Yüz Germe Hangi Bölgelere Uygulanır?</h4>
        <p>Sıvı yüz germe tedavisi, yüzün farklı bölgelerinde uygulanabilir:</p>
        <ul>
          <li><strong>Yanaklar:</strong> Sarkma ve hacim kaybı olan yanak bölgeleri</li>
          <li><strong>Çene Hattı:</strong> Çene altı sarkması ve boyun hatları</li>
          <li><strong>Göz Altı:</strong> Göz altı çöküklüğü ve morlukları</li>
          <li><strong>Şakaklar:</strong> Şakak bölgesindeki çöküklükler</li>
          <li><strong>Burun Kenarları:</strong> Nazolabial çizgiler ve burun kenarı çöküklükleri</li>
          <li><strong>Alın:</strong> Alın çizgileri ve sarkmaları</li>
        </ul>
        
        <h4>Sıvı Yüz Germe Avantajları</h4>
        <p>Sıvı yüz germe tedavisinin birçok avantajı bulunur:</p>
        <ul>
          <li><strong>Ameliyatsız:</strong> Cerrahi müdahale gerektirmez, kesi yapılmaz</li>
          <li><strong>Hızlı Uygulama:</strong> Tedavi süresi genellikle 30-60 dakika arasındadır</li>
          <li><strong>Hızlı İyileşme:</strong> Aynı gün sosyal yaşama dönülebilir</li>
          <li><strong>Doğal Sonuçlar:</strong> Yüz ifadesini bozmadan doğal görünüm</li>
          <li><strong>Geri Dönüşümlü:</strong> Gerekirse düzeltilebilir veya geri alınabilir</li>
          <li><strong>Minimal Yan Etki:</strong> Ciddi yan etki riski düşüktür</li>
          <li><strong>Uzun Süreli Etki:</strong> 12-18 ay arası etkili sonuçlar</li>
        </ul>
        
        <h4>Sıvı Yüz Germe Tedavi Süreci</h4>
        <p>Sıvı yüz germe tedavisi, uzman dermatologlar tarafından steril koşullarda uygulanır:</p>
        
        <h5>1. Konsültasyon ve Planlama</h5>
        <p>İlk görüşmede hastanın beklentileri değerlendirilir, yüz analizi yapılır ve kişiselleştirilmiş tedavi planı hazırlanır. Hangi bölgelerin tedavi edileceği ve hangi ürünlerin kullanılacağı belirlenir.</p>
        
        <h5>2. Tedavi Uygulaması</h5>
        <p>Lokal anestezi kremi uygulandıktan sonra, özel iğneler kullanılarak dolgu maddeleri ve sıkılaştırıcı ajanlar cildin uygun katmanlarına enjekte edilir. İşlem sırasında hasta konforlu hisseder.</p>
        
        <h5>3. Tedavi Sonrası</h5>
        <p>Uygulama sonrası hafif kızarıklık ve şişlik olabilir, ancak bunlar genellikle birkaç saat içinde geçer. Aynı gün sosyal yaşama dönülebilir.</p>
        
        <h4>Kullanılan Ürünler ve Teknolojiler</h4>
        <p>Kliniğimizde sıvı yüz germe tedavisinde en kaliteli ve güvenli ürünler kullanılır:</p>
        
        <h5>Hyalüronik Asit Dolguları</h5>
        <p>FDA onaylı, yüksek saflıkta hyalüronik asit dolguları ile hacim kayıpları doldurulur ve cilt sıkılaştırılır. Bu ürünler ciltle tamamen uyumludur ve uzun süreli sonuçlar verir.</p>
        
        <h5>Cilt Sıkılaştırıcı Ajanlar</h5>
        <p>Özel formülasyonlu sıkılaştırıcı ajanlar ile cildin elastikiyeti artırılır ve sarkmalar azaltılır. Bu ajanlar, cildin doğal yenilenme sürecini destekler.</p>
        
        <h5>Kolajen Stimülatörleri</h5>
        <p>Kolajen üretimini artıran özel maddeler ile cildin yapısal bütünlüğü güçlendirilir ve uzun vadeli sonuçlar elde edilir.</p>
        
        <h4>Kimler Sıvı Yüz Germe Yaptırabilir?</h4>
        <p>Sıvı yüz germe tedavisi, aşağıdaki durumlarda uygun olan kişiler için idealdir:</p>
        <ul>
          <li>Yüzde hafif-orta dereceli sarkma yaşayanlar</li>
          <li>Hacim kaybı nedeniyle yüz hatları belirsizleşenler</li>
          <li>Göz altı çöküklüğü ve morlukları olanlar</li>
          <li>Çene hattında sarkma yaşayanlar</li>
          <li>Yanaklarda hacim kaybı olanlar</li>
          <li>Ameliyat yapmak istemeyenler</li>
          <li>Hızlı sonuç almak isteyenler</li>
        </ul>
        
        <h4>Sıvı Yüz Germe Sonuçları</h4>
        <p>Sıvı yüz germe tedavisinde sonuçlar genellikle hemen görülmeye başlar:</p>
        
        <h5>Kısa Vadeli Sonuçlar (1-2 hafta)</h5>
        <ul>
          <li>Yüz hatlarında belirgin iyileşme</li>
          <li>Hacim kayıplarının doldurulması</li>
          <li>Cilt sıkılaşması ve elastikiyet artışı</li>
          <li>Göz altı çöküklüklerinin azalması</li>
        </ul>
        
        <h5>Uzun Vadeli Sonuçlar (3-6 ay)</h5>
        <ul>
          <li>Kolajen üretiminin artması</li>
          <li>Cildin doğal yenilenmesi</li>
          <li>Daha kalıcı ve doğal görünüm</li>
          <li>Yüz konturlarının şekillenmesi</li>
        </ul>
        
        <h4>Tedavi Sonrası Bakım ve Öneriler</h4>
        <p>Sıvı yüz germe tedavisi sonrası optimal sonuçlar için dikkat edilmesi gerekenler:</p>
        
        <h5>İlk 24 Saat</h5>
        <ul>
          <li>Uygulama bölgesine soğuk kompres uygulayın</li>
          <li>Ağır makyaj yapmayın</li>
          <li>Yüzü ovuşturmayın</li>
          <li>Güneşe maruz kalmayın</li>
        </ul>
        
        <h5>İlk Hafta</h5>
        <ul>
          <li>Güneş koruyucu kullanın (SPF 50+)</li>
          <li>Sauna ve hamam gibi sıcak ortamlardan kaçının</li>
          <li>Yoğun egzersiz yapmayın</li>
          <li>Alkol tüketimini sınırlayın</li>
        </ul>
        
        <h5>Uzun Vadeli Bakım</h5>
        <ul>
          <li>Düzenli cilt bakımı yapın</li>
          <li>Güneş koruyucu kullanımını sürdürün</li>
          <li>Sağlıklı beslenme ve yaşam tarzı benimseyin</li>
          <li>Düzenli kontroller için kliniğe gelin</li>
        </ul>
        
        <h4>Neden Kliniğimizi Tercih Etmelisiniz?</h4>
        <p>Kliniğimizde sıvı yüz germe tedavisi, deneyimli dermatolog ekibimiz tarafından en güncel teknikler ve en kaliteli ürünlerle uygulanır:</p>
        <ul>
          <li><strong>Uzman Ekip:</strong> Deneyimli dermatologlar</li>
          <li><strong>Kaliteli Ürünler:</strong> FDA onaylı, güvenli ürünler</li>
          <li><strong>Kişiselleştirilmiş Yaklaşım:</strong> Her hasta için özel tedavi planı</li>
          <li><strong>Steril Ortam:</strong> Hijyenik ve güvenli uygulama</li>
          <li><strong>Düzenli Takip:</strong> Tedavi sonrası kapsamlı bakım</li>
          <li><strong>Doğal Sonuçlar:</strong> Yüz ifadesini bozmayan estetik</li>
        </ul>

        <h4>Sonuç</h4>
        <p>Sıvı yüz germe, ameliyatsız yüz gençleştirme arayanlar için modern, güvenli ve etkili bir çözümdür. Bu yöntem ile yüz hatlarınızı toparlayabilir, sarkmaları azaltabilir ve daha genç bir görünüm elde edebilirsiniz. Kliniğimizde uzman ekibimizle birlikte, size en uygun sıvı yüz germe tedavi planını hazırlayarak, doğal ve kalıcı sonuçlar elde etmenizi sağlıyoruz.</p>
      </div>
    `
  },
  {
    slug: 'veloce-bb-light',
    title: 'Veloce BB LİGHT',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>Veloce BB Lazer Nedir?</h4>
        <p>Veloce BB Lazer, cilt yenileme ve gençleştirme alanında devrim niteliğinde bir teknolojidir. Bu gelişmiş lazer sistemi, cildin derin katmanlarına kontrollü şekilde nüfuz ederek, kolajen ve elastin üretimini artırır. Özellikle rozasea (gül hastalığı) ve cilt lekelerinin tedavisinde son derece etkili sonuçlar verir. Veloce BB Lazer, cildin doğal iyileşme mekanizmasını harekete geçirerek, daha parlak, sıkı ve sağlıklı bir görünüm sağlar.</p>
        
        <h4>Veloce BB Lazer Teknolojisi</h4>
        <p>Bu lazer sistemi, özel olarak geliştirilmiş dalga boyu teknolojisi kullanarak cildin farklı katmanlarını hedefler. Lazer ışınları, ciltteki melanin pigmentlerini, genişlemiş damarları ve hasarlı dokuları seçici olarak hedef alır. Bu sayede sağlıklı cilt dokusuna zarar vermeden, problemli alanları etkili şekilde tedavi eder. Veloce BB Lazer, hem yüzeysel hem de derin cilt problemlerinde kullanılabilen çok yönlü bir tedavi seçeneğidir.</p>
        
        <h4>Rozasea (Gül Hastalığı) Tedavisinde Veloce BB Lazer</h4>
        <p>Rozasea tedavisinde Veloce BB Lazer özellikle etkili bir yöntemdir. Bu lazer sistemi, rozaseanın temel belirtileri olan kızarıklık, damar genişlemeleri ve inflamasyonu hedef alır. Lazer ışınları, genişlemiş kılcal damarları seçici olarak kapatarak kızarıklığı azaltır ve cilt tonunu dengeler.</p>
        
        <p>Rozasea tedavisinde Veloce BB Lazer'in avantajları:</p>
        <ul>
          <li>Genişlemiş kılcal damarları etkili şekilde kapatır</li>
          <li>Yüz kızarıklığını azaltır</li>
          <li>İnflamasyonu ve yanma hissini hafifletir</li>
          <li>Cilt tonunu eşitler</li>
          <li>Rozasea ataklarının sıklığını azaltır</li>
          <li>Uzun süreli sonuçlar sağlar</li>
        </ul>
        
        <h4>Leke Tedavisinde Veloce BB Lazer</h4>
        <p>Veloce BB Lazer, cilt lekelerinin tedavisinde de son derece etkili bir yöntemdir. Bu lazer sistemi, güneş lekeleri, yaşlılık lekeleri, melazma ve akne sonrası oluşan lekeleri başarıyla tedavi eder. Lazer ışınları, ciltteki melanin pigmentlerini hedef alarak lekeleri parçalar ve vücudun doğal yollarla bu parçaları atmasını sağlar.</p>
        
        <p>Leke tedavisinde Veloce BB Lazer'in özellikleri:</p>
        <ul>
          <li>Güneş ve yaşlılık lekelerini etkili şekilde açar</li>
          <li>Melazma tedavisinde güvenli sonuçlar verir</li>
          <li>Akne sonrası oluşan lekeleri azaltır</li>
          <li>Cilt tonunu eşitler ve parlaklık sağlar</li>
          <li>Leke tekrarını önler</li>
          <li>Farklı cilt tiplerinde güvenle kullanılabilir</li>
        </ul>
        
        <h4>Veloce BB Lazer'in Diğer Kullanım Alanları</h4>
        <p>Veloce BB Lazer, sadece rozasea ve leke tedavisinde değil, genel cilt yenileme ve gençleştirme alanlarında da kullanılır:</p>
        <ul>
          <li>İnce çizgiler ve kırışıklıkların azaltılması</li>
          <li>Gözeneklerin küçültülmesi</li>
          <li>Cilt sıkılaştırma ve elastikiyet artırma</li>
          <li>Donuk ve yorgun cilt görünümünün iyileştirilmesi</li>
          <li>Cilt dokusunun yenilenmesi</li>
          <li>Genel cilt kalitesinin artırılması</li>
        </ul>
        
        <h4>Veloce BB Lazer Tedavi Süreci</h4>
        <p>Veloce BB Lazer tedavisi, kişiselleştirilmiş bir yaklaşımla uygulanır. Tedavi öncesi cilt analizi yapılarak, hastanın cilt tipi ve problemlerine göre uygun parametreler belirlenir. Tedavi süresi genellikle 15-30 dakika arasında değişir ve ağrısızdır. Bazı durumlarda hafif bir sıcaklık hissi olabilir, ancak bu tolere edilebilir düzeydedir.</p>
        
        <h4>Tedavi Seansları ve Sonuçlar</h4>
        <p>Veloce BB Lazer tedavisinde genellikle 3 seans önerilir. Seanslar arasında 3-4 hafta beklenir. İlk seanslardan itibaren ciltte parlaklık ve canlılık artışı görülür. Rozasea tedavisinde kızarıklık azalması, leke tedavisinde ise lekelerde açılma belirgin şekilde fark edilir. Tam sonuçlar için tüm seansların tamamlanması önerilir.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Veloce BB Lazer tedavisi sonrası cildin korunması çok önemlidir. Güneş koruyucu kullanımı (en az SPF 50) şarttır. Tedavi sonrası ilk 24-48 saat boyunca ağır makyaj yapılmamalı, cildi tahriş edecek ürünlerden kaçınılmalıdır. Nemlendirici kullanımı ve bol su içimi tedavi sonuçlarının kalıcılığını artırır.</p>
        
        <h4>Veloce BB Lazer'in Güvenliği</h4>
        <p>Veloce BB Lazer, FDA onaylı ve klinik olarak test edilmiş güvenli bir teknolojidir. Uzman dermatologlar tarafından uygulandığında yan etki riski minimaldir. Tedavi sonrası hafif kızarıklık ve şişlik görülebilir, ancak bunlar genellikle birkaç saat içinde geçer. Cilt tipine göre özel parametreler kullanılarak güvenlik maksimum seviyede tutulur.</p>
        
        <h4>Neden Veloce BB Lazer Tercih Edilmeli?</h4>
        <p>Veloce BB Lazer, rozasea ve leke tedavisinde kanıtlanmış etkinliği ile öne çıkar. Bu lazer sistemi:</p>
        <ul>
          <li>Hem rozasea hem de leke tedavisinde etkili sonuçlar verir</li>
          <li>Ağrısız ve konforlu tedavi sağlar</li>
          <li>Kısa iyileşme süresi sunar</li>
          <li>Uzun süreli sonuçlar verir</li>
          <li>Farklı cilt tiplerinde güvenle kullanılabilir</li>
          <li>Kombine tedavi protokollerinde etkili şekilde kullanılabilir</li>
        </ul>
        
        <h4>Kliniğimizde Veloce BB Lazer Uygulaması</h4>
        <p>Kliniğimizde Veloce BB Lazer tedavisi, deneyimli dermatolog ekibimiz tarafından, en güncel teknoloji ile uygulanır. Her hasta için kişiselleştirilmiş tedavi planı hazırlanır ve tedavi sonuçları düzenli olarak takip edilir. Rozasea ve leke tedavisinde özellikle uzmanlaşmış ekibimiz, en iyi sonuçları almak için gerekli tüm önlemleri alır.</p>
      </div>
    `
  },
  {
    slug: 'fraksiyonel-karbondioksit-co2-lazer',
    title: 'Fraksiyonel Karbondioksit (CO2) Lazer',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>Fraksiyonel Karbondioksit Lazer Nedir?</h4>
        <p>Fraksiyonel Karbondioksit Lazer, cildin en derin katmanlarına ulaşabilen, yenileme ve iyileştirme sürecini hızlandıran güçlü bir lazer tedavisidir. Cilt dokusundaki hasarlı bölgeleri hedef alır ve yeni, sağlıklı hücrelerin oluşumunu teşvik eder. Bu sayede cilt daha genç, pürüzsüz ve sağlıklı bir görünüme kavuşur.</p>
        
        <h4>Nasıl Etki Eder?</h4>
        <p>Lazer ışınları ciltte kontrollü mikrokanallar açarak kolajen ve elastin üretimini tetikler. Bu mekanizma cilt yenilenmesini hızlandırır ve yara izleri, akne izleri gibi problemlerde cilt yüzeyini düzeltir. Ciltte sıkılaşma ve ton eşitliği sağlar.</p>
        
        <h4>Hangi Durumlarda Uygulanır?</h4>
        <p>Derin kırışıklıklar, sarkmalar, akne ve yara izlerinin tedavisinde kullanılır. Ayrıca ciltteki derin lekeler ve geniş gözeneklerin küçültülmesinde de etkili bir yöntemdir.</p>
        
        <h4>Hangi Bölgelere Uygulanır?</h4>
        <p>Başta yüz olmak üzere boyun, dekolte ve eller gibi yaşlanma belirtilerinin görüldüğü bölgelerde uygulanabilir. Bölgesel cilt yenileme için tercih edilir.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Tedavi sonrası ciltte kabuklanma ve kızarıklık olabilir, nemlendirici kullanımı çok önemlidir. Güneşten korunmak gerekir ve ağır makyaj yapılmamalıdır. İyileşme süreci genellikle 7-10 gün sürer.</p>
        
        <h4>Endikasyonları:</h4>
        <ul>
          <li>Derin kırışıklıklar</li>
          <li>Akne ve yara izleri</li>
          <li>Cilt sarkması</li>
          <li>Geniş gözenekler</li>
          <li>Derin cilt lekeleri</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'secret-altin-igne-fraksiyonel-radyofrekans',
    title: 'Secret Altın İğne (Fraksiyonel Radyo Frekans)',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>Secret Altın İğne Nedir?</h4>
        <p>Secret Altın İğne, cilt yenileme ve sıkılaştırmada öncü bir teknolojidir. Mikro iğneler ve radyo frekans enerjisi kombinasyonu ile cildin kendi iyileşme sürecini başlatarak kolajen ve elastin üretimini artırır. Ciltte hem yüzeysel hem de derin etkiler yaratır, böylece daha genç ve sağlıklı bir görünüm sağlar.</p>
        
        <h4>Nasıl Etki Eder?</h4>
        <p>Mikro iğneler cilde kontrollü hasar vererek, radyo frekans enerjisi ile cilt altına ısı verir. Bu ısı, kolajen üretimini tetikler ve cilt sıkılaşır. Hem cilt dokusu yenilenir hem de kırışıklıklar azalır. İz bırakmadan, doğal cilt yenilenmesini sağlar.</p>
        
        <h4>Hangi Durumlarda Uygulanır?</h4>
        <p>İnce ve derin kırışıklıklar, cilt sarkmaları, akne izleri, geniş gözenekler ve cilt tonu düzensizliklerinde kullanılır. Ayrıca ciltteki elastikiyet kaybını giderir.</p>
        
        <h4>Hangi Bölgelere Uygulanır?</h4>
        <p>Yüz, boyun, dekolte ve eller gibi sıkılaşma ve yenileme gereken tüm bölgelere uygulanabilir. Özellikle göz çevresi ve alın bölgesinde sıkça tercih edilir.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Hafif kızarıklık ve hassasiyet olabilir. Nemlendirici kullanımı şarttır, güneş koruyucu ile cilt korunmalıdır. Ağır makyaj ve cilt peelingi uygulamalarından tedavi sonrası bir süre kaçınılmalıdır.</p>
        
        <h4>Endikasyonları:</h4>
        <ul>
          <li>İnce ve derin kırışıklıklar</li>
          <li>Cilt sarkması</li>
          <li>Akne izleri</li>
          <li>Geniş gözenekler</li>
          <li>Cilt tonu düzensizlikleri</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'aqua-peel-medikal-cilt-bakimi',
    title: 'Aqua-Peel Medikal Cilt Bakımı',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>Aqua-Peel Nedir?</h4>
        <p>Aqua-Peel, cildi derinlemesine temizleyen, ölü deri hücrelerini nazikçe soyan ve cilt yüzeyini yenileyen modern bir medikal cilt bakımıdır. Ciltteki tıkanmış gözenekleri açarak, daha parlak, sağlıklı ve pürüzsüz bir görünüm sağlar. Aynı zamanda ciltteki yağ dengesini düzenleyerek akne oluşumunu önlemeye yardımcı olur.</p>
        
        <h4>Nasıl Etki Eder?</h4>
        <p>Cilt yüzeyindeki kir, sebum ve ölü hücreleri özel bir vakum sistemi ile temizler. Aynı zamanda peeling etkisiyle cildin yenilenmesini destekler. İçerdiği aktif maddelerle cilt tonunu eşitler ve nemlendirme sağlar. Ağrısız ve acısızdır, hemen günlük yaşama dönülebilir.</p>
        
        <h4>Hangi Durumlarda Uygulanır?</h4>
        <p>Akneye yatkın, yağlı ve karma ciltlerde, siyah nokta problemi yaşayanlarda, donuk ve mat cilt görünümünde, cilt tonunun eşitlenmesinde tercih edilir. Ciltteki hafif lekelerin görünümünü azaltır ve gözenekleri sıkılaştırır.</p>
        
        <h4>Hangi Bölgelere Uygulanır?</h4>
        <p>Yüz bölgesi başta olmak üzere boyun ve dekolte bölgesinde de uygulanabilir. Hassas bölgelerde nazik bir bakım sağlar.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Tedavi sonrası ciltte hafif kızarıklık olabilir, fakat kısa sürede geçer. Nemlendirici kullanımı ve güneş koruyucu sürmek önemlidir. Cilt bariyerini korumak için aşırı peeling ve agresif ürünlerden uzak durulmalıdır.</p>
        
        <h4>Endikasyonları:</h4>
        <ul>
          <li>Akne ve siyah noktalar</li>
          <li>Yağlı ve karma cilt</li>
          <li>Donuk, mat cilt görünümü</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'piko-saniye-lazer',
    title: 'Piko Saniye Lazer',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>Piko Saniye Lazer Nedir?</h4>
        <p>Piko Saniye Lazer, ciltteki lekeler, dövmeler ve renk düzensizliklerini hızlı ve etkili bir şekilde tedavi eden gelişmiş bir lazer teknolojisidir. Çok kısa atım süresi sayesinde ciltteki hedef bölgeyi minimum zarar ile yok ederken, çevre dokular korunur. Bu sayede daha hızlı iyileşme ve daha başarılı sonuçlar elde edilir.</p>
        
        <h4>Nasıl Etki Eder?</h4>
        <p>Lazer enerjisi, ciltteki renk pigmentlerini çok kısa patlamalarla parçalar. Bu parçalanan pigmentler vücut tarafından doğal yollarla atılır. Bu süreç, ciltteki lekelerin ve istenmeyen dövme renklerinin kaybolmasını sağlar. Ayrıca cilt tonunu eşitleyerek daha homojen bir görünüm sunar.</p>
        
        <h4>Hangi Durumlarda Uygulanır?</h4>
        <p>Ciltteki güneş lekeleri, yaşlılık lekeleri, çil, doğum lekeleri ve istenmeyen dövme renklerinin silinmesinde kullanılır. Ayrıca ciltteki pigmentasyon bozuklukları ve melazma tedavisinde de etkili bir yöntemdir.</p>
        
        <h4>Hangi Bölgelere Uygulanır?</h4>
        <p>Yüz, boyun, eller ve vücudun diğer lekeli bölgelerinde uygulanabilir. Dövme tedavisinde ise dövmenin bulunduğu tüm vücut bölgelerine uygulanır.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Uygulama sonrası hafif kabuklanma ve kızarıklık olabilir. Güneşten korunmak şarttır, yara bakım kremleri önerilir. Ağır makyaj ve sürtünme yaratacak hareketlerden kaçınılmalıdır. Genellikle 2-4 seans arasında tedavi önerilir.</p>
        
        <h4>Endikasyonları:</h4>
        <ul>
          <li>Güneş ve yaşlılık lekeleri</li>
          <li>Çil ve doğum lekeleri</li>
          <li>Melazma</li>
          <li>İstenmeyen dövme renkleri</li>
          <li>Pigmentasyon bozuklukları</li>
          <li>Tüy sarartma</li>
          <li>Kılcal damar görünümü</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'hifu-ameliyatsiz-yuz-germe',
    title: 'HI-FU (Ameliyatsız Yüz Germe)',
    category: 'Lazer Tedavileri',
    content: `
      <div class="service-content-detail">
        <h4>HI-FU Nedir?</h4>
        <p>HI-FU, ciltte derinlemesine ısı enerjisi oluşturarak kollajen ve elastin üretimini uyaran, ameliyatsız yüz germe ve cilt sıkılaştırma yöntemidir. Cerrahi işlemlere alternatif olarak tercih edilir ve doğal cilt yenilenmesini destekler.</p>
        
        <h4>Nasıl Etki Eder?</h4>
        <p>Ultrason enerjisi, cildin derin katmanlarında mikro hasarlar oluşturarak vücudun doğal iyileşme mekanizmasını harekete geçirir. Bu süreçte yeni kollajen lifleri üretilir, cilt sıkılaşır ve yüz hatları belirginleşir.</p>
        
        <h4>Hangi Durumlarda Uygulanır?</h4>
        <p>Yüz, boyun ve çene bölgesindeki sarkmalar, cilt gevşekliği ve hafif kırışıklıklarda kullanılır. Yüz konturunu toparlamak isteyenler için idealdir.</p>
        
        <h4>Hangi Bölgelere Uygulanır?</h4>
        <p>Yüz, boyun, çene hattı ve dekolte bölgesinde uygulanabilir. Özellikle çene altı bölgesinde sıkılaştırma için sık tercih edilir.</p>
        
        <h4>Tedavi Sonrası Bakım</h4>
        <p>Tedavi sonrası hafif kızarıklık veya şişlik görülebilir ancak genellikle kısa sürede geçer. Yoğun güneş maruziyetinden kaçınılmalı, nemlendirici ve güneş koruyucu kullanılmalıdır.</p>
        
        <h4>Kullanım Alanları:</h4>
        <ul>
          <li>Yüz ve boyun sarkmaları</li>
          <li>Cilt sıkılaştırma</li>
          <li>Yüz konturu belirginleştirme</li>
          <li>Hafif kırışıklıklar</li>
        </ul>
      </div>
    `
  }
])

const currentService = computed(() => {
  const slug = route.params.slug
  return services.value.find(service => service.slug === slug)
})

const relatedServices = computed(() => {
  if (!currentService.value) return []
  
  return services.value
    .filter(service => 
      service.slug !== currentService.value.slug && 
      service.category === currentService.value.category
    )
    .slice(0, 3)
})

onMounted(() => {
  if (currentService.value) {
    useHead({
      title: `${currentService.value.title} - Doç. Dr. Mehmet Ünal`,
      meta: [
        {
          name: 'description',
          content: currentService.value.title
        }
      ]
    })
  }
})
</script>

<style lang="scss" scoped>
.service-detail-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%);
  min-height: 100vh;
  color: #ffffff;
  padding-top: 120px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;

  // Blog Header
  .blog-header {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    padding: 2rem 0;
    position: relative;
    backdrop-filter: blur(10px);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;

      .breadcrumb-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        transition: all 0.3s ease;
        padding: 0.3rem 0.6rem;
        border-radius: 6px;

        &:hover {
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
        }

        i {
          font-size: 0.8rem;
        }
      }

      .separator {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.7rem;
      }

      .current-page {
        color: #D4AF37;
        font-weight: 600;
        padding: 0.3rem 0.8rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 6px;
        border: 1px solid rgba(212, 175, 55, 0.2);
      }
    }

    .service-meta {
      display: flex;
      gap: 1rem;
      align-items: center;

      @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.8rem;
      }

      .category-badge, .reading-time {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 8px;
        font-size: 0.85rem;
        color: #D4AF37;

        i {
          font-size: 0.8rem;
        }
      }
    }
  }

  // Blog Main Content
  .blog-main {
    padding: 3rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 10% 90%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.02) 0%, transparent 50%);
      z-index: 0;
    }

    .blog-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 3rem;
      position: relative;
      z-index: 1;

      @media (max-width: 1200px) {
        grid-template-columns: 1fr 300px;
        gap: 2rem;
      }

      @media (max-width: 991px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    // Blog Content
    .blog-content {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
      border-radius: 20px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      overflow: hidden;
      backdrop-filter: blur(10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);

      .content-header {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
        padding: 3rem;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        text-align: center;

        .blog-title {
          font-size: 3rem;
          font-weight: 800;
          color: #D4AF37;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          background: linear-gradient(135deg, #D4AF37, #F4D03F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          @media (max-width: 768px) {
            font-size: 2.2rem;
          }
        }

        .content-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;

          @media (max-width: 768px) {
            gap: 1rem;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.5rem;
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 10px;
            color: #D4AF37;
            font-size: 0.9rem;
            font-weight: 500;

            i {
              font-size: 1rem;
            }
          }
        }
      }

      .content-body {
        padding: 3rem;

        .service-intro {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.03) 100%);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 15px;
          margin-bottom: 3rem;

          @media (max-width: 768px) {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
          }

          .intro-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #D4AF37, #F4D03F);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            i {
              font-size: 1.5rem;
              color: #111111;
            }
          }

          .intro-text {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.7;
            margin: 0;
          }
        }

        .service-content {
          .service-content-detail {
            h4 {
              color: #D4AF37;
              font-size: 1.6rem;
              font-weight: 700;
              margin: 2.5rem 0 1.5rem;
              padding-bottom: 0.8rem;
              border-bottom: 2px solid rgba(212, 175, 55, 0.3);
              position: relative;

              &:first-child {
                margin-top: 0;
              }

              &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #D4AF37, #F4D03F);
                transition: width 0.3s ease;
              }

              &:hover::after {
                width: 100%;
              }
            }

            p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 1.1rem;
              line-height: 1.8;
              margin-bottom: 1.5rem;
            }

            ul {
              color: rgba(255, 255, 255, 0.9);
              font-size: 1.1rem;
              line-height: 1.8;
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;

              li {
                margin-bottom: 0.8rem;
                position: relative;
                padding-left: 1rem;

                &::before {
                  content: '•';
                  color: #D4AF37;
                  font-weight: bold;
                  position: absolute;
                  left: -1rem;
                  top: 0;
                }
              }
            }
          }
        }
      }
    }



    .contact-cta {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.06) 50%, rgba(212, 175, 55, 0.12) 100%);
      color: #D4AF37;
      padding: 5rem 0;
      text-align: center;
      border-radius: 25px;
      border: 2px solid rgba(212, 175, 55, 0.25);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);

      .cta-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;

        .cta-pattern {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: patternFloat 20s linear infinite;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: glowPulse 4s ease-in-out infinite;
        }
      }

      .cta-content {
        position: relative;
        z-index: 2;

        .cta-icon {
          margin-bottom: 2rem;
          
          i {
            font-size: 4rem;
            color: #D4AF37;
            background: linear-gradient(135deg, #D4AF37, #F4D03F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
          }
        }

        h3 {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #D4AF37;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
          background: linear-gradient(135deg, #D4AF37, #F4D03F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        p {
          font-size: 1.4rem;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          font-weight: 400;
          line-height: 1.6;
        }

        .cta-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;

          .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1.5rem;
            background: rgba(212, 175, 55, 0.08);
            border-radius: 15px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.3s ease;
            min-width: 140px;

            &:hover {
              background: rgba(212, 175, 55, 0.15);
              border-color: rgba(212, 175, 55, 0.4);
              transform: translateY(-5px);
              box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
            }

            i {
              font-size: 1.8rem;
              color: #D4AF37;
              margin-bottom: 0.5rem;
            }

            span {
              font-size: 0.9rem;
              color: rgba(255, 255, 255, 0.9);
              font-weight: 500;
              text-align: center;
            }
          }
        }

        .cta-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;

          .btn {
            padding: 1.2rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 15px;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 180px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
            letter-spacing: 0.6px;

            i {
              font-size: 1.2rem;
            }

            &.btn-primary {
              background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
              color: #111111;
              border: 2px solid #D4AF37;

              &:hover {
                background: transparent;
                color: #D4AF37;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
                border-color: #D4AF37;
              }
            }

            &.btn-outline {
              background: transparent;
              color: #D4AF37;
              border: 2px solid #D4AF37;

              &:hover {
                background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
                color: #111111;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
                border-color: #D4AF37;
              }
            }
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 991px) {
  .service-detail-page {
    .blog-main {
      padding: 2rem 0;

      .blog-layout {
        gap: 2rem;
      }
    }

    .blog-content {
      .content-header {
        padding: 2rem;

        .blog-title {
          font-size: 2.5rem;
        }

        .content-meta {
          gap: 1.5rem;

          .meta-item {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }
      }

      .content-body {
        padding: 2rem;

        .service-intro {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .service-content {
          .service-content-detail {
            h4 {
              font-size: 1.4rem;
              margin: 2rem 0 1.2rem;
            }
          }
        }
      }
    }

    .blog-sidebar {
      .sidebar-card {
        .card-header {
          padding: 1.2rem;

          h3 {
            font-size: 1.2rem;
          }
        }

        .card-content {
          padding: 1.2rem;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .service-detail-page {
    padding-top: 100px;

    .blog-header {
      padding: 1.5rem 0;

      .header-content {
        .breadcrumb {
          font-size: 0.8rem;
        }

        .service-meta {
          .category-badge, .reading-time {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      }
    }

    .blog-main {
      padding: 1.5rem 0;

      .blog-layout {
        gap: 1.5rem;
      }
    }

      .contact-cta {
        padding: 2.5rem 0;

        .cta-content {
          .cta-icon i {
            font-size: 2.5rem;
          }

          h3 {
            font-size: 2rem;
          }

          p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .cta-stats {
            gap: 1.5rem;
            margin-bottom: 2rem;

            .stat-item {
              min-width: 100px;
              padding: 1rem;

              i {
                font-size: 1.3rem;
              }

              span {
                font-size: 0.75rem;
              }
            }
          }

          .cta-buttons {
            .btn {
              padding: 1rem 2rem;
              font-size: 1rem;
              min-width: 160px;
            }
          }
        }
      }
    }
  }

  // Blog Sidebar
  .blog-sidebar {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .sidebar-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 15px;
      overflow: hidden;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(212, 175, 55, 0.15);
        border-color: rgba(212, 175, 55, 0.4);
      }

      .card-header {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%);
        padding: 1.5rem;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;

        i {
          font-size: 1.2rem;
          color: #D4AF37;
        }

        h3 {
          color: #D4AF37;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }
      }

      .card-content {
        padding: 1.5rem;

        p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
      }
    }

    // Contact Card
    .contact-card {
      .contact-stats {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem;
          background: rgba(212, 175, 55, 0.08);
          border-radius: 8px;
          border: 1px solid rgba(212, 175, 55, 0.2);

          i {
            font-size: 1rem;
            color: #D4AF37;
          }

          span {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
          }
        }
      }

      .contact-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .btn {
          padding: 1rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;

          &.btn-full {
            width: 100%;
          }

          &.btn-primary {
            background: linear-gradient(135deg, #D4AF37, #B8941F);
            color: #111111;
            border: 2px solid #D4AF37;

            &:hover {
              background: transparent;
              color: #D4AF37;
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
            }
          }

          &.btn-outline {
            background: transparent;
            color: #D4AF37;
              border: 2px solid #D4AF37;

            &:hover {
              background: linear-gradient(135deg, #D4AF37, #B8941F);
              color: #111111;
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
            }
          }
        }
      }
    }

    // Related Services
    .related-services {
      .related-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .related-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(212, 175, 55, 0.1);
            border-color: rgba(212, 175, 55, 0.3);
            transform: translateX(5px);
          }

          .related-icon {
            width: 35px;
            height: 35px;
            background: linear-gradient(135deg, #D4AF37, #F4D03F);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            i {
              font-size: 0.9rem;
              color: #111111;
            }
          }

          .related-content {
            flex: 1;

            h4 {
              color: #ffffff;
              font-size: 0.95rem;
              font-weight: 600;
              margin: 0 0 0.3rem 0;
              line-height: 1.3;
            }

            .related-category {
              color: #D4AF37;
              font-size: 0.8rem;
              font-weight: 500;
            }
          }
        }
      }
    }

    // Contact Info
    .contact-info {
      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(212, 175, 55, 0.1);

        &:last-child {
          border-bottom: none;
        }

        i {
          font-size: 1rem;
          color: #D4AF37;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        div {
          flex: 1;

          strong {
            color: #D4AF37;
            font-size: 0.9rem;
            font-weight: 600;
            display: block;
            margin-bottom: 0.3rem;
          }

          span {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  // Service Not Found
  .service-not-found {
    text-align: center;
    padding: 4rem 2rem;

    .not-found-content {
      .not-found-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
        border-radius: 50%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
        border: 2px solid rgba(212, 175, 55, 0.3);

        i {
          font-size: 2rem;
          color: #D4AF37;
        }
      }

      h2 {
        color: #D4AF37;
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }

      .not-found-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;

        .btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;

          &.btn-primary {
            background: linear-gradient(135deg, #D4AF37, #B8941F);
            color: #111111;
            border: 2px solid #D4AF37;

            &:hover {
              background: transparent;
              color: #D4AF37;
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
            }
          }

          &.btn-outline {
            background: transparent;
            color: #D4AF37;
            border: 2px solid #D4AF37;

            &:hover {
              background: linear-gradient(135deg, #D4AF37, #B8941F);
              color: #111111;
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
            }
          }
        }
      }
    }
  }

  // Mobile Responsive
  @media (max-width: 768px) {
    .service-detail-page {
      padding-top: 100px;

    .blog-header {
      padding: 1.5rem 0;

      .header-content {
        .breadcrumb {
          font-size: 0.8rem;
        }

        .service-meta {
          .category-badge, .reading-time {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      }
    }

    .blog-main {
      padding: 1.5rem 0;

      .blog-layout {
        gap: 1.5rem;
      }
    }

    .blog-content {
      .content-header {
        padding: 1.5rem;

        .blog-title {
          font-size: 2rem;
        }

        .content-meta {
          gap: 1rem;

          .meta-item {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      }

      .content-body {
        padding: 1.5rem;

        .service-intro {
          padding: 1rem;
          margin-bottom: 1.5rem;

          .intro-icon {
            width: 50px;
            height: 50px;

            i {
              font-size: 1.2rem;
            }
          }

          .intro-text {
            font-size: 1rem;
          }
        }

        .service-content {
          .service-content-detail {
            h4 {
              font-size: 1.3rem;
              margin: 1.5rem 0 1rem;
            }

            p, ul {
              font-size: 1rem;
            }
          }
        }
      }
    }

    .blog-sidebar {
      gap: 1.5rem;

      .sidebar-card {
        .card-header {
          padding: 1rem;

          h3 {
            font-size: 1.1rem;
          }
        }

        .card-content {
          padding: 1rem;
        }
      }

      .contact-card {
        .contact-stats {
          .stat-item {
            padding: 0.6rem;

            span {
              font-size: 0.8rem;
            }
          }
        }

        .contact-actions {
          .btn {
            padding: 0.8rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      }

      .related-services {
        .related-list {
          .related-item {
            padding: 0.8rem;

            .related-icon {
              width: 30px;
              height: 30px;

              i {
                font-size: 0.8rem;
              }
            }

            .related-content {
              h4 {
                font-size: 0.9rem;
              }

              .related-category {
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }

    .service-not-found {
      padding: 2rem 1rem;

      .not-found-content {
        .not-found-icon {
          width: 60px;
          height: 60px;

          i {
            font-size: 1.5rem;
          }
        }

        h2 {
          font-size: 1.5rem;
        }

        p {
          font-size: 1rem;
        }

        .not-found-actions {
          gap: 0.8rem;

          .btn {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

@keyframes patternFloat {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style> 