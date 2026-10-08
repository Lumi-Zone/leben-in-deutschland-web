# App Store ve Google Play kabul listesi

Site tarafındaki tekil ürün adı `Leben in Deutschland 2026 LiD` olarak tanımlıdır. Alternatif ifadeler açıklama ve anahtar kelimelerde kullanılabilir: `Einbürgerungstest App`, `310 Fragen`.

## Ortak ürün mesajı

- 300 genel soru + kullanıcının eyaletine ait 10 soru
- 33 soruluk sınav simülasyonu
- iOS ve Android desteği
- bağımsız hazırlık aracı; BAMF veya resmî sınav merkezi değildir
- web alanı: `https://lid-einbuerung.de`

## Almanca kısa açıklama

Alle 300 allgemeinen Fragen und die 10 Fragen Ihres Bundeslandes üben. Mit 33-Fragen-Simulation, Favoriten und Lernfortschritt. Unabhängige Vorbereitung; keine amtliche BAMF-Prüfung.

## Türkçe kısa açıklama

300 genel soruyu ve eyaletinizin 10 sorusunu çalışın. 33 soruluk deneme, favoriler ve ilerleme takibi. Bağımsız hazırlık aracıdır; resmî BAMF sınavı değildir.

## İngilizce kısa açıklama

Practise all 300 general questions and the 10 questions for your state. Includes 33-question simulations, favourites and progress tracking. Independent study tool; not an official BAMF exam.

## Yayın öncesi manuel kontroller

- App Store Connect ve Play Console'da ad, DE/TR/EN açıklamalar, ekran görüntüleri ve web alanını aynı mesajlarla güncelleyin.
- Play Console > App integrity bölümünden yayın sertifikasının SHA-256 parmak izini alın. `public/.well-known/assetlinks.json` içindeki parmak iziyle birebir karşılaştırın. Paket adı `com.einbuergerungapp` olmalıdır.
- iOS Universal Links için Team ID + bundle ID birleşiminin `4Z5W9NWSK6.org.reactjs.native.example.Einbuergerung` olduğunu imzalı yapıyla doğrulayın.
- Mağaza yorumu isteğini yalnızca tamamlanan çalışma veya sınav oturumundan sonra gösterin. Ödül, baskı, önceden seçilmiş yüksek puan veya tekrar eden istem kullanmayın.
- Mağaza sayfaları yayınlandıktan sonra DE/TR/EN yerelleştirmelerini gerçek cihaz ve mağaza bölgesinde kontrol edin.

