export type StateNameScript = 'ar' | 'fa' | 'ps' | 'ru' | 'ua';

export interface GermanState {
    name: string;
    slug: string;
    /** Names in non-Latin scripts, so pages match searches like "سوالات ایالت بایرن". */
    localNames: Record<StateNameScript, string>;
}

export const GERMAN_STATES: GermanState[] = [
    { slug: 'baden-wuerttemberg', name: 'Baden-Württemberg', localNames: { ar: 'بادن فورتمبيرغ', fa: 'بادن-وورتمبرگ', ps: 'بادن-ورتمبرګ', ru: 'Баден-Вюртемберг', ua: 'Баден-Вюртемберг' } },
    { slug: 'bayern', name: 'Bayern', localNames: { ar: 'بافاريا', fa: 'بایرن', ps: 'بایرن', ru: 'Бавария', ua: 'Баварія' } },
    { slug: 'berlin', name: 'Berlin', localNames: { ar: 'برلين', fa: 'برلین', ps: 'برلین', ru: 'Берлин', ua: 'Берлін' } },
    { slug: 'brandenburg', name: 'Brandenburg', localNames: { ar: 'براندنبورغ', fa: 'براندنبورگ', ps: 'براندنبورګ', ru: 'Бранденбург', ua: 'Бранденбург' } },
    { slug: 'bremen', name: 'Bremen', localNames: { ar: 'بريمن', fa: 'برمن', ps: 'برېمن', ru: 'Бремен', ua: 'Бремен' } },
    { slug: 'hamburg', name: 'Hamburg', localNames: { ar: 'هامبورغ', fa: 'هامبورگ', ps: 'هامبورګ', ru: 'Гамбург', ua: 'Гамбург' } },
    { slug: 'hessen', name: 'Hessen', localNames: { ar: 'هيسن', fa: 'هسن', ps: 'هېسن', ru: 'Гессен', ua: 'Гессен' } },
    { slug: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern', localNames: { ar: 'مكلنبورغ فوربومرن', fa: 'مکلنبورگ-فورپومرن', ps: 'مکلنبورګ-فورپومرن', ru: 'Мекленбург-Передняя Померания', ua: 'Мекленбург-Передня Померанія' } },
    { slug: 'niedersachsen', name: 'Niedersachsen', localNames: { ar: 'ساكسونيا السفلى', fa: 'نیدرزاکسن', ps: 'نیدرزاکسن', ru: 'Нижняя Саксония', ua: 'Нижня Саксонія' } },
    { slug: 'nordrhein-westfalen', name: 'Nordrhein-Westfalen', localNames: { ar: 'شمال الراين وستفاليا', fa: 'نوردراین-وستفالن', ps: 'نوردراین-وستفالن', ru: 'Северный Рейн-Вестфалия', ua: 'Північний Рейн-Вестфалія' } },
    { slug: 'rheinland-pfalz', name: 'Rheinland-Pfalz', localNames: { ar: 'راينلاند بفالتس', fa: 'راینلاند-فالتس', ps: 'راینلاند-فالتس', ru: 'Рейнланд-Пфальц', ua: 'Рейнланд-Пфальц' } },
    { slug: 'saarland', name: 'Saarland', localNames: { ar: 'سارلاند', fa: 'زارلند', ps: 'زارلند', ru: 'Саар', ua: 'Саар' } },
    { slug: 'sachsen', name: 'Sachsen', localNames: { ar: 'ساكسونيا', fa: 'زاکسن', ps: 'زاکسن', ru: 'Саксония', ua: 'Саксонія' } },
    { slug: 'sachsen-anhalt', name: 'Sachsen-Anhalt', localNames: { ar: 'ساكسونيا أنهالت', fa: 'زاکسن-آنهالت', ps: 'زاکسن-انهالت', ru: 'Саксония-Анхальт', ua: 'Саксонія-Ангальт' } },
    { slug: 'schleswig-holstein', name: 'Schleswig-Holstein', localNames: { ar: 'شليسفيغ هولشتاين', fa: 'شلسویگ-هولشتاین', ps: 'شلسویګ-هولشټاین', ru: 'Шлезвиг-Гольштейн', ua: 'Шлезвіг-Гольштейн' } },
    { slug: 'thueringen', name: 'Thüringen', localNames: { ar: 'تورينغن', fa: 'تورینگن', ps: 'تورینګن', ru: 'Тюрингия', ua: 'Тюрингія' } },
];

/** "بایرن (Bayern)" for non-Latin scripts, so both the local and the official German name appear. */
export function getStateDisplayName(state: GermanState, lang: string): string {
    const localName = state.localNames[lang as StateNameScript];
    return localName && localName !== state.name ? `${localName} (${state.name})` : state.name;
}
