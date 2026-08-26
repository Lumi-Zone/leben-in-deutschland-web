# Günlük X soru otomasyonu

Bu akış, `src/data/questions.json` içindeki 300 **General** sorudan her gün bir Almanca soru seçer, 1080×1080 PNG kart üretir ve `@300Fragen` hesabından paylaşır. Ertesi çalıştırmada önce bir önceki sorunun doğru cevabını o gönderiye yanıt olarak yazar. 160 eyalet (`State`) sorusu bu ilk aşamada paylaşım havuzuna alınmaz.

## Güvenlik özellikleri

- Gerçek paylaşım için hem `--post` hem de `X_ENABLE_POSTING=true` gerekir.
- API ile bağlı hesabın kullanıcı adı `X_ACCOUNT_USERNAME` ile eşleşmezse işlem durur.
- Aynı Berlin takvim gününde ikinci soru paylaşılmaz.
- Aynı anda çalışan zamanlanmış ve telafi işlemleri dosya kilidiyle tekilleştirilir.
- Gönderim sırasında sonuç belirsiz kalırsa yeniden gönderim bloke edilir; bu, çift paylaşımı önler.
- API bilgileri yalnızca Git tarafından yok sayılan `.env.x.local` dosyasından okunur.
- Yalnızca `General` türündeki sorular seçilir; eyalet soruları daha sonraki aşamaya bırakılır.
- Görsel gerektiren 11 genel sorunun kaynak dosyaları `public/question-images/general/` altında tutulur ve soru kartına otomatik olarak yerleştirilir. Böylece 300 genel sorunun tamamı sırayla paylaşılır.
- Her görsele soru ve seçenekleri içeren erişilebilirlik açıklaması (alt text) eklenir.

## X Developer kurulumu

Normal `@300Fragen` hesabıyla `https://console.x.com/` adresine giriş yapın. Developer sözleşmesini kabul edip bir Project ve App oluşturun. Uygulamanın izin türünü **Read and write** yapın. Ardından App sahibi `@300Fragen` için şu dört bilgiyi oluşturun:

- API Key
- API Key Secret
- Access Token
- Access Token Secret

Bu proje için boş `.env.x.local` dosyası hazırlanmıştır; değerleri yalnızca yerel bilgisayarınızdaki bu dosyaya yazın. Anahtarları sohbete göndermeyin ve Git'e eklemeyin. `.env.x.example` yalnızca paylaşılabilir örnek şablondur.

## Komutlar

İlk kartı yalnızca üretmek için:

```sh
npm run social:preview
```

Belirli bir soruyu önizlemek için:

```sh
npm run social:preview -- --question 1
```

Testler:

```sh
npm run social:test
```

Anahtarları kaydettikten sonra, paylaşım yapmadan bağlı hesabı doğrulamak için:

```sh
npm run social:verify
```

Gerçek paylaşım, `.env.x.local` tamamlanıp `X_ENABLE_POSTING=true` yapıldıktan sonra:

```sh
npm run social:daily
```

Yerel durum ve üretilen kartlar `.daily-x/` altında tutulur. Bu klasör Git'e gönderilmez.

## Planlanan çalışma

Paylaşım saati her gün `Europe/Berlin` yerel saatine göre 06:00–23:59 aralığından rastgele seçilir. Yardımcı Codex görevi her gece 00:05'te o günün saat ve dakikasını belirler; asıl paylaşım görevi seçilen saatte yalnızca bir kez çalışır. Codex yerel zamanlanmış görevleri kullanıldığı için bilgisayar açık, ChatGPT masaüstü uygulaması çalışıyor ve proje klasörü erişilebilir olmalıdır.

macOS telafi kontrolü kullanıcı oturumu açıldığında ve her saatin 00, 15, 30 ve 45. dakikalarında çalışır. Planlanan saat geçtiği hâlde o günün gönderisi yoksa paylaşımı başlatır; saat gelmediyse veya gönderi zaten varsa X API çağrısı yapmaz. Uyku sırasında kaçırılan takvim kontrolü Mac uyandığında çalışır. Bilgisayar tamamen kapalıysa `RunAtLoad` sayesinde kullanıcı girişinde kontrol yapılır.
