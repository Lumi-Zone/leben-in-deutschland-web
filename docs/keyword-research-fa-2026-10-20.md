# Farsça anahtar kelime araştırması (20 Ekim 2026)

Kaynak: Google Ads Anahtar Kelime Planlayıcı, hesap "Leben in Deutschland" (826-442-9815). Dil **Persian**. Üç çalıştırma yapıldı ve CSV'ler birleştirildi, toplam 101 benzersiz kelime:

1. Almanya, 10 Farsça/Almanca tohum → 86 fikir
2. Tüm konumlar, aynı tohumlar → 86 fikir (hacimler biraz farklı)
3. Tüm konumlar, ikinci tohum seti (آزمون تابعیت، سوالات لبن این دویچلند، اورینتیرونگ, einbürgerungstest …) → 33 fikir

Hacimler yuvarlanmıştır (50.000 / 500 / 50 / 0).

## Temel bulgu

**Google'da Farsça yazılan sınav aramaları yok denecek kadar az.** "آزمون شهروندی آلمان" ve "امتحان شهروندی المان" 50; "سوالات آزمون شهروندی/تابعیت آلمان", "آزمون/تست لبن این دویچلند", "آزمون اورینتیرونگ" 0. Farsça arayüz kullananlar sınavı **Almanca adıyla** arıyor: "leben in deutschland test" ve "einbürgerungstest" Farsça dil filtresinde de 50.000.

Bu, Umami verisiyle de uyumlu: `/fa/` trafiğinin büyük kısmı Google'dan değil, ChatGPT'den `/fa/fragen/` sayfasına geliyor. Farsça için ana kanal yapay zekâ araması; Google'da ise Farsça sayfaların başlıklarında Almanca sınav adının bulunması önemli. Bu zaten var: `/fa/fragen/` başlığında "Leben in Deutschland" geçiyor.

## Farsça aranan konular

| Küme | Kelimeler (aylık) | Karar |
| --- | --- | --- |
| Pasaport | پاسپورت آلمان (500), پاسپورت آبی آلمان (500), گرفتن/اخذ پاسپورت آلمان, پاسپورت خاکستری, بدون ویزا (50'ler) | Mavi/gri pasaport mülteci seyahat belgeleri. Sınavla ilgisi zayıf, **kapsam dışı**. "Alman pasaportu almak" niyeti vatandaşlık rehberine bağlandı |
| Süresiz oturum (اقامت دائم) | شرایط اقامت دائم آلمان, چند سال لازم است, از طریق ازدواج/پناهندگی/تحصیل/کار, مدارک, هزینه, تفاوت با شهروندی (~25 varyant × 50) | Yeni rehberde karşılaştırma bölümü (§ 9 AufenthG; LiD testi uyum kursunun parçası) |
| Vatandaşlık şartları (شرایط تابعیت/شهروندی) | شرایط تابعیت آلمان, شرایط گرفتن تابعیت, قوانین جدید شهروندی, تابعیت از طریق پناهندگی/ازدواج, مزایای شهروندی (~15 varyant × 50) | **Yeni rehber** |

## Yapılanlar

- Yeni rehber: `/de/blog/einbuergerung-voraussetzungen-auf-persisch/`. Mevcut Farsça açıklama yazısının kalıbında: `contentLang: fa`, sağdan sola düzen. İçerik:
  - şart tablosu ve 5 yıl kuralı
  - 3 yıllık yolun kaldırılması ve diğer yeni kurallar
  - evlilik yoluyla vatandaşlık (§ 9 StAG)
  - mülteciler: sığınma süresi yalnızca tanınma ya da uluslararası koruma alınmışsa sayılır (§ 55 Abs. 3 AsylG); Duldung sayılmaz
  - belgeler ve ücretler
  - süresiz oturumla karşılaştırma tablosu (§ 9 AufenthG)
  - `/fa/fragen/`, `/fa/exam/` ve `/fa/app/` bağlantıları
- Farsça sınav rehberinden yeni yazıya bağlantı.
- `/fa/` ana sayfası artık birden çok Farsça rehberi kendi başlıklarıyla gösteriyor. Kısa kart metni yalnızca sınav rehberinde kullanılıyor. SEO denetimi de buna göre güncellendi: kartlar `contentLang: fa` yazılarına gidebilir, sınav rehberi her zaman listede olmalı.

## Ölçüm

ChatGPT trafiği için Umami'de `utmSource=chatgpt.com` ve `/fa/` ile `/de/blog/einbuergerung-voraussetzungen-auf-persisch/` giriş sayfalarına bakın. Google için Search Console'da bu sayfanın Farsça sorgularda gösterim alıp almadığını kontrol edin. Hacim düşük olduğu için birkaç hafta sürebilir.

## Sonraki fırsatlar

- Süresiz oturum (اقامت دائم) konusunda ayrı ve daha ayrıntılı bir Farsça rehber: çalışma, eğitim ve evlilik yolları. Her yolun kuralları ayrı ayrı doğrulanmalı.
- Aynı yaklaşım Arapça için de uygulanmalı (`/ar/` de ChatGPT'den trafik alıyor). Farsçada olduğu gibi Google hacminin düşük çıkması muhtemel.
