# Ukraynaca anahtar kelime araştırması (20 Ekim 2026)

Kaynak: Google Ads Anahtar Kelime Planlayıcı, hesap "Leben in Deutschland" (826-442-9815). Dil **Ukrainian**, konum **Almanya**. İki tohum seti çalıştırıldı ve CSV'ler birleştirildi, toplam **67 benzersiz kelime**:

1. тест на громадянство німеччини, питання тесту, тест leben in deutschland, лебен ін дойчланд тест, громадянство німеччини, умови, пмж, тимчасовий захист, орієнтаційний курс → 39 fikir
2. тест лебен ін дойчланд, leben in deutschland українською, німецьке громадянство, подвійне громадянство, параграф 24, інтеграційний курс, вид на проживання, натуралізація → 29 fikir

Hacimler yuvarlanmıştır (50.000 / 500 / 50 / 0).

## Temel bulgu

- **Ukraynaca sınav aramaları yok denecek kadar az.** "тест на громадянство німеччини", "питання тесту на громадянство", "тест лебен ін дойчланд" ve "лебен ін дойчланд тест" 0; "leben in deutschland українською" 50.
- **Ukraynaca arayüz kullananlar sınavı Rusça arıyor:** "test leben in deutschland на русском" ve "тест leben in deutschland" 500'er. Rusça sayfa başlıklarındaki "на русском" ifadesi bu kitleye de ulaşıyor.
- **Asıl Ukraynaca talep geçici koruma (параграф 24 / тимчасовий захист):** "параграф 24 німеччина для українців" ve "тимчасовий захист німеччина" 500'er, ayrıca 25'ten fazla 50'lik varyant (şartlar, kayıt, Ukrayna'ya seyahat, statü).
- **Vatandaşlık ve ПМЖ için yalnızca 50'lik aramalar var:** громадянство німеччини для українців, чи може біженець отримати громадянство, пмж для українців, подвійне громадянство україна німеччина.

## Önemli hukukî nokta

**§ 24 AufenthG (geçici koruma) ile doğrudan vatandaşlık mümkün değil.** § 10 Abs. 1 Nr. 2 StAG § 24'ü açıkça hariç tutuyor. Önce başka bir oturum izni gerekiyor: ПМЖ, Blue Card veya istisna listesinde olmayan bir başka izin. AB, geçici korumayı 4 Mart 2027'ye kadar uzattı (Uygulama Kararı (AB) 2025/1460). Bu nokta, Rusça rehberde belirsiz bırakılmıştı ("kurum kontrol eder"); düzeltildi.

## Yapılanlar

- **Yeni Ukraynaca rehber:** `/de/blog/einbuergerung-voraussetzungen-auf-ukrainisch/` ("Громадянство Німеччини для українців: параграф 24 і умови"), `contentLang: uk`. İçerik:
  - § 24 ile neden doğrudan vatandaşlık olmadığı ve koruma süresi
  - şartlar tablosu, 5 yıl kuralı ve 3 yıllık yolun kaldırılması
  - Ukrayna–Almanya çifte vatandaşlığı (Ukrayna hukuku için konsolosluğa yönlendirme)
  - B1 ve sınav, belgeler ve ücretler
  - süresiz oturumla karşılaştırma (§ 9 ve § 51 AufenthG)
  - `/ua/fragen/`, `/ua/exam/` ve `/ua/app/` bağlantıları
- **Başlıklar:** `/ua/fragen/` ve `/ua/` "Тест Leben in Deutschland українською: усі 300 запитань з відповідями"; soru sayfası soneki "Тест Leben in Deutschland 2026"; Ukraynaca sınav rehberinin seoTitle'ı.
- Ukraynaca sınav rehberinden yeni yazıya bağlantı eklendi.
- Rusça rehberde § 24 cümlesi kesinleştirildi.

## Build notu

`npm run build`, bu çalışmadan bağımsız 4 kırık bağlantı yüzünden link denetiminde durdu. Kırık bağlantılar paralel eklenen `einbuergerung-abgelehnt-23-fragen-peine-urteil` ve `einbuergerung-niedersachsen-bekenntnis-befragung` dosyalarının EN/TR sürümlerinde. Henüz var olmayan EN/TR çevirilerine bağlanıyorlar. SEO denetimi geçti.

## Sonraki fırsatlar

- **Ukraynaca § 24 rehberi:** geçici korumadan sonra hangi oturum izinlerine geçilebileceği (çalışma, eğitim), 2027 sonrası ve Ukrayna'ya seyahat. 25'ten fazla varyantlık bir küme. Uygulamaya dönüşümü düşük olabilir; sınavla bağlantısı süresiz oturum ve uyum kursu üzerinden kurulmalı.
- Ukraynalı kullanıcılar Rusça arama yaptığı için `/ru/` sayfalarında Ukraynalılara yönelik içerik (§ 24 notu) faydalı.
