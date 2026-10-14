// Longer, question-specific explanations for the most visited question pages.
// Each entry adds background, why the other options are wrong and a memory tip
// on top of the short text in questionExplanations.ts. Add languages per entry
// as they are written; pages without an entry for their language show only the
// short explanation.

export interface LegalBasis { label: string; url: string }
export interface QuestionDeepDive {
  background: string;
  otherOptions: string;
  memoryTip: string;
  legalBasis: LegalBasis[];
}

type DeepDiveLanguage = 'de' | 'en' | 'tr';

const law = (label: string, path: string): LegalBasis => ({ label, url: `https://www.gesetze-im-internet.de/${path}` });

const deepDives: Record<number, Partial<Record<DeepDiveLanguage, QuestionDeepDive>>> = {
  1: {
    de: {
      background: 'Die Meinungsfreiheit steht in Artikel 5 des Grundgesetzes. Jeder Mensch darf seine Meinung in Wort, Schrift und Bild frei äußern – auch dann, wenn sie der Regierung nicht gefällt. Kritik an Politikerinnen und Politikern, Demonstrationen und kritische Zeitungsartikel gehören deshalb zum normalen Alltag in Deutschland. Grenzen gibt es trotzdem: Beleidigungen, Verleumdungen oder Volksverhetzung sind strafbar. Wer sachlich oder auch scharf kritisiert, ist aber geschützt.',
      otherOptions: 'Religionsfreiheit (Artikel 4) schützt den Glauben, nicht politische Äußerungen. Steuern zu zahlen gibt kein besonderes Recht auf Kritik – die Meinungsfreiheit gilt auch für Menschen ohne Einkommen. Das Wahlrecht ist eine Falle: Es ist ebenfalls ein demokratisches Recht, betrifft aber die Stimmabgabe bei Wahlen und nicht das offene Sprechen.',
      memoryTip: 'Achte auf das Wort „sagen“: Wer etwas sagen darf, hat Meinungsfreiheit.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
    en: {
      background: 'Freedom of expression is set out in Article 5 of the Basic Law. Everyone may freely express their opinion in speech, writing and pictures – even when the government does not like it. Criticising politicians, demonstrating and publishing critical newspaper articles are therefore part of everyday life in Germany. There are still limits: insults, defamation and incitement to hatred are criminal offences. Factual or even sharp criticism, however, is protected.',
      otherOptions: 'Freedom of religion (Article 4) protects belief, not political statements. Paying taxes does not give anyone a special right to criticise – freedom of expression also applies to people without an income. The right to vote is a trap: it is also a democratic right, but it concerns casting a vote in elections, not speaking openly.',
      memoryTip: 'Look for the word “speak”: whoever may speak freely has freedom of expression.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html')],
    },
    tr: {
      background: 'İfade özgürlüğü Anayasa’nın (Grundgesetz) 5. maddesinde yer alır. Herkes görüşünü sözlü, yazılı ve görsel olarak özgürce ifade edebilir – hükümetin hoşuna gitmese bile. Bu yüzden politikacıları eleştirmek, gösteri yapmak ve eleştirel gazete yazıları yayımlamak Almanya’da gündelik hayatın parçasıdır. Yine de sınırlar vardır: hakaret, iftira ve halkı kin ve nefrete kışkırtma suçtur. Ancak nesnel, hatta sert eleştiri korunur.',
      otherOptions: 'Din özgürlüğü (madde 4) inancı korur, siyasi açıklamaları değil. Vergi ödemek eleştiri için özel bir hak vermez – ifade özgürlüğü geliri olmayan insanlar için de geçerlidir. Seçme hakkı bir tuzaktır: O da demokratik bir haktır, ama seçimlerde oy kullanmakla ilgilidir, açıkça konuşmakla değil.',
      memoryTip: '“Söylemek” kelimesine dikkat et: Bir şey söyleyebilen kişinin ifade özgürlüğü vardır.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html')],
    },
  },
  2: {
    de: {
      background: 'Religionsunterricht ist an den meisten öffentlichen Schulen ein ordentliches Schulfach (Artikel 7 Grundgesetz). Weil Religion eine persönliche Gewissensfrage ist, darf aber niemand zur Teilnahme gezwungen werden. Bis zum 14. Geburtstag entscheiden die Eltern, ob ihr Kind teilnimmt. Ab 14 ist ein Kind „religionsmündig“ und entscheidet selbst über seine Religion und damit auch über den Religionsunterricht. Wer nicht teilnimmt, besucht meist ein Ersatzfach wie Ethik oder „Werte und Normen“.',
      otherOptions: 'Geschichte, Politik und Sprachen sind Pflichtfächer. Eltern können ihr Kind davon nicht einfach abmelden, weil der Staat einen Bildungsauftrag hat. Nur beim Religionsunterricht gibt es diese Wahlfreiheit, weil hier die Glaubensfreiheit berührt ist.',
      memoryTip: '14 und Religion gehören zusammen: Mit 14 entscheidet das Kind selbst über seinen Glauben.',
      legalBasis: [law('Art. 7 GG', 'gg/art_7.html'), law('§ 5 Gesetz über die religiöse Kindererziehung', 'kerzg/__5.html')],
    },
    en: {
      background: 'Religious education is a regular school subject in most state schools (Article 7 of the Basic Law). Because religion is a personal matter of conscience, nobody may be forced to take part. Until the child’s 14th birthday, the parents decide whether the child attends. From the age of 14, a child is considered “of religious age” and decides on their own religion – and therefore on religious education. Pupils who do not attend usually take a substitute subject such as ethics.',
      otherOptions: 'History, politics and languages are compulsory subjects. Parents cannot simply withdraw their child from them, because the state has an educational mandate. Only religious education offers this choice, because freedom of belief is involved.',
      memoryTip: '14 and religion belong together: at 14, the child decides on their own faith.',
      legalBasis: [law('Art. 7 Basic Law (GG)', 'gg/art_7.html'), law('Sec. 5 Religious Education of Children Act', 'kerzg/__5.html')],
    },
    tr: {
      background: 'Din dersi çoğu devlet okulunda normal bir derstir (Anayasa madde 7). Ama din kişisel bir vicdan meselesi olduğu için kimse derse katılmaya zorlanamaz. Çocuk 14 yaşına girene kadar derse katılıp katılmayacağına ebeveynler karar verir. 14 yaşından itibaren çocuk dinî açıdan reşit sayılır; kendi dinine ve dolayısıyla din dersine kendisi karar verir. Derse katılmayan öğrenciler genellikle etik gibi bir alternatif derse girer.',
      otherOptions: 'Tarih, siyaset ve dil dersleri zorunludur. Devletin eğitim görevi olduğu için ebeveynler çocuklarını bu derslerden kolayca muaf tutamaz. Bu seçim hakkı yalnızca din dersinde vardır, çünkü burada inanç özgürlüğü söz konusudur.',
      memoryTip: '14 ve din birlikte gider: Çocuk 14 yaşında kendi inancına kendisi karar verir.',
      legalBasis: [law('Anayasa (GG) md. 7', 'gg/art_7.html'), law('Çocukların Dinî Eğitimi Kanunu § 5', 'kerzg/__5.html')],
    },
  },
  3: {
    de: {
      background: 'Rechtsstaat bedeutet: Das Recht steht über allen – über den Einwohnerinnen und Einwohnern, aber auch über dem Staat selbst. Regierung, Behörden und Polizei dürfen nur handeln, wenn ein Gesetz es erlaubt (Artikel 20 Absatz 3 Grundgesetz). Wer sich von einer Behörde ungerecht behandelt fühlt, kann vor einem unabhängigen Gericht klagen. Das schützt vor Willkür, denn kein Amt und keine Politikerin steht über dem Gesetz.',
      otherOptions: 'Dass der Staat sich nicht an Gesetze halten muss, wäre das Gegenteil eines Rechtsstaats. Gesetze gelten für alle Menschen in Deutschland, nicht nur für Deutsche. Und Gerichte machen keine Gesetze: Das tun die Parlamente (Bundestag, Bundesrat, Landtage). Gerichte wenden die Gesetze an – das nennt man Gewaltenteilung.',
      memoryTip: 'Rechtsstaat = Recht gilt für alle, auch für den Staat.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'The rule of law means that the law stands above everyone – above the residents, but also above the state itself. The government, authorities and police may only act if a law allows it (Article 20(3) of the Basic Law). Anyone who feels treated unfairly by an authority can take the matter to an independent court. This protects against arbitrary decisions, because no office and no politician is above the law.',
      otherOptions: 'A state that does not have to obey the law would be the opposite of the rule of law. Laws apply to everyone in Germany, not only to Germans. And courts do not make laws: that is the job of the parliaments (Bundestag, Bundesrat, state parliaments). Courts apply the laws – this is called the separation of powers.',
      memoryTip: 'Rule of law = the law applies to everyone, including the state.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Hukuk devleti, hukukun herkesin üstünde olması demektir – sadece halkın değil, devletin de. Hükümet, resmî kurumlar ve polis ancak bir yasa izin verirse harekete geçebilir (Anayasa madde 20, fıkra 3). Bir kurumdan haksızlık gördüğünü düşünen herkes bağımsız bir mahkemeye başvurabilir. Bu keyfî kararlara karşı korur; çünkü hiçbir makam ve hiçbir politikacı yasanın üstünde değildir.',
      otherOptions: 'Devletin yasalara uymak zorunda olmaması hukuk devletinin tam tersi olurdu. Yasalar sadece Almanlar için değil, Almanya’daki herkes için geçerlidir. Mahkemeler de yasa yapmaz: Bu, parlamentoların (Federal Meclis, Federal Konsey, eyalet meclisleri) görevidir. Mahkemeler yasaları uygular – buna kuvvetler ayrılığı denir.',
      memoryTip: 'Hukuk devleti = Hukuk herkes için geçerlidir, devlet için de.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  4: {
    de: {
      background: 'Die Grundrechte stehen am Anfang des Grundgesetzes in den Artikeln 1 bis 19. Die Meinungsfreiheit (Artikel 5) gehört zu den wichtigsten davon, weil eine Demokratie ohne freie Diskussion nicht funktioniert. Grundrechte schützen die Menschen vor allem vor dem Staat: Er darf sie nur in engen Grenzen und nur durch ein Gesetz einschränken.',
      otherOptions: 'Waffenbesitz ist in Deutschland kein Grundrecht – anders als oft in den USA. Wer eine Waffe besitzen will, braucht eine behördliche Erlaubnis nach dem Waffengesetz. Faustrecht und Selbstjustiz bedeuten, sich mit Gewalt selbst „Recht“ zu verschaffen. Das ist verboten, denn in Deutschland hat nur der Staat das Gewaltmonopol: Polizei und Gerichte setzen das Recht durch.',
      memoryTip: 'Drei Antworten haben mit Gewalt zu tun – das Grundrecht ist die einzige friedliche Antwort.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
    en: {
      background: 'The fundamental rights are at the beginning of the Basic Law, in Articles 1 to 19. Freedom of expression (Article 5) is one of the most important, because a democracy cannot work without free debate. Fundamental rights mainly protect people from the state: it may only restrict them within narrow limits and only by law.',
      otherOptions: 'Owning weapons is not a fundamental right in Germany – unlike what many people know from the USA. Anyone who wants to own a weapon needs a permit under the Weapons Act. “Fist law” and vigilante justice mean using violence to get “justice” yourself. This is forbidden, because in Germany only the state has a monopoly on the use of force: the police and courts enforce the law.',
      memoryTip: 'Three answers have to do with violence – the fundamental right is the only peaceful answer.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html')],
    },
    tr: {
      background: 'Temel haklar Anayasa’nın başında, 1 ile 19. maddeler arasında yer alır. İfade özgürlüğü (madde 5) bunların en önemlilerinden biridir, çünkü özgür tartışma olmadan demokrasi işlemez. Temel haklar insanları özellikle devlete karşı korur: Devlet bu hakları ancak dar sınırlar içinde ve yalnızca bir yasayla kısıtlayabilir.',
      otherOptions: 'Silah sahibi olmak Almanya’da temel bir hak değildir – ABD’den bilinenin aksine. Silah sahibi olmak isteyen kişi Silah Kanunu’na göre resmî izin almak zorundadır. Kaba kuvvet hukuku ve kendi adaletini sağlamak, “hakkını” zor kullanarak kendin almak demektir. Bu yasaktır, çünkü Almanya’da güç kullanma tekeli yalnızca devlettedir: Hukuku polis ve mahkemeler uygular.',
      memoryTip: 'Üç cevap şiddetle ilgili – temel hak tek barışçıl cevaptır.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html')],
    },
  },
  5: {
    de: {
      background: 'Für Bundestagswahlen nennt das Grundgesetz fünf Wahlgrundsätze: allgemein, unmittelbar, frei, gleich und geheim (Artikel 38). „Frei“ heißt: Niemand darf Wählerinnen und Wähler unter Druck setzen, bestechen oder bedrohen, und niemand darf wegen seiner Stimme Nachteile haben. Zur freien Wahl gehört auch, dass man gar nicht wählen gehen muss.',
      otherOptions: 'Geld für eine bestimmte Stimme anzunehmen ist Wählerbestechung und strafbar. Auch Menschen, die im Gefängnis waren oder sind, dürfen in der Regel wählen – nur ein Gericht kann das Wahlrecht in seltenen Fällen entziehen. Eine Wahlpflicht gibt es in Deutschland nicht, anders als zum Beispiel in Belgien.',
      memoryTip: 'Die fünf Wahlgrundsätze: allgemein, unmittelbar, frei, gleich, geheim. „Frei“ heißt: ohne Druck und ohne Pflicht.',
      legalBasis: [law('Art. 38 GG', 'gg/art_38.html')],
    },
    en: {
      background: 'For federal elections, the Basic Law sets out five electoral principles: general, direct, free, equal and secret (Article 38). “Free” means that nobody may pressure, bribe or threaten voters, and nobody may suffer disadvantages because of their vote. A free election also means that you do not have to vote at all.',
      otherOptions: 'Accepting money for a particular vote is vote buying and a criminal offence. People who have been or are in prison are usually allowed to vote as well – only a court can take away the right to vote, and only in rare cases. Germany has no compulsory voting, unlike Belgium, for example.',
      memoryTip: 'The five electoral principles: general, direct, free, equal, secret. “Free” means without pressure and without obligation.',
      legalBasis: [law('Art. 38 Basic Law (GG)', 'gg/art_38.html')],
    },
    tr: {
      background: 'Federal seçimler için Anayasa beş seçim ilkesi belirler: genel, doğrudan, serbest, eşit ve gizli (madde 38). “Serbest”, kimsenin seçmenlere baskı yapamayacağı, rüşvet veremeyeceği veya onları tehdit edemeyeceği ve kimsenin verdiği oy yüzünden zarar görmeyeceği anlamına gelir. Serbest seçim, oy kullanmaya hiç gitmeme hakkını da kapsar.',
      otherOptions: 'Belirli bir oy için para almak seçmen rüşvetidir ve suçtur. Cezaevinde bulunmuş veya hâlâ bulunan kişiler de genellikle oy kullanabilir – seçme hakkını yalnızca bir mahkeme, nadir durumlarda elinden alabilir. Almanya’da, örneğin Belçika’nın aksine, zorunlu oy yoktur.',
      memoryTip: 'Beş seçim ilkesi: genel, doğrudan, serbest, eşit, gizli. “Serbest”: baskı olmadan ve zorunluluk olmadan.',
      legalBasis: [law('Anayasa (GG) md. 38', 'gg/art_38.html')],
    },
  },
  6: {
    de: {
      background: 'Die deutsche Verfassung heißt Grundgesetz (GG). Der Parlamentarische Rat hat es in Bonn ausgearbeitet; am 23. Mai 1949 wurde es verkündet. Den Namen „Verfassung“ hat man bewusst vermieden, weil Deutschland damals geteilt war und das Grundgesetz nur vorläufig gelten sollte, bis ganz Deutschland eine Verfassung beschließt. Seit der Wiedervereinigung 1990 gilt das Grundgesetz für ganz Deutschland. Der 23. Mai ist deshalb der „Tag des Grundgesetzes“.',
      otherOptions: 'Ein Bundesgesetz ist ein normales Gesetz, das Bundestag und Bundesrat beschließen, zum Beispiel das Staatsangehörigkeitsgesetz. Es steht unter dem Grundgesetz und darf ihm nicht widersprechen. „Volksgesetz“ und „Deutsches Gesetz“ gibt es nicht.',
      memoryTip: 'Grundgesetz = die Grundlage aller Gesetze. Abkürzung: GG.',
      legalBasis: [law('Art. 146 GG', 'gg/art_146.html')],
    },
    en: {
      background: 'The German constitution is called the Basic Law (Grundgesetz, GG). It was drafted by the Parliamentary Council in Bonn and promulgated on 23 May 1949. The word “constitution” was avoided on purpose, because Germany was divided at the time and the Basic Law was meant to apply only until all of Germany adopted a constitution. Since reunification in 1990, the Basic Law has applied to the whole of Germany. 23 May is therefore “Basic Law Day”.',
      otherOptions: 'A federal law is an ordinary law passed by the Bundestag and Bundesrat, for example the Nationality Act. It ranks below the Basic Law and must not contradict it. A “People’s Law” or a “German Law” does not exist.',
      memoryTip: 'Grundgesetz = the foundation (“Grund”) of all laws. Abbreviation: GG.',
      legalBasis: [law('Art. 146 Basic Law (GG)', 'gg/art_146.html')],
    },
    tr: {
      background: 'Alman anayasasının adı Grundgesetz’tir (GG, “Temel Yasa”). Parlamenter Konsey tarafından Bonn’da hazırlandı ve 23 Mayıs 1949’da ilan edildi. “Anayasa” kelimesinden bilerek kaçınıldı; çünkü Almanya o dönemde bölünmüştü ve Grundgesetz’in, bütün Almanya bir anayasa kabul edene kadar geçici olarak geçerli olması düşünülmüştü. 1990’daki yeniden birleşmeden beri Grundgesetz tüm Almanya’da geçerlidir. Bu yüzden 23 Mayıs “Anayasa Günü”dür.',
      otherOptions: 'Federal yasa (Bundesgesetz), Federal Meclis ve Federal Konsey’in çıkardığı normal bir yasadır; örneğin Vatandaşlık Kanunu. Grundgesetz’in altında yer alır ve ona aykırı olamaz. “Volksgesetz” ve “Deutsches Gesetz” diye bir şey yoktur.',
      memoryTip: 'Grundgesetz = bütün yasaların temeli (“Grund”). Kısaltması: GG.',
      legalBasis: [law('Anayasa (GG) md. 146', 'gg/art_146.html')],
    },
  },
  7: {
    de: {
      background: 'Artikel 4 des Grundgesetzes garantiert die Glaubens- und Gewissensfreiheit. Jeder Mensch darf frei entscheiden, ob und woran er glaubt, darf seine Religion ausüben, wechseln oder keine Religion haben. Der Staat ist dabei neutral: Es gibt keine Staatskirche, und niemand darf wegen seines Glaubens benachteiligt werden. Zur Gewissensfreiheit gehört auch das Recht, den Kriegsdienst mit der Waffe zu verweigern.',
      otherOptions: 'Ein Recht auf Arbeit, auf Wohnung oder auf Unterhaltung steht nicht im Grundgesetz. Es gibt die Berufsfreiheit (Artikel 12): Man darf seinen Beruf frei wählen – der Staat muss aber keinen Arbeitsplatz garantieren. Einige Landesverfassungen nennen Arbeit oder Wohnung als Staatsziel, einklagbare Grundrechte sind das jedoch nicht.',
      memoryTip: 'Grundrechte sind meistens Freiheiten („frei glauben, frei sagen“), keine Ansprüche auf Dinge wie Wohnung oder Arbeit.',
      legalBasis: [law('Art. 4 GG', 'gg/art_4.html')],
    },
    en: {
      background: 'Article 4 of the Basic Law guarantees freedom of faith and conscience. Everyone may freely decide whether and what they believe, practise their religion, change it or have no religion at all. The state remains neutral: there is no state church, and nobody may be disadvantaged because of their faith. Freedom of conscience also includes the right to refuse military service with weapons.',
      otherOptions: 'A right to work, to housing or to entertainment is not in the Basic Law. There is freedom of occupation (Article 12): you may freely choose your profession – but the state does not have to guarantee you a job. Some state constitutions name work or housing as state objectives, but these are not enforceable fundamental rights.',
      memoryTip: 'Fundamental rights are mostly freedoms (“believe freely, speak freely”), not claims to things like housing or work.',
      legalBasis: [law('Art. 4 Basic Law (GG)', 'gg/art_4.html')],
    },
    tr: {
      background: 'Anayasa’nın 4. maddesi inanç ve vicdan özgürlüğünü güvence altına alır. Herkes bir şeye inanıp inanmayacağına ve neye inanacağına özgürce karar verebilir; dinini yaşayabilir, değiştirebilir ya da hiçbir dine bağlı olmayabilir. Devlet bu konuda tarafsızdır: Devlet kilisesi yoktur ve kimse inancı yüzünden dezavantajlı duruma düşürülemez. Vicdan özgürlüğüne silahlı askerlik hizmetini reddetme hakkı da dahildir.',
      otherOptions: 'Çalışma hakkı, konut hakkı veya eğlence hakkı Anayasa’da yer almaz. Meslek özgürlüğü vardır (madde 12): Mesleğini özgürce seçebilirsin – ama devlet sana iş garantisi vermek zorunda değildir. Bazı eyalet anayasaları çalışmayı veya konutu devletin hedefleri arasında sayar, ancak bunlar mahkemede talep edilebilecek temel haklar değildir.',
      memoryTip: 'Temel haklar çoğunlukla özgürlüklerdir (“özgürce inan, özgürce söyle”), konut veya iş gibi şeyler üzerinde talep hakkı değildir.',
      legalBasis: [law('Anayasa (GG) md. 4', 'gg/art_4.html')],
    },
  },
  8: {
    de: {
      background: 'Die drei richtigen Sätze stammen fast wörtlich aus dem Grundgesetz: „Die Würde des Menschen ist unantastbar“ (Artikel 1), „Alle Menschen sind vor dem Gesetz gleich“ (Artikel 3) und die Meinungsfreiheit (Artikel 5). Deutschland ist zwar ein Sozialstaat (Artikel 20): Er hilft Menschen in Not, etwa mit Bürgergeld oder Krankenversicherung. Gleiches Einkommen für alle verspricht das Grundgesetz aber nicht.',
      otherOptions: '„Alle sollen gleich viel Geld haben“ beschreibt eine Idee, die es im Grundgesetz nicht gibt. In Deutschland gelten Eigentum (Artikel 14) und Berufsfreiheit; Einkommen dürfen unterschiedlich sein. Gleichheit bedeutet im Grundgesetz gleiche Rechte, nicht gleiches Geld.',
      memoryTip: 'Gleich vor dem Gesetz – ja. Gleich viel Geld – nein.',
      legalBasis: [law('Art. 1 GG', 'gg/art_1.html'), law('Art. 3 GG', 'gg/art_3.html')],
    },
    en: {
      background: 'The three correct statements come almost word for word from the Basic Law: “Human dignity shall be inviolable” (Article 1), “All persons shall be equal before the law” (Article 3) and freedom of expression (Article 5). Germany is a social state (Article 20): it helps people in need, for example with citizen’s income (Bürgergeld) or health insurance. But the Basic Law does not promise the same income for everyone.',
      otherOptions: '“Everyone should have the same amount of money” describes an idea that is not in the Basic Law. Property (Article 14) and freedom of occupation apply in Germany, and incomes may differ. In the Basic Law, equality means equal rights, not equal money.',
      memoryTip: 'Equal before the law – yes. Equal money – no.',
      legalBasis: [law('Art. 1 Basic Law (GG)', 'gg/art_1.html'), law('Art. 3 Basic Law (GG)', 'gg/art_3.html')],
    },
    tr: {
      background: 'Doğru olan üç cümle neredeyse kelimesi kelimesine Anayasa’dan alınmıştır: “İnsan onuru dokunulmazdır” (madde 1), “Herkes yasa önünde eşittir” (madde 3) ve ifade özgürlüğü (madde 5). Almanya bir sosyal devlettir (madde 20): Zor durumdaki insanlara, örneğin Bürgergeld (vatandaş geliri) veya sağlık sigortası ile yardım eder. Ama Anayasa herkese aynı geliri vaat etmez.',
      otherOptions: '“Herkesin eşit miktarda parası olmalı” Anayasa’da bulunmayan bir fikirdir. Almanya’da mülkiyet hakkı (madde 14) ve meslek özgürlüğü geçerlidir; gelirler farklı olabilir. Anayasa’da eşitlik, eşit para değil eşit haklar demektir.',
      memoryTip: 'Yasa önünde eşitlik – evet. Eşit para – hayır.',
      legalBasis: [law('Anayasa (GG) md. 1', 'gg/art_1.html'), law('Anayasa (GG) md. 3', 'gg/art_3.html')],
    },
  },
  9: {
    de: {
      background: 'Artikel 16a des Grundgesetzes sagt: „Politisch Verfolgte genießen Asylrecht.“ Asyl schützt Menschen, die in ihrem Herkunftsland wegen ihrer politischen Meinung, Religion oder Herkunft verfolgt werden. Deutsche brauchen diesen Schutz in Deutschland nicht – deshalb gilt das Asylrecht nur für Ausländerinnen und Ausländer. In der Praxis erhalten viele Geflüchtete Schutz auch nach der Genfer Flüchtlingskonvention.',
      otherOptions: 'Menschenwürde (Artikel 1), Schutz der Familie (Artikel 6) und Meinungsfreiheit (Artikel 5) sind Menschenrechte: Sie gelten für alle Menschen in Deutschland, egal welche Staatsangehörigkeit sie haben. Umgekehrt gibt es einige Rechte nur für Deutsche, zum Beispiel die Versammlungsfreiheit nach Artikel 8.',
      memoryTip: 'Asyl ist Schutz vor Verfolgung im Herkunftsland – den brauchen nur Menschen aus anderen Ländern.',
      legalBasis: [law('Art. 16a GG', 'gg/art_16a.html')],
    },
    en: {
      background: 'Article 16a of the Basic Law states: “Persons persecuted on political grounds shall have the right of asylum.” Asylum protects people who are persecuted in their country of origin because of their political opinion, religion or origin. Germans do not need this protection in Germany – that is why the right of asylum only applies to foreigners. In practice, many refugees also receive protection under the Geneva Refugee Convention.',
      otherOptions: 'Human dignity (Article 1), protection of the family (Article 6) and freedom of expression (Article 5) are human rights: they apply to everyone in Germany, whatever their nationality. Conversely, some rights apply only to Germans, for example freedom of assembly under Article 8.',
      memoryTip: 'Asylum is protection from persecution in your home country – only people from other countries need it.',
      legalBasis: [law('Art. 16a Basic Law (GG)', 'gg/art_16a.html')],
    },
    tr: {
      background: 'Anayasa’nın 16a maddesi şöyle der: “Siyasi nedenlerle zulme uğrayanlar sığınma hakkına sahiptir.” Sığınma (iltica), siyasi görüşü, dini veya kökeni nedeniyle kendi ülkesinde zulme uğrayan insanları korur. Almanların Almanya’da bu korumaya ihtiyacı yoktur – bu yüzden sığınma hakkı yalnızca yabancılar için geçerlidir. Uygulamada birçok mülteci Cenevre Mülteci Sözleşmesi kapsamında da koruma alır.',
      otherOptions: 'İnsan onuru (madde 1), ailenin korunması (madde 6) ve ifade özgürlüğü (madde 5) insan haklarıdır: Vatandaşlığı ne olursa olsun Almanya’daki herkes için geçerlidir. Tersine, bazı haklar yalnızca Almanlar için geçerlidir; örneğin 8. maddedeki toplanma özgürlüğü.',
      memoryTip: 'Sığınma, kendi ülkendeki zulme karşı korumadır – buna yalnızca başka ülkelerden gelen insanlar ihtiyaç duyar.',
      legalBasis: [law('Anayasa (GG) md. 16a', 'gg/art_16a.html')],
    },
  },
  10: {
    de: {
      background: 'Eine Geldstrafe ist eine ganz normale Strafe im deutschen Strafrecht: Ein Gericht verurteilt eine Person dazu, eine bestimmte Summe zu zahlen. Das ist mit dem Grundgesetz vereinbar. Die Todesstrafe hat das Grundgesetz dagegen ausdrücklich abgeschafft (Artikel 102: „Die Todesstrafe ist abgeschafft.“). Grundlage ist die Menschenwürde in Artikel 1, die der Staat immer achten muss.',
      otherOptions: 'Folter verletzt die Menschenwürde und ist ausnahmslos verboten, auch bei Verdacht auf schwere Straftaten. Festgehaltene Personen dürfen weder seelisch noch körperlich misshandelt werden (Artikel 104). Prügelstrafen gibt es in Deutschland nicht; auch Eltern dürfen ihre Kinder nicht schlagen.',
      memoryTip: 'Nur eine Antwort tut niemandem körperlich weh: die Geldstrafe.',
      legalBasis: [law('Art. 102 GG', 'gg/art_102.html'), law('Art. 1 GG', 'gg/art_1.html')],
    },
    en: {
      background: 'A fine is a completely normal penalty under German criminal law: a court orders a person to pay a certain amount of money. This is compatible with the Basic Law. The death penalty, on the other hand, was explicitly abolished by the Basic Law (Article 102: “Capital punishment is abolished.”). The basis for this is human dignity in Article 1, which the state must always respect.',
      otherOptions: 'Torture violates human dignity and is forbidden without exception, even when serious crimes are suspected. Detained persons may not be subjected to mental or physical mistreatment (Article 104). Corporal punishment does not exist in Germany; parents are not allowed to hit their children either.',
      memoryTip: 'Only one answer does not physically hurt anyone: the fine.',
      legalBasis: [law('Art. 102 Basic Law (GG)', 'gg/art_102.html'), law('Art. 1 Basic Law (GG)', 'gg/art_1.html')],
    },
    tr: {
      background: 'Para cezası Alman ceza hukukunda tamamen normal bir cezadır: Mahkeme, bir kişinin belirli bir miktar ödemesine karar verir. Bu Anayasa ile uyumludur. Ölüm cezası ise Anayasa tarafından açıkça kaldırılmıştır (madde 102: “Ölüm cezası kaldırılmıştır.”). Bunun temeli, devletin her zaman saygı göstermek zorunda olduğu 1. maddedeki insan onurudur.',
      otherOptions: 'İşkence insan onurunu ihlal eder ve ağır suç şüphesi olsa bile istisnasız yasaktır. Gözaltındaki kişilere ruhsal veya bedensel kötü muamele yapılamaz (madde 104). Almanya’da dayak cezası yoktur; ebeveynler de çocuklarına vuramaz.',
      memoryTip: 'Sadece bir cevap kimsenin canını yakmaz: para cezası.',
      legalBasis: [law('Anayasa (GG) md. 102', 'gg/art_102.html'), law('Anayasa (GG) md. 1', 'gg/art_1.html')],
    },
  },
  11: {
    de: {
      background: 'Die Verfassung der Bundesrepublik heißt Grundgesetz. Es regelt die Grundrechte (Artikel 1 bis 19), die Staatsprinzipien wie Demokratie, Rechtsstaat und Bundesstaat und die Aufgaben der Verfassungsorgane, zum Beispiel Bundestag, Bundesrat und Bundespräsident. Alle anderen Gesetze müssen mit dem Grundgesetz vereinbar sein. Ob sie das sind, prüft im Streitfall das Bundesverfassungsgericht in Karlsruhe. Geändert werden kann das Grundgesetz nur mit Zweidrittelmehrheiten in Bundestag und Bundesrat.',
      otherOptions: '„Bundesverfassung“ heißt die Verfassung der Schweiz, nicht die deutsche. Ein Gesetzbuch ist eine Sammlung von Gesetzen zu einem Rechtsgebiet, zum Beispiel das Bürgerliche Gesetzbuch (BGB) oder das Strafgesetzbuch (StGB). „Verfassungsvertrag“ war der Name eines geplanten EU-Vertrags, der 2005 gescheitert ist.',
      memoryTip: 'Diese Frage ist fast gleich wie Frage 6 – die Antwort ist immer Grundgesetz.',
      legalBasis: [law('Art. 79 GG', 'gg/art_79.html')],
    },
    en: {
      background: 'The constitution of the Federal Republic is called the Basic Law (Grundgesetz). It sets out the fundamental rights (Articles 1 to 19), the principles of the state such as democracy, the rule of law and federalism, and the tasks of the constitutional bodies, for example the Bundestag, the Bundesrat and the Federal President. All other laws must be compatible with the Basic Law. In case of dispute, the Federal Constitutional Court in Karlsruhe decides. The Basic Law can only be amended with two-thirds majorities in both the Bundestag and the Bundesrat.',
      otherOptions: '“Federal Constitution” (Bundesverfassung) is the name of Switzerland’s constitution, not Germany’s. A code (Gesetzbuch) is a collection of laws on one area of law, for example the Civil Code (BGB) or the Criminal Code (StGB). “Constitutional Treaty” was the name of a planned EU treaty that failed in 2005.',
      memoryTip: 'This question is almost the same as question 6 – the answer is always Grundgesetz (Basic Law).',
      legalBasis: [law('Art. 79 Basic Law (GG)', 'gg/art_79.html')],
    },
    tr: {
      background: 'Federal Almanya’nın anayasasının adı Grundgesetz’tir (Temel Yasa). Temel hakları (madde 1–19), demokrasi, hukuk devleti ve federal devlet gibi devlet ilkelerini ve Federal Meclis, Federal Konsey ve Cumhurbaşkanı gibi anayasal organların görevlerini düzenler. Diğer bütün yasalar Grundgesetz’e uygun olmak zorundadır. Anlaşmazlık olursa buna Karlsruhe’deki Federal Anayasa Mahkemesi karar verir. Grundgesetz ancak hem Federal Meclis’te hem Federal Konsey’de üçte iki çoğunlukla değiştirilebilir.',
      otherOptions: '“Bundesverfassung” İsviçre’nin anayasasının adıdır, Almanya’nın değil. “Gesetzbuch” (kanun kitabı) bir hukuk alanındaki yasaların toplamıdır; örneğin Medeni Kanun (BGB) veya Ceza Kanunu (StGB). “Verfassungsvertrag” (Anayasa Antlaşması), 2005’te başarısız olan planlanmış bir AB antlaşmasının adıydı.',
      memoryTip: 'Bu soru neredeyse 6. soruyla aynı – cevap her zaman Grundgesetz.',
      legalBasis: [law('Anayasa (GG) md. 79', 'gg/art_79.html')],
    },
  },
  12: {
    de: {
      background: 'Die Pressefreiheit steht in Artikel 5 des Grundgesetzes: Zeitungen, Rundfunk und Online-Medien dürfen frei berichten, und „eine Zensur findet nicht statt“. Grundrechte können zwar durch Gesetze in Grenzen eingeschränkt werden, aber nach Artikel 19 darf ein Grundrecht „in keinem Falle in seinem Wesensgehalt angetastet werden“. Außerdem ist die Demokratie durch die sogenannte Ewigkeitsklausel (Artikel 79 Absatz 3) geschützt – und ohne freie Presse gibt es keine Demokratie.',
      otherOptions: 'Eine einfache Mehrheit reicht nicht einmal für eine normale Grundgesetzänderung. Auch mit zwei Dritteln im Bundestag (und im Bundesrat) könnte die Pressefreiheit nicht abgeschafft werden, weil ihr Kern geschützt ist. Der Bundesrat ist die Vertretung der Länder und kann Grundrechte ebenfalls nicht abschaffen.',
      memoryTip: 'Grundrechte kann keine Mehrheit abschaffen – weder die Hälfte noch zwei Drittel.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html'), law('Art. 19 GG', 'gg/art_19.html'), law('Art. 79 GG', 'gg/art_79.html')],
    },
    en: {
      background: 'Freedom of the press is set out in Article 5 of the Basic Law: newspapers, broadcasters and online media may report freely, and “there shall be no censorship”. Fundamental rights can be restricted by law within limits, but according to Article 19, “in no case may the essence of a basic right be affected”. In addition, democracy is protected by the so-called eternity clause (Article 79(3)) – and there is no democracy without a free press.',
      otherOptions: 'A simple majority is not even enough for a normal amendment to the Basic Law. Even with two thirds in the Bundestag (and the Bundesrat), freedom of the press could not be abolished, because its core is protected. The Bundesrat represents the federal states and cannot abolish fundamental rights either.',
      memoryTip: 'No majority can abolish fundamental rights – neither half nor two thirds.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html'), law('Art. 19 Basic Law (GG)', 'gg/art_19.html'), law('Art. 79 Basic Law (GG)', 'gg/art_79.html')],
    },
    tr: {
      background: 'Basın özgürlüğü Anayasa’nın 5. maddesinde yer alır: Gazeteler, radyo-televizyon ve internet medyası özgürce haber yapabilir ve “sansür yapılmaz”. Temel haklar yasayla belirli sınırlar içinde kısıtlanabilir; ama 19. maddeye göre bir temel hakkın “özüne hiçbir durumda dokunulamaz”. Ayrıca demokrasi, “sonsuzluk maddesi” denen 79. maddenin 3. fıkrasıyla korunur – özgür basın olmadan da demokrasi olmaz.',
      otherOptions: 'Basit çoğunluk normal bir anayasa değişikliği için bile yetmez. Federal Meclis’te (ve Federal Konsey’de) üçte iki çoğunluk olsa bile basın özgürlüğü kaldırılamaz, çünkü özü korunur. Federal Konsey eyaletlerin temsilcisidir ve o da temel hakları kaldıramaz.',
      memoryTip: 'Hiçbir çoğunluk temel hakları kaldıramaz – ne yarısı ne de üçte ikisi.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html'), law('Anayasa (GG) md. 19', 'gg/art_19.html'), law('Anayasa (GG) md. 79', 'gg/art_79.html')],
    },
  },
  13: {
    de: {
      background: 'Im Bundestag gibt es zwei Seiten: die Regierungsparteien, die gemeinsam die Bundesregierung tragen, und die Opposition. Zur Opposition gehören alle Abgeordneten, deren Parteien nicht an der Regierung beteiligt sind. Ihre Aufgabe ist es, die Regierung zu kontrollieren und zu kritisieren und eigene Vorschläge zu machen – zum Beispiel durch Anfragen, Debatten oder Untersuchungsausschüsse. Eine starke Opposition ist wichtig für die Demokratie.',
      otherOptions: 'Die regierenden Parteien sind genau das Gegenteil der Opposition. Die Fraktion mit den meisten Abgeordneten stellt meistens die Regierung, muss es aber nicht. Die 5-Prozent-Hürde haben alle Parteien im Bundestag geschafft – Regierungs- und Oppositionsparteien.',
      memoryTip: 'Opposition = „gegenüber“ der Regierung: alle, die nicht mitregieren.',
      legalBasis: [],
    },
    en: {
      background: 'There are two sides in the Bundestag: the governing parties, which together support the federal government, and the opposition. The opposition consists of all members of parliament whose parties are not part of the government. Its job is to scrutinise and criticise the government and to make its own proposals – for example through parliamentary questions, debates or committees of inquiry. A strong opposition is important for democracy.',
      otherOptions: 'The governing parties are the exact opposite of the opposition. The parliamentary group with the most members usually forms the government, but it does not have to. All parties in the Bundestag have passed the 5 percent threshold – governing parties and opposition parties alike.',
      memoryTip: 'Opposition = the side “opposite” the government: everyone who is not governing.',
      legalBasis: [],
    },
    tr: {
      background: 'Federal Meclis’te iki taraf vardır: federal hükümeti birlikte oluşturan iktidar partileri ve muhalefet. Muhalefet, partisi hükümette yer almayan bütün milletvekillerinden oluşur. Görevi hükümeti denetlemek, eleştirmek ve kendi önerilerini sunmaktır – örneğin soru önergeleri, tartışmalar veya araştırma komisyonları aracılığıyla. Güçlü bir muhalefet demokrasi için önemlidir.',
      otherOptions: 'İktidar partileri muhalefetin tam tersidir. En çok milletvekiline sahip grup genellikle hükümeti kurar, ama kurmak zorunda değildir. Federal Meclis’teki bütün partiler %5 barajını geçmiştir – hem iktidar hem muhalefet partileri.',
      memoryTip: 'Muhalefet = hükümetin “karşısındakiler”: hükümette olmayan herkes.',
      legalBasis: [],
    },
  },
  14: {
    de: {
      background: 'Meinungsfreiheit (Artikel 5 Grundgesetz) bedeutet: Ich darf meine Meinung frei sagen, schreiben und verbreiten – auf der Straße, in der Zeitung und auch im Internet, zum Beispiel in sozialen Medien oder in einem Blog. Dabei darf ich auch die Regierung kritisieren. Die Meinungsfreiheit hat aber Grenzen: Die Gesetze schützen die Ehre anderer Menschen und verbieten bestimmte Symbole und Hetze.',
      otherOptions: 'Passanten zu beschimpfen ist eine Beleidigung und kann strafbar sein. Kennzeichen verfassungswidriger oder verbotener Organisationen – etwa Nazi-Symbole oder Symbole von Hamas und „Islamischem Staat“ – öffentlich zu zeigen, ist verboten. Und eine Meinung, die der Regierung widerspricht, ist ausdrücklich erlaubt.',
      memoryTip: 'Internet ja, Beleidigung und verbotene Symbole nein.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
    en: {
      background: 'Freedom of expression (Article 5 of the Basic Law) means: I may freely say, write and share my opinion – on the street, in the newspaper and also online, for example on social media or in a blog. I may also criticise the government. But freedom of expression has limits: the law protects other people’s honour and bans certain symbols and hate speech.',
      otherOptions: 'Insulting passers-by is an insult under criminal law and can be punished. Publicly displaying symbols of unconstitutional or banned organisations – such as Nazi symbols or symbols of Hamas and the “Islamic State” – is forbidden. And an opinion that contradicts the government is explicitly allowed.',
      memoryTip: 'Online – yes. Insults and banned symbols – no.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html')],
    },
    tr: {
      background: 'İfade özgürlüğü (Anayasa madde 5) şu demektir: Görüşümü sokakta, gazetede ve internette, örneğin sosyal medyada veya bir blogda özgürce söyleyebilir, yazabilir ve paylaşabilirim. Hükümeti de eleştirebilirim. Ama ifade özgürlüğünün sınırları vardır: Yasalar başkalarının onurunu korur, belirli sembolleri ve nefret söylemini yasaklar.',
      otherOptions: 'Yoldan geçenlere küfretmek hakarettir ve cezalandırılabilir. Anayasaya aykırı veya yasaklanmış örgütlerin sembollerini – örneğin Nazi sembollerini ya da Hamas ve “İslam Devleti” sembollerini – herkesin önünde göstermek yasaktır. Hükümete karşı çıkan bir görüş ise açıkça serbesttir.',
      memoryTip: 'İnternet – evet. Hakaret ve yasak semboller – hayır.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html')],
    },
  },
  15: {
    de: {
      background: 'Das Grundgesetz schützt in Artikel 12 die Berufsfreiheit. Dort steht auch: Niemand darf zu einer bestimmten Arbeit gezwungen werden, und Zwangsarbeit ist nur bei einer gerichtlich angeordneten Freiheitsentziehung zulässig, also zum Beispiel bei Arbeit im Gefängnis. Hintergrund ist auch die Geschichte: Im Nationalsozialismus mussten Millionen Menschen Zwangsarbeit leisten.',
      otherOptions: 'Militärdienst ist nicht verboten – Artikel 12a erlaubt ausdrücklich einen Wehrdienst. Die freie Berufswahl ist nicht verboten, sondern ein Grundrecht. Arbeit im Ausland ist ebenfalls erlaubt; jeder darf Deutschland verlassen und im Ausland arbeiten.',
      memoryTip: 'Verboten ist der Zwang, nicht die Arbeit: Zwangsarbeit.',
      legalBasis: [law('Art. 12 GG', 'gg/art_12.html')],
    },
    en: {
      background: 'Article 12 of the Basic Law protects freedom of occupation. It also states that nobody may be forced to do a particular kind of work, and that forced labour is only permitted for people deprived of their liberty by a court decision, for example work in prison. History is part of the background: under National Socialism, millions of people were forced to do forced labour.',
      otherOptions: 'Military service is not forbidden – Article 12a explicitly allows it. Free choice of occupation is not forbidden but a fundamental right. Working abroad is also allowed; anyone may leave Germany and work in another country.',
      memoryTip: 'What is forbidden is the force, not the work: forced labour.',
      legalBasis: [law('Art. 12 Basic Law (GG)', 'gg/art_12.html')],
    },
    tr: {
      background: 'Anayasa’nın 12. maddesi meslek özgürlüğünü korur. Aynı maddede, kimsenin belirli bir işi yapmaya zorlanamayacağı ve zorla çalıştırmanın ancak mahkeme kararıyla özgürlüğü kısıtlanan kişiler için, örneğin cezaevinde çalışma olarak, mümkün olduğu yazar. Bunun arka planında tarih de vardır: Nasyonal Sosyalizm döneminde milyonlarca insan zorla çalıştırıldı.',
      otherOptions: 'Askerlik hizmeti yasak değildir – 12a maddesi buna açıkça izin verir. Mesleği özgürce seçmek yasak değil, temel bir haktır. Yurt dışında çalışmak da serbesttir; herkes Almanya’dan ayrılıp başka bir ülkede çalışabilir.',
      memoryTip: 'Yasak olan çalışmak değil, zorlamaktır: zorla çalıştırma.',
      legalBasis: [law('Anayasa (GG) md. 12', 'gg/art_12.html')],
    },
  },
  16: {
    de: {
      background: 'Die Meinungsfreiheit findet ihre Grenzen unter anderem im „Recht der persönlichen Ehre“ (Artikel 5 Absatz 2). Wer öffentlich falsche Tatsachen über eine bestimmte Person verbreitet, kann sich strafbar machen, zum Beispiel wegen übler Nachrede oder Verleumdung. Betroffene können außerdem verlangen, dass die falsche Behauptung gelöscht oder widerrufen wird. Eine Meinung („Ich finde, das ist eine schlechte Politikerin“) ist geschützt, eine erfundene Tatsache („Sie hat Geld gestohlen“) nicht.',
      otherOptions: 'Meinungen über die Bundesregierung, Diskussionen über Religionen und Kritik am Staat sind von der Meinungsfreiheit gedeckt. Gerade die Kritik an Regierung und Staat soll die Meinungsfreiheit schützen.',
      memoryTip: 'Meinung ist frei – falsche Behauptungen über Personen sind es nicht.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
    en: {
      background: 'Freedom of expression is limited, among other things, by the “right to personal honour” (Article 5(2)). Anyone who publicly spreads false facts about a specific person can commit a criminal offence, for example defamation or slander. Those affected can also demand that the false claim be deleted or retracted. An opinion (“I think she is a bad politician”) is protected; an invented fact (“she stole money”) is not.',
      otherOptions: 'Opinions about the federal government, discussions about religions and criticism of the state are covered by freedom of expression. In fact, criticism of the government and the state is exactly what freedom of expression is meant to protect.',
      memoryTip: 'Opinions are free – false claims about people are not.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html')],
    },
    tr: {
      background: 'İfade özgürlüğü, diğerlerinin yanında “kişisel onur hakkı” ile sınırlanır (madde 5, fıkra 2). Belirli bir kişi hakkında herkesin önünde yanlış olgular yayan kişi, örneğin iftira veya karalama nedeniyle suç işlemiş olabilir. Mağdurlar ayrıca yanlış iddianın silinmesini veya geri alınmasını isteyebilir. Bir görüş (“Bence o kötü bir politikacı”) korunur, uydurulmuş bir olgu (“Para çaldı”) korunmaz.',
      otherOptions: 'Federal hükümet hakkındaki görüşler, dinler hakkındaki tartışmalar ve devleti eleştirmek ifade özgürlüğü kapsamındadır. Zaten ifade özgürlüğü tam da hükümete ve devlete yönelik eleştiriyi korumak için vardır.',
      memoryTip: 'Görüş serbesttir – kişiler hakkında yanlış iddialar değil.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html')],
    },
  },
  17: {
    de: {
      background: 'Artikel 3 des Grundgesetzes sagt: „Alle Menschen sind vor dem Gesetz gleich.“ Niemand darf wegen seines Geschlechts, seiner Abstammung, Sprache, Herkunft, seines Glaubens, seiner politischen Anschauungen oder einer Behinderung benachteiligt werden. Der Staat muss alle gleich behandeln – zum Beispiel bei Behörden, in der Schule oder vor Gericht. Ungleichbehandlung durch den Staat ist deshalb verboten.',
      otherOptions: 'Meinungsfreiheit (Artikel 5), Petitionen (Artikel 17) und Versammlungsfreiheit (Artikel 8) sind Grundrechte und damit ausdrücklich erlaubt. Mit einer Petition kann man sich schriftlich mit Bitten oder Beschwerden an Behörden oder Parlamente wenden.',
      memoryTip: 'Drei Antworten sind Grundrechte – verboten ist nur die Ungleichbehandlung.',
      legalBasis: [law('Art. 3 GG', 'gg/art_3.html')],
    },
    en: {
      background: 'Article 3 of the Basic Law states: “All persons shall be equal before the law.” Nobody may be disadvantaged because of their sex, parentage, language, origin, faith, political opinions or a disability. The state must treat everyone equally – for example at public offices, at school or in court. Unequal treatment by the state is therefore forbidden.',
      otherOptions: 'Freedom of expression (Article 5), petitions (Article 17) and freedom of assembly (Article 8) are fundamental rights and therefore explicitly allowed. With a petition, you can address requests or complaints in writing to authorities or parliaments.',
      memoryTip: 'Three answers are fundamental rights – only unequal treatment is forbidden.',
      legalBasis: [law('Art. 3 Basic Law (GG)', 'gg/art_3.html')],
    },
    tr: {
      background: 'Anayasa’nın 3. maddesi şöyle der: “Herkes yasa önünde eşittir.” Kimse cinsiyeti, soyu, dili, kökeni, inancı, siyasi görüşü veya engeli nedeniyle dezavantajlı duruma düşürülemez. Devlet herkese eşit davranmak zorundadır – örneğin resmî dairelerde, okulda veya mahkemede. Bu yüzden devletin eşitsiz muamelesi yasaktır.',
      otherOptions: 'İfade özgürlüğü (madde 5), dilekçe hakkı (madde 17) ve toplanma özgürlüğü (madde 8) temel haklardır, yani açıkça serbesttir. Dilekçeyle resmî kurumlara veya parlamentolara yazılı olarak istek ya da şikâyet iletilebilir.',
      memoryTip: 'Üç cevap temel haktır – yasak olan sadece eşitsiz muameledir.',
      legalBasis: [law('Anayasa (GG) md. 3', 'gg/art_3.html')],
    },
  },
  18: {
    de: {
      background: 'Artikel 1 Absatz 1 ist der wichtigste Satz des Grundgesetzes: „Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt.“ Jeder Mensch hat Würde, unabhängig von Herkunft, Religion oder Staatsangehörigkeit. Nach den Verbrechen des Nationalsozialismus wurde dieser Satz bewusst an den Anfang gestellt. Artikel 1 darf nach der Ewigkeitsklausel (Artikel 79 Absatz 3) nie geändert werden.',
      otherOptions: 'Die anderen Rechte sind ebenfalls Grundrechte, stehen aber in anderen Artikeln: das Recht auf Leben in Artikel 2, die Religionsfreiheit in Artikel 4 und die Meinungsfreiheit in Artikel 5.',
      memoryTip: 'Artikel 1 – das Erste und Wichtigste: die Menschenwürde.',
      legalBasis: [law('Art. 1 GG', 'gg/art_1.html')],
    },
    en: {
      background: 'Article 1(1) is the most important sentence of the Basic Law: “Human dignity shall be inviolable. To respect and protect it shall be the duty of all state authority.” Every person has dignity, regardless of origin, religion or nationality. After the crimes of National Socialism, this sentence was deliberately placed at the very beginning. Under the eternity clause (Article 79(3)), Article 1 may never be changed.',
      otherOptions: 'The other rights are also fundamental rights, but they are in other articles: the right to life in Article 2, freedom of religion in Article 4 and freedom of expression in Article 5.',
      memoryTip: 'Article 1 – the first and most important: human dignity.',
      legalBasis: [law('Art. 1 Basic Law (GG)', 'gg/art_1.html')],
    },
    tr: {
      background: '1. maddenin 1. fıkrası Anayasa’nın en önemli cümlesidir: “İnsan onuru dokunulmazdır. Ona saygı göstermek ve onu korumak bütün devlet gücünün görevidir.” Kökeni, dini veya vatandaşlığı ne olursa olsun her insanın onuru vardır. Nasyonal Sosyalizmin suçlarından sonra bu cümle bilinçli olarak en başa konuldu. Sonsuzluk maddesine (madde 79, fıkra 3) göre 1. madde hiçbir zaman değiştirilemez.',
      otherOptions: 'Diğer haklar da temel haktır, ama başka maddelerde yer alır: yaşam hakkı 2. maddede, din özgürlüğü 4. maddede ve ifade özgürlüğü 5. maddede.',
      memoryTip: '1. madde – ilk ve en önemlisi: insan onuru.',
      legalBasis: [law('Anayasa (GG) md. 1', 'gg/art_1.html')],
    },
  },
  19: {
    de: {
      background: 'Freizügigkeit (Artikel 11 Grundgesetz) bedeutet: Man darf frei entscheiden, wo man in Deutschland wohnt, und darf innerhalb Deutschlands umziehen. Das Grundgesetz garantiert dieses Recht allen Deutschen. Für Bürgerinnen und Bürger der EU gilt zusätzlich die EU-Freizügigkeit. Für andere Ausländerinnen und Ausländer regelt das Aufenthaltsrecht, wo sie wohnen dürfen.',
      otherOptions: 'Den Beruf zu wechseln gehört zur Berufsfreiheit (Artikel 12), die Religion zu wechseln zur Glaubensfreiheit (Artikel 4). Die letzte Antwort ist eine Falle: Im Alltag bedeutet „freizügig“ auch „leicht bekleidet“ – mit dem Grundrecht hat das nichts zu tun.',
      memoryTip: 'Freizügigkeit = frei ziehen, also umziehen und den Wohnort frei wählen.',
      legalBasis: [law('Art. 11 GG', 'gg/art_11.html')],
    },
    en: {
      background: 'Freedom of movement (Freizügigkeit, Article 11 of the Basic Law) means: you may decide freely where to live in Germany and move within the country. The Basic Law guarantees this right to all Germans. Citizens of the EU also enjoy EU freedom of movement. For other foreign nationals, residence law determines where they may live.',
      otherOptions: 'Changing your job belongs to freedom of occupation (Article 12), changing your religion to freedom of faith (Article 4). The last answer is a trap: in everyday German, “freizügig” can also mean “scantily dressed” – which has nothing to do with the fundamental right.',
      memoryTip: 'Freizügigkeit = moving freely: choosing and changing where you live.',
      legalBasis: [law('Art. 11 Basic Law (GG)', 'gg/art_11.html')],
    },
    tr: {
      background: 'Serbest dolaşım ve yerleşme hakkı (Freizügigkeit, Anayasa madde 11) şu demektir: Almanya’da nerede yaşayacağına özgürce karar verebilir ve ülke içinde taşınabilirsin. Anayasa bu hakkı bütün Almanlara güvence altına alır. AB vatandaşları ayrıca AB’nin serbest dolaşım hakkından yararlanır. Diğer yabancıların nerede yaşayabileceğini oturum hukuku belirler.',
      otherOptions: 'Meslek değiştirmek meslek özgürlüğüne (madde 12), din değiştirmek inanç özgürlüğüne (madde 4) girer. Son cevap bir tuzaktır: Günlük Almancada “freizügig” “açık giyimli” anlamına da gelir – bunun temel hakla hiçbir ilgisi yoktur.',
      memoryTip: 'Freizügigkeit = özgürce taşınmak: yaşadığın yeri seçmek ve değiştirmek.',
      legalBasis: [law('Anayasa (GG) md. 11', 'gg/art_11.html')],
    },
  },
  20: {
    de: {
      background: 'Eine Partei, die eine Diktatur errichten will, kämpft gegen die freiheitliche demokratische Grundordnung. Nach Artikel 21 Absatz 2 des Grundgesetzes ist sie dann verfassungswidrig. Verbieten kann eine Partei aber nur das Bundesverfassungsgericht. So wurden 1952 die Sozialistische Reichspartei und 1956 die KPD verboten. Deutschland nennt das „wehrhafte Demokratie“: Die Demokratie schützt sich gegen ihre Feinde.',
      otherOptions: 'Tolerant, rechtsstaatlich orientiert und gesetzestreu beschreiben genau das Gegenteil einer Partei, die eine Diktatur will. Eine Diktatur schafft Wahlen, Grundrechte und unabhängige Gerichte ab.',
      memoryTip: 'Gegen die Verfassung = verfassungswidrig.',
      legalBasis: [law('Art. 21 GG', 'gg/art_21.html')],
    },
    en: {
      background: 'A party that wants to establish a dictatorship is fighting against the free democratic basic order. According to Article 21(2) of the Basic Law, it is then unconstitutional. However, only the Federal Constitutional Court can ban a party. This happened to the Socialist Reich Party in 1952 and to the Communist Party (KPD) in 1956. Germany calls this a “defensive democracy”: democracy protects itself against its enemies.',
      otherOptions: 'Tolerant, committed to the rule of law and law-abiding describe the exact opposite of a party that wants a dictatorship. A dictatorship abolishes elections, fundamental rights and independent courts.',
      memoryTip: 'Against the constitution = unconstitutional (verfassungswidrig).',
      legalBasis: [law('Art. 21 Basic Law (GG)', 'gg/art_21.html')],
    },
    tr: {
      background: 'Diktatörlük kurmak isteyen bir parti, özgürlükçü demokratik temel düzene karşı savaşıyor demektir. Anayasa’nın 21. maddesinin 2. fıkrasına göre böyle bir parti anayasaya aykırıdır. Ancak bir partiyi yalnızca Federal Anayasa Mahkemesi yasaklayabilir. 1952’de Sosyalist Reich Partisi ve 1956’da Komünist Parti (KPD) bu şekilde yasaklandı. Almanya buna “kendini savunabilen demokrasi” der: Demokrasi kendini düşmanlarına karşı korur.',
      otherOptions: 'Hoşgörülü, hukuk devletine bağlı ve yasalara saygılı, diktatörlük isteyen bir partinin tam tersini anlatır. Bir diktatörlük seçimleri, temel hakları ve bağımsız mahkemeleri ortadan kaldırır.',
      memoryTip: 'Anayasaya karşı = anayasaya aykırı (verfassungswidrig).',
      legalBasis: [law('Anayasa (GG) md. 21', 'gg/art_21.html')],
    },
  },
  21: {
    de: {
      background: 'Das Wappen der Bundesrepublik Deutschland zeigt einen schwarzen Adler mit roten Krallen, rotem Schnabel und roter Zunge auf goldgelbem Grund – den Bundesadler. Er ist auf Ausweisen, Münzen, Behördenschildern und im Plenarsaal des Bundestages zu sehen. Die Farben Schwarz, Rot und Gold sind auch die Farben der Bundesflagge.',
      otherOptions: 'Bild 2 zeigt das Christusmonogramm, ein christliches Symbol. Bild 3 ist das Eiserne Kreuz, das Erkennungszeichen der Bundeswehr. Bild 4 ist das Staatswappen der DDR mit Hammer, Zirkel und Ährenkranz – es gilt seit der Wiedervereinigung 1990 nicht mehr.',
      memoryTip: 'Das Bundeswappen hat dieselben Farben wie die Flagge: Schwarz, Rot, Gold.',
      legalBasis: [],
    },
    en: {
      background: 'The coat of arms of the Federal Republic of Germany shows a black eagle with red claws, a red beak and a red tongue on a golden-yellow background – the federal eagle. You can see it on ID cards, coins, signs on public buildings and in the plenary hall of the Bundestag. Black, red and gold are also the colours of the federal flag.',
      otherOptions: 'Image 2 shows the Chi-Rho, a Christian symbol. Image 3 is the Iron Cross, the emblem of the German armed forces (Bundeswehr). Image 4 is the state coat of arms of the GDR with hammer, compass and a wreath of wheat – it has not been used since reunification in 1990.',
      memoryTip: 'The federal coat of arms has the same colours as the flag: black, red, gold.',
      legalBasis: [],
    },
    tr: {
      background: 'Federal Almanya’nın arması, altın sarısı zemin üzerinde kırmızı pençeli, kırmızı gagalı ve kırmızı dilli siyah bir kartal gösterir – federal kartal. Bu kartalı kimlik kartlarında, madeni paralarda, resmî binaların tabelalarında ve Federal Meclis’in genel kurul salonunda görebilirsin. Siyah, kırmızı ve altın rengi aynı zamanda federal bayrağın renkleridir.',
      otherOptions: '2 numaralı görsel bir Hristiyan sembolü olan Chi-Rho monogramını gösterir. 3 numaralı görsel, Alman Silahlı Kuvvetleri’nin (Bundeswehr) amblemi olan Demir Haç’tır. 4 numaralı görsel çekiç, pergel ve başak çelengiyle DDR’in (Doğu Almanya) devlet armasıdır – 1990’daki yeniden birleşmeden beri kullanılmaz.',
      memoryTip: 'Federal arma bayrakla aynı renklere sahiptir: siyah, kırmızı, altın.',
      legalBasis: [],
    },
  },
  22: {
    de: {
      background: 'Deutschland ist eine Republik. Das heißt: Das Staatsoberhaupt ist kein König und erbt sein Amt nicht, sondern wird für eine begrenzte Zeit gewählt. Der Bundespräsident oder die Bundespräsidentin wird von der Bundesversammlung für fünf Jahre gewählt. Schon der Staatsname sagt es: Bundesrepublik Deutschland. Die Monarchie endete in Deutschland 1918.',
      otherOptions: 'In einer Monarchie oder einem Fürstentum regiert ein König oder Fürst, der sein Amt meist erbt – zum Beispiel in Liechtenstein oder Monaco. Eine Diktatur gab es in Deutschland im Nationalsozialismus (1933–1945); heute ist sie durch das Grundgesetz ausgeschlossen.',
      memoryTip: 'Bundesrepublik Deutschland – die Antwort steckt im Namen.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'Germany is a republic. This means the head of state is not a king and does not inherit the office, but is elected for a limited period. The Federal President is elected by the Federal Convention for five years. The country’s name already says it: Federal Republic of Germany. The monarchy in Germany ended in 1918.',
      otherOptions: 'In a monarchy or a principality, a king or prince rules, usually by inheriting the office – for example in Liechtenstein or Monaco. Germany was a dictatorship under National Socialism (1933–1945); today the Basic Law rules this out.',
      memoryTip: 'Federal Republic of Germany – the answer is in the name.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Almanya bir cumhuriyettir. Bu, devlet başkanının kral olmadığı ve makamı miras yoluyla almadığı, belirli bir süre için seçildiği anlamına gelir. Cumhurbaşkanını Federal Kurul beş yıllığına seçer. Ülkenin adı bile bunu söyler: Federal Almanya Cumhuriyeti. Almanya’da monarşi 1918’de sona erdi.',
      otherOptions: 'Monarşide veya prenslikte genellikle makamı miras alan bir kral ya da prens yönetir – örneğin Lihtenştayn veya Monako’da. Almanya Nasyonal Sosyalizm döneminde (1933–1945) bir diktatörlüktü; bugün Anayasa bunu engeller.',
      memoryTip: 'Federal Almanya Cumhuriyeti – cevap adında saklı.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  23: {
    de: {
      background: 'Die meisten Erwerbstätigen in Deutschland sind Arbeitnehmerinnen und Arbeitnehmer: Sie sind bei einer Firma oder bei einer Behörde angestellt und bekommen dafür Lohn oder Gehalt. Das gilt für rund neun von zehn Erwerbstätigen. Nur ein kleiner Teil arbeitet selbstständig, zum Beispiel mit einem eigenen Geschäft, einer Praxis oder als Freiberufler.',
      otherOptions: 'Viele Firmen in Deutschland sind Familienunternehmen, aber die meisten Menschen arbeiten nicht in kleinen Familienbetrieben. Ehrenamtliche Arbeit ist unbezahlt und wird zusätzlich zum Beruf geleistet. Selbstständige mit eigener Firma sind eine Minderheit.',
      memoryTip: 'Die meisten Menschen sind angestellt – bei einer Firma oder beim Staat.',
      legalBasis: [],
    },
    en: {
      background: 'Most people in work in Germany are employees: they work for a company or for a public authority and receive a wage or salary. This applies to about nine out of ten people in work. Only a small share are self-employed, for example with their own shop, practice or as freelancers.',
      otherOptions: 'Many companies in Germany are family businesses, but most people do not work in small family firms. Voluntary work is unpaid and is done in addition to a job. Self-employed people with their own company are a minority.',
      memoryTip: 'Most people are employed – by a company or by the state.',
      legalBasis: [],
    },
    tr: {
      background: 'Almanya’da çalışanların çoğu ücretli çalışandır: Bir şirkette veya bir kamu kurumunda çalışır ve karşılığında ücret ya da maaş alırlar. Bu, çalışan her on kişiden yaklaşık dokuzu için geçerlidir. Sadece küçük bir kısmı serbest çalışır; örneğin kendi dükkânı, muayenehanesi olanlar veya serbest meslek sahipleri.',
      otherOptions: 'Almanya’daki birçok şirket aile şirketidir, ama insanların çoğu küçük aile işletmelerinde çalışmaz. Gönüllü çalışma ücretsizdir ve işe ek olarak yapılır. Kendi şirketi olan serbest çalışanlar azınlıktadır.',
      memoryTip: 'İnsanların çoğu bir yerde çalışır – bir şirkette veya devlette.',
      legalBasis: [],
    },
  },
  24: {
    de: {
      background: 'Deutschland hat 16 Bundesländer: 13 Flächenländer wie Bayern oder Nordrhein-Westfalen und 3 Stadtstaaten – Berlin, Hamburg und Bremen. Seit der Wiedervereinigung 1990 sind es 16, weil die fünf ostdeutschen Länder Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen hinzukamen und Berlin vereint wurde. Jedes Land hat eine eigene Verfassung, ein Parlament und eine Regierung.',
      otherOptions: '14, 15 und 17 sind falsch. Zum Fragenkatalog gehören außerdem 10 Fragen für jedes Bundesland; im Test kommen davon 3 Fragen zu deinem Land dran.',
      memoryTip: '16 = 13 Flächenländer + 3 Stadtstaaten.',
      legalBasis: [],
    },
    en: {
      background: 'Germany has 16 federal states: 13 territorial states such as Bavaria or North Rhine-Westphalia and 3 city states – Berlin, Hamburg and Bremen. There have been 16 since reunification in 1990, when the five eastern states of Brandenburg, Mecklenburg-Western Pomerania, Saxony, Saxony-Anhalt and Thuringia joined and Berlin was reunited. Each state has its own constitution, parliament and government.',
      otherOptions: '14, 15 and 17 are wrong. The question catalogue also contains 10 questions for each federal state; 3 questions about your own state come up in the test.',
      memoryTip: '16 = 13 territorial states + 3 city states.',
      legalBasis: [],
    },
    tr: {
      background: 'Almanya’nın 16 eyaleti vardır: Bavyera veya Kuzey Ren-Vestfalya gibi 13 alan eyaleti ve 3 şehir eyaleti – Berlin, Hamburg ve Bremen. 1990’daki yeniden birleşmeden beri sayı 16’dır; o zaman doğudaki beş eyalet Brandenburg, Mecklenburg-Ön Pomeranya, Saksonya, Saksonya-Anhalt ve Türingen katıldı ve Berlin birleşti. Her eyaletin kendi anayasası, parlamentosu ve hükümeti vardır.',
      otherOptions: '14, 15 ve 17 yanlıştır. Soru kataloğunda ayrıca her eyalet için 10 soru vardır; sınavda bunlardan kendi eyaletinle ilgili 3 soru çıkar.',
      memoryTip: '16 = 13 alan eyaleti + 3 şehir eyaleti.',
      legalBasis: [],
    },
  },
  25: {
    de: {
      background: 'Elsass-Lothringen ist eine Region in Frankreich, an der Grenze zu Deutschland. Sie gehörte von 1871 bis 1918 zum Deutschen Reich, ist aber seit über hundert Jahren wieder französisch. Zur Bundesrepublik Deutschland hat sie nie gehört. Die 16 Bundesländer sind: Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen.',
      otherOptions: 'Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland mit der Hauptstadt Düsseldorf. Mecklenburg-Vorpommern (Hauptstadt Schwerin) und Sachsen-Anhalt (Hauptstadt Magdeburg) gehören zu den Ländern, die 1990 mit der Wiedervereinigung hinzukamen.',
      memoryTip: 'Elsass = Alsace: Das klingt französisch, und es ist französisch.',
      legalBasis: [],
    },
    en: {
      background: 'Alsace-Lorraine (Elsass-Lothringen) is a region in France on the German border. It belonged to the German Empire from 1871 to 1918, but has been French again for over a hundred years. It has never been part of the Federal Republic of Germany. The 16 federal states are: Baden-Württemberg, Bavaria, Berlin, Brandenburg, Bremen, Hamburg, Hesse, Mecklenburg-Western Pomerania, Lower Saxony, North Rhine-Westphalia, Rhineland-Palatinate, Saarland, Saxony, Saxony-Anhalt, Schleswig-Holstein and Thuringia.',
      otherOptions: 'North Rhine-Westphalia is the most populous state, with Düsseldorf as its capital. Mecklenburg-Western Pomerania (capital Schwerin) and Saxony-Anhalt (capital Magdeburg) are among the states that joined with reunification in 1990.',
      memoryTip: 'Elsass = Alsace: it sounds French, and it is French.',
      legalBasis: [],
    },
    tr: {
      background: 'Elsass-Lothringen (Alsas-Loren), Fransa’da, Almanya sınırında bir bölgedir. 1871’den 1918’e kadar Alman İmparatorluğu’na aitti, ama yüz yılı aşkın süredir yeniden Fransız toprağıdır. Federal Almanya Cumhuriyeti’ne hiç ait olmadı. 16 eyalet şunlardır: Baden-Württemberg, Bavyera, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Ön Pomeranya, Aşağı Saksonya, Kuzey Ren-Vestfalya, Renanya-Pfalz, Saarland, Saksonya, Saksonya-Anhalt, Schleswig-Holstein ve Türingen.',
      otherOptions: 'Kuzey Ren-Vestfalya en kalabalık eyalettir, başkenti Düsseldorf’tur. Mecklenburg-Ön Pomeranya (başkenti Schwerin) ve Saksonya-Anhalt (başkenti Magdeburg) 1990’da yeniden birleşmeyle katılan eyaletlerdendir.',
      memoryTip: 'Elsass = Alsace: Kulağa Fransızca gelir, çünkü Fransız’dır.',
      legalBasis: [],
    },
  },
  26: {
    de: {
      background: 'Artikel 20 des Grundgesetzes beginnt mit dem Satz: „Die Bundesrepublik Deutschland ist ein demokratischer und sozialer Bundesstaat.“ Demokratisch heißt: Das Volk wählt seine Vertreter. Sozial heißt: Der Staat sorgt für soziale Sicherheit, etwa durch Renten-, Kranken- und Arbeitslosenversicherung. Bundesstaat heißt: Die Macht ist zwischen dem Bund und den 16 Ländern geteilt.',
      otherOptions: 'Eine kommunistische Republik oder ein sozialistischer Staat war die DDR, nicht die Bundesrepublik. Eine Monarchie ist Deutschland seit 1918 nicht mehr. Die Antwort „sozialer und sozialistischer Bundesstaat“ ist eine Falle: „sozial“ stimmt, „sozialistisch“ nicht.',
      memoryTip: 'Die drei Wörter aus Artikel 20: demokratisch, sozial, Bundesstaat.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'Article 20 of the Basic Law begins: “The Federal Republic of Germany is a democratic and social federal state.” Democratic means the people elect their representatives. Social means the state provides social security, for example through pension, health and unemployment insurance. Federal state means power is shared between the federation and the 16 states.',
      otherOptions: 'A communist republic or socialist state was the GDR, not the Federal Republic. Germany has not been a monarchy since 1918. The answer “social and socialist federal state” is a trap: “social” is right, “socialist” is not.',
      memoryTip: 'The three words from Article 20: democratic, social, federal state.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Anayasa’nın 20. maddesi şu cümleyle başlar: “Federal Almanya Cumhuriyeti demokratik ve sosyal bir federal devlettir.” Demokratik: Halk temsilcilerini seçer. Sosyal: Devlet, örneğin emeklilik, sağlık ve işsizlik sigortasıyla sosyal güvence sağlar. Federal devlet: Güç, federal yönetim ile 16 eyalet arasında paylaşılır.',
      otherOptions: 'Komünist cumhuriyet veya sosyalist devlet Federal Cumhuriyet değil, DDR’di (Doğu Almanya). Almanya 1918’den beri monarşi değildir. “Sosyal ve sosyalist federal devlet” cevabı bir tuzaktır: “sosyal” doğru, “sosyalist” yanlış.',
      memoryTip: '20. maddedeki üç kelime: demokratik, sosyal, federal devlet.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  27: {
    de: {
      background: 'Deutschland ist ein Bundesstaat: Es besteht aus 16 Ländern, die zusammen den Bund bilden. Die Länder haben eigene Verfassungen, Parlamente und Regierungen und sind zum Beispiel für Schulen und Polizei zuständig. Über den Bundesrat wirken sie an der Gesetzgebung des Bundes mit. Diese föderale Ordnung schützt das Grundgesetz besonders: Sie darf nach der Ewigkeitsklausel nicht abgeschafft werden.',
      otherOptions: 'Ein sozialistischer Staat war die DDR bis 1990. Eine Diktatur gab es im Nationalsozialismus. Eine Monarchie mit Kaiser gab es bis 1918. Keines davon beschreibt das heutige Deutschland.',
      memoryTip: 'Bundesrepublik = Bundesstaat aus 16 Ländern.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html'), law('Art. 79 GG', 'gg/art_79.html')],
    },
    en: {
      background: 'Germany is a federal state: it consists of 16 states that together form the federation. The states have their own constitutions, parliaments and governments and are responsible, for example, for schools and the police. Through the Bundesrat, they take part in federal legislation. The Basic Law gives this federal order special protection: under the eternity clause it may not be abolished.',
      otherOptions: 'The GDR was a socialist state until 1990. Germany was a dictatorship under National Socialism. There was a monarchy with an emperor until 1918. None of these describes Germany today.',
      memoryTip: 'Federal Republic = a federal state of 16 states.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html'), law('Art. 79 Basic Law (GG)', 'gg/art_79.html')],
    },
    tr: {
      background: 'Almanya federal bir devlettir: Birlikte federasyonu oluşturan 16 eyaletten oluşur. Eyaletlerin kendi anayasaları, parlamentoları ve hükümetleri vardır; örneğin okullardan ve polisten sorumludurlar. Federal Konsey aracılığıyla federal yasamaya katılırlar. Anayasa bu federal düzeni özel olarak korur: Sonsuzluk maddesine göre kaldırılamaz.',
      otherOptions: 'DDR 1990’a kadar sosyalist bir devletti. Nasyonal Sosyalizm döneminde diktatörlük vardı. 1918’e kadar imparatorlu bir monarşi vardı. Bunların hiçbiri bugünkü Almanya’yı anlatmaz.',
      memoryTip: 'Federal Cumhuriyet = 16 eyaletten oluşan federal devlet.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html'), law('Anayasa (GG) md. 79', 'gg/art_79.html')],
    },
  },
  28: {
    de: {
      background: '„Alle Staatsgewalt geht vom Volke aus“, sagt Artikel 20 des Grundgesetzes. Deshalb wählen die wahlberechtigten Bürgerinnen und Bürger die Abgeordneten des Bundestages, in der Regel alle vier Jahre. Wahlberechtigt sind deutsche Staatsangehörige ab 18 Jahren. Mit der Erststimme wählt man eine Person im Wahlkreis, mit der Zweitstimme eine Partei.',
      otherOptions: 'Militär, Wirtschaft und Verwaltung haben bei Wahlen keine eigene Stimme. Soldatinnen, Unternehmer oder Beamte dürfen natürlich wählen – aber nur als einzelne wahlberechtigte Bürgerinnen und Bürger, nicht als Institution.',
      memoryTip: 'Demokratie heißt Volksherrschaft: Das Volk wählt.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html'), law('Art. 38 GG', 'gg/art_38.html')],
    },
    en: {
      background: '“All state authority is derived from the people,” says Article 20 of the Basic Law. That is why eligible citizens elect the members of the Bundestag, usually every four years. German citizens aged 18 and over are eligible to vote. With the first vote you choose a person in your constituency, with the second vote a party.',
      otherOptions: 'The military, the economy and the administration have no vote of their own in elections. Soldiers, business owners or civil servants may of course vote – but only as individual eligible citizens, not as institutions.',
      memoryTip: 'Democracy means rule by the people: the people vote.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html'), law('Art. 38 Basic Law (GG)', 'gg/art_38.html')],
    },
    tr: {
      background: 'Anayasa’nın 20. maddesi “Bütün devlet gücü halktan gelir” der. Bu yüzden Federal Meclis milletvekillerini seçme hakkı olan vatandaşlar, genellikle dört yılda bir seçer. 18 yaşını doldurmuş Alman vatandaşları oy kullanabilir. Birinci oyla seçim bölgesindeki bir kişi, ikinci oyla bir parti seçilir.',
      otherOptions: 'Ordunun, ekonominin ve idarenin seçimlerde kendi oyu yoktur. Askerler, işverenler veya memurlar elbette oy kullanabilir – ama kurum olarak değil, sadece tek tek seçmen vatandaşlar olarak.',
      memoryTip: 'Demokrasi halkın yönetimi demektir: Halk seçer.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html'), law('Anayasa (GG) md. 38', 'gg/art_38.html')],
    },
  },
  29: {
    de: {
      background: 'Das Wappentier der Bundesrepublik Deutschland ist der Adler. Der Bundesadler ist schwarz auf goldenem Grund und eines der ältesten deutschen Hoheitszeichen. Man sieht ihn auf Münzen, Pässen und im Plenarsaal des Bundestages, wo eine große Adler-Skulptur hängt.',
      otherOptions: 'Löwe, Bär und Pferd sind Wappentiere einzelner Bundesländer und Städte: Der Bär ist das Wappentier Berlins, das springende Pferd findet man in den Wappen von Niedersachsen und Nordrhein-Westfalen, und Löwen zum Beispiel in den Wappen von Bayern und Hessen.',
      memoryTip: 'Der Bund hat den Adler – die Länder haben Löwe, Bär oder Pferd.',
      legalBasis: [],
    },
    en: {
      background: 'The heraldic animal of the Federal Republic of Germany is the eagle. The federal eagle is black on a gold background and is one of the oldest German state symbols. You can see it on coins, passports and in the plenary hall of the Bundestag, where a large eagle sculpture hangs.',
      otherOptions: 'The lion, bear and horse are heraldic animals of individual states and cities: the bear is the symbol of Berlin, the leaping horse appears in the coats of arms of Lower Saxony and North Rhine-Westphalia, and lions appear, for example, in the coats of arms of Bavaria and Hesse.',
      memoryTip: 'The federation has the eagle – the states have lions, bears or horses.',
      legalBasis: [],
    },
    tr: {
      background: 'Federal Almanya’nın arma hayvanı kartaldır. Federal kartal altın zemin üzerinde siyahtır ve en eski Alman devlet sembollerinden biridir. Onu madeni paralarda, pasaportlarda ve büyük bir kartal heykelinin asılı olduğu Federal Meclis genel kurul salonunda görebilirsin.',
      otherOptions: 'Aslan, ayı ve at bazı eyaletlerin ve şehirlerin arma hayvanlarıdır: Ayı Berlin’in sembolüdür, şaha kalkmış at Aşağı Saksonya ve Kuzey Ren-Vestfalya armalarında yer alır, aslanlar ise örneğin Bavyera ve Hessen armalarında bulunur.',
      memoryTip: 'Federal devletin kartalı var – eyaletlerin aslanı, ayısı veya atı.',
      legalBasis: [],
    },
  },
  30: {
    de: {
      background: 'Artikel 5 des Grundgesetzes garantiert die Pressefreiheit und sagt ausdrücklich: „Eine Zensur findet nicht statt.“ Der Staat darf Zeitungen, Rundfunk und Online-Medien also nicht vorschreiben, was sie berichten, und Artikel nicht vor der Veröffentlichung prüfen oder verbieten. Freie Medien informieren die Menschen und kontrollieren die Regierung.',
      otherOptions: 'Regelmäßige Wahlen, Meinungsfreiheit und verschiedene Parteien sind typische Merkmale der Demokratie. Pressezensur gibt es dagegen in Diktaturen – sie gehört nicht zu unserer Demokratie.',
      memoryTip: 'Achte auf „kein“: Gesucht ist das, was nicht passt – die Zensur.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
    en: {
      background: 'Article 5 of the Basic Law guarantees freedom of the press and states explicitly: “There shall be no censorship.” The state may therefore not tell newspapers, broadcasters and online media what to report, and may not check or ban articles before publication. Free media inform people and hold the government to account.',
      otherOptions: 'Regular elections, freedom of expression and multiple parties are typical features of democracy. Press censorship, by contrast, exists in dictatorships – it is not part of our democracy.',
      memoryTip: 'Watch for “not”: you are looking for what does not fit – censorship.',
      legalBasis: [law('Art. 5 Basic Law (GG)', 'gg/art_5.html')],
    },
    tr: {
      background: 'Anayasa’nın 5. maddesi basın özgürlüğünü güvence altına alır ve açıkça “Sansür yapılmaz” der. Yani devlet gazetelere, radyo-televizyona ve internet medyasına ne yazacaklarını söyleyemez, yazıları yayımlanmadan önce denetleyemez veya yasaklayamaz. Özgür medya insanları bilgilendirir ve hükümeti denetler.',
      otherOptions: 'Düzenli seçimler, ifade özgürlüğü ve farklı partiler demokrasinin tipik özellikleridir. Basın sansürü ise diktatörlüklerde olur – bizim demokrasimizin parçası değildir.',
      memoryTip: '“Değil” kelimesine dikkat: Uymayanı arıyorsun – sansürü.',
      legalBasis: [law('Anayasa (GG) md. 5', 'gg/art_5.html')],
    },
  },
  31: {
    de: {
      background: 'Meistens erreicht bei einer Bundestagswahl keine Partei allein mehr als die Hälfte der Sitze. Dann arbeiten mehrere Parteien zusammen, um eine Mehrheit zu haben und die Regierung zu bilden. Das nennt man Koalition. Ihre gemeinsamen Pläne schreiben die Parteien in einen Koalitionsvertrag. Nach der Bundestagswahl 2025 bildeten zum Beispiel CDU/CSU und SPD eine Koalition.',
      otherOptions: 'Eine Fraktion ist die Gruppe der Abgeordneten einer Partei im Parlament – sie arbeitet in einer Koalition mit anderen Fraktionen zusammen. Ein Ministerium ist eine Behörde, die von einer Ministerin oder einem Minister geleitet wird. „Einheit“ ist kein politischer Fachbegriff für eine Regierungsbildung.',
      memoryTip: 'Koalition = Zusammenarbeit von Parteien; Fraktion = Abgeordnete einer Partei.',
      legalBasis: [],
    },
    en: {
      background: 'In a federal election, no party usually wins more than half the seats on its own. Several parties then work together to form a majority and the government. This is called a coalition. The parties set out their joint plans in a coalition agreement. After the 2025 federal election, for example, the CDU/CSU and the SPD formed a coalition.',
      otherOptions: 'A parliamentary group (Fraktion) is the group of a party’s members in parliament – in a coalition it works together with other groups. A ministry is an authority headed by a minister. “Unity” is not a political term for forming a government.',
      memoryTip: 'Coalition = parties working together; Fraktion = a party’s members of parliament.',
      legalBasis: [],
    },
    tr: {
      background: 'Federal seçimde genellikle hiçbir parti tek başına sandalyelerin yarısından fazlasını alamaz. O zaman birkaç parti çoğunluğu sağlamak ve hükümeti kurmak için birlikte çalışır. Buna koalisyon denir. Partiler ortak planlarını bir koalisyon sözleşmesine yazar. Örneğin 2025 federal seçiminden sonra CDU/CSU ve SPD bir koalisyon kurdu.',
      otherOptions: 'Fraktion (meclis grubu), bir partinin parlamentodaki milletvekillerinin grubudur – koalisyonda diğer gruplarla birlikte çalışır. Bakanlık, bir bakanın yönettiği bir kurumdur. “Birlik” (Einheit) hükümet kurmak için kullanılan siyasi bir terim değildir.',
      memoryTip: 'Koalisyon = partilerin birlikte çalışması; Fraktion = bir partinin milletvekilleri.',
      legalBasis: [],
    },
  },
  32: {
    de: {
      background: 'Das Grundgesetz teilt die Staatsgewalt in drei Teile (Artikel 20 Absatz 2): die Gesetzgebung (Legislative, das Parlament), die vollziehende Gewalt (Exekutive, Regierung und Verwaltung) und die Rechtsprechung (Judikative, die Gerichte). Diese Gewaltenteilung verhindert, dass eine Stelle zu viel Macht bekommt.',
      otherOptions: 'Die Presse wird oft „vierte Gewalt“ genannt, weil sie die Mächtigen kontrolliert. Das ist aber nur ein Bild: Die Presse ist keine staatliche Gewalt, sondern unabhängig vom Staat. Gesetzgebung, Regierung und Rechtsprechung sind die drei staatlichen Gewalten.',
      memoryTip: 'Drei staatliche Gewalten: Gesetze machen, ausführen, Recht sprechen. Die Presse ist frei und gehört nicht dazu.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'The Basic Law divides state power into three branches (Article 20(2)): legislation (the legislature, i.e. parliament), executive power (the executive, i.e. government and administration) and the judiciary (the courts). This separation of powers prevents any one body from gaining too much power.',
      otherOptions: 'The press is often called the “fourth estate” because it scrutinises those in power. But that is only a metaphor: the press is not a state power, it is independent of the state. Legislation, government and the judiciary are the three powers of the state.',
      memoryTip: 'Three state powers: making laws, carrying them out, judging. The press is free and not one of them.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Anayasa devlet gücünü üçe ayırır (madde 20, fıkra 2): yasama (parlamento), yürütme (hükümet ve idare) ve yargı (mahkemeler). Bu kuvvetler ayrılığı, tek bir kurumun çok fazla güç kazanmasını önler.',
      otherOptions: 'Basına güçlüleri denetlediği için sık sık “dördüncü güç” denir. Ama bu sadece bir benzetmedir: Basın bir devlet gücü değildir, devletten bağımsızdır. Yasama, hükümet ve yargı devletin üç gücüdür.',
      memoryTip: 'Devletin üç gücü: yasa yapmak, uygulamak, yargılamak. Basın özgürdür ve bunlara dahil değildir.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  33: {
    de: {
      background: 'In Deutschland sind Staat und Religionsgemeinschaften voneinander getrennt. Das Grundgesetz übernimmt dazu Regeln der Weimarer Verfassung: „Es besteht keine Staatskirche.“ Der Staat ist religiös neutral und bevorzugt keine Religion. Trotzdem arbeiten Staat und Religionsgemeinschaften in manchen Bereichen zusammen, zum Beispiel beim Religionsunterricht an Schulen oder bei der Kirchensteuer, die das Finanzamt für die Kirchen einzieht.',
      otherOptions: 'Religionsgemeinschaften bilden nicht den Staat, der Staat ist nicht von ihnen abhängig, und sie bilden auch keine Einheit. Das wäre ein Gottesstaat oder eine Staatskirche, die das Grundgesetz ausschließt.',
      memoryTip: 'Keine Staatskirche: Staat und Religion sind getrennt.',
      legalBasis: [law('Art. 140 GG', 'gg/art_140.html'), law('Art. 4 GG', 'gg/art_4.html')],
    },
    en: {
      background: 'In Germany, the state and religious communities are separate. The Basic Law adopts provisions of the Weimar Constitution for this: “There shall be no state church.” The state is religiously neutral and does not favour any religion. Still, the state and religious communities cooperate in some areas, for example on religious education in schools or the church tax, which the tax office collects for the churches.',
      otherOptions: 'Religious communities do not form the state, the state does not depend on them, and they do not form a single unit. That would be a theocracy or a state church, which the Basic Law rules out.',
      memoryTip: 'No state church: state and religion are separate.',
      legalBasis: [law('Art. 140 Basic Law (GG)', 'gg/art_140.html'), law('Art. 4 Basic Law (GG)', 'gg/art_4.html')],
    },
    tr: {
      background: 'Almanya’da devlet ve dinî topluluklar birbirinden ayrıdır. Anayasa bunun için Weimar Anayasası’nın kurallarını alır: “Devlet kilisesi yoktur.” Devlet dinler karşısında tarafsızdır ve hiçbir dini kayırmaz. Yine de devlet ve dinî topluluklar bazı alanlarda iş birliği yapar; örneğin okullardaki din dersinde veya vergi dairesinin kiliseler adına topladığı kilise vergisinde.',
      otherOptions: 'Dinî topluluklar devleti oluşturmaz, devlet onlara bağımlı değildir ve birlikte bir bütün de oluşturmazlar. Bu bir din devleti veya devlet kilisesi olurdu; Anayasa bunu engeller.',
      memoryTip: 'Devlet kilisesi yok: Devlet ve din ayrıdır.',
      legalBasis: [law('Anayasa (GG) md. 140', 'gg/art_140.html'), law('Anayasa (GG) md. 4', 'gg/art_4.html')],
    },
  },
  34: {
    de: {
      background: 'Deutschland ist keine Monarchie, sondern eine Republik. An der Spitze des Staates steht kein König und keine Königin, sondern der Bundespräsident oder die Bundespräsidentin, der oder die für fünf Jahre gewählt wird. Die Monarchie endete in Deutschland 1918 mit dem Ende des Kaiserreichs.',
      otherOptions: 'Demokratie, Rechtsstaat und Sozialstaat beschreiben Deutschland richtig. Diese Prinzipien stehen im Grundgesetz (Artikel 20 und 28) und gehören zu den wichtigsten Merkmalen der Bundesrepublik.',
      memoryTip: 'Gesucht ist, was Deutschland nicht ist: Seit 1918 gibt es keinen König mehr.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'Germany is not a monarchy but a republic. The head of state is not a king or queen, but the Federal President, who is elected for five years. The monarchy in Germany ended in 1918 with the end of the German Empire.',
      otherOptions: 'Democracy, the rule of law and the social state describe Germany correctly. These principles are in the Basic Law (Articles 20 and 28) and are among the most important features of the Federal Republic.',
      memoryTip: 'You are looking for what Germany is not: there has been no king since 1918.',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Almanya bir monarşi değil, cumhuriyettir. Devletin başında bir kral veya kraliçe değil, beş yıllığına seçilen Cumhurbaşkanı bulunur. Almanya’da monarşi 1918’de Alman İmparatorluğu’nun sona ermesiyle bitti.',
      otherOptions: 'Demokrasi, hukuk devleti ve sosyal devlet Almanya’yı doğru anlatır. Bu ilkeler Anayasa’da (madde 20 ve 28) yer alır ve Federal Cumhuriyet’in en önemli özellikleri arasındadır.',
      memoryTip: 'Almanya’nın ne olmadığını arıyorsun: 1918’den beri kral yok.',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  35: {
    de: {
      background: 'Die Sozialversicherung wird vor allem durch Sozialabgaben finanziert: Beiträge, die von Lohn und Gehalt abgezogen werden. Bei den meisten Versicherungen zahlen Arbeitnehmerinnen und Arbeitnehmer und Arbeitgeber jeweils ungefähr die Hälfte. Zur Sozialversicherung gehören Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Die Unfallversicherung bezahlen die Arbeitgeber allein; der Staat gibt außerdem Zuschüsse aus Steuern, zum Beispiel für die Rente.',
      otherOptions: 'Die Kirchensteuer geht an die Kirchen, nicht an die Sozialversicherung. Spenden und Vereinsbeiträge sind freiwillige Zahlungen an Organisationen oder Vereine; damit finanziert der Staat keine Sozialversicherung.',
      memoryTip: 'Sozialversicherung wird mit Sozialabgaben bezahlt – das Wort steckt schon drin.',
      legalBasis: [],
    },
    en: {
      background: 'Social insurance is mainly financed through social security contributions, which are deducted from wages and salaries. For most types of insurance, employees and employers each pay roughly half. Social insurance includes health, long-term care, pension, unemployment and accident insurance. Accident insurance is paid by employers alone; the state also adds subsidies from taxes, for example for pensions.',
      otherOptions: 'Church tax goes to the churches, not to social insurance. Donations and membership fees are voluntary payments to organisations or clubs; the state does not use them to finance social insurance.',
      memoryTip: 'Social insurance is paid for with social contributions (Sozialabgaben) – the word is already in the name.',
      legalBasis: [],
    },
    tr: {
      background: 'Sosyal sigorta esas olarak ücret ve maaştan kesilen sosyal sigorta primleriyle finanse edilir. Çoğu sigortada çalışan ve işveren yaklaşık yarı yarıya öder. Sosyal sigortaya sağlık, bakım, emeklilik, işsizlik ve iş kazası sigortası dahildir. İş kazası sigortasını yalnızca işverenler öder; devlet ayrıca vergilerden, örneğin emeklilik için, katkı yapar.',
      otherOptions: 'Kilise vergisi sosyal sigortaya değil, kiliselere gider. Bağışlar ve dernek aidatları kuruluşlara veya derneklere yapılan gönüllü ödemelerdir; devlet sosyal sigortayı bunlarla finanse etmez.',
      memoryTip: 'Sosyal sigorta sosyal primlerle (Sozialabgaben) ödenir – kelime zaten adında var.',
      legalBasis: [],
    },
  },
  36: {
    de: {
      background: 'Die Krankenversicherung gehört zur Sozialversicherung und ist in Deutschland Pflicht. Sie bezahlt Arztbesuche, Krankenhausaufenthalte und viele Medikamente. Die meisten Menschen sind gesetzlich versichert; einige, etwa Beamte oder Selbstständige, können sich privat versichern. Zusammen mit Renten-, Pflege-, Arbeitslosen- und Unfallversicherung schafft sie soziale Sicherheit.',
      otherOptions: 'Auto-, Gebäude- und Haftpflichtversicherung sind private Versicherungen. Sie schützen vor Schäden an Sachen oder vor Schadenersatzforderungen. Für Autos ist eine Haftpflichtversicherung zwar Pflicht, sie gehört aber trotzdem nicht zur sozialen Sicherheit.',
      memoryTip: 'Soziale Sicherheit betrifft Menschen (Krankheit, Alter, Arbeitslosigkeit), nicht Autos oder Häuser.',
      legalBasis: [],
    },
    en: {
      background: 'Health insurance is part of social insurance and is compulsory in Germany. It pays for doctor’s visits, hospital stays and many medicines. Most people have statutory health insurance; some, such as civil servants or the self-employed, can take out private insurance. Together with pension, long-term care, unemployment and accident insurance, it provides social security.',
      otherOptions: 'Car, building and liability insurance are private insurances. They protect against damage to property or against compensation claims. Liability insurance is compulsory for cars, but it is still not part of social security.',
      memoryTip: 'Social security is about people (illness, old age, unemployment), not cars or houses.',
      legalBasis: [],
    },
    tr: {
      background: 'Sağlık sigortası sosyal sigortanın bir parçasıdır ve Almanya’da zorunludur. Doktor ziyaretlerini, hastane yatışlarını ve birçok ilacı karşılar. İnsanların çoğu yasal sağlık sigortasındadır; memurlar veya serbest çalışanlar gibi bazı kişiler özel sigorta yaptırabilir. Emeklilik, bakım, işsizlik ve iş kazası sigortasıyla birlikte sosyal güvence sağlar.',
      otherOptions: 'Araç, bina ve sorumluluk sigortası özel sigortalardır. Eşyalara gelen zarara veya tazminat taleplerine karşı korurlar. Araçlar için sorumluluk sigortası zorunludur, ama yine de sosyal güvencenin parçası değildir.',
      memoryTip: 'Sosyal güvence insanlarla ilgilidir (hastalık, yaşlılık, işsizlik), arabalar veya evlerle değil.',
      legalBasis: [],
    },
  },
  37: {
    de: {
      background: 'In 13 der 16 Bundesländer heißt der Regierungschef oder die Regierungschefin Ministerpräsident oder Ministerpräsidentin. Er oder sie wird vom Landtag gewählt und leitet die Landesregierung. In den drei Stadtstaaten gibt es andere Titel: In Berlin heißt das Amt Regierender Bürgermeister, in Hamburg Erster Bürgermeister und in Bremen Präsident des Senats.',
      otherOptions: 'Premierminister ist der Titel des britischen Regierungschefs, Erster Minister der von Schottland oder Wales. Senatoren und Senatorinnen sind in den Stadtstaaten Berlin, Hamburg und Bremen die Mitglieder der Landesregierung – also so etwas wie Landesminister, nicht die Chefs.',
      memoryTip: 'Land = Ministerpräsident; Bund = Bundeskanzler.',
      legalBasis: [],
    },
    en: {
      background: 'In 13 of the 16 federal states, the head of government is called Minister-President (Ministerpräsident or Ministerpräsidentin). They are elected by the state parliament and lead the state government. The three city states use other titles: in Berlin the office is called Governing Mayor, in Hamburg First Mayor and in Bremen President of the Senate.',
      otherOptions: 'Prime Minister is the title of the British head of government, First Minister that of Scotland or Wales. In the city states of Berlin, Hamburg and Bremen, senators are the members of the state government – something like state ministers, not the heads.',
      memoryTip: 'State = Minister-President; federation = Federal Chancellor.',
      legalBasis: [],
    },
    tr: {
      background: '16 eyaletin 13’ünde hükümet başkanına Ministerpräsident (eyalet başbakanı) denir. Eyalet meclisi tarafından seçilir ve eyalet hükümetini yönetir. Üç şehir eyaletinde başka unvanlar kullanılır: Berlin’de “Regierender Bürgermeister”, Hamburg’da “Erster Bürgermeister” ve Bremen’de “Senato Başkanı”.',
      otherOptions: 'Premierminister İngiltere’nin hükümet başkanının unvanıdır, Erster Minister ise İskoçya veya Galler’inki. Berlin, Hamburg ve Bremen şehir eyaletlerinde senatörler eyalet hükümetinin üyeleridir – yani eyalet bakanı gibidirler, başkan değil.',
      memoryTip: 'Eyalet = Ministerpräsident; federal düzey = Federal Şansölye.',
      legalBasis: [],
    },
  },
  38: {
    de: {
      background: 'Laut Artikel 20 des Grundgesetzes ist Deutschland ein „demokratischer und sozialer Bundesstaat“. In einem Bundesstaat schließen sich Länder zu einem gemeinsamen Staat zusammen. Die Länder behalten eigene Zuständigkeiten, zum Beispiel für Schulen und Polizei; der Bund ist zum Beispiel für Außenpolitik und Verteidigung zuständig.',
      otherOptions: 'Ein Staatenbund ist ein lockerer Zusammenschluss selbstständiger Staaten ohne gemeinsamen Staat. Staatenverbund nennt das Bundesverfassungsgericht die Europäische Union. In einem Zentralstaat wie Frankreich gibt es keine Länder mit eigenen Parlamenten und Regierungen.',
      memoryTip: 'Bundesrepublik → Bundesstaat.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
    en: {
      background: 'According to Article 20 of the Basic Law, Germany is a “democratic and social federal state”. In a federal state, states join together to form one common state. The states keep their own responsibilities, for example for schools and the police; the federation is responsible, for example, for foreign policy and defence.',
      otherOptions: 'A confederation (Staatenbund) is a loose association of independent states without a common state. The Federal Constitutional Court calls the European Union a “Staatenverbund” (association of states). In a centralised state like France, there are no states with their own parliaments and governments.',
      memoryTip: 'Federal Republic → federal state (Bundesstaat).',
      legalBasis: [law('Art. 20 Basic Law (GG)', 'gg/art_20.html')],
    },
    tr: {
      background: 'Anayasa’nın 20. maddesine göre Almanya “demokratik ve sosyal bir federal devlettir”. Federal devlette eyaletler bir araya gelerek ortak bir devlet oluşturur. Eyaletler örneğin okullar ve polis gibi kendi sorumluluklarını korur; federal yönetim ise örneğin dış politika ve savunmadan sorumludur.',
      otherOptions: 'Devletler birliği (Staatenbund), ortak bir devleti olmayan bağımsız devletlerin gevşek bir birleşimidir. Federal Anayasa Mahkemesi Avrupa Birliği’ni “Staatenverbund” olarak tanımlar. Fransa gibi merkezî bir devlette kendi parlamentosu ve hükümeti olan eyaletler yoktur.',
      memoryTip: 'Federal Cumhuriyet → federal devlet (Bundesstaat).',
      legalBasis: [law('Anayasa (GG) md. 20', 'gg/art_20.html')],
    },
  },
  39: {
    de: {
      background: 'Jedes der 16 Bundesländer hat eine eigene Regierung, ein eigenes Parlament (meist Landtag genannt) und eine eigene Verfassung. Die Landesregierung ist zum Beispiel für Schulen, Polizei und Hochschulen zuständig. An ihrer Spitze steht in den meisten Ländern ein Ministerpräsident oder eine Ministerpräsidentin.',
      otherOptions: 'Außenpolitik, Verteidigung und Währung sind Aufgaben des Bundes oder der EU. Die Bundeswehr ist die einzige deutsche Armee, Außenministerin oder Außenminister gibt es nur auf Bundesebene, und in ganz Deutschland zahlt man mit dem Euro.',
      memoryTip: 'Außenpolitik, Armee und Geld macht der Bund – eine Regierung hat jedes Land.',
      legalBasis: [law('Art. 30 GG', 'gg/art_30.html')],
    },
    en: {
      background: 'Each of the 16 federal states has its own government, its own parliament (usually called Landtag) and its own constitution. The state government is responsible, for example, for schools, the police and universities. In most states it is headed by a Minister-President.',
      otherOptions: 'Foreign policy, defence and currency are matters for the federation or the EU. The Bundeswehr is Germany’s only army, there is a foreign minister only at federal level, and people pay with the euro throughout Germany.',
      memoryTip: 'Foreign policy, the army and money are federal matters – but every state has a government.',
      legalBasis: [law('Art. 30 Basic Law (GG)', 'gg/art_30.html')],
    },
    tr: {
      background: '16 eyaletin her birinin kendi hükümeti, kendi parlamentosu (çoğunlukla Landtag denir) ve kendi anayasası vardır. Eyalet hükümeti örneğin okullardan, polisten ve üniversitelerden sorumludur. Çoğu eyalette başında bir Ministerpräsident bulunur.',
      otherOptions: 'Dış politika, savunma ve para birimi federal yönetimin veya AB’nin işidir. Bundeswehr Almanya’nın tek ordusudur, dışişleri bakanı yalnızca federal düzeyde vardır ve Almanya’nın her yerinde euro ile ödeme yapılır.',
      memoryTip: 'Dış politika, ordu ve para federal düzeyin işidir – ama her eyaletin bir hükümeti vardır.',
      legalBasis: [law('Anayasa (GG) md. 30', 'gg/art_30.html')],
    },
  },
  40: {
    de: {
      background: 'Die deutsche Nationalhymne ist die dritte Strophe des „Liedes der Deutschen“. Den Text schrieb August Heinrich Hoffmann von Fallersleben 1841, die Melodie stammt von Joseph Haydn. Seit 1991 ist offiziell nur die dritte Strophe die Nationalhymne. Sie beginnt mit den Worten „Einigkeit und Recht und Freiheit für das deutsche Vaterland“.',
      otherOptions: '„Völker, hört die Signale“ stammt aus der „Internationale“, einem Lied der Arbeiterbewegung. „Freude schöner Götterfunken“ ist der Anfang von Beethovens „Ode an die Freude“, der Europahymne. „Deutschland einig Vaterland“ ist eine Zeile aus der Nationalhymne der DDR.',
      memoryTip: 'Einigkeit, Recht, Freiheit – diese Worte stehen auch auf dem Rand der deutschen 2-Euro-Münze.',
      legalBasis: [],
    },
    en: {
      background: 'The German national anthem is the third verse of the “Song of the Germans” (Lied der Deutschen). The lyrics were written by August Heinrich Hoffmann von Fallersleben in 1841, and the melody is by Joseph Haydn. Since 1991, only the third verse has officially been the national anthem. It begins with the words “Einigkeit und Recht und Freiheit für das deutsche Vaterland” (Unity and justice and freedom for the German fatherland).',
      otherOptions: '“Völker, hört die Signale” comes from “The Internationale”, a song of the labour movement. “Freude schöner Götterfunken” is the beginning of Beethoven’s “Ode to Joy”, the European anthem. “Deutschland einig Vaterland” is a line from the national anthem of the GDR.',
      memoryTip: 'Unity, justice, freedom – these words are also on the edge of the German 2-euro coin.',
      legalBasis: [],
    },
    tr: {
      background: 'Alman milli marşı “Almanların Şarkısı”nın (Lied der Deutschen) üçüncü kıtasıdır. Sözlerini 1841’de August Heinrich Hoffmann von Fallersleben yazdı, bestesi Joseph Haydn’a aittir. 1991’den beri resmî olarak yalnızca üçüncü kıta milli marştır. “Einigkeit und Recht und Freiheit für das deutsche Vaterland” (Alman vatanı için birlik, hukuk ve özgürlük) sözleriyle başlar.',
      otherOptions: '“Völker, hört die Signale” işçi hareketinin şarkısı “Enternasyonal”den gelir. “Freude schöner Götterfunken” Beethoven’ın Avrupa marşı olan “Neşeye Övgü”sünün başlangıcıdır. “Deutschland einig Vaterland” DDR milli marşından bir dizedir.',
      memoryTip: 'Birlik, hukuk, özgürlük – bu kelimeler Alman 2 euroluğunun kenarında da yazar.',
      legalBasis: [],
    },
  },
  41: {
    de: {
      background: 'In einer Demokratie haben die Menschen unterschiedliche Meinungen und Interessen. Parteien sammeln diese Meinungen, machen daraus Programme und stellen sich zur Wahl. Nur wenn es mehrere Parteien gibt, haben die Wählerinnen und Wähler eine echte Auswahl. Das Grundgesetz sagt in Artikel 21: Parteien wirken bei der politischen Willensbildung des Volkes mit.',
      otherOptions: 'Mehrere Parteien verhindern nicht automatisch Bestechung – dafür gibt es Gesetze und Kontrollen. Demonstrationen sollen in einer Demokratie gerade nicht verhindert werden; sie sind durch die Versammlungsfreiheit geschützt. Wirtschaftlicher Wettbewerb ist ein Thema der Wirtschaft, nicht der Grund für mehrere Parteien.',
      memoryTip: 'Viele Meinungen → viele Parteien.',
      legalBasis: [law('Art. 21 GG', 'gg/art_21.html')],
    },
    en: {
      background: 'In a democracy, people have different opinions and interests. Parties gather these opinions, turn them into programmes and stand for election. Only if there are several parties do voters have a real choice. Article 21 of the Basic Law says that parties participate in forming the political will of the people.',
      otherOptions: 'Several parties do not automatically prevent bribery – there are laws and controls for that. In a democracy, demonstrations should not be prevented; they are protected by freedom of assembly. Economic competition is a matter for the economy, not the reason for having several parties.',
      memoryTip: 'Many opinions → many parties.',
      legalBasis: [law('Art. 21 Basic Law (GG)', 'gg/art_21.html')],
    },
    tr: {
      background: 'Demokraside insanların farklı görüşleri ve çıkarları vardır. Partiler bu görüşleri toplar, programlara dönüştürür ve seçime girer. Seçmenlerin gerçek bir seçeneği ancak birden fazla parti varsa olur. Anayasa’nın 21. maddesi, partilerin halkın siyasi iradesinin oluşumuna katıldığını söyler.',
      otherOptions: 'Birden fazla parti olması rüşveti kendiliğinden önlemez – bunun için yasalar ve denetimler vardır. Demokraside gösteriler engellenmemelidir; toplanma özgürlüğüyle korunurlar. Ekonomik rekabet ekonominin konusudur, birden fazla parti olmasının nedeni değildir.',
      memoryTip: 'Çok görüş → çok parti.',
      legalBasis: [law('Anayasa (GG) md. 21', 'gg/art_21.html')],
    },
  },
  42: {
    de: {
      background: 'Neue Bundesgesetze beschließt das Parlament: der Bundestag, bei vielen Gesetzen zusammen mit dem Bundesrat. Vorschläge für Gesetze können von der Bundesregierung, aus dem Bundestag oder vom Bundesrat kommen. Für Landesgesetze sind die Landtage zuständig. Das ist Teil der Gewaltenteilung: Das Parlament macht die Gesetze.',
      otherOptions: 'Die Regierung kann Gesetze vorschlagen, beschließt sie aber nicht. Gerichte wenden Gesetze an und können prüfen, ob sie mit dem Grundgesetz vereinbar sind. Die Polizei sorgt dafür, dass Gesetze eingehalten werden.',
      memoryTip: 'Parlament = Gesetze machen; Regierung = ausführen; Gerichte = Recht sprechen.',
      legalBasis: [law('Art. 77 GG', 'gg/art_77.html')],
    },
    en: {
      background: 'New federal laws are passed by parliament: the Bundestag, together with the Bundesrat for many laws. Proposals for laws can come from the federal government, from the Bundestag or from the Bundesrat. The state parliaments are responsible for state laws. This is part of the separation of powers: parliament makes the laws.',
      otherOptions: 'The government can propose laws but does not pass them. Courts apply laws and can review whether they are compatible with the Basic Law. The police make sure laws are followed.',
      memoryTip: 'Parliament = makes laws; government = carries them out; courts = judge.',
      legalBasis: [law('Art. 77 Basic Law (GG)', 'gg/art_77.html')],
    },
    tr: {
      background: 'Yeni federal yasaları parlamento kabul eder: Federal Meclis, birçok yasada Federal Konsey ile birlikte. Yasa önerileri federal hükümetten, Federal Meclis’ten veya Federal Konsey’den gelebilir. Eyalet yasalarından eyalet meclisleri sorumludur. Bu kuvvetler ayrılığının bir parçasıdır: Yasaları parlamento yapar.',
      otherOptions: 'Hükümet yasa önerebilir ama kabul etmez. Mahkemeler yasaları uygular ve Anayasa’ya uygun olup olmadıklarını denetleyebilir. Polis yasalara uyulmasını sağlar.',
      memoryTip: 'Parlamento = yasa yapar; hükümet = uygular; mahkemeler = yargılar.',
      legalBasis: [law('Anayasa (GG) md. 77', 'gg/art_77.html')],
    },
  },
  43: {
    de: {
      background: 'Eine Partei kann verboten werden, wenn sie die freiheitliche demokratische Grundordnung beseitigen will oder den Bestand Deutschlands gefährdet (Artikel 21 Grundgesetz). Ein Verbot kann nur das Bundesverfassungsgericht aussprechen. Einen Antrag dafür können Bundestag, Bundesrat oder Bundesregierung stellen. Die Hürden sind hoch, damit Parteien nicht einfach aus politischen Gründen verboten werden.',
      otherOptions: 'Ein teurer Wahlkampf, Kritik am Staatsoberhaupt oder ein Programm mit neuen Ideen sind in einer Demokratie erlaubt. Gerade Kritik und neue politische Richtungen gehören zum demokratischen Wettbewerb der Parteien.',
      memoryTip: 'Verboten wird nur, wer gegen die Verfassung kämpft – nicht, wer kritisiert.',
      legalBasis: [law('Art. 21 GG', 'gg/art_21.html')],
    },
    en: {
      background: 'A party can be banned if it seeks to abolish the free democratic basic order or endangers the existence of Germany (Article 21 of the Basic Law). Only the Federal Constitutional Court can impose a ban. An application can be made by the Bundestag, the Bundesrat or the federal government. The hurdles are high so that parties cannot simply be banned for political reasons.',
      otherOptions: 'An expensive election campaign, criticism of the head of state or a programme with new ideas are allowed in a democracy. Criticism and new political directions are part of the democratic competition between parties.',
      memoryTip: 'Only those who fight the constitution are banned – not those who criticise.',
      legalBasis: [law('Art. 21 Basic Law (GG)', 'gg/art_21.html')],
    },
    tr: {
      background: 'Bir parti, özgürlükçü demokratik temel düzeni ortadan kaldırmak isterse veya Almanya’nın varlığını tehlikeye atarsa yasaklanabilir (Anayasa madde 21). Yasak kararını yalnızca Federal Anayasa Mahkemesi verebilir. Bunun için Federal Meclis, Federal Konsey veya federal hükümet başvurabilir. Partilerin siyasi nedenlerle kolayca yasaklanmaması için engeller yüksektir.',
      otherOptions: 'Pahalı bir seçim kampanyası, devlet başkanını eleştirmek veya yeni fikirler içeren bir program demokraside serbesttir. Eleştiri ve yeni siyasi yönelimler partiler arasındaki demokratik rekabetin parçasıdır.',
      memoryTip: 'Sadece anayasaya karşı savaşan yasaklanır – eleştiren değil.',
      legalBasis: [law('Anayasa (GG) md. 21', 'gg/art_21.html')],
    },
  },
  44: {
    de: {
      background: 'Der Bundespräsident oder die Bundespräsidentin wird nicht direkt vom Volk gewählt, sondern von der Bundesversammlung. Sie besteht aus allen Bundestagsabgeordneten und genauso vielen Vertreterinnen und Vertretern, die die Landtage bestimmen. Die Amtszeit dauert fünf Jahre; eine Wiederwahl ist einmal möglich.',
      otherOptions: 'Die Abgeordneten des EU-Parlaments, des Landtags und des Bundestages wählen die Bürgerinnen und Bürger direkt. Bei Kommunalwahlen und bei EU-Wahlen dürfen auch EU-Bürgerinnen und -Bürger mit Wohnsitz in Deutschland wählen.',
      memoryTip: 'Präsident → Bundesversammlung; Parlamente → das Volk.',
      legalBasis: [law('Art. 54 GG', 'gg/art_54.html')],
    },
    en: {
      background: 'The Federal President is not elected directly by the people but by the Federal Convention. It is made up of all members of the Bundestag and the same number of delegates chosen by the state parliaments. The term of office is five years; one re-election is possible.',
      otherOptions: 'Citizens directly elect the members of the European Parliament, the state parliament and the Bundestag. EU citizens living in Germany may also vote in local elections and European elections.',
      memoryTip: 'President → Federal Convention; parliaments → the people.',
      legalBasis: [law('Art. 54 Basic Law (GG)', 'gg/art_54.html')],
    },
    tr: {
      background: 'Cumhurbaşkanını halk doğrudan değil, Federal Kurul (Bundesversammlung) seçer. Federal Kurul, bütün Federal Meclis üyelerinden ve eyalet meclislerinin belirlediği aynı sayıda temsilciden oluşur. Görev süresi beş yıldır; bir kez yeniden seçilmek mümkündür.',
      otherOptions: 'Vatandaşlar Avrupa Parlamentosu, eyalet meclisi ve Federal Meclis üyelerini doğrudan seçer. Almanya’da yaşayan AB vatandaşları da yerel seçimlerde ve Avrupa seçimlerinde oy kullanabilir.',
      memoryTip: 'Cumhurbaşkanı → Federal Kurul; parlamentolar → halk.',
      legalBasis: [law('Anayasa (GG) md. 54', 'gg/art_54.html')],
    },
  },
  45: {
    de: {
      background: 'Die Pflegeversicherung gehört zur Sozialversicherung. Sie wurde 1995 als jüngster Zweig eingeführt und hilft Menschen, die wegen Krankheit, Behinderung oder Alter dauerhaft Pflege brauchen – zu Hause oder im Pflegeheim. Wer gesetzlich krankenversichert ist, ist automatisch auch in der Pflegeversicherung. Die Beiträge teilen sich Arbeitnehmer und Arbeitgeber; wer keine Kinder hat, zahlt einen kleinen Zuschlag.',
      otherOptions: 'Die Unfallversicherung ist selbst ein Zweig der Sozialversicherung, aber die Pflegeversicherung gehört nicht zu ihr. Hausrats-, Haftpflicht- und Feuerversicherungen sind private Versicherungen für Sachschäden.',
      memoryTip: 'Fünf Zweige der Sozialversicherung: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.',
      legalBasis: [],
    },
    en: {
      background: 'Long-term care insurance is part of social insurance. It was introduced in 1995 as the newest branch and helps people who need long-term care because of illness, disability or old age – at home or in a care home. Anyone with statutory health insurance is automatically covered by long-term care insurance. Employees and employers share the contributions; people without children pay a small surcharge.',
      otherOptions: 'Accident insurance is itself a branch of social insurance, but long-term care insurance is not part of it. Household contents, liability and fire insurance are private insurances against damage to property.',
      memoryTip: 'Five branches of social insurance: health, long-term care, pension, unemployment and accident insurance.',
      legalBasis: [],
    },
    tr: {
      background: 'Bakım sigortası sosyal sigortanın bir parçasıdır. 1995’te en yeni kol olarak getirildi ve hastalık, engellilik veya yaşlılık nedeniyle uzun süreli bakıma ihtiyaç duyan insanlara – evde ya da bakımevinde – yardım eder. Yasal sağlık sigortası olan herkes otomatik olarak bakım sigortasına da dahildir. Primleri çalışan ve işveren paylaşır; çocuğu olmayanlar küçük bir ek prim öder.',
      otherOptions: 'İş kazası sigortası da sosyal sigortanın bir koludur, ama bakım sigortası ona dahil değildir. Ev eşyası, sorumluluk ve yangın sigortaları eşya hasarlarına karşı özel sigortalardır.',
      memoryTip: 'Sosyal sigortanın beş kolu: sağlık, bakım, emeklilik, işsizlik ve iş kazası sigortası.',
      legalBasis: [],
    },
  },
  46: {
    de: {
      background: 'Der Staat sorgt für die öffentliche Infrastruktur: Er baut und unterhält Straßen, Brücken, Schulen und Krankenhäuser. Je nach Aufgabe sind Bund, Länder oder Gemeinden zuständig – Autobahnen zum Beispiel der Bund, Schulgebäude meist die Städte und Gemeinden. Bezahlt wird das vor allem aus Steuern.',
      otherOptions: 'Lebensmittel, Kleidung, Autos und Busse stellen in der sozialen Marktwirtschaft private Unternehmen her und verkaufen sie. Kostenlose Zeitungen für alle verteilt der Staat nicht; die Presse ist unabhängig vom Staat.',
      memoryTip: 'Der Staat baut, was alle brauchen: Straßen und Schulen.',
      legalBasis: [],
    },
    en: {
      background: 'The state provides public infrastructure: it builds and maintains roads, bridges, schools and hospitals. Depending on the task, the federation, the states or the municipalities are responsible – motorways, for example, are federal, while school buildings are usually provided by towns and municipalities. This is paid for mainly from taxes.',
      otherOptions: 'In the social market economy, food, clothing, cars and buses are produced and sold by private companies. The state does not hand out free newspapers to everyone; the press is independent of the state.',
      memoryTip: 'The state builds what everyone needs: roads and schools.',
      legalBasis: [],
    },
    tr: {
      background: 'Devlet kamusal altyapıyı sağlar: Yolları, köprüleri, okulları ve hastaneleri yapar ve bakımını üstlenir. Göreve göre federal yönetim, eyaletler veya belediyeler sorumludur – örneğin otoyollar federal yönetimin, okul binaları ise genellikle şehirlerin ve belediyelerin işidir. Bunlar esas olarak vergilerle ödenir.',
      otherOptions: 'Sosyal piyasa ekonomisinde gıdayı, giysiyi, arabaları ve otobüsleri özel şirketler üretir ve satar. Devlet herkese ücretsiz gazete dağıtmaz; basın devletten bağımsızdır.',
      memoryTip: 'Devlet herkesin ihtiyaç duyduğunu yapar: yollar ve okullar.',
      legalBasis: [],
    },
  },
  47: {
    de: {
      background: 'Der Staat unterstützt Familien, Kultur und Sport. Er zahlt zum Beispiel Kindergeld für Kinder, fördert Museen und Theater und unterstützt Sportlerinnen und Sportler. Für Urlaubsreisen müssen die Menschen aber selbst bezahlen – das ist keine Aufgabe des Staates.',
      otherOptions: 'Kindergeld zahlt die Familienkasse an Eltern. Museen werden vor allem von Ländern und Städten gefördert. Sportförderung gibt es für Spitzensport und Breitensport, etwa für Vereine. Alle drei gehören also zu den Aufgaben des Staates.',
      memoryTip: 'Gesucht ist das, was nicht passt: Urlaub zahlt man selbst.',
      legalBasis: [],
    },
    en: {
      background: 'The state supports families, culture and sport. For example, it pays child benefit (Kindergeld), funds museums and theatres and supports athletes. But people have to pay for their own holidays – that is not a task of the state.',
      otherOptions: 'Child benefit is paid to parents by the Family Benefits Office (Familienkasse). Museums are funded mainly by the states and cities. Sport is funded at both elite and grassroots level, for example through clubs. All three are tasks of the state.',
      memoryTip: 'You are looking for what does not fit: you pay for your holidays yourself.',
      legalBasis: [],
    },
    tr: {
      background: 'Devlet aileleri, kültürü ve sporu destekler. Örneğin çocuklar için çocuk parası (Kindergeld) öder, müzeleri ve tiyatroları destekler ve sporculara yardım eder. Ama tatil yolculuklarını insanlar kendileri ödemek zorundadır – bu devletin görevi değildir.',
      otherOptions: 'Çocuk parasını ebeveynlere Familienkasse (Aile Kasası) öder. Müzeler esas olarak eyaletler ve şehirler tarafından desteklenir. Spor, hem profesyonel hem de amatör düzeyde, örneğin kulüpler aracılığıyla desteklenir. Üçü de devletin görevleri arasındadır.',
      memoryTip: 'Uymayanı arıyorsun: Tatilini kendin ödersin.',
      legalBasis: [],
    },
  },
  48: {
    de: {
      background: 'Verfassungsorgane sind die obersten Organe des Bundes, die im Grundgesetz geregelt sind: Bundestag, Bundesrat, Bundesregierung, Bundespräsident, Bundesversammlung und Bundesverfassungsgericht. Sie teilen sich die Aufgaben des Staates und kontrollieren sich gegenseitig. Das Bundesverfassungsgericht in Karlsruhe wacht darüber, dass alle anderen Organe das Grundgesetz einhalten.',
      otherOptions: 'Der Bundesrat, der Bundespräsident und die Bundesregierung sind Verfassungsorgane. Eine „Bürgerversammlung“ gibt es nur auf kommunaler Ebene in einigen Ländern, als Treffen der Einwohnerinnen und Einwohner einer Gemeinde. Ein Verfassungsorgan des Bundes ist sie nicht.',
      memoryTip: 'Verfassungsorgane beginnen mit „Bundes-“ – die Bürgerversammlung passt nicht.',
      legalBasis: [],
    },
    en: {
      background: 'Constitutional bodies are the highest bodies of the federation set out in the Basic Law: the Bundestag, the Bundesrat, the federal government, the Federal President, the Federal Convention and the Federal Constitutional Court. They share the tasks of the state and keep a check on each other. The Federal Constitutional Court in Karlsruhe ensures that all other bodies respect the Basic Law.',
      otherOptions: 'The Bundesrat, the Federal President and the federal government are constitutional bodies. A “citizens’ assembly” (Bürgerversammlung) exists only at local level in some states, as a meeting of a municipality’s residents. It is not a constitutional body of the federation.',
      memoryTip: 'Constitutional bodies start with “Bundes-” (federal) – the citizens’ assembly does not fit.',
      legalBasis: [],
    },
    tr: {
      background: 'Anayasal organlar, federal düzeyde Anayasa’da düzenlenen en üst organlardır: Federal Meclis, Federal Konsey, federal hükümet, Cumhurbaşkanı, Federal Kurul ve Federal Anayasa Mahkemesi. Devletin görevlerini paylaşır ve birbirlerini denetlerler. Karlsruhe’deki Federal Anayasa Mahkemesi, diğer bütün organların Anayasa’ya uymasını gözetir.',
      otherOptions: 'Federal Konsey, Cumhurbaşkanı ve federal hükümet anayasal organlardır. “Vatandaş toplantısı” (Bürgerversammlung) yalnızca bazı eyaletlerde, yerel düzeyde bir belediye sakinlerinin toplantısı olarak vardır. Federal düzeyde bir anayasal organ değildir.',
      memoryTip: 'Anayasal organlar “Bundes-” (federal) ile başlar – vatandaş toplantısı uymaz.',
      legalBasis: [],
    },
  },
  49: {
    de: {
      background: 'Für Schulen sind in Deutschland die Bundesländer zuständig. Man nennt das Kulturhoheit der Länder. Deshalb gibt es in jedem Land eigene Schulgesetze, Lehrpläne, Schulformen und Ferientermine. Damit die Abschlüsse vergleichbar bleiben, stimmen sich die Länder in der Kultusministerkonferenz ab.',
      otherOptions: 'Lehrerinnen und Lehrer unterrichten nach den Vorgaben der Länder, machen aber keine Schulpolitik. Das Bundesfamilienministerium ist für Familien, Senioren, Frauen und Jugend zuständig, nicht für Schulen. Universitäten bilden Lehrkräfte aus, bestimmen aber nicht die Schulpolitik.',
      memoryTip: 'Schule ist Ländersache – deshalb sind die Sommerferien überall verschieden.',
      legalBasis: [law('Art. 30 GG', 'gg/art_30.html')],
    },
    en: {
      background: 'In Germany, the federal states are responsible for schools. This is called the cultural sovereignty of the states. That is why each state has its own school laws, curricula, types of schools and holiday dates. To keep qualifications comparable, the states coordinate in the Standing Conference of Ministers of Education (Kultusministerkonferenz).',
      otherOptions: 'Teachers teach according to the states’ rules but do not make school policy. The Federal Ministry for Family Affairs is responsible for families, senior citizens, women and youth, not schools. Universities train teachers but do not decide school policy.',
      memoryTip: 'Schools are a matter for the states – that is why summer holidays differ everywhere.',
      legalBasis: [law('Art. 30 Basic Law (GG)', 'gg/art_30.html')],
    },
    tr: {
      background: 'Almanya’da okullardan eyaletler sorumludur. Buna eyaletlerin kültür egemenliği denir. Bu yüzden her eyaletin kendi okul yasaları, müfredatları, okul türleri ve tatil tarihleri vardır. Diplomaların karşılaştırılabilir kalması için eyaletler Kültür Bakanları Konferansı’nda (Kultusministerkonferenz) uzlaşır.',
      otherOptions: 'Öğretmenler eyaletlerin kurallarına göre ders verir, ama eğitim politikası yapmaz. Federal Aile Bakanlığı okullardan değil; ailelerden, yaşlılardan, kadınlardan ve gençlerden sorumludur. Üniversiteler öğretmen yetiştirir, ama okul politikasını belirlemez.',
      memoryTip: 'Okul eyaletlerin işidir – bu yüzden yaz tatilleri her yerde farklıdır.',
      legalBasis: [law('Anayasa (GG) md. 30', 'gg/art_30.html')],
    },
  },
  50: {
    de: {
      background: 'Die Wirtschaftsform in Deutschland heißt soziale Marktwirtschaft. Unternehmen produzieren und verkaufen frei, Preise entstehen durch Angebot und Nachfrage. Der Staat sorgt aber für einen sozialen Ausgleich, zum Beispiel durch Sozialversicherung, Kündigungsschutz, Mindestlohn und Regeln für fairen Wettbewerb. Als Vater der sozialen Marktwirtschaft gilt Ludwig Erhard, der erste Wirtschaftsminister der Bundesrepublik.',
      otherOptions: 'In einer Planwirtschaft oder gelenkten Zentralwirtschaft bestimmt der Staat, was produziert wird und was es kostet – so war es in der DDR. Eine „freie Zentralwirtschaft“ gibt es nicht; frei und zentral gelenkt passen nicht zusammen.',
      memoryTip: 'Markt + sozialer Ausgleich = soziale Marktwirtschaft.',
      legalBasis: [],
    },
    en: {
      background: 'Germany’s economic system is called the social market economy. Companies produce and sell freely, and prices are set by supply and demand. But the state ensures social balance, for example through social insurance, protection against dismissal, the minimum wage and rules for fair competition. Ludwig Erhard, the first economics minister of the Federal Republic, is considered the father of the social market economy.',
      otherOptions: 'In a planned economy or a centrally directed economy, the state decides what is produced and what it costs – as in the GDR. A “free central economy” does not exist; free and centrally directed do not go together.',
      memoryTip: 'Market + social balance = social market economy.',
      legalBasis: [],
    },
    tr: {
      background: 'Almanya’nın ekonomik sistemine sosyal piyasa ekonomisi denir. Şirketler özgürce üretir ve satar, fiyatlar arz ve talebe göre oluşur. Ama devlet, örneğin sosyal sigorta, işten çıkarmaya karşı koruma, asgari ücret ve adil rekabet kurallarıyla sosyal dengeyi sağlar. Federal Cumhuriyet’in ilk ekonomi bakanı Ludwig Erhard sosyal piyasa ekonomisinin babası kabul edilir.',
      otherOptions: 'Planlı ekonomide veya merkezden yönlendirilen ekonomide neyin üretileceğine ve fiyatına devlet karar verir – DDR’de olduğu gibi. “Serbest merkezî ekonomi” diye bir şey yoktur; serbest ve merkezden yönlendirilen bir arada olmaz.',
      memoryTip: 'Piyasa + sosyal denge = sosyal piyasa ekonomisi.',
      legalBasis: [],
    },
  },
};

export const deepDiveLabels: Record<DeepDiveLanguage, { background: string; otherOptions: string; memoryTip: string; legalBasis: string }> = {
  de: { background: 'Hintergrund', otherOptions: 'Warum sind die anderen Antworten falsch?', memoryTip: 'Merkhilfe', legalBasis: 'Gesetzliche Grundlage' },
  en: { background: 'Background', otherOptions: 'Why are the other answers wrong?', memoryTip: 'Memory tip', legalBasis: 'Legal basis' },
  tr: { background: 'Arka plan', otherOptions: 'Diğer cevaplar neden yanlış?', memoryTip: 'Akılda tutma ipucu', legalBasis: 'Yasal dayanak' },
};

export function getQuestionDeepDive(id: number, lang: string): QuestionDeepDive | undefined {
  if (lang !== 'de' && lang !== 'en' && lang !== 'tr') return undefined;
  return deepDives[id]?.[lang];
}
