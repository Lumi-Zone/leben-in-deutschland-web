import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, SUPPORTED_LANGUAGES, type Language } from '../stores/languageStore';

export default function LanguageSelector() {
    const currentLang = useStore(languageStore);
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: Language) => {
        languageStore.set(code);
        setIsOpen(false);
    };

    const currentFlag = SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.flag || '🇩🇪';

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
                <span className="text-xl">{currentFlag}</span>
                <span className="text-sm font-medium text-gray-700 uppercase">{currentLang}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 max-h-96 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${currentLang === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
