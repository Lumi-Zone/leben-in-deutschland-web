# SEO ve yapay zekâ aramalarında görünürlük

Bu değişiklikler mevcut Astro / GitHub Pages yayını içindir. Yeni alan adına veya farklı bir hosting hizmetine taşımayın; canonical adresler `https://lid-einbuergerung.de` üzerinde kalır.

## Uygulanan iyileştirmeler

- `/[lang]/fragen/`: 12 dilde 300 genel soruya doğrudan HTML bağlantıları ve 16 eyalet dizini. Ana sayfa ve soru sayfalarından erişilebilir.
- Sorularda JavaScript olmadan açılabilen cevap bölümü, BAMF kaynağı ve çevirilerin yardımcı içerik olduğuna ilişkin açıklama.
- Ana sayfada bağımsız yayıncı açıklaması, BAMF ve mevcut editoryal politika bağlantısı.
- `/de|en|tr/leben-in-deutschland-online/` ve `/de|en|tr/einbuergerungstest-online/` için gerçek, cevap odaklı çeviriler; karşılıklı hreflang, canonical, resmî kaynak ve inceleme tarihi.
- Altı temel rehberin DE/TR/EN sürümleri; yeni rehberlerde dil, çeviri anahtarı, inceleme tarihi ve resmî kaynak zorunluluğu.
- İlk 30 genel soruda JavaScript olmadan görünen DE/TR/EN kısa açıklama, doğru cevabın gerekçesi, BAMF kaynağı ve kontrol tarihi.
- DE/TR/EN editoryal politika ve kurs/danışma merkezleri için paylaşılabilir kaynak sayfası.
- Umami'de ChatGPT yönlendirmesinin açılış sayfası ve diliyle `chatgpt-referral-landing` olayı olarak ölçülmesi. Mağaza tıklama olayları mevcut dil ve konum parametrelerini korur.
- Tutarlı son eğik çizgi; JSON-LD dil kodları BCP 47 biçiminde (`ua` adresi için `uk-UA`); JSON-LD içinde HTML kapanışına karşı güvenli serileştirme.
- OAI-SearchBot için açık erişim. Önceki `User-agent: * / Allow: /` politikası zaten izin veriyordu; bu değişiklik erişim niyetini açık hâle getirir, yeni bir sıralama sinyali değildir. Model eğitimi politikası değişmedi.
- İsteğe bağlı Google/Bing doğrulama etiketleri ve GitHub Actions değişkenleri.
- Her üretim derlemesinden sonra otomatik SEO denetimi: canonical, noindex, sitemap kapsamı, hreflang hedefleri ve karşılıklılığı, JSON-LD, H1, açıklama, soru dizinleri ve cevapların HTML çıktısı.

## Yayın ve ölçüm

1. Değişiklikleri mevcut GitHub Pages iş akışıyla yayımlayın. Yerel dosya değişiklikleri canlı siteyi kendiliğinden güncellemez.
2. Google Search Console ve Bing Webmaster Tools içinde mevcut alan adı mülkünü kullanın. Doğrulama zaten tamamlandıysa yeni etiket gerekmez. Gerekliyse verilen etiketin yalnızca `content` değerini `PUBLIC_GOOGLE_SITE_VERIFICATION` veya `PUBLIC_BING_SITE_VERIFICATION` adlı GitHub repository variable olarak kaydedip yeniden derleyin. DNS doğrulaması da kullanılabilir; kodda sahte doğrulama değeri yoktur.
3. `https://lid-einbuergerung.de/sitemap-index.xml` adresini bu araçlara gönderin. Ana sayfa ve `/de/fragen/`, `/tr/fragen/` gibi yeni dizinleri URL inceleme aracıyla kontrol edin. Binlerce sayfayı tekrar tekrar elle göndermeyin.
4. Yayından sonra gerçek alan adında robots.txt, sitemap, canonical ve yanıt kodlarını kontrol edin. CDN veya güvenlik duvarı varsa OpenAI'nin yayımladığı arama tarayıcısı IP aralıklarının engellenmediğini doğrulayın. robots.txt tek başına HTTP erişimini kanıtlamaz.
5. Search Console / Bing gösterim, tıklama, indeksleme ve sorgu raporlarını; Umami'de `chatgpt-referral-landing`, `app-store-click` ve `play-store-click` olaylarını dil/açılış sayfası kırılımında takip edin. Tarihli bir başlangıç ölçümü tutup değişiklikleri karşılaştırın. AI yönlendirmesi bulunmaması, hiç alıntılanmadığını kanıtlamaz.
6. Haftalık 30 sorguluk ölçüm için [`chatgpt-visibility-benchmark.md`](./chatgpt-visibility-benchmark.md) dosyasını kullanın. Mağaza kabulü ve etik tanıtım için [`store-listing-de-tr-en.md`](./store-listing-de-tr-en.md) ile [`authority-outreach.md`](./authority-outreach.md) listelerini izleyin.

`npm run build` üretim çıktısını oluşturur ve SEO denetimini çalıştırır. Yalnızca mevcut çıktıyı kontrol etmek için `npm run seo:audit` kullanın. Mevcut `prebuild` Instagram kartlarını da üretir; bu SEO denetiminin parçası değildir.

## Dillere göre trafik kaynağı (ölçüm: 15 Ekim 2026, son 90 gün, Umami)

