# SEO ve yapay zekâ aramalarında görünürlük

Bu değişiklikler mevcut Astro / GitHub Pages yayını içindir. Yeni alan adına veya farklı bir hosting hizmetine taşımayın; canonical adresler `https://lid-einbuergerung.de` üzerinde kalır.

## Uygulanan iyileştirmeler

- `/[lang]/fragen/`: 12 dilde 300 genel soruya doğrudan HTML bağlantıları ve 16 eyalet dizini. Ana sayfa ve soru sayfalarından erişilebilir.
- Sorularda JavaScript olmadan açılabilen cevap bölümü, BAMF kaynağı ve çevirilerin yardımcı içerik olduğuna ilişkin açıklama.
- Ana sayfada bağımsız yayıncı açıklaması, BAMF ve mevcut editoryal politika bağlantısı.
- İngilizce içerik kullanan, henüz çevrilmemiş iki tanıtım sayfasının 20 kopyası: İngilizce canonical, noindex, sitemap dışında. Gerçek Almanca/İngilizce sürümler karşılıklı hreflang kullanır.
- Tutarlı son eğik çizgi; JSON-LD dil kodları BCP 47 biçiminde (`ua` adresi için `uk-UA`); JSON-LD içinde HTML kapanışına karşı güvenli serileştirme.
- OAI-SearchBot için açık erişim. Önceki `User-agent: * / Allow: /` politikası zaten izin veriyordu; bu değişiklik erişim niyetini açık hâle getirir, yeni bir sıralama sinyali değildir. Model eğitimi politikası değişmedi.
- İsteğe bağlı Google/Bing doğrulama etiketleri ve GitHub Actions değişkenleri.
- Her üretim derlemesinden sonra otomatik SEO denetimi: canonical, noindex, sitemap kapsamı, hreflang hedefleri ve karşılıklılığı, JSON-LD, H1, açıklama, soru dizinleri ve cevapların HTML çıktısı.

## Yayın ve ölçüm

1. Değişiklikleri mevcut GitHub Pages iş akışıyla yayımlayın. Yerel dosya değişiklikleri canlı siteyi kendiliğinden güncellemez.
2. Google Search Console ve Bing Webmaster Tools içinde mevcut alan adı mülkünü kullanın. Doğrulama zaten tamamlandıysa yeni etiket gerekmez. Gerekliyse verilen etiketin yalnızca `content` değerini `PUBLIC_GOOGLE_SITE_VERIFICATION` veya `PUBLIC_BING_SITE_VERIFICATION` adlı GitHub repository variable olarak kaydedip yeniden derleyin. DNS doğrulaması da kullanılabilir; kodda sahte doğrulama değeri yoktur.
3. `https://lid-einbuergerung.de/sitemap-index.xml` adresini bu araçlara gönderin. Ana sayfa ve `/de/fragen/`, `/tr/fragen/` gibi yeni dizinleri URL inceleme aracıyla kontrol edin. Binlerce sayfayı tekrar tekrar elle göndermeyin.
4. Yayından sonra gerçek alan adında robots.txt, sitemap, canonical ve yanıt kodlarını kontrol edin. CDN veya güvenlik duvarı varsa OpenAI'nin yayımladığı arama tarayıcısı IP aralıklarının engellenmediğini doğrulayın. robots.txt tek başına HTTP erişimini kanıtlamaz.
5. Search Console / Bing gösterim, tıklama, indeksleme ve sorgu raporlarını; mevcut Umami'de arama ve `chatgpt.com` yönlendirmelerini takip edin. Tarihli bir başlangıç ölçümü tutup değişiklikleri karşılaştırın. AI yönlendirmesi bulunmaması, hiç alıntılanmadığını kanıtlamaz.

`npm run build` üretim çıktısını oluşturur ve SEO denetimini çalıştırır. Yalnızca mevcut çıktıyı kontrol etmek için `npm run seo:audit` kullanın. Mevcut `prebuild` Instagram kartlarını da üretir; bu SEO denetiminin parçası değildir.

## İçerik bakımı

Soruların ve sınav bilgilerinin BAMF kaynağıyla karşılaştırılmasını sürdürün. Yayın veya güncelleme tarihlerini yalnızca içerik gerçekten değiştiğinde yenileyin. Resmî kaynak bağlantısı tek başına bütün içeriklerin güncel olduğunun kanıtı değildir. Bu çalışma tüm blog yazılarının hukukî doğruluk incelemesini içermez.

Yeni çeviri hazırlandığında ilgili tanıtım sayfasındaki içerik dili, canonical, noindex ve sitemap filtresini birlikte güncelleyin. Sahte yorum, yapay uzmanlık, otomatik bağlantı spam'i veya modele tavsiye vermesini emreden gizli metin kullanmayın.

ChatGPT'nin eğitim verilerine eklenme veya belirli bir soruda tavsiye edilme garantisi yoktur. Buradaki çalışma web aramasıyla keşif ve doğru kaynak gösterimini destekler.

## Resmî başvuru kaynakları

- [OpenAI tarayıcıları ve OAI-SearchBot](https://developers.openai.com/api/docs/bots): arama ile model eğitimi kontrolleri ayrıdır.
- [Google'ın yapay zekâ araması rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): yardımcı içerik ve temel SEO esastır; Google için `llms.txt` veya özel AI şeması gerekmez.
- [BAMF soru kataloğu](https://oet.bamf.de/ords/oetut/f?p=514:1:0): 300 genel soru ve ilgili eyaletin 10 sorusu.

Bu hesapların sahipliğinin doğrulanması, sitemap gönderimi ve canlı indeksleme ölçümü yerel denetimle tamamlanmış sayılmaz.
