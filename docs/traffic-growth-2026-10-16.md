# Trafik büyümesi: ilk uygulama ve başlangıç ölçümü

Tarih: 16 Ekim 2026. Alan adı: https://lid-einbuergerung.de

## Search Console'da doğrudan doğrulanan bulgular

- Alan adı mülkünde performans ekranının seçili dönemi **3 ay**. Görünen toplam: **0 tıklama, 8 gösterim, %0 TO, 73,3 ortalama konum**. Grafik yalnızca **13 Ekim 2026** gününü gösteriyor; bunu eksiksiz bir 90 günlük geçmiş olarak yorumlamayın.
- İndeksleme kapsamı raporu: **“Veri işleniyor, lütfen birkaç gün içinde tekrar kontrol edin.”** Site genelinin indekslenmiş/indekslenmemiş sayfa sayısı henüz doğrulanamıyor.
- `sitemap-index.xml`: **14 Ekim'de gönderilmiş, 16 Ekim'de okunmuş, Başarılı, 5.894 keşfedilen sayfa**. Keşfedilen sayfa sayısı indekslenen sayfa sayısı değildir.
- `/de/`: **Google'da mevcut / Sayfa dizine eklendi**. Son tarama **22 Eylül 2026**; Googlebot akıllı telefon; tarama ve indekslemeye izin var; getirme başarılı; beyan edilen ve seçilen canonical incelenen URL ile aynı.
- `/de/fragen/`, `/ar/fragen/`, `/de/einbuergerungstest-online/`: **Keşfedildi – şu anda dizine eklenmiş değil**. Henüz tarama tarihi yok.
- `/fa/fragen/` ve `/de/blog/einbuergerungstest-berlin/`: **URL Google tarafından bilinmiyor**.

Bu altı URL tüm sitenin indekslenme oranını temsil etmez. Bulgular keşif/tarama aşamasının öncelikli incelenmesi gerektiğini gösterir; tek başına bir algoritma cezasını veya içerik sorununu kanıtlamaz. Umami'nin önceki raporundaki Google yönlendirmeleriyle Search Console'un bu sınırlı tarihli raporu doğrudan karşılaştırılmamalıdır.

## Tamamlanan Google işlemi

`/de/fragen/` için canlı URL testi **“URL, Google tarafından kullanılabilir / Sayfa dizine eklenebilir”** sonucunu verdi. Ardından bir kez indeksleme isteği gönderildi. Google **“Dizine eklenmesi istendi; URL, öncelikli bir tarama sırasına eklendi”** onayını gösterdi. Bu onay, sayfanın indekslendiği anlamına gelmez.

Sitemap yeniden gönderilmedi. Diğer binlerce URL için toplu veya tekrarlanan manuel indeksleme isteği yapılmadı.

## Yerel uygulama

Beş Almanca rehberde yazının başına ve sonuna sunucuda üretilen çalışma bağlantıları eklendi:

| Rehber | Öncelikli çalışma hedefi |
| --- | --- |
| `einbuergerungstest-berlin` | Berlin soruları, açıklamalı genel sorular, deneme sınavı |
| `einbuergerungstest-hamburg` | Hamburg soruları, açıklamalı genel sorular, deneme sınavı |
| `einbuergerungstest-frankfurt` | Hessen soruları, açıklamalı genel sorular, deneme sınavı |
| `schwierige-fragen` | Freizügigkeit sorusu #19 ve deneme sınavı |
| `einbuergerungstest-schnell-lernen-7-tage-plan` | İlk soru ve deneme sınavı |

Seçim editoryal bir pilot seçimidir; bu beş sayfanın Google'da en çok trafik aldığı iddia edilmez.

- Zor sorular rehberine #19, #85 ve #115 sorularıyla üç somut alıştırma ve geçmiş hata sorularına bağlantı eklendi. Örnekler hata oranına göre sıralanmış olarak sunulmadı.
- 7 günlük plana doğrudan eyalet alıştırmaları eklendi.
- Bu iki rehberin SEO başlıkları ve zor sorular rehberinin açıklaması netleştirildi. Gerçek içerik değişikliği yapılan iki yazının `updatedDate` değeri güncellendi; inceleme yapılmamış içeriğe yeni `reviewedAt` eklenmedi.
- 12 dildeki soru dizinlerine eyalet bölümüne atlama bağlantısı ve `#bundeslaender` hedefi eklendi.
- İç bağlantılara kampanya UTM parametresi eklenmedi; dış trafik kaynakları mevcut Umami ölçümünde korunur.

## Ölçüm

Yeni olay: **`guide-practice-click`**.

| Alan | Anlamı |
| --- | --- |
| `guide` | Kaynak rehberin slug'ı |
| `lang` | Rehber dili |
| `placement` | `top` veya `bottom` |
| `destination` | `state`, `questions` veya `exam` |
| `target` | Hedef sayfanın yolu; sorgu parametresi içermez |

Tıklama olayı bağlantı gezinmesini engellemez. JavaScript veya analiz aracı çalışmasa da çalışma bağlantıları normal HTML bağlantısı olarak açılır. Üretim ortamındaki gerçek olay alımı yayından sonra doğrulanmalıdır; yerel simülasyon Umami bulutuna veri ulaştığını kanıtlamaz.

Haftalık inceleme:

1. GSC: indeksleme kapsamı raporu hazırlandı mı; aşağıdaki öncelikli URL'lerin durumları değişti mi?
2. GSC: mevcut veri aralığında sorgu/sayfa bazında gösterim ve tıklama; yeterli veri birikince son 28 gün ve önceki 28 gün.
3. Umami: beş rehbere gelen ziyaretler ve `guide-practice-click` olaylarının rehber/hedef/konum kırılımı.
4. Umami: aynı ziyaretlerde `question-answered`, `exam-started`, `exam-finished` adımlarına geçiş. Tıklama sayısı tekil ziyaretçi sayısı değildir; dönüşüm oranı tekil oturum bazında hesaplanmalıdır.
5. Önceki çok dilli başlangıç ölçümüyle **12–26 Kasım** arasında Almanya filtresinde dil ve kaynak karşılaştırması.

## Öncelikli 20 URL

Bu URL'lerin tamamı yerel üretim çıktısında kontrol edilir. GSC sütunu yalnızca bizzat açılan URL denetiminin sonucunu gösterir; kalanlar için indeksleme durumu varsayılmamıştır.

| Yol | 16 Ekim GSC durumu |
| --- | --- |
| `/de/` | İndekslendi |
| `/de/fragen/` | Keşfedildi, indekslenmedi; canlı test başarılı, indeksleme isteği onaylandı |
| `/de/einbuergerungstest-online/` | Keşfedildi, indekslenmedi |
| `/de/leben-in-deutschland-online/` | URL denetimi henüz yapılmadı |
| `/de/exam/` | URL denetimi henüz yapılmadı |
| `/de/blog/einbuergerungstest-berlin/` | Google tarafından bilinmiyor |
| `/de/blog/einbuergerungstest-hamburg/` | URL denetimi henüz yapılmadı |
| `/de/blog/einbuergerungstest-frankfurt/` | URL denetimi henüz yapılmadı |
| `/de/blog/schwierige-fragen/` | URL denetimi henüz yapılmadı |
| `/de/blog/einbuergerungstest-schnell-lernen-7-tage-plan/` | URL denetimi henüz yapılmadı |
| `/de/berlin-fragen/` | URL denetimi henüz yapılmadı |
| `/de/hamburg-fragen/` | URL denetimi henüz yapılmadı |
| `/de/hessen-fragen/` | URL denetimi henüz yapılmadı |
| `/de/bayern-fragen/` | URL denetimi henüz yapılmadı |
| `/de/nordrhein-westfalen-fragen/` | URL denetimi henüz yapılmadı |
| `/fa/` | URL denetimi henüz yapılmadı |
| `/fa/fragen/` | Google tarafından bilinmiyor |
| `/ar/` | URL denetimi henüz yapılmadı |
| `/ar/fragen/` | Keşfedildi, indekslenmedi |
| `/tr/fragen/` | URL denetimi henüz yapılmadı |

