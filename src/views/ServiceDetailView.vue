<template>
  <div class="service-detail-page">
    <!-- Blog Style Header -->
    <header class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>Ana Sayfa</span>
            </router-link>
            <i class="fas fa-chevron-right separator"></i>
            <span class="current-page">{{ currentService?.category || 'Hizmet' }}</span>
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
                  <span>Uzman Dermatolog</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Güncel</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-eye"></i>
                  <span>Profesyonel Tedavi</span>
                </div>
              </div>
            </header>

            <div class="content-body" v-if="currentService">
              <div class="service-intro">
                <div class="intro-icon">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <p class="intro-text">
                  Bu sayfada {{ currentService.title.toLowerCase() }} hakkında detaylı bilgi bulabilir, tedavi süreçlerini öğrenebilir ve uzman ekibimizle iletişime geçebilirsiniz.
                </p>
              </div>

              <div class="service-content" v-html="currentService.content"></div>
            </div>
            
            <div v-else class="service-not-found">
              <div class="not-found-content">
                <div class="not-found-icon">
                  <i class="fas fa-search"></i>
                </div>
                <h2>Hizmet Bulunamadı</h2>
                <p>Aradığınız hizmet bulunamadı. Lütfen ana sayfaya dönün veya farklı bir hizmet seçin.</p>
                <div class="not-found-actions">
                  <router-link to="/" class="btn btn-primary">
                    <i class="fas fa-home me-2"></i>
                    Ana Sayfaya Dön
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
                <h3>Hızlı Randevu</h3>
              </div>
              <div class="card-content">
                <p>Uzman dermatologlarımızla görüşmek için hemen randevu alın</p>
                <div class="contact-stats">
                  <div class="stat-item">
                    <i class="fas fa-clock"></i>
                    <span>Hızlı Yanıt</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-user-md"></i>
                    <span>Uzman Kadro</span>
                  </div>
                  <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span>Güvenilir Hizmet</span>
                  </div>
                </div>
                <div class="contact-actions">
                  <a href="https://wa.me/905465297677" class="btn btn-primary btn-full">
                    <i class="fas fa-calendar-alt me-2"></i>
                    Randevu Alın
                  </a>
                  <a href="tel:+905465297677" class="btn btn-outline btn-full">
                    <i class="fas fa-phone me-2"></i>
                    Hemen Ara
                  </a>
                </div>
              </div>
            </div>

            <!-- Related Services -->
            <div class="sidebar-card related-services" v-if="currentService">
              <div class="card-header">
                <i class="fas fa-link"></i>
                <h3>İlgili Hizmetler</h3>
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
                <h3>İletişim Bilgileri</h3>
              </div>
              <div class="card-content">
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Adres</strong>
                    <span> Ateşbaz Veli Mahallesi, Yeni Meram Cd. No:83 D:4, 42090 Meram / Konya</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-phone"></i>
                  <div>
                    <strong>Telefon</strong>
                    <span>+90 546 529 76 77</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <div>
                    <strong>E-posta</strong>
                    <span>dr.munal1101@gmail.com</span>
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <strong>Çalışma Saatleri</strong>
                    <span>Pazartesi - Cumartesi: 09:00 - 21:00</span>
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
        <h4>Rosacea Nedir?</h4>
        <p>Rosacea, genellikle yüzün merkezinde kızarıklık, damar genişlemeleri ve iltihaplı lezyonlarla kendini gösteren kronik bir cilt hastalığıdır. Erken evrelerde yanma, batma ve kızarıklık görülürken, ilerleyen evrelerde kızarıklık zamanla kalıcı hale gelir ve kişinin sosyal hayatını olumsuz etkileyebilir.</p>
        
        <h4>Rosacea İçin Lazer Destekli Çözümler</h4>
        <p>Rosacea tedavisinde kliniğimizde hem topikal ilaçlar hem de lazer tedavileri uygulanmaktadır. Özellikle damar lazeri ile genişlemiş kılcal damarlar hedeflenerek kızarıklık azaltılır ve cilt tonu dengelenir. Lazer ışığı, ciltteki inflamasyonu azaltır ve daha sağlıklı bir görünüm kazandırır.</p>
        
        <h4>Rosacea'da Uzman Yaklaşım</h4>
        <p>Kliniğimizde dermatoloji uzmanımız eşliğinde rosacea şikayetlerinizi değerlendiriyor, lazer sistemleri dahil olmak üzere kombine tedavi yöntemleri sunuyoruz. Bu sayede daha hızlı ve kalıcı sonuçlar elde ediyoruz.</p>
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
        <h4>Siğil Nedir?</h4>
        <p>Siğiller, Human Papilloma Virüsü (HPV) kaynaklı, cilt yüzeyinde kabarık ve pütürlü yapılar olarak oluşan bulaşıcı cilt lezyonlarıdır. El, ayak tabanı, yüz ve genital bölgede sıkça görülür. Estetik kaygıya neden olabilir ve bulaşma riski taşır.</p>
        
        <h4>Lazerle Siğil Tedavisi</h4>
        <p>Kliniğimizde siğiller için modern ve etkili yöntem olan lazer tedavisi uygulanmaktadır. Lazer, siğilin köküne inerek sağlıklı dokulara zarar vermeden bu oluşumları yok eder. Bu yöntem, cerrahiye göre daha az iz bırakır ve iyileşme süreci oldukça kısadır.</p>
        
        <h4>Gelişmiş Cihazlarla Güvenli Müdahale</h4>
        <p>Lokal anestezi altında yapılan işlem genellikle tek seansta sonuç verir. Karbondioksit lazer cihazlarımız ile uygulama ağrısızdır. Aynı gün sosyal yaşama dönüş mümkündür.</p>
        
        <h4>Steril Ortam, Uzman Ekip</h4>
        <p>Kliniğimizdeki steril koşullar ve deneyimli dermatoloji ekibimizle, lazerle siğil tedavisi etkili, hızlı ve güvenlidir. Gerekli durumlarda takip seansları planlanarak kalıcı çözüm sağlanır.</p>
      </div>
    `
  },
  {
    slug: 'tirnak-hastaliklari-ve-tedavisi',
    title: 'Tırnak Hastalıkları ve Tedavisi',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Tırnak Hastalıkları Nelerdir?</h4>
        <p>Tırnak hastalıkları, mantar enfeksiyonları, tırnak batması, tırnak mantarı gibi çeşitli durumları içerir. Bu hastalıklar, genellikle tırnaklarda renk değişiklikleri, şekil bozuklukları ve ağrı ile kendini gösterir.</p>
        
        <h4>Tırnak Hastalıklarının Tedavisi</h4>
        <p>Tırnak hastalıklarının tedavisinde, hastalığın türüne göre farklı yaklaşımlar uygulanır. Mantar enfeksiyonları için antifungal ilaçlar, tırnak batması için cerrahi müdahale gerekebilir. Ayrıca, tırnak hijyenine dikkat etmek ve uygun ayakkabı seçimi tedavi sürecini destekler.</p>
        
        <h4>Tırnak Sağlığını Korumak İçin Öneriler</h4>
        <p>Tırnak sağlığını korumak için düzenli tırnak bakımı, nemlendirici kullanımı ve tırnakların aşırı ıslak kalmaması önemlidir. Kimyasal içerikli temizlik ürünlerinden kaçınılmalı ve tırnaklar düzenli olarak kontrol edilmelidir.</p>
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
        <p>Deri enfeksiyonları, bakteri, virüs, mantar veya parazit kaynaklı olarak ciltte meydana gelen enfeksiyonlardır. En sık rastlanan türleri arasında selülit, impetigo ve herpes zoster bulunur. Bu enfeksiyonlar, genellikle kızarıklık, şişlik, ağrı, sıcaklık artışı ve bazen de irinle kendini belli eder.</p>
        
        <h4>Deri Enfeksiyonlarının Tedavisi</h4>
        <p>Deri enfeksiyonlarının tedavisinde öncelikle enfeksiyona neden olan mikroorganizma belirlenir. Bakteriyel enfeksiyonlarda antibiyotikler, viral olanlarda antiviral ilaçlar ve mantar enfeksiyonlarında antifungal ajanlar kullanılır. Cilt temizliği ve hijyen, tedavinin başarısı için kritik önemdedir.</p>
        
        <h4>Korunma Yöntemleri</h4>
        <p>Deri enfeksiyonlarından korunmak için kişisel hijyene dikkat etmek, ortak eşya kullanımından kaçınmak ve açık yaraların temiz tutulması gerekir. Bağışıklık sisteminin güçlü olması da bu tür enfeksiyonların önlenmesinde etkilidir.</p>
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
        <p>Mantar enfeksiyonları, vücudun nemli ve sıcak bölgelerinde, özellikle ayak parmak araları, kasık ve genital bölgede ortaya çıkan, dermatofit ve kandida türü mantarların neden olduğu enfeksiyonlardır. Kaşıntı, döküntü ve ciltte soyulmalarla kendini gösterir.</p>
        
        <h4>Mantar Enfeksiyonları Nasıl Tedavi Edilir?</h4>
        <p>Tedavi, genellikle topikal antifungal kremler ve gerektiğinde ağızdan alınan antifungal ilaçlarla gerçekleştirilir. Tedavi süresince pamuklu ve hava alan giysiler tercih edilmeli, enfekte bölge kuru tutulmalıdır.</p>
        
        <h4>Önleyici Önlemler</h4>
        <p>Mantar enfeksiyonlarından korunmak için ayakların kuru kalmasına özen gösterilmeli, havlu ve ayakkabı gibi kişisel eşyalar paylaşılmamalıdır. Ayrıca bağışıklık sisteminin güçlendirilmesi de önemlidir.</p>
      </div>
    `
  },
  {
    slug: 'alerji-ve-egzama-turleri',
    title: 'Alerji ve Egzama Türleri',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Egzama Nedir?</h4>
        <p>Egzama, ciltte kuruluk, kaşıntı, kızarıklık ve kabuklanma ile karakterize kronik bir cilt hastalığıdır. Atopik dermatit en yaygın formudur ve genellikle alerjik bünyeye sahip kişilerde görülür. Temas egzaması da kimyasal maddelere maruziyet sonrası oluşabilir.</p>
        
        <h4>Egzama Tedavi Yöntemleri</h4>
        <p>Tedavi, semptomların şiddetine göre nemlendiriciler, kortikosteroid kremler ve bağışıklık düzenleyici ilaçlar kullanılarak yapılır. Egzama tetikleyicilerinin (sabun, deterjan, polen vb.) belirlenip uzak durulması da tedavinin bir parçasıdır.</p>
        
        <h4>Alerji Kontrolü ve Önlem</h4>
        <p>Egzamanın kontrol altına alınabilmesi için düzenli cilt bakımı ve alerji testleri önemlidir. Alerjik egzama durumunda alerjenlerden kaçınmak, tedavinin başarısını önemli ölçüde artırır.</p>
      </div>
    `
  },
  {
    slug: 'urtiker-kurdesen',
    title: 'Ürtiker (Kurdeşen)',
    category: 'Genel Dermatoloji',
    content: `
      <div class="service-content-detail">
        <h4>Ürtiker Nedir?</h4>
        <p>Ürtiker, ciltte ani başlayan, kaşıntılı, kabarık, kırmızı döküntülerle seyreden bir alerjik reaksiyondur. Akut ürtiker genellikle birkaç saat içinde geçerken, kronik ürtiker haftalarca sürebilir.</p>
        
        <h4>Ürtikerin Nedenleri ve Tedavisi</h4>
        <p>Tedavi, alerjenin belirlenip uzaklaştırılması ve antihistaminik ilaçların kullanımıyla yapılır. Şiddetli vakalarda kortizon içeren ilaçlar gerekebilir. Soğuk kompresler ve rahatlatıcı losyonlar semptomları hafifletebilir.</p>
        
        <h4>Ürtikerde Yaşam Tarzı Değişiklikleri</h4>
        <p>Ürtiker ataklarının önlenmesi için tetikleyici yiyeceklerden (deniz ürünleri, yumurta), ilaçlardan ve stresten uzak durulmalıdır. Düzenli egzersiz ve sağlıklı yaşam tarzı semptomları hafifletir.</p>
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
        <p>Dermatit, cildin iltihaplanması anlamına gelir ve farklı türleri bulunur: temas dermatiti, seboreik dermatit, atopik dermatit gibi. Ciltte kaşıntı, kızarıklık, kabuklanma ve bazen sızıntıyla kendini gösterir.</p>
        
        <h4>Dermatit Tedavisi Nasıl Yapılır?</h4>
        <p>Tedavi, dermatit türüne göre değişiklik gösterir. Topikal kortikosteroidler, antihistaminikler ve nemlendiriciler en sık kullanılan ürünlerdir. Ayrıca hastanın alerjik olup olmadığını belirlemek için testler yapılması önerilir.</p>
        
        <h4>Alerjik Hastalıklarda Uzun Vadeli Kontrol</h4>
        <p>Alerjik cilt hastalıklarının kontrolü için çevresel tetikleyicilerin ortadan kaldırılması, beslenmeye dikkat edilmesi ve bağışıklık sisteminin güçlendirilmesi önemlidir. Kronik vakalarda düzenli dermatolog kontrolü şarttır.</p>
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
        <p>Alerjik hastalıklar, bağışıklık sisteminin normalde zararsız olan maddelere (alerjenlere) karşı aşırı tepki vermesi sonucu ortaya çıkan kronik sağlık sorunlarıdır. Polen, toz akarları, hayvan tüyleri, bazı yiyecekler ve ilaçlar en yaygın alerjenler arasında yer alır. Bu hastalıklar; burun akıntısı, hapşırık, kaşıntı, nefes darlığı, deri döküntüsü gibi çeşitli belirtilerle kendini gösterebilir.</p>
        
        <h4>Alerjik Hastalıkların Türleri ve Belirtileri</h4>
        <p>Alerjik hastalıklar arasında en yaygın olanlar alerjik rinit (saman nezlesi), astım, besin alerjileri, kontakt dermatit ve atopik dermatittir. Bu hastalıkların semptomları kişiden kişiye değişse de, genellikle mevsimsel ya da maruziyet sonrası aniden gelişir. Bazı durumlarda ciddi reaksiyonlar (anafilaksi) yaşanabilir ve acil müdahale gerekebilir.</p>
        
        <h4>Tanı ve Tedavi Yöntemleri</h4>
        <p>Alerjik hastalıkların tanısında alerji testleri (cilt prick testi, kan testleri) ve hasta öyküsü çok önemlidir. Tedavide ise antihistaminikler, kortikosteroid spreyler ve immünoterapi (alerji aşısı) gibi yöntemler kullanılabilir. En etkili yöntem, alerjeni tanımak ve mümkün olduğunca maruz kalmaktan kaçınmaktır. Uzman bir dermatolog veya alerji uzmanı eşliğinde kişiye özel bir tedavi planı, alerjik hastalıklarla yaşamı daha konforlu hale getirebilir.</p>
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