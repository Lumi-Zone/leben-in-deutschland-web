import React, { useState } from 'react';

interface Props {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  translations: {
    tr: string;
    ar: string;
    en: string;
  };
  stats: {
    wrongPercentage: number;
  };
}

export default function QuestionCard({ id, question, options, correctIndex, translations, stats }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  const isCorrect = selected === correctIndex;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{id}. {question}</h1>
      
      <div className="space-y-2 mb-6 text-gray-600">
        <p className="border-l-4 border-red-500 pl-3 italic">{translations.tr}</p>
        <p className="border-l-4 border-green-500 pl-3 italic">{translations.ar}</p>
        <p className="border-l-4 border-blue-500 pl-3 italic">{translations.en}</p>
      </div>

      <div className="space-y-3">
        {options.map((option, idx) => {
          let extraClass = "hover:bg-gray-50 border-gray-200";
          if (showResult) {
            if (idx === correctIndex) extraClass = "bg-green-100 border-green-500";
            else if (idx === selected) extraClass = "bg-red-100 border-red-500";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 border rounded-lg transition-colors ${extraClass}`}
              disabled={showResult}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-sm font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
          <p className="text-lg font-semibold text-blue-900 mb-2">
            {isCorrect ? 'Richtig! 🎉' : 'Leider falsch 😕'}
          </p>
          <p className="text-sm text-blue-700 mb-4">
            Did you know? {stats.wrongPercentage}% of users get this wrong.
          </p>
          <a
            href={`lebenindeutschland://question/${id}`} 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Practice in App
          </a>
          <p className="text-xs text-gray-400 mt-2">
            Opens app if installed.
          </p>
        </div>
      )}
    </div>
  );
}
