# Soru açıklamalarını önceliklendirme

İlk sürümde DE/TR/EN açıklamaları 1–30 numaralı genel sorulara eklenmiştir. Bu bir başlangıç kümesidir; Umami yanlış cevap oranı ve Search Console sorgu/sayfa verileri bu çalışma ortamında bulunmadığı için “en zor 30” olduğu iddia edilmez.

Veri erişimi sağlandığında son 28 gün için her genel soruda şu alanları çıkarın:

| Soru ID | Cevap sayısı | Yanlış cevap oranı | GSC gösterim | GSC tıklama | Açıklama var mı? |
|---:|---:|---:|---:|---:|---|

En az 30 cevap alan soruları önce yanlış cevap oranına, eşitlikte Search Console gösterimine göre sıralayın. İlk 30'u editoryal olarak kontrol edin; açıklaması olmayan yeni soruları `src/data/questionExplanations.ts` içine DE/TR/EN, resmî kaynak ve inceleme tarihiyle ekleyin. Sıralama her ay gözden geçirilir; sırf liste değişti diye doğrulanmış açıklama silinmez.
