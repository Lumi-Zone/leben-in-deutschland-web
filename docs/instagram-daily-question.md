# Instagram: drei Beiträge pro Tag

Konto: **@einbuergerungstest2026**. Sprache: ausschließlich Deutsch.

| Europe/Berlin | Format |
| --- | --- |
| 08:00 | Tagesfrage: nächste allgemeine Frage aus `src/data/questions.json` |
| 16:00 | Auflösung derselben Frage mit der richtigen Antwort |
| 18:00 | Passender deutscher Wortschatz oder kurzer Lerntipp |

Die drei Beiträge sind einzelne 1080 × 1350 JPEG-Feed-Beiträge im bestätigten dunkelblau/cremefarbenen Design. Die 300 allgemeinen Fragen werden der Reihe nach verwendet. Wortschatz stammt aus einem redaktionellen Katalog; bei fehlendem passendem Wort wird ein Lerntipp verwendet. Keine zusätzlichen KI-API-Schlüssel nötig.

## Lokale Einrichtung

Die vertrauliche Datei `.env.instagram.local` enthält `INSTAGRAM_USER_ID`, `INSTAGRAM_ACCOUNT_USERNAME`, `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_START_DATE` sowie `INSTAGRAM_ENABLE_POSTING`. Vorlage: `.env.instagram.example`. Niemals Geheimnisse veröffentlichen oder in Ausgaben protokollieren.

`INSTAGRAM_ENABLE_POSTING=true` aktiviert nur planmäßige Veröffentlichungen ab dem Startdatum. `INSTAGRAM_ENABLE_ANSWER_COMMENTS` wird von diesem Ablauf nicht verwendet: die Antwort kommt um 16:00 als eigener Beitrag.

## Befehle

- `npm run instagram:cards`: 900 JPEG-Dateien und Manifest unter `public/instagram/series-v1/` erzeugen. Läuft automatisch vor dem Website-Build.
- `npm run instagram:preview -- --question 1`: drei lokale Entwürfe und deutsche Bildunterschriften erzeugen, ohne Veröffentlichung.
- `npm run instagram:verify`: Konto-Verbindung prüfen, ohne Veröffentlichung.
- `npm run instagram:check-ready`: Konto, Publishing-Limit-Endpunkt und die drei öffentlichen JPEGs der ersten Frage prüfen, ohne Veröffentlichung.
- `npm run instagram:daily`: genau den aktuellen Tages-Slot veröffentlichen (08:00–15:59 Frage; 16:00–17:59 Antwort; ab 18:00 Lernkarte).
- `npm run instagram:test`: Scheduling- und Fehlerfalltests.

Öffentliche Medien: `https://lid-einbuergerung.de/instagram/series-v1/frage-1-question.jpg` und entsprechend `answer` / `lesson`. Vor jedem Post werden der öffentliche JPEG-Typ und SHA-256-Hash geprüft. Das öffentliche Manifest muss exakt zu den lokalen Fragen, dem Renderer und den Quellbildern passen. So blockieren fehlende oder veraltete Deployments die Veröffentlichung. Generierte Dateien sind nicht in Git; der Website-Build erzeugt sie reproduzierbar aus dem veröffentlichten Quellstand.

## Wiederholungen und Ausfälle

Status liegt kontospezifisch unter `.daily-instagram/17841408563989755/state-v2.json`. Schlüssel: Konto + Berliner Datum + Slot. Die alte `.daily-instagram/state.json` bleibt unverändert. Es gibt einen exklusiven Prozess-Lock. Vor jeder schreibenden Instagram-Anfrage wird die Absicht dauerhaft gespeichert. Bei unklarem Ausgang wird nicht automatisch erneut veröffentlicht. Der Erfolg wird bereits vor dem optionalen Abruf des Permalinks gespeichert.

