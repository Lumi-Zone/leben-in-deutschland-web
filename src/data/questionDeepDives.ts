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
