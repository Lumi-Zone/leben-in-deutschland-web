import React, { useState } from 'react';

interface Props {
    id: number;
    correctIndex: number;
    data: {
        [lang: string]: {
            question: string;
            options: string[];
        }
    };
    prevId?: number | null;
    nextId?: number | null;
    initialLang?: string;
    practiceAppLabel?: string;
}

export default function QuestionCard({ id, correctIndex, data, prevId, nextId, initialLang, practiceAppLabel }: Props) {
    // URL param passed as initialLang is the source of truth
    const currentLang = initialLang || 'de';
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Deep Linking Handler
    const handlePracticeInApp = () => {
        const appScheme = `lebenindeutschland://question/${id}`;
        // Fallback URLs - User should replace these with real store links
        const iosStoreUrl = "https://apps.apple.com/tr/app/leben-in-deutschland-2026/id6723899981";
        const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.einbuergerungapp";

        // Simple OS detection
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
        const isMobile = isAndroid || isIOS;

        const fallbackUrl = isAndroid ? androidStoreUrl : isIOS ? iosStoreUrl : iosStoreUrl; // Default fallback to iOS Store

        if (!isMobile) {
            // On Desktop, directly open the store link in a new tab
            window.open(fallbackUrl, '_blank');
            return;
        }

        // On Mobile, attempt to open app via deep link
        window.location.href = appScheme;

        // Fallback if app doesn't open within timeout
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 1500);
    };

    // Always get German content
    const deContent = data['de'];
    // Get translated content if language is not German
    const transContent = currentLang !== 'de' ? data[currentLang] : null;

    const handleSelect = (index: number) => {
        if (showResult) return;
        setSelected(index);
        setShowResult(true);
    };

    const isCorrect = selected === correctIndex;

    // Helper for base url consistent with Astro config
    const getPath = (path: string) => {
        const base = import.meta.env.BASE_URL;
        const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${cleanBase}/${cleanPath}`;
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                {/* Question Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900 leading-relaxed">
                        <span className="text-blue-600 mr-2">#{id}</span>
                        {deContent.question}
                    </h1>
                    {transContent && transContent.question && (
                        <h2 className="text-lg text-gray-600 mt-2 font-medium border-t border-gray-100 pt-2">
                            {transContent.question}
                        </h2>
                    )}
                </div>

                <div className="space-y-3">
                    {deContent.options.map((deOption, idx) => {
                        const transOption = transContent?.options?.[idx];

                        let extraClass = "hover:bg-gray-50 border-gray-200";
                        if (showResult) {
                            if (idx === correctIndex) extraClass = "bg-green-100 border-green-500 ring-1 ring-green-500";
                            else if (idx === selected) extraClass = "bg-red-100 border-red-500 ring-1 ring-red-500";
                        } else if (selected === idx) {
                            extraClass = "bg-blue-50 border-blue-500 ring-1 ring-blue-500";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`w-full text-left p-4 border rounded-xl transition-all duration-200 cursor-pointer ${extraClass}`}
                                disabled={showResult}
                            >
                                <div className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg mr-4 text-sm font-bold text-gray-600 mt-0.5">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{deOption}</div>
                                        {transOption && (
                                            <div className="text-gray-500 text-sm mt-1">{transOption}</div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {showResult && (
                    <div className={`mt-8 p-6 rounded-xl border text-center animate-fade-in ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                        <p className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Richtig! 🎉' : 'Leider falsch 😕'}
                        </p>
                        {!isCorrect && (
                            <p className="text-red-600 mb-4">
                                Die richtige Antwort ist: <strong>{deContent.options[correctIndex]}</strong>
                            </p>
                        )}

                        <button
                            onClick={handlePracticeInApp}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            {practiceAppLabel || "Practice in App"}
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-2">
                {prevId ? (
                    <a
                        href={getPath(`${currentLang}/frage/${prevId}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Vorherige
                    </a>
                ) : <div />}

                {nextId ? (
                    <a
                        href={getPath(`${currentLang}/frage/${nextId}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md group"
                    >
                        Nächste
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                ) : <div />}
            </div>
        </div>
    );
}
