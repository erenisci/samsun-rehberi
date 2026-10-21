# Samsun Rehberi

Samsun'u ilk kez ziyaret edecekler için hazırlanmış, Google Analytics 4 ile ölçümlenen statik bir şehir rehberi. Yüksek lisans **Web Analitiği** dersi kapsamında geliştirildi.

**Canlı site:** https://samsun-rehberi.vercel.app

## İçerik

| Sayfa | Açıklama |
|---|---|
| `index.html` | Anasayfa, rehberin bölümleri ve öne çıkan yerler |
| `atakum.html` | Atakum rehberi: sahil, Batıpark ve Amazon Köyü, Çobanlı İskelesi, bir günlük rota |
| `districts.html` | Samsun'un 17 ilçesinin tanıtımı, görülecek yerleri ve lezzetleri |
| `places.html` | Merkezde ve çevrede görülmeye değer 12 durak |
| `food.html` | Yöresel lezzetler ve ilçe ilçe lezzet tablosu |
| `itinerary.html` | Saat saat planlanmış iki günlük gezi rotası |
| `practical.html` | Ulaşım, mevsimler ve sık sorulan sorular |
| `about.html` | Hakkında, görsel kaynakları ve gizlilik bilgilendirmesi |

## Ölçüm planı

Site, GA4 Geliştirilmiş Ölçüm ile sayfa görüntüleme, kaydırma ve dış bağlantı tıklamalarını otomatik toplar. Bunlara ek olarak sitenin amacına özel aşağıdaki eventler tanımlandı:

| Event | Ne zaman tetiklenir | Parametreler | Cevapladığı soru |
|---|---|---|---|
| `open_map` | "Haritada aç" bağlantısına tıklanınca | `place_name`, `page_section` | Hangi yerler gerçekten ziyaret edilmek isteniyor? |
| `select_district` | İlçeler sayfasında bir ilçe seçilince | `district_name` | En çok hangi ilçeler merak ediliyor? |
| `cta_click` | Sayfa içi butonlara ve kartlara tıklanınca | `cta_label`, `cta_target` | Ziyaretçiler siteyi hangi yoldan geziyor? |
| `faq_open` | Sık sorulan sorularda bir soru açılınca | `question` | Ziyaretçilerin kafasındaki sorular neler? |
| `read_complete` | Sayfanın sonuna kadar inilince | `content_group` | Hangi içerikler sonuna kadar okunuyor? |

Her sayfa ayrıca bir `content_group` değeri gönderir (`home`, `atakum`, `districts`, `places`, `food`, `itinerary`, `practical`, `about`). Bu sayede sayfa grupları raporlarda karşılaştırılabiliyor.

Event kodları `js/main.js` içinde.

## Teknik yapı

- Saf HTML, CSS ve JavaScript. Framework ve build adımı yok.
- Mobil uyumlu, erişilebilirlik için klavye odak durumları ve "içeriğe geç" bağlantısı içeriyor.
- Vercel üzerinde yayında. `vercel.json` ile uzantısız temiz URL'ler kullanılıyor (`/atakum.html` yerine `/atakum`).

```
.
├── index.html, atakum.html, districts.html, ...
├── css/style.css
├── js/main.js
├── favicon.svg
└── vercel.json
```

## Yerelde çalıştırma

Herhangi bir statik sunucu yeterli:

```bash
npx serve .
```

Dosyaları doğrudan tarayıcıda açmak da çalışır.

## Görseller

Fotoğrafların tamamı [Wikimedia Commons](https://commons.wikimedia.org)'ta serbest lisansla paylaşılmış görsellerdir. Her fotoğrafın üzerinde, fotoğrafçının adını ve lisans koşullarını gösteren kaynak sayfasına bağlantı bulunur. Tam liste `about.html` sayfasında.

## Gizlilik

Site yalnızca toplu ziyaretçi istatistikleri için Google Analytics 4 kullanır. Kişisel bilgi toplanmaz. Ayrıntılar `about.html` sayfasında.

## Hazırlayan

Eren İşci