Çin ve Singapur kaynaklı bot ziyaretleri hariç tutmak için dil kırılımı `country=DE` ile okundu.

| Dil yolu | DE ziyaretçi | ChatGPT (`utm_source=chatgpt.com`) | Ana giriş sayfası |
|---|---:|---:|---|
| `/de/` | 708 | 111 | `/de/`, `/de/fragen/`, Bing'den blog yazıları |
| `/fa/` | 42 | 26 | `/fa/fragen/` (iPhone, Leipzig/München) |
| `/ar/` | 37 | 12 | `/ar/fragen/` |
| `/es/` | 30 | 0 | soru sayfaları |
| `/ru/` | 23 | 3 | `/ru/`, Yandex |
| `/en/` | 64 | 3 | `/en/`, `/en/fragen/` |
| `/ua/`, `/tr/`, `/ps/`, `/pl/`, `/ro/`, `/it/` | ≤ 7 | ≤ 5 | — |

- Almanca dışındaki dillerde neredeyse tek kaynak ChatGPT'dir. ChatGPT, kullanıcının dilinde sorulan "Almanya vatandaşlık testi soruları" sorusuna o dilde başlığı olan `/[dil]/fragen/` sayfasını öneriyor. Sıçrama, `/fragen/` dizininin yayına girdiği 7 Eylül 2026 haftasında başladı (haftalık ChatGPT ziyaretçisi 2 → 19 → 38).
- ChatGPT uygulaması referrer göndermez; ziyaret Umami'de "direct" görünür, yalnızca `utm_source=chatgpt.com` ile ayrılır. `chatgpt-referral-landing` olayı bu yüzden 15 Ekim'e kadar hiç tetiklenmedi; artık UTM'e de bakıyor.
- Google'dan 90 günde yalnızca 6 yönlendirme geldi. Arama trafiği Bing ailesinden (Bing, DuckDuckGo, Yahoo, Ecosia: ~260) ve yalnızca Almanca blog yazılarına geliyor.
- Bing `site:` sorgusu (15 Ekim): tüm alan adı ~56 sonuç; `/ar/` 21 (başlığı Arapça "سؤال N:" olan soru sayfaları), `/ru/` 6, `/fa/` 1. Farsça soru sayfalarının başlığı "Question N:" ile İngilizce başlıyordu.
- Dil değiştirme olaylarında en çok seçilen hedef dil Arapça (38), ardından İngilizce (20) ve Rusça (10).

15 Ekim'de yapılan değişiklikler: 8 dilde eksik olan 84 arayüz metni (soru sayfası başlıkları dahil) çevrildi; eyalet sayfalarının başlık/açıklama/H1'i 12 dile yerelleştirildi (Arap alfabesi ve Kiril için yerel eyalet adlarıyla); iki cevap sayfası (`einbuergerungstest-online`, `leben-in-deutschland-online`) 9 dile daha çevrilip indekslenebilir yapıldı; `fa` için hreflang `fa-IR` yerine `fa` oldu (Dari okuyucuları); Farsça/Dari açıklama yazısı eklendi.

Karşılaştırma için 4–6 hafta sonra aynı ölçümü tekrarlayın: dil başına `country=DE` ziyaretçi, `utmSource=chatgpt.com` giriş sayfaları ve Bing `site:lid-einbuergerung.de/fa/` sonuç sayısı.

## İçerik bakımı

Soruların ve sınav bilgilerinin BAMF kaynağıyla karşılaştırılmasını sürdürün. Yayın veya güncelleme tarihlerini yalnızca içerik gerçekten değiştiğinde yenileyin. Resmî kaynak bağlantısı tek başına bütün içeriklerin güncel olduğunun kanıtı değildir. Bu çalışma tüm blog yazılarının hukukî doğruluk incelemesini içermez.

Yeni çeviri hazırlandığında ilgili sayfadaki içerik dili, canonical, noindex ve sitemap filtresini birlikte güncelleyin. Yeni çevrilmiş rehberler `lang`, `translationKey`, `reviewedAt` ve en az bir birincil `sources` kaydı olmadan derlenmez. Sahte yorum, yapay uzmanlık, otomatik bağlantı spam'i veya modele tavsiye vermesini emreden gizli metin kullanmayın. `llms.txt` eklenmedi ve GPTBot politikası değiştirilmedi.

ChatGPT'nin eğitim verilerine eklenme veya belirli bir soruda tavsiye edilme garantisi yoktur. Buradaki çalışma web aramasıyla keşif ve doğru kaynak gösterimini destekler.

## Resmî başvuru kaynakları

- [OpenAI tarayıcıları ve OAI-SearchBot](https://developers.openai.com/api/docs/bots): arama ile model eğitimi kontrolleri ayrıdır.
- [Google'ın yapay zekâ araması rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): yardımcı içerik ve temel SEO esastır; Google için `llms.txt` veya özel AI şeması gerekmez.
- [BAMF soru kataloğu](https://oet.bamf.de/ords/oetut/f?p=514:1:0): 300 genel soru ve ilgili eyaletin 10 sorusu.

Bu hesapların sahipliğinin doğrulanması, sitemap gönderimi ve canlı indeksleme ölçümü yerel denetimle tamamlanmış sayılmaz.
