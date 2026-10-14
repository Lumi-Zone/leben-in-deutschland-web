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
  },
  12: {
    de: {
      background: 'Die Pressefreiheit steht in Artikel 5 des Grundgesetzes: Zeitungen, Rundfunk und Online-Medien dürfen frei berichten, und „eine Zensur findet nicht statt“. Grundrechte können zwar durch Gesetze in Grenzen eingeschränkt werden, aber nach Artikel 19 darf ein Grundrecht „in keinem Falle in seinem Wesensgehalt angetastet werden“. Außerdem ist die Demokratie durch die sogenannte Ewigkeitsklausel (Artikel 79 Absatz 3) geschützt – und ohne freie Presse gibt es keine Demokratie.',
      otherOptions: 'Eine einfache Mehrheit reicht nicht einmal für eine normale Grundgesetzänderung. Auch mit zwei Dritteln im Bundestag (und im Bundesrat) könnte die Pressefreiheit nicht abgeschafft werden, weil ihr Kern geschützt ist. Der Bundesrat ist die Vertretung der Länder und kann Grundrechte ebenfalls nicht abschaffen.',
      memoryTip: 'Grundrechte kann keine Mehrheit abschaffen – weder die Hälfte noch zwei Drittel.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html'), law('Art. 19 GG', 'gg/art_19.html'), law('Art. 79 GG', 'gg/art_79.html')],
    },
  },
  13: {
    de: {
      background: 'Im Bundestag gibt es zwei Seiten: die Regierungsparteien, die gemeinsam die Bundesregierung tragen, und die Opposition. Zur Opposition gehören alle Abgeordneten, deren Parteien nicht an der Regierung beteiligt sind. Ihre Aufgabe ist es, die Regierung zu kontrollieren und zu kritisieren und eigene Vorschläge zu machen – zum Beispiel durch Anfragen, Debatten oder Untersuchungsausschüsse. Eine starke Opposition ist wichtig für die Demokratie.',
      otherOptions: 'Die regierenden Parteien sind genau das Gegenteil der Opposition. Die Fraktion mit den meisten Abgeordneten stellt meistens die Regierung, muss es aber nicht. Die 5-Prozent-Hürde haben alle Parteien im Bundestag geschafft – Regierungs- und Oppositionsparteien.',
      memoryTip: 'Opposition = „gegenüber“ der Regierung: alle, die nicht mitregieren.',
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
  },
  15: {
    de: {
      background: 'Das Grundgesetz schützt in Artikel 12 die Berufsfreiheit. Dort steht auch: Niemand darf zu einer bestimmten Arbeit gezwungen werden, und Zwangsarbeit ist nur bei einer gerichtlich angeordneten Freiheitsentziehung zulässig, also zum Beispiel bei Arbeit im Gefängnis. Hintergrund ist auch die Geschichte: Im Nationalsozialismus mussten Millionen Menschen Zwangsarbeit leisten.',
      otherOptions: 'Militärdienst ist nicht verboten – Artikel 12a erlaubt ausdrücklich einen Wehrdienst. Die freie Berufswahl ist nicht verboten, sondern ein Grundrecht. Arbeit im Ausland ist ebenfalls erlaubt; jeder darf Deutschland verlassen und im Ausland arbeiten.',
      memoryTip: 'Verboten ist der Zwang, nicht die Arbeit: Zwangsarbeit.',
      legalBasis: [law('Art. 12 GG', 'gg/art_12.html')],
    },
  },
  16: {
    de: {
      background: 'Die Meinungsfreiheit findet ihre Grenzen unter anderem im „Recht der persönlichen Ehre“ (Artikel 5 Absatz 2). Wer öffentlich falsche Tatsachen über eine bestimmte Person verbreitet, kann sich strafbar machen, zum Beispiel wegen übler Nachrede oder Verleumdung. Betroffene können außerdem verlangen, dass die falsche Behauptung gelöscht oder widerrufen wird. Eine Meinung („Ich finde, das ist eine schlechte Politikerin“) ist geschützt, eine erfundene Tatsache („Sie hat Geld gestohlen“) nicht.',
      otherOptions: 'Meinungen über die Bundesregierung, Diskussionen über Religionen und Kritik am Staat sind von der Meinungsfreiheit gedeckt. Gerade die Kritik an Regierung und Staat soll die Meinungsfreiheit schützen.',
      memoryTip: 'Meinung ist frei – falsche Behauptungen über Personen sind es nicht.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
  },
  17: {
    de: {
      background: 'Artikel 3 des Grundgesetzes sagt: „Alle Menschen sind vor dem Gesetz gleich.“ Niemand darf wegen seines Geschlechts, seiner Abstammung, Sprache, Herkunft, seines Glaubens, seiner politischen Anschauungen oder einer Behinderung benachteiligt werden. Der Staat muss alle gleich behandeln – zum Beispiel bei Behörden, in der Schule oder vor Gericht. Ungleichbehandlung durch den Staat ist deshalb verboten.',
      otherOptions: 'Meinungsfreiheit (Artikel 5), Petitionen (Artikel 17) und Versammlungsfreiheit (Artikel 8) sind Grundrechte und damit ausdrücklich erlaubt. Mit einer Petition kann man sich schriftlich mit Bitten oder Beschwerden an Behörden oder Parlamente wenden.',
      memoryTip: 'Drei Antworten sind Grundrechte – verboten ist nur die Ungleichbehandlung.',
      legalBasis: [law('Art. 3 GG', 'gg/art_3.html')],
    },
  },
  18: {
    de: {
      background: 'Artikel 1 Absatz 1 ist der wichtigste Satz des Grundgesetzes: „Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt.“ Jeder Mensch hat Würde, unabhängig von Herkunft, Religion oder Staatsangehörigkeit. Nach den Verbrechen des Nationalsozialismus wurde dieser Satz bewusst an den Anfang gestellt. Artikel 1 darf nach der Ewigkeitsklausel (Artikel 79 Absatz 3) nie geändert werden.',
      otherOptions: 'Die anderen Rechte sind ebenfalls Grundrechte, stehen aber in anderen Artikeln: das Recht auf Leben in Artikel 2, die Religionsfreiheit in Artikel 4 und die Meinungsfreiheit in Artikel 5.',
      memoryTip: 'Artikel 1 – das Erste und Wichtigste: die Menschenwürde.',
      legalBasis: [law('Art. 1 GG', 'gg/art_1.html')],
    },
  },
  19: {
    de: {
      background: 'Freizügigkeit (Artikel 11 Grundgesetz) bedeutet: Man darf frei entscheiden, wo man in Deutschland wohnt, und darf innerhalb Deutschlands umziehen. Das Grundgesetz garantiert dieses Recht allen Deutschen. Für Bürgerinnen und Bürger der EU gilt zusätzlich die EU-Freizügigkeit. Für andere Ausländerinnen und Ausländer regelt das Aufenthaltsrecht, wo sie wohnen dürfen.',
      otherOptions: 'Den Beruf zu wechseln gehört zur Berufsfreiheit (Artikel 12), die Religion zu wechseln zur Glaubensfreiheit (Artikel 4). Die letzte Antwort ist eine Falle: Im Alltag bedeutet „freizügig“ auch „leicht bekleidet“ – mit dem Grundrecht hat das nichts zu tun.',
      memoryTip: 'Freizügigkeit = frei ziehen, also umziehen und den Wohnort frei wählen.',
      legalBasis: [law('Art. 11 GG', 'gg/art_11.html')],
    },
  },
  20: {
    de: {
      background: 'Eine Partei, die eine Diktatur errichten will, kämpft gegen die freiheitliche demokratische Grundordnung. Nach Artikel 21 Absatz 2 des Grundgesetzes ist sie dann verfassungswidrig. Verbieten kann eine Partei aber nur das Bundesverfassungsgericht. So wurden 1952 die Sozialistische Reichspartei und 1956 die KPD verboten. Deutschland nennt das „wehrhafte Demokratie“: Die Demokratie schützt sich gegen ihre Feinde.',
      otherOptions: 'Tolerant, rechtsstaatlich orientiert und gesetzestreu beschreiben genau das Gegenteil einer Partei, die eine Diktatur will. Eine Diktatur schafft Wahlen, Grundrechte und unabhängige Gerichte ab.',
      memoryTip: 'Gegen die Verfassung = verfassungswidrig.',
      legalBasis: [law('Art. 21 GG', 'gg/art_21.html')],
    },
  },
  21: {
    de: {
      background: 'Das Wappen der Bundesrepublik Deutschland zeigt einen schwarzen Adler mit roten Krallen, rotem Schnabel und roter Zunge auf goldgelbem Grund – den Bundesadler. Er ist auf Ausweisen, Münzen, Behördenschildern und im Plenarsaal des Bundestages zu sehen. Die Farben Schwarz, Rot und Gold sind auch die Farben der Bundesflagge.',
      otherOptions: 'Bild 2 zeigt das Christusmonogramm, ein christliches Symbol. Bild 3 ist das Eiserne Kreuz, das Erkennungszeichen der Bundeswehr. Bild 4 ist das Staatswappen der DDR mit Hammer, Zirkel und Ährenkranz – es gilt seit der Wiedervereinigung 1990 nicht mehr.',
      memoryTip: 'Das Bundeswappen hat dieselben Farben wie die Flagge: Schwarz, Rot, Gold.',
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
  },
  23: {
    de: {
      background: 'Die meisten Erwerbstätigen in Deutschland sind Arbeitnehmerinnen und Arbeitnehmer: Sie sind bei einer Firma oder bei einer Behörde angestellt und bekommen dafür Lohn oder Gehalt. Das gilt für rund neun von zehn Erwerbstätigen. Nur ein kleiner Teil arbeitet selbstständig, zum Beispiel mit einem eigenen Geschäft, einer Praxis oder als Freiberufler.',
      otherOptions: 'Viele Firmen in Deutschland sind Familienunternehmen, aber die meisten Menschen arbeiten nicht in kleinen Familienbetrieben. Ehrenamtliche Arbeit ist unbezahlt und wird zusätzlich zum Beruf geleistet. Selbstständige mit eigener Firma sind eine Minderheit.',
      memoryTip: 'Die meisten Menschen sind angestellt – bei einer Firma oder beim Staat.',
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
  },
  25: {
    de: {
      background: 'Elsass-Lothringen ist eine Region in Frankreich, an der Grenze zu Deutschland. Sie gehörte von 1871 bis 1918 zum Deutschen Reich, ist aber seit über hundert Jahren wieder französisch. Zur Bundesrepublik Deutschland hat sie nie gehört. Die 16 Bundesländer sind: Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen.',
      otherOptions: 'Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland mit der Hauptstadt Düsseldorf. Mecklenburg-Vorpommern (Hauptstadt Schwerin) und Sachsen-Anhalt (Hauptstadt Magdeburg) gehören zu den Ländern, die 1990 mit der Wiedervereinigung hinzukamen.',
      memoryTip: 'Elsass = Alsace: Das klingt französisch, und es ist französisch.',
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
  },
  27: {
    de: {
      background: 'Deutschland ist ein Bundesstaat: Es besteht aus 16 Ländern, die zusammen den Bund bilden. Die Länder haben eigene Verfassungen, Parlamente und Regierungen und sind zum Beispiel für Schulen und Polizei zuständig. Über den Bundesrat wirken sie an der Gesetzgebung des Bundes mit. Diese föderale Ordnung schützt das Grundgesetz besonders: Sie darf nach der Ewigkeitsklausel nicht abgeschafft werden.',
      otherOptions: 'Ein sozialistischer Staat war die DDR bis 1990. Eine Diktatur gab es im Nationalsozialismus. Eine Monarchie mit Kaiser gab es bis 1918. Keines davon beschreibt das heutige Deutschland.',
      memoryTip: 'Bundesrepublik = Bundesstaat aus 16 Ländern.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html'), law('Art. 79 GG', 'gg/art_79.html')],
    },
  },
  28: {
    de: {
      background: '„Alle Staatsgewalt geht vom Volke aus“, sagt Artikel 20 des Grundgesetzes. Deshalb wählen die wahlberechtigten Bürgerinnen und Bürger die Abgeordneten des Bundestages, in der Regel alle vier Jahre. Wahlberechtigt sind deutsche Staatsangehörige ab 18 Jahren. Mit der Erststimme wählt man eine Person im Wahlkreis, mit der Zweitstimme eine Partei.',
      otherOptions: 'Militär, Wirtschaft und Verwaltung haben bei Wahlen keine eigene Stimme. Soldatinnen, Unternehmer oder Beamte dürfen natürlich wählen – aber nur als einzelne wahlberechtigte Bürgerinnen und Bürger, nicht als Institution.',
      memoryTip: 'Demokratie heißt Volksherrschaft: Das Volk wählt.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html'), law('Art. 38 GG', 'gg/art_38.html')],
    },
  },
  29: {
    de: {
      background: 'Das Wappentier der Bundesrepublik Deutschland ist der Adler. Der Bundesadler ist schwarz auf goldenem Grund und eines der ältesten deutschen Hoheitszeichen. Man sieht ihn auf Münzen, Pässen und im Plenarsaal des Bundestages, wo eine große Adler-Skulptur hängt.',
      otherOptions: 'Löwe, Bär und Pferd sind Wappentiere einzelner Bundesländer und Städte: Der Bär ist das Wappentier Berlins, das springende Pferd findet man in den Wappen von Niedersachsen und Nordrhein-Westfalen, und Löwen zum Beispiel in den Wappen von Bayern und Hessen.',
      memoryTip: 'Der Bund hat den Adler – die Länder haben Löwe, Bär oder Pferd.',
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
  },
  31: {
    de: {
      background: 'Meistens erreicht bei einer Bundestagswahl keine Partei allein mehr als die Hälfte der Sitze. Dann arbeiten mehrere Parteien zusammen, um eine Mehrheit zu haben und die Regierung zu bilden. Das nennt man Koalition. Ihre gemeinsamen Pläne schreiben die Parteien in einen Koalitionsvertrag. Nach der Bundestagswahl 2025 bildeten zum Beispiel CDU/CSU und SPD eine Koalition.',
      otherOptions: 'Eine Fraktion ist die Gruppe der Abgeordneten einer Partei im Parlament – sie arbeitet in einer Koalition mit anderen Fraktionen zusammen. Ein Ministerium ist eine Behörde, die von einer Ministerin oder einem Minister geleitet wird. „Einheit“ ist kein politischer Fachbegriff für eine Regierungsbildung.',
      memoryTip: 'Koalition = Zusammenarbeit von Parteien; Fraktion = Abgeordnete einer Partei.',
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
  },
  33: {
    de: {
      background: 'In Deutschland sind Staat und Religionsgemeinschaften voneinander getrennt. Das Grundgesetz übernimmt dazu Regeln der Weimarer Verfassung: „Es besteht keine Staatskirche.“ Der Staat ist religiös neutral und bevorzugt keine Religion. Trotzdem arbeiten Staat und Religionsgemeinschaften in manchen Bereichen zusammen, zum Beispiel beim Religionsunterricht an Schulen oder bei der Kirchensteuer, die das Finanzamt für die Kirchen einzieht.',
      otherOptions: 'Religionsgemeinschaften bilden nicht den Staat, der Staat ist nicht von ihnen abhängig, und sie bilden auch keine Einheit. Das wäre ein Gottesstaat oder eine Staatskirche, die das Grundgesetz ausschließt.',
      memoryTip: 'Keine Staatskirche: Staat und Religion sind getrennt.',
      legalBasis: [law('Art. 140 GG', 'gg/art_140.html'), law('Art. 4 GG', 'gg/art_4.html')],
    },
  },
  34: {
    de: {
      background: 'Deutschland ist keine Monarchie, sondern eine Republik. An der Spitze des Staates steht kein König und keine Königin, sondern der Bundespräsident oder die Bundespräsidentin, der oder die für fünf Jahre gewählt wird. Die Monarchie endete in Deutschland 1918 mit dem Ende des Kaiserreichs.',
      otherOptions: 'Demokratie, Rechtsstaat und Sozialstaat beschreiben Deutschland richtig. Diese Prinzipien stehen im Grundgesetz (Artikel 20 und 28) und gehören zu den wichtigsten Merkmalen der Bundesrepublik.',
      memoryTip: 'Gesucht ist, was Deutschland nicht ist: Seit 1918 gibt es keinen König mehr.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
  },
  35: {
    de: {
      background: 'Die Sozialversicherung wird vor allem durch Sozialabgaben finanziert: Beiträge, die von Lohn und Gehalt abgezogen werden. Bei den meisten Versicherungen zahlen Arbeitnehmerinnen und Arbeitnehmer und Arbeitgeber jeweils ungefähr die Hälfte. Zur Sozialversicherung gehören Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Die Unfallversicherung bezahlen die Arbeitgeber allein; der Staat gibt außerdem Zuschüsse aus Steuern, zum Beispiel für die Rente.',
      otherOptions: 'Die Kirchensteuer geht an die Kirchen, nicht an die Sozialversicherung. Spenden und Vereinsbeiträge sind freiwillige Zahlungen an Organisationen oder Vereine; damit finanziert der Staat keine Sozialversicherung.',
      memoryTip: 'Sozialversicherung wird mit Sozialabgaben bezahlt – das Wort steckt schon drin.',
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
  },
  37: {
    de: {
      background: 'In 13 der 16 Bundesländer heißt der Regierungschef oder die Regierungschefin Ministerpräsident oder Ministerpräsidentin. Er oder sie wird vom Landtag gewählt und leitet die Landesregierung. In den drei Stadtstaaten gibt es andere Titel: In Berlin heißt das Amt Regierender Bürgermeister, in Hamburg Erster Bürgermeister und in Bremen Präsident des Senats.',
      otherOptions: 'Premierminister ist der Titel des britischen Regierungschefs, Erster Minister der von Schottland oder Wales. Senatoren und Senatorinnen sind in den Stadtstaaten Berlin, Hamburg und Bremen die Mitglieder der Landesregierung – also so etwas wie Landesminister, nicht die Chefs.',
      memoryTip: 'Land = Ministerpräsident; Bund = Bundeskanzler.',
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
  },
  39: {
    de: {
      background: 'Jedes der 16 Bundesländer hat eine eigene Regierung, ein eigenes Parlament (meist Landtag genannt) und eine eigene Verfassung. Die Landesregierung ist zum Beispiel für Schulen, Polizei und Hochschulen zuständig. An ihrer Spitze steht in den meisten Ländern ein Ministerpräsident oder eine Ministerpräsidentin.',
      otherOptions: 'Außenpolitik, Verteidigung und Währung sind Aufgaben des Bundes oder der EU. Die Bundeswehr ist die einzige deutsche Armee, Außenministerin oder Außenminister gibt es nur auf Bundesebene, und in ganz Deutschland zahlt man mit dem Euro.',
      memoryTip: 'Außenpolitik, Armee und Geld macht der Bund – eine Regierung hat jedes Land.',
      legalBasis: [law('Art. 30 GG', 'gg/art_30.html')],
    },
  },
  40: {
    de: {
      background: 'Die deutsche Nationalhymne ist die dritte Strophe des „Liedes der Deutschen“. Den Text schrieb August Heinrich Hoffmann von Fallersleben 1841, die Melodie stammt von Joseph Haydn. Seit 1991 ist offiziell nur die dritte Strophe die Nationalhymne. Sie beginnt mit den Worten „Einigkeit und Recht und Freiheit für das deutsche Vaterland“.',
      otherOptions: '„Völker, hört die Signale“ stammt aus der „Internationale“, einem Lied der Arbeiterbewegung. „Freude schöner Götterfunken“ ist der Anfang von Beethovens „Ode an die Freude“, der Europahymne. „Deutschland einig Vaterland“ ist eine Zeile aus der Nationalhymne der DDR.',
      memoryTip: 'Einigkeit, Recht, Freiheit – diese Worte stehen auch auf dem Rand der deutschen 2-Euro-Münze.',
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
  },
  42: {
    de: {
      background: 'Neue Bundesgesetze beschließt das Parlament: der Bundestag, bei vielen Gesetzen zusammen mit dem Bundesrat. Vorschläge für Gesetze können von der Bundesregierung, aus dem Bundestag oder vom Bundesrat kommen. Für Landesgesetze sind die Landtage zuständig. Das ist Teil der Gewaltenteilung: Das Parlament macht die Gesetze.',
      otherOptions: 'Die Regierung kann Gesetze vorschlagen, beschließt sie aber nicht. Gerichte wenden Gesetze an und können prüfen, ob sie mit dem Grundgesetz vereinbar sind. Die Polizei sorgt dafür, dass Gesetze eingehalten werden.',
      memoryTip: 'Parlament = Gesetze machen; Regierung = ausführen; Gerichte = Recht sprechen.',
      legalBasis: [law('Art. 77 GG', 'gg/art_77.html')],
    },
  },
  43: {
    de: {
      background: 'Eine Partei kann verboten werden, wenn sie die freiheitliche demokratische Grundordnung beseitigen will oder den Bestand Deutschlands gefährdet (Artikel 21 Grundgesetz). Ein Verbot kann nur das Bundesverfassungsgericht aussprechen. Einen Antrag dafür können Bundestag, Bundesrat oder Bundesregierung stellen. Die Hürden sind hoch, damit Parteien nicht einfach aus politischen Gründen verboten werden.',
      otherOptions: 'Ein teurer Wahlkampf, Kritik am Staatsoberhaupt oder ein Programm mit neuen Ideen sind in einer Demokratie erlaubt. Gerade Kritik und neue politische Richtungen gehören zum demokratischen Wettbewerb der Parteien.',
      memoryTip: 'Verboten wird nur, wer gegen die Verfassung kämpft – nicht, wer kritisiert.',
      legalBasis: [law('Art. 21 GG', 'gg/art_21.html')],
    },
  },
  44: {
    de: {
      background: 'Der Bundespräsident oder die Bundespräsidentin wird nicht direkt vom Volk gewählt, sondern von der Bundesversammlung. Sie besteht aus allen Bundestagsabgeordneten und genauso vielen Vertreterinnen und Vertretern, die die Landtage bestimmen. Die Amtszeit dauert fünf Jahre; eine Wiederwahl ist einmal möglich.',
      otherOptions: 'Die Abgeordneten des EU-Parlaments, des Landtags und des Bundestages wählen die Bürgerinnen und Bürger direkt. Bei Kommunalwahlen und bei EU-Wahlen dürfen auch EU-Bürgerinnen und -Bürger mit Wohnsitz in Deutschland wählen.',
      memoryTip: 'Präsident → Bundesversammlung; Parlamente → das Volk.',
      legalBasis: [law('Art. 54 GG', 'gg/art_54.html')],
    },
  },
  45: {
    de: {
      background: 'Die Pflegeversicherung gehört zur Sozialversicherung. Sie wurde 1995 als jüngster Zweig eingeführt und hilft Menschen, die wegen Krankheit, Behinderung oder Alter dauerhaft Pflege brauchen – zu Hause oder im Pflegeheim. Wer gesetzlich krankenversichert ist, ist automatisch auch in der Pflegeversicherung. Die Beiträge teilen sich Arbeitnehmer und Arbeitgeber; wer keine Kinder hat, zahlt einen kleinen Zuschlag.',
      otherOptions: 'Die Unfallversicherung ist selbst ein Zweig der Sozialversicherung, aber die Pflegeversicherung gehört nicht zu ihr. Hausrats-, Haftpflicht- und Feuerversicherungen sind private Versicherungen für Sachschäden.',
      memoryTip: 'Fünf Zweige der Sozialversicherung: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.',
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
  },
  47: {
    de: {
      background: 'Der Staat unterstützt Familien, Kultur und Sport. Er zahlt zum Beispiel Kindergeld für Kinder, fördert Museen und Theater und unterstützt Sportlerinnen und Sportler. Für Urlaubsreisen müssen die Menschen aber selbst bezahlen – das ist keine Aufgabe des Staates.',
      otherOptions: 'Kindergeld zahlt die Familienkasse an Eltern. Museen werden vor allem von Ländern und Städten gefördert. Sportförderung gibt es für Spitzensport und Breitensport, etwa für Vereine. Alle drei gehören also zu den Aufgaben des Staates.',
      memoryTip: 'Gesucht ist das, was nicht passt: Urlaub zahlt man selbst.',
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
  },
  49: {
    de: {
      background: 'Für Schulen sind in Deutschland die Bundesländer zuständig. Man nennt das Kulturhoheit der Länder. Deshalb gibt es in jedem Land eigene Schulgesetze, Lehrpläne, Schulformen und Ferientermine. Damit die Abschlüsse vergleichbar bleiben, stimmen sich die Länder in der Kultusministerkonferenz ab.',
      otherOptions: 'Lehrerinnen und Lehrer unterrichten nach den Vorgaben der Länder, machen aber keine Schulpolitik. Das Bundesfamilienministerium ist für Familien, Senioren, Frauen und Jugend zuständig, nicht für Schulen. Universitäten bilden Lehrkräfte aus, bestimmen aber nicht die Schulpolitik.',
      memoryTip: 'Schule ist Ländersache – deshalb sind die Sommerferien überall verschieden.',
      legalBasis: [law('Art. 30 GG', 'gg/art_30.html')],
    },
  },
  50: {
    de: {
      background: 'Die Wirtschaftsform in Deutschland heißt soziale Marktwirtschaft. Unternehmen produzieren und verkaufen frei, Preise entstehen durch Angebot und Nachfrage. Der Staat sorgt aber für einen sozialen Ausgleich, zum Beispiel durch Sozialversicherung, Kündigungsschutz, Mindestlohn und Regeln für fairen Wettbewerb. Als Vater der sozialen Marktwirtschaft gilt Ludwig Erhard, der erste Wirtschaftsminister der Bundesrepublik.',
      otherOptions: 'In einer Planwirtschaft oder gelenkten Zentralwirtschaft bestimmt der Staat, was produziert wird und was es kostet – so war es in der DDR. Eine „freie Zentralwirtschaft“ gibt es nicht; frei und zentral gelenkt passen nicht zusammen.',
      memoryTip: 'Markt + sozialer Ausgleich = soziale Marktwirtschaft.',
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