## Doğrulama ve yayın durumu

- `npm run build`: başarılı; 6.071 sayfa, 5.894 sitemap URL'si.
- Derleme sonrası SEO denetimi: başarılı.
- Derleme sonrası bağlantı denetimi: 6.150 yerel hedefte eksik URL veya son eğik çizgi hatası yok.
- `astro check`: 0 hata, 0 uyarı; mevcut QR testinde kullanılmayan değişken için bir hint.
- Yeni tıklama betiği gerçek `trackEvent` fonksiyonuyla yerel olarak çalıştırıldı: üst/alt konumlar ve üç hedef ayrışıyor; analiz aracı yokken veya hata verirken bağlantı işleyicisi hata üretmiyor.
- Beş rehberin üretim HTML'inde iki çalışma alanı; 12 dilin tamamında eyalet atlama hedefi doğrulandı.
- Tarayıcıda Berlin kartı masaüstünde ve 390 px genişlikte kontrol edildi; eyalet düğmesi doğru 10 Berlin sorusunu açtı.

**Kod değişiklikleri yereldedir; canlı siteye yayın yapılmadı.** Google indeksleme isteği mevcut canlı soru dizini içindir. Kurumlara e-posta veya sosyal medyada ek paylaşım gönderilmedi. Farsça/Arapça açıklama denemesi ve kurum dağıtımı sonraki uygulama adımlarıdır.

## İkinci uygulama: Farsça/Arapça açıklamalar ve kurum pilotu

16 Ekim 2026'da ilk paketin devamı olarak aşağıdaki işler tamamlandı. Önceki bölümler ilk paketin tarihli başlangıç kaydıdır.

