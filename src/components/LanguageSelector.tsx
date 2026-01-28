import React from 'react';
import { getLanguageSwitchUrl } from '../utils/navigation';

// Using flagcdn for high-quality, reliable rendering on all OSs (especially Windows where emojis fail)
const SUPPORTED_LANGUAGES = [
    { code: 'de', flagCode: 'de', label: 'Deutsch' },
    { code: 'en', flagCode: 'gb', label: 'English' },
    { code: 'tr', flagCode: 'tr', label: 'Türkçe' },
    { code: 'ar', flagCode: 'sa', label: 'العربية' },
    { code: 'ua', flagCode: 'ua', label: 'Українська' },
    { code: 'ru', flagCode: 'ru', label: 'Русский' },
    { code: 'pl', flagCode: 'pl', label: 'Polski' },
    { code: 'fa', flagCode: 'ir', label: 'فارسی' },
    { code: 'ps', flagCode: 'af', label: 'پښتو' },
    { code: 'ro', flagCode: 'ro', label: 'Română' },
    { code: 'it', flagCode: 'it', label: 'Italiano' },
    { code: 'es', flagCode: 'es', label: 'Español' },
] as const;

type Language = typeof SUPPORTED_LANGUAGES[number]['code'];

interface Props {
    currentLang?: string;
}

export default function LanguageSelector({ currentLang = 'de' }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    import { getLanguageSwitchUrl } from '../utils/navigation';

    // ... (existing constants)

    const getTargetUrl = (targetLang: string) => {
        if (typeof window === 'undefined') return `/${targetLang}/`; // Server-side fallback (naive)

        const currentPath = window.location.pathname;
        const knownLangCodes = SUPPORTED_LANGUAGES.map(l => l.code);

        return getLanguageSwitchUrl(currentPath, targetLang, knownLangCodes);
    };

    const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

    return (
        <div className="relative font-sans" ref={dropdownRef}>
            <button
                onClick={handleButtonClick}
                type="button"
                className="flex items-center gap-3 bg-white pl-2 pr-3 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <img
                    src={`https://flagcdn.com/w40/${currentLangObj.flagCode}.png`}
                    srcSet={`https://flagcdn.com/w80/${currentLangObj.flagCode}.png 2x`}
                    width="24"
                    height="16" // Aspect ratio is usually 3:2 or similar, fixed height ensures alignment
                    alt={currentLangObj.code}
                    className="object-cover rounded-sm border border-gray-100"
                    style={{ width: '24px', height: '16px' }}
                />
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide w-6 text-center">
                    {currentLang}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 max-h-[80vh] overflow-y-auto z-50 ring-1 ring-black ring-opacity-5">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <a
                            key={lang.code}
                            href={getTargetUrl(lang.code)}
                            className={`w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 transition-colors group ${currentLang === lang.code ? 'bg-blue-50/60' : ''
                                }`}
                        >
                            <img
                                src={`https://flagcdn.com/w40/${lang.flagCode}.png`}
                                srcSet={`https://flagcdn.com/w80/${lang.flagCode}.png 2x`}
                                width="24"
                                height="16"
                                alt={lang.label}
                                className="object-cover rounded-sm border border-gray-100 shadow-sm mr-4"
                                style={{ width: '24px', height: '16px' }}
                            />

                            <span className={`text-xs font-bold uppercase tracking-wider w-8 ${currentLang === lang.code ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`}>
                                {lang.code}
                            </span>

                            <span className={`text-sm font-medium ml-2 ${currentLang === lang.code ? 'text-blue-900' : 'text-gray-700'
                                }`}>
                                {lang.label}
                            </span>

                            {currentLang === lang.code && (
                                <svg className="w-4 h-4 text-blue-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
