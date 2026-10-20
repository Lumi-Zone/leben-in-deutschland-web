# Rusça anahtar kelime araştırması (20 Ekim 2026)

Kaynak: Google Ads Anahtar Kelime Planlayıcı, hesap "Leben in Deutschland" (826-442-9815). Dil **Russian**, konum **Almanya** (Rusça konuşanların hedef kitlesi Almanya'da; tüm konumlar Rusya'daki göç aramalarıyla gürültü ekler). İki tohum seti çalıştırıldı ve CSV'ler birleştirildi, toplam **230 benzersiz kelime**:

1. тест на гражданство германии, тест жизнь в германии, лебен ин дойчланд тест, гражданство германии, условия получения гражданства, пмж, немецкий паспорт, айнбюргерунгстест … → 216 fikir
2. тест лебен ин дойчланд, тест на натурализацию, ориентационный курс, тест lid, пробный тест, двойное гражданство … → 44 fikir

Hacimler yuvarlanmıştır (50.000 / 5.000 / 500 / 50).

## Temel bulgu

- **Sınav:** Rusça konuşanlar sınavı en çok **Latin harfli adıyla ve "на русском" ekiyle** arıyor: "test leben in deutschland на русском" 500, "тест leben in deutschland" 500. Kiril yazımların her biri yalnızca 50: тест лебен ин дойчланд, лебен ин дойчланд тест, тест на гражданство германии, тест жизнь в германии, пробный тест, тест на натурализацию.
- **Vatandaşlık:** "гражданство германии" **5.000**, Rusça'daki en büyük kelime.
- **Çifte vatandaşlık:** 500 ve 30'dan fazla 50'lik varyant (Almanya izin veriyor mu, Rusya–Almanya, çocuklar, yeni kanun).
- **Süresiz oturum:** ПМЖ 500, ВНЖ 500, 40'tan fazla varyant (şartlar, evlilik, belgeler, "ne kadar süre yurtdışında kalınabilir").

## Kümeler ve hedef sayfalar

| Küme | Kelimeler (aylık) | Hedef sayfa | Durum |
| --- | --- | --- | --- |
| Rusça sınav | test leben in deutschland на русском (500), тест leben in deutschland (500), вопросы leben in deutschland, тест лебен ин дойчланд (50) | `/ru/fragen/`, `/ru/`, soru sayfaları | Başlık: "Тест Leben in Deutschland на русском: все 300 вопросов с ответами"; soru sayfası soneki "Тест Leben in Deutschland 2026" |
| Deneme sınavı | пробный тест на гражданство германии (50) | `/ru/exam/` | Başlık: "Пробный тест на гражданство Германии 2026 \| 33 вопроса онлайн" |
| Rusça sınav rehberi | — | `/de/blog/einbuergerungstest-auf-russisch-erklaert/` | seoTitle "Тест Leben in Deutschland на русском 2026"; yeni rehbere bağlantı |
| Vatandaşlık | гражданство германии (5.000), условия, как получить, через сколько, за 3 года, новые правила, подать (50'ler) | `/de/blog/einbuergerung-voraussetzungen-auf-russisch/` | **Yeni** |
| Çifte vatandaşlık | двойное гражданство в германии (500) + 30'dan fazla varyant | aynı rehber, ayrı bölüm | **Yeni** |
| Evlilik / mülteci / Ukraynalı | по браку, для беженцев, для украинцев (50'ler) | aynı rehber | **Yeni**; Ukrayna geçici koruma statüsü "kurum kontrol eder" diye geçiyor |
| Çocuğun doğumla vatandaşlığı | гражданство ребенка рожденного в германии, при рождении (50'ler) | aynı rehber (§ 4 Abs. 3 StAG) | **Yeni** |
| ПМЖ / ВНЖ | пмж в германии (500), внж (500), условия, документы, сколько можно отсутствовать (50'ler) | aynı rehber, karşılaştırma tablosu (§ 9 ve § 51 AufenthG) | **Yeni**; ayrı rehber için aday |
| Soy / Spätaussiedler / Yahudi hattı | по происхождению, по еврейской линии, этнические немцы, поздние переселенцы (50'ler) | — | Ayrı hukukî yollar; rehberde yalnızca "kapsam dışı" diye anılıyor |
| Taşınma / göç | переехать в германию, иммигрировать (50'ler) | — | Kapsam dışı |

Hukukî dayanaklar 20 Ekim 2026'da gesetze-im-internet.de üzerinden kontrol edildi: § 4 Abs. 3, § 9, § 10, § 38 StAG; § 55 AsylG; § 9 ve § 51 AufenthG.

## Kod değişikliği

`/[lang]/` ana sayfa başlığı: katalog metni zaten "Leben in Deutschland" içeriyorsa marka iki kez yazılmıyor. Şu an yalnızca `ru` etkileniyor; `de` ve `en`'in kendi başlıkları var.

## Ölçüm

4 hafta sonra kontrol edin:

- Search Console'da `/ru/` sorguları ("на русском" eşleşmeleri)
- Umami'de `/ru/fragen/` ve yeni rehberin girişleri
- Yandex: 15 Ekim'de `/ru/` sayfalarına Yandex'ten trafik vardı. Değişikliklerin oradaki etkisine de bakın.

## Sonraki fırsatlar

1. Ayrı Rusça ПМЖ rehberi: süresiz oturum şartları, belgeler, yurtdışında kalma süresi. 40'tan fazla varyantlık bir küme.
2. Eyalet sayfası başlıkları ("Вопросы земли … | Тест на гражданство 2026") da "Тест Leben in Deutschland" olarak güncellenebilir.
