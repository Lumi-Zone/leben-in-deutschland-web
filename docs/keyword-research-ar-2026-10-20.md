# Arapça anahtar kelime araştırması (20 Ekim 2026)

Kaynak: Google Ads Anahtar Kelime Planlayıcı, hesap "Leben in Deutschland" (826-442-9815). Dil **Arabic**. Üç çalıştırma yapıldı ve CSV'ler birleştirildi:

1. Almanya, 10 tohum (اختبار الجنسية، شروط الجنسية، الإقامة الدائمة …) → 90 fikir
2. Tüm konumlar, aynı tohumlar → 90 fikir
3. Tüm konumlar, ikinci set (الامتحان السياسي، امتحان الاندماج، دورة التوجيه، قسم الجنسية …) → 34 fikir

Hacimler yuvarlanmıştır (50.000 / 500 / 50 / 0).

## Temel bulgu

Arapça konuşanlar sınavı **"الامتحان السياسي" (siyasi sınav)** diye arıyor:

- **Ayda 500'er:** الامتحان السياسي في المانيا, اسئلة الامتحان السياسي في المانيا, اسئلة امتحان السياسي في المانيا, نموذج امتحان السياسي في المانيا
- **50'şer, 15'ten fazla varyant:** … pdf, … مترجمة pdf, … بالعربي pdf, امتحان السياسي المانيا, اسئلة الفحص السياسي

Sitenin kullandığı **"اختبار التجنيس" ve "اختبار الجنسية الألمانية" 0 arama** alıyor. Bu, Farsçadan farklı: Arapçada sınav için gerçek ve rekabetsiz bir Google talebi var. Sınavın Almanca adı ("leben in deutschland test", "einbürgerungstest") Arapça filtrede de 50.000.

## Kümeler ve hedef sayfalar

| Küme | Kelimeler (aylık) | Hedef sayfa | Durum |
| --- | --- | --- | --- |
| Siyasi sınav soruları | اسئلة الامتحان السياسي (500 ×2), … مترجمة/بالعربي pdf (50'ler) | `/ar/fragen/` | Başlık: "أسئلة الامتحان السياسي في ألمانيا: الـ300 سؤال مترجمة بالعربي" |
| Deneme sınavı | نموذج امتحان السياسي في المانيا (500) | `/ar/exam/` | Başlık: "نموذج الامتحان السياسي في ألمانيا 2026 \| 33 سؤالًا أونلاين" |
| Sınav genel | الامتحان السياسي في المانيا (500) | Arapça sınav rehberi + 300 soru sayfası | Rehber başlığı "الامتحان السياسي في ألمانيا 2026: شرح بالعربي"; soru sayfası soneki "الامتحان السياسي في ألمانيا 2026" |
| Vatandaşlık şartları | الجنسية الالمانية (500), شروط الحصول على الجنسية الالمانية (500, 4 yazım), شروط الجنسية الالمانية (500), قانون الجنسية الجديد, للاجئين, طلب التجنيس, اوراق الجنسية, مدة الحصول (50'ler) | `/de/blog/einbuergerung-voraussetzungen-auf-arabisch/` | **Yeni** |
| Vatandaşlık yemini | قسم الجنسية الالمانية (500) | aynı rehber, § 16 StAG bölümü | **Yeni** |
| Süresiz oturum | شروط الاقامة الدائمة في المانيا (500), للمتزوجين (500), الاقامة الدائمة (500), للاجئين (50) | aynı rehber, karşılaştırma tablosu (§ 9 AufenthG) | **Yeni**; ayrı rehber için aday |
| Süresiz oturum formu | طلب الإقامة الدائمة في ألمانيا pdf (500) | — | Form şehre göre değişiyor, ele alınmadı |
| Pasaport | الجواز الالماني, الباسبور الالماني, جواز السفر الالماني (500'ler), مميزات, شكل الجواز (50'ler) | — | Sınavla ilgisi zayıf, kapsam dışı |
| Uyum kursu | دورة التوجيه والارشاد (50) | — | Çoğu "rehberlik kursu" anlamında, alakasız |

## Yapılanlar

- **Yeni Arapça rehber:** `/de/blog/einbuergerung-voraussetzungen-auf-arabisch/` (`contentLang: ar`, sağdan sola düzen). İçerik:
  - şart tablosu, 5 yıl kuralı ve 3 yıllık yolun kaldırılması
  - yeni kanun ve çifte vatandaşlık
  - evlilik yoluyla vatandaşlık ve mülteciler (§ 55 AsylG)
  - belgeler ve ücretler
  - **vatandaşlık yemini (§ 16 StAG):** Almanca asıl metin ve Arapça anlamı
  - süresiz oturumla karşılaştırma tablosu
  - `/ar/fragen/`, `/ar/exam/` ve `/ar/app/` bağlantıları
- **Başlıklar:** `/ar/fragen/`, `/ar/` ana sayfa, `/ar/exam/`, 300 Arapça soru sayfasının soneki, Arapça sınav rehberi ve ana sayfadaki rehber kartı.
- Arapça sınav rehberinin girişine "الامتحان السياسي" ifadesi ve yeni rehbere bağlantı eklendi.
- Tüm hukukî dayanaklar 20 Ekim 2026'da gesetze-im-internet.de üzerinden kontrol edildi.

## Ölçüm

Arapça soru sayfaları Bing'de zaten indeksli (15 Ekim: `site:` ile 21 sonuç). 4 hafta sonra kontrol edin:

- Bing ve Google'da "اسئلة الامتحان السياسي" sorgusunda görünürlük
- Search Console'da `/ar/` sorguları
- Umami'de `/ar/fragen/`, `/ar/exam/` ve yeni rehberin giriş sayıları

## Sonraki fırsatlar

1. **PDF niyeti:** "اسئلة الامتحان السياسي مترجمة pdf" ve benzeri 15'ten fazla varyant var. Yazdırılabilir Arapça soru listesi sunmak bu niyeti doğrudan karşılar. Almanca araştırmadaki PDF fırsatıyla birlikte ele alınabilir.
2. Süresiz oturum için ayrı Arapça rehber: evlilik ve mülteci yolları (her biri 500 / 50).
3. Eyalet sayfası başlıklarında da "الامتحان السياسي" kullanılabilir. Şu an "اختبار التجنيس الألماني 2026" kullanılıyor; değiştirmeden önce bir veri noktası daha görmek iyi olur.