Ohne erfolgreich veröffentlichten Morgenbeitrag gibt es an diesem Tag keine Antwort und keine Lernkarte. Ohne Antwort wird die Lernkarte ausgelassen. Verpasste Slots werden nicht gesammelt nachgeholt. Sommer-/Winterzeit wird bei der Slot-Auswahl über `Europe/Berlin` berücksichtigt.

Bei einem Fehler den gesicherten Zustand und das Instagram-Profil prüfen. Einen Lock oder `inFlight` nicht blind löschen; zuerst sicherstellen, dass kein Prozess mehr läuft und ob der Beitrag bereits veröffentlicht wurde.

## Planlı iş

Die bestehende Codex-Automation `her-g-n-instagram-da-soru-payla` läuft täglich um 08:00, 16:00 und 18:00 in der lokalen Zeitzone Europe/Berlin. Der frühere Zufallszeit-Planer ist pausiert. Der Mac muss eingeschaltet, wach und Codex geöffnet sein; dies ist keine Cloud-Automation. Der Job führt nur `npm run instagram:daily` einmal aus, verändert keinen Quellcode und meldet erfolgreiche Posts oder echte Fehler.

Token-Laufzeit und automatische Token-Erneuerung sind entsprechend dem Benutzerwunsch separat zurückgestellt.

## Ergänzende Wachstumsstrategie

Die bestehende Serie mit drei Feed-Beiträgen bleibt unverändert. Nach einer siebentägigen Baseline startet eine zweite, unabhängig gespeicherte Ebene:

| Europe/Berlin | Format | Zweck |
| --- | --- | --- |
| täglich 09:00 | Story zur Tagesfrage | zum bereits veröffentlichten Frage-Beitrag zurückführen |
| täglich 17:00 | Story zur Auflösung | Lösung kompakt wiederholen |
| Mo/Mi/Fr 20:30 | Reel | Reichweite außerhalb der bestehenden Followerschaft |
| Sonntag 20:30 | Carousel mit 8 Karten | fünf Fragen der Woche wiederholen und speichern |

Reels verwenden abwechselnd Deutsch/Türkisch, Deutsch/Arabisch und einen deutschen Lerntipp. Sie werden mit `share_to_feed=false` ausschließlich als Reel veröffentlicht, damit der bereits dichte Haupt-Feed nicht zusätzlich gefüllt wird. Die Videos enthalten eine stille AAC-Spur und funktionieren vollständig über eingeblendeten Text; lizenzierte Instagram-Musik oder interaktive Story-Sticker werden nicht automatisiert.

Die ergänzenden Medien werden reproduzierbar unter `public/instagram/growth-v1/` erzeugt. Der Website-Build prüft einen Quell-Fingerprint und kann unveränderte, im GitHub-Actions-Cache liegende Dateien wiederverwenden. FFmpeg wird im Deploy-Workflow installiert. Wie bei der Feed-Serie prüft der Publisher vor jeder Veröffentlichung öffentlichen MIME-Typ, Manifest und SHA-256-Hash.

### Befehle

- `npm run instagram:growth:preview`: Story-, Carousel- und Reel-Beispiele für Frage 1 erzeugen.
- `npm run instagram:growth:assets`: alle freigegebenen Zusatzmedien erzeugen.
- `npm run instagram:story`: ausschließlich den aktuellen 09:00- oder 17:00-Story-Slot verarbeiten.
- `npm run instagram:reel`: ausschließlich den aktuellen Mo/Mi/Fr-Reel-Slot verarbeiten.
- `npm run instagram:weekly-carousel`: ausschließlich den aktuellen Sonntags-Carousel-Slot verarbeiten.

Der Zusatzstatus liegt unter `.daily-instagram/17841408563989755/growth-state-v1.json`. Ein unklarer API-Ausgang blockiert weitere Zusatzveröffentlichungen, bis das Konto und der gespeicherte Zustand manuell abgeglichen wurden. Fehlende Feed-Beiträge führen immer zum Überspringen: Zusatzinhalte ersetzen oder reparieren die tägliche Serie nicht.