- **İlk 20 genel soru için iki dilde toplam 40 kısa açıklama** eklendi. Her biri özet ve doğru cevabın gerekçesini içerir. Başlık, kaynak etiketi ve kontrol tarihi de Arapça/Farsça gösterilir.
- İlk 20 soru, temel haklar ve anayasa kavramlarını kapsayan editoryal bir başlangıç kümesidir; ziyaret veya yanlış cevap oranına göre seçildiği iddia edilmez.
- Mevcut soru metinleri ve Almanca/İngilizce/Türkçe açıklamalar temel alındı. Açıklamalardaki ayrımlar için resmî mevzuat kontrol edildi: [GG 5](https://www.gesetze-im-internet.de/gg/art_5.html), [GG 7](https://www.gesetze-im-internet.de/gg/art_7.html), [KErzG 5](https://www.gesetze-im-internet.de/kerzg/__5.html), [GG 11](https://www.gesetze-im-internet.de/gg/art_11.html), [GG 12](https://www.gesetze-im-internet.de/gg/art_12.html), [GG 16a](https://www.gesetze-im-internet.de/gg/art_16a.html?level=1), [GG 20](https://www.gesetze-im-internet.de/gg/art_20.html), [GG 21](https://www.gesetze-im-internet.de/gg/art_21.html), [GG 38](https://www.gesetze-im-internet.de/gg/art_38.html). Bağımsız bir ana dil editörü incelemesi yapılmadı.
- Farsça ve Arapça soru dizinlerinden açıklamalı ilk soruya ve #19 örneğine doğrudan bağlantılar eklendi.
- Kurs/danışma kaynak sayfasının DE/EN/TR sürümlerine bu sınırlı açıklama kapsamı eklendi; tüm sorular için Arapça/Farsça açıklama varmış gibi sunulmadı.
- RTL sayfalarda Almanca soru ve seçenekler için LTR, çeviri satırları için doğru dil ve yazı yönü tanımlandı. Böylece Almanca cümlenin noktalaması sağdan sola akıştan etkilenmez. Yanlış cevap bildirimindeki Almanca cevap da iki yönlü metin izolasyonuna alındı.
- Arapça/Farsçada #21 ve sonrasında açıklama yoksa bölüm gösterilmez. Kısa açıklama pilotu, DE/EN/TR ayrıntılı açıklama bölümünü değiştirmez.

### Kurum dağıtımı hazırlığı

[20 aday, iletişim kaynakları ve üç kuruma özel taslak](./outreach-pilot-2026-10-16.md) hazırlandı: 17 VHS ve üç göç danışma kuruluşu. İlk deneme için Frankfurt VHS, Hamburg VHS ve Caritas Berlin/Mehringdamm seçildi. Taslaklardaki dış bağlantılar kurum bazında UTM parametreleri içerir. Gönderim yapılmadı.

### İkinci paket doğrulaması

- Tam `npm run build` başarılı; son RTL düzenlemesinden sonra `astro build` ve tüm derleme sonrası denetimler yeniden geçti.
- 6.071 HTML sayfası, 5.894 sitemap URL'si, 6.150 yerel bağlantı hedefi; SEO ve bağlantı denetiminde hata yok.
- SEO denetimine Arapça/Farsça pilot için 40 yerel açıklama, RTL sayfa yönü, katalog bağlantıları ve çevrilmemiş #21 açıklamasının gösterilmemesi kontrolleri eklendi.
- Açıklama seçme işlevi gerçek JSON verileriyle çalıştırıldı: iki dilde 40 açıklama, pilot dışındaki eksik kayıtlar, diğer dillerin fallback davranışı ve DE/EN/TR içerikleri ile önceki kontrol tarihleri doğrulandı. Mevcut ayrıntılı açıklamalar korundu.
- Son `astro check`: 0 hata, 0 uyarı, önceki QR testiyle ilgili bir hint.
- Farsça #19 açıklaması masaüstü tarayıcısında görüntülendi. Son RTL düzeltmesinden sonraki 390 px mobil ekran doğrulaması, tarayıcı bağlantısının art arda yanıt vermemesi nedeniyle tamamlanamadı. Bu kontrol yapılmış sayılmamalıdır.

**İki paketin kodları hâlâ yerelde; yayın ve kurumlara gönderim yapılmadı.** Gerçek trafik etkisi veya canlı Umami olay alımı bu yerel kontrollerle kanıtlanmış değildir.

## Üçüncü uygulama: kullanıcı paylaşımıyla yeni ziyaret

Soru sayfalarına ve tamamlanan deneme sınavının sonuç ekranına 12 dilde paylaşım düğmesi eklendi. Kullanıcı uygun cihazlarda işletim sisteminin paylaşım menüsünü açar; bu API yoksa veya çalışmazsa bağlantı panoya kopyalanır. Pano erişimi de yoksa elle seçilebilen bağlantı gösterilir. Kullanıcı paylaşım menüsünü kapattığında bağlantı kendiliğinden kopyalanmaz.

- Soru paylaşımı o sorunun, sınav paylaşımı yeni bir deneme başlatılabilecek sınav sayfasının canlı HTTPS adresini kullanır. Puan, cevaplar ve kişisel ilerleme paylaşılmaz; gelen sorgu parametreleri ve fragment kaldırılır.
- Dış paylaşım bağlantıları: `utm_source=learner_share`, `utm_medium=referral`; kampanya `question_share` veya `exam_share`.
- Mevcut iç gezinme bağlantıları bu parametrelerle değiştirilmez.
- `practice-share-click`: `lang`, `kind`, varsa `question_id`.
- `practice-share-result`: aynı alanlara ek olarak `method=native|copied|manual|cancelled`. `native` platform API'sinin tamamlandığını, `copied` kopyalamayı gösterir; hiçbiri mesajın teslim edildiğini veya yeni ziyaret geldiğini kanıtlamaz.
- Umami kampanya/UTM raporunda bu iki kampanyadan gelen **ziyaretler** ayrıca izlenir. Paylaşım tıklaması sayısı, gelen ziyaret sayısı ve gelen ziyaretçinin çalışma eylemi farklı ölçümlerdir. [Umami UTM belgesi](https://docs.umami.is/docs/utm), [metrik tanımları](https://docs.umami.is/docs/metric-definitions) ve [attribution belgesi](https://docs.umami.is/docs/attribution) temel alındı; ek bir özel tarayıcı depolaması kurulmadı.

### Doğrulama ve kalan sınırlar

- `npm run share:test`: 5 davranış testi geçti. Platform metotlarının receiver'ı, iptalden sonra panoya yazılmaması, API/pano hata durumları ve paylaşım URL'sinden sonuç parametrelerinin kaldırılması kontrol edildi.
- `astro check`: 0 hata, 0 uyarı; önceki QR testine ait bir hint.
- Üretim derlemesi başarılı: 6.071 sayfa. SEO, yerel bağlantı ve IndexNow manifest denetimleri geçti; 5.894 sitemap URL'si ve 6.150 yerel hedef.
- 5.520 soru sayfasının her birinde tam bir paylaşım kontrolü ve doğru yerel düğme metni üretildiği HTML çıktısında doğrulandı.
- Önceki RTL kontrolünün devamında Farsça #19 açıklaması dar mobil görünümde, yatay taşma olmadan görüntülendi. Ekran görüntüsü: `/private/tmp/lid-fa-mobile-2026-10-16.png`. Bu görüntü paylaşım düğmesi eklenmeden önce alındı.
- Arapça mobil görünümün ve yeni paylaşım düğmelerinin tarayıcı kontrolleri, yerel önizleme bağlantısının yanıt vermemesi nedeniyle tamamlanamadı. Gerçek cihazdaki paylaşım menüsü, sınav sonuç ekranı ve canlı Umami alımı ayrıca doğrulanmalı. Geçici mobil viewport ayarı kaldırıldı.
- Bu paket de yereldedir; canlı yayın, kurumlara gönderim ve trafik artışı doğrulaması yapılmadı.

### Yayından sonra uygulanacak ölçüm sırası

| Öncelik | İşlem | Değerlendirme |
| --- | --- | --- |
| 1 | Canlı soru ve sınav sonucu paylaşımını bir mobil cihazda dene; analitik olayını ve UTM ile gelen ziyareti kontrol et | Paylaşım eylemi ile gelen ziyaret ayrı raporlansın |
| 2 | Hazır üç kurum taslağını gönderim yetkisiyle uygula | Kurum bazında `kurs_pilot_2026_10` ziyaretleri ve başlayan çalışmalar |
| 3 | GSC'deki öncelikli 20 URL'nin indeks durumunu tekrar incele | Keşif, tarama, indeksleme ve gösterim ayrı ölçülsün |
| 4 | Dil ve kaynak bazında en az iki haftalık veri biriktir | `question_share`, `exam_share`, kurum pilotu ve organik trafiği karşılaştır |
| 5 | Açıklama pilotunu kullanım ve editör geri bildirimiyle değerlendir | İlk 20 soruya gelen ziyaretler ve çalışma eylemlerine göre kapsamı genişlet |

Bu sıra bir takvim otomasyonu veya gönderim talimatı oluşturmaz. Sayısal büyüme tahmini için henüz yeterli başlangıç verisi yoktur.

## Yayın hazırlığı kontrolü

Paylaşım davranış testleri `postbuild` zincirine eklendi. Standart `npm run build` sonrasında paylaşım testleri, SEO denetimi, bağlantı denetimi ve IndexNow manifest üretimi sırayla çalışır; paylaşım testi başarısız olursa zincir hata verir.

Son kontrol: `npm run share:test` ve `npm run navigation:test` toplam 10 testle başarılı. Güncellenmiş `npm run postbuild` de başarılı: 6.071 HTML sayfası, 5.894 sitemap URL'si ve 6.150 yerel hedef. `git diff --check` hatasız.

Yerel sunucu Arapça #19 için HTTP 200 yanıtı veriyor. Kullanıcı sekmeyi yeniden açtığını belirttikten sonra da tarayıcı aracı eski bağlantı hatası belgesini gösterdi. Araç, bu belgenin protokolü için erişimi güvenlik politikası nedeniyle reddetti; bu engeli aşmaya yönelik başka bir tarayıcı yöntemi denenmedi. Arapça mobil görünüm ve paylaşımın soru/sınav sonucu ekranındaki görsel kontrolü açık kalıyor.

Değişiklikler hâlâ yereldedir. Depodaki mevcut GitHub Pages iş akışı `main` dalına push ile yayını tetikliyor; bu kontrol sırasında commit, push veya canlı dağıtım yapılmadı.

## Arama niyetine göre içerik grupları

Genel stratejinin 1. maddesi mevcut blog üzerinde uygulandı. Almanca, İngilizce ve Türkçe blog girişlerinde, filtrelerden önce üç çalışma yolu gösterilir:

| Grup | Rehber içeriği | Çalışma hedefi |
| --- | --- | --- |
| Sınavı tanıma (`understand`) | LiD farkı, soru yapısı, kayıt | `/[lang]/frage/1/` |
| Hazırlık (`prepare`) | Almancada 7 günlük plan ve zor sorular; üç dilde uygulama seçimi | `/[lang]/fragen/` |
| Kendini değerlendirme (`check`) | Doğru cevap sayısı, çevrimiçi çalışma; Almancada eyalet rehberi | `/[lang]/exam/` ve `/[lang]/fragen/#bundeslaender` |

- Mevcut **21 rehber** gruplandı: DE 9, EN 6, TR 6. Başka dildeki rehbere sessiz yönlendirme yapılmaz; yalnızca ilgili dilde yayımlanmış içerik gösterilir.
- Bu rehberlerde aynı gruptaki diğer yazılar, uygun alıştırma, varsa sonraki çalışma grubu ve tüm çalışma yollarına dönüş bağlantısı bulunur. Kendine bağlantı verilmez.
- Blog girişlerinin SEO başlıkları, açıklamaları ve CollectionPage ad/açıklaması bu üç ihtiyaca göre güncellendi. Yeni kopya sayfa üretilmedi; makalelerin editoryal kontrol tarihleri değiştirilmedi.
- `study-path-click` olayı: `lang`, `intent`, `destination`, `placement`; rehber içindeki bağlantılarda kaynak `guide`. Kaynak/hedef iç bağlantılarına UTM eklenmedi. Canlı olay alımı henüz doğrulanmadı.
- SEO denetimi artık üç dilde grupları, uygun çalışma hedeflerini, aynı dilde rehber bağlantılarını, karşılıklı dönüşü ve kendi kendine bağlantı olmamasını kontrol eder.
- `astro check`: 0 hata, 0 uyarı, önceki QR testiyle ilgili 1 hint. Üretim derlemesi ve güncel `postbuild` zinciri başarılı: 6.071 sayfa, 5.894 sitemap URL'si, 6.150 yerel hedef.
- Yeni blog önizlemesi tarayıcıda açıldı. Almanca masaüstü görünüm, dar görünümde üç dilin grup başlıkları ve DE/TR yatay taşma kontrolü doğrulandı. Blog → Almanca rehber → sonraki çalışma grubu ve Türkçe hazırlık grubu → soru kataloğu bağlantıları tıklanarak denendi. Geçici viewport ayarı kaldırıldı.
- Son Türkçe ekran görüntüsü: `/private/tmp/lid-study-paths-tr-2026-10-16.png`. Önizleme: `http://127.0.0.1:4321/tr/blog/#lernwege`.

Bu uygulama da yereldedir; commit, push ve canlı yayın yapılmadı. Önceki Arapça soru/paylaşım ekranına ait açık görsel kontrol, bu blog kontrolüyle tamamlanmış sayılmaz.

## Genel strateji 2: öncelikli sayfaları güçlendirme

Öncelikli 20 adres tekrar ele alındı: bu pakette 15 sayfaya doğrudan içerik veya işlev düzeltmesi geldi; önceki paketlerde geliştirilmiş beş rehberin çalışma kartları ve bağlantıları yeniden doğrulandı.

| Sayfalar | Yapılan işlem |
| --- | --- |
| `/de/`, `/ar/`, `/fa/` | Genel eyalet kısayolu Berlin'e sabitlenmek yerine tüm eyaletlerin seçimine gider. Arapça/Farsça ana sayfalarda ilgili dilde açıklama içeren gerçek rehber ve yerel kart metni gösterilir. |
| `/de/fragen/`, `/tr/fragen/`, `/ar/fragen/`, `/fa/fragen/` | #1, #19 ve #20 için gerçek soru, doğru cevap, mevcut yerel açıklama ve resmî kaynak içeren açılabilir örnekler; her örnekten alıştırmaya bağlantı. AR/FA açıklama kapsamı hâlâ yalnızca ilk 20 soru olarak belirtilir. |
| İki Almanca online hazırlık sayfası | Aynı üç somut örnek eklendi; genel tanıtımdan açıklamalı çalışmaya geçiş sağlandı. |
| `/de/exam/` | Eyalet seçimi, sınavı kullanma açıklaması, resmî kaynak ve hazırlık bağlantıları. Aşağıdaki soru seçme hatası düzeltildi. |
| Berlin, Hamburg, Hessen, Bayern, Nordrhein-Westfalen Almanca soru sayfaları | Çalışma sırası, iki gerçek eyalet sorusu ve açıklaması, ilgili şehir rehberi, kaynaklar ve eyaleti önceden seçen sınav bağlantısı. Şehir rehberinin kapsamı açıkça belirtilir. |
| Beş öncelikli Almanca rehber | Üst/alt çalışma kartlarının ve deneme sınavı bağlantılarının korunduğu üretim HTML'inde yeniden doğrulandı. Bu geçişte rehber metinleri veya kontrol tarihleri değiştirilmedi. |

Ana sayfa düzeltmesinin ortak şablondaki ek etkisi: EN/TR ana sayfalardaki rehber kartları kendi dillerindeki bloga bağlanır. Mevcut diğer yerel açıklamalar da içerik dili eşleşmesiyle seçilir.

### Sınavın eyalet havuzu düzeltmesi

Önceki simülatör, 460 sorunun tamamından rastgele 33 soru seçebiliyordu; seçilen sorular birden çok eyalete ait olabiliyordu. Artık 12 dilde kullanıcı eyaletini seçer; oturum **30 genel soru + yalnızca o eyaletten 3 soru** içerir. Eyalet seçilmeden başlatma düğmesi etkinleşmez. Geçerli `?state=hessen` gibi giriş bağlantıları seçimi doldurur; bilinmeyen değerler kullanılmaz. Yeniden başlatma seçilen eyaleti koruyup yeni bir oturum oluşturur. Sonuç ve çalışma ekranında eyalet gösterilir.

Dağılım, [BAMF'ın sınav açıklamasındaki](https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html) 30 genel/3 eyalet bilgisine göre düzeltildi; sayfanın metni web arama sonucunda doğrulandı, doğrudan getirme 403 verdi. [Resmî LiD hazırlık kataloğu](https://oet.bamf.de/ords/oetut/f?p=534:1:0:::::) da seçilen eyalet için 300 genel + 10 yerel hazırlık sorusunu açıklar. Örnek cevap ve gerekçeler mevcut soru/açıklama verilerinden alınır; bu çalışma tüm mevcut açıklamaların yeni bir bağımsız editör incelemesi değildir.

### Ölçüm ve doğrulama

- `explained-example-click`: `lang`, `question-id`. Mevcut `exam-started`, `exam-finished`, `exam-restarted` olaylarına seçilen `state` eklendi.
- `npm run exam:test`: 2 davranış testi; 16 eyaletin her birinde 33 benzersiz soru, 30/3 dağılımı, yabancı eyalet sorusu olmaması, kaynak havuzun değişmemesi ve eksik/geçersiz havuzların reddedilmesi.
- Sınav testleri `postbuild` zincirine eklendi. Üretim derlemesi, 7 paylaşım/sınav testi, genişletilmiş SEO denetimi, bağlantı denetimi ve IndexNow manifest üretimi başarılı: 6.071 sayfa, 5.894 sitemap URL'si, 6.150 yerel hedef.
- SEO denetimi 20 öncelikli adresin canonical, indexlenebilirlik ve sitemap durumunu; yerel örnekleri, eyalet/şehir bağlantılarını, 12 dilde eyalet seçimini ve ana sayfalardaki dil eşleşmesini kontrol eder. Bu kontroller Google'ın sayfaları gerçekten indekslediğini kanıtlamaz; yeni GSC incelemesi yapılmadı.
- Son `astro check`: 0 hata, 0 uyarı; önceki QR testinden 1 hint. `git diff --check` hatasız.
- Yeni sınav/eyalet/örnek ekranlarının tarayıcı kontrolü henüz tamamlanmadı. Önceki sekme bir bağlantı hatası belgesinde kaldığından güvenlik denetimi geçişi engelledi; kullanıcıdan sınavı uygulama içi tarayıcıda yeni sekmede açması istendi. Bu engel alternatif tarayıcı yöntemleriyle aşılmadı.

Tüm yeni değişiklikler hâlâ yerelde; canlı yayın ve gerçek trafik artışı doğrulaması yapılmadı.

### İkinci madde: tamamlanan tarayıcı doğrulaması

Kullanıcının yeni sekmeyi açtığı bildiriminin ardından sınavın Chrome'da açıldığı görüldü ve o sekme üzerinden kontrole devam edildi. Aşağıdaki sonuçlar önceki tarayıcı engeli notunu bu paketin kontrolleri için günceller:

- `?state=hessen` girişinde Hessen seçili ve başlatma düğmesi etkin. Sınav başlatıldı, 33. soruya ilerlenip bitirildi; sonuç, 33 tekrar çalışma bağlantısı ve paylaşım düğmesi görüntülendi.
- Yeniden başlatmada Hessen seçimi korundu. Seçim boşaltıldığında başlatma düğmesi devre dışı, Berlin seçildiğinde etkin.
- Berlin ile ikinci tur tamamlandı. Yalnızca sonuçtaki tekrar çalışma bağlantıları sayıldı: **33 benzersiz soru, 30 genel, 3 Berlin sorusu (#320, #317, #318)**. Testlerde cevap işaretlenmedi; görülen 0/33 puan bir kalite kontrol senaryosudur.
- Arapça ve Farsça kataloglarda #19 açıklaması açılarak cevap, gerekçe ve kaynak bağlantısı kontrol edildi. İki sayfa da RTL ve 375 px kullanılabilir mobil genişlikte yatay taşma olmadan görüntülendi.
- Hessen sayfasında örnek cevap/gerekçe açıldı; mobil düzende taşma yok. Eyalet sayfasından sınav bağlantısı açıldı ve yeniden yüklemeden sonra Hessen'in seçili, başlatmanın etkin olduğu doğrulandı.
- Sınavın mobil formu, soru sayısı, süre, başarı eşiği ve başlatma düğmesi birlikte görüntülendi. Son kontrol edilen geçici test sekmesinde tarayıcı konsolu hata kaydı yoktu.
- Geçici test sekmesi kapatıldı ve viewport override kaldırıldı; kullanıcının sınav sekmesi normal ekran genişliğine döndü (2.545 px). Sınav başlatılmamış durumda, Hessen seçili bırakıldı.

Ekran görüntüleri:

- `/private/tmp/lid-exam-state-mobile-2026-10-16.png`
- `/private/tmp/lid-ar-examples-mobile-2026-10-16.png`
- `/private/tmp/lid-hessen-examples-mobile-2026-10-16.png`

Bu oturumda uygulama kodu değiştirilmedi; mevcut derleme ve test sonuçları geçerlidir. Canlı yayın ve canlı analitik alımı hâlâ doğrulanmış değildir. Önceki bağımsız Arapça soru #19/paylaşım menüsü kontrolünün tamamı bu katalog kontrolüyle yapılmış sayılmaz.
