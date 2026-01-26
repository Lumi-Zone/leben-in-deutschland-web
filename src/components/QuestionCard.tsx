import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, type Language } from '../stores/languageStore';

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
}

export default function QuestionCard({ id, correctIndex, data, prevId, nextId }: Props) {
    const currentLang = useStore(languageStore);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Fallback to German if current language data is missing or empty
    const content = data[currentLang]?.question ? data[currentLang] : data['de'];

    const handleSelect = (index: number) => {
        if (showResult) return;
        setSelected(index);
        setShowResult(true);
    };

    const isCorrect = selected === correctIndex;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                    <span className="text-blue-600 mr-2">#{id}</span>
                    {content.question}
                </h1>

                <div className="space-y-3">
                    {content.options.map((option, idx) => {
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
                                className={`w-full text-left p-4 border rounded-xl transition-all duration-200 ${extraClass}`}
                                disabled={showResult}
                            >
                                <div className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg mr-4 text-sm font-bold text-gray-600">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="pt-1">{option}</span>
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
                                Die richtige Antwort ist: <strong>{content.options[correctIndex]}</strong>
                            </p>
                        )}

                        <a
                            href={`lebenindeutschland://question/${id}`}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Practice in App
                        </a>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-2">
                {prevId ? (
                    <a
                        href={`/frage/${prevId}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Vorherige
                    </a>
                ) : <div />}

                {nextId ? (
                    <a
                        href={`/frage/${nextId}`}
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
