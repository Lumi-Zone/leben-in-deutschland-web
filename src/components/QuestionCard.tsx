import { type FormEvent, useEffect, useRef, useState } from 'react';
import { getPath } from '../utils/navigation';
import { markQuestionSolved } from '../utils/learningProgress';
import { isQuestionFavorite, toggleFavorite } from '../utils/favorites';
import { recordQuestionAttempt } from '../utils/questionStats';
import { recordHabitAttempt } from '../utils/learningHabits';

interface Props {
    id: number;
    correctIndex: number;
    data: {
        de: {
            question: string;
            options: string[];
        };
        [lang: string]:
            | {
                  question: string;
                  options: string[];
              }
            | undefined;
    };
    prevId?: number | null;
    nextId?: number | null;
    initialLang: string;
    practiceAppLabel: string;
    resultCorrectLabel: string;
    resultWrongLabel: string;
    correctAnswerLabel: string;
    prevLabel: string;
    nextLabel: string;
    questionPosition: number;
    questionTotal: number;
    progressLabel: string;
    favoriteAddLabel: string;
    favoriteRemoveLabel: string;
    shortcutsLabel: string;
    shortcutSelectLabel: string;
    shortcutPrevLabel: string;
    shortcutNextLabel: string;
    shortcutFavoriteLabel: string;
    jumpToLabel: string;
    jumpPlaceholder: string;
    jumpButtonLabel: string;
    jumpErrorLabel: string;
}

export default function QuestionCard({
    id,
    correctIndex,
    data,
    prevId,
    nextId,
    initialLang,
    practiceAppLabel,
    resultCorrectLabel,
    resultWrongLabel,
    correctAnswerLabel,
    prevLabel,
    nextLabel,
    questionPosition,
    questionTotal,
    progressLabel,
    favoriteAddLabel,
    favoriteRemoveLabel,
    shortcutsLabel,
    shortcutSelectLabel,
    shortcutPrevLabel,
    shortcutNextLabel,
    shortcutFavoriteLabel,
    jumpToLabel,
    jumpPlaceholder,
    jumpButtonLabel,
    jumpErrorLabel
}: Props) {
    // URL param passed as initialLang is the source of truth
    const currentLang = initialLang;
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [jumpValue, setJumpValue] = useState('');
    const [jumpError, setJumpError] = useState('');
    const jumpInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setFavorite(isQuestionFavorite(id));
        setJumpValue('');
        setJumpError('');
    }, [id]);

    // Deep Linking Handler
    const handlePracticeInApp = () => {
        const appScheme = `lebenindeutschland://question/${id}`;
        // Fallback URLs - User should replace these with real store links
        const iosStoreUrl = "https://apps.apple.com/app/leben-in-deutschland-2026/id6723899981";
        const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.einbuergerungapp";

        // Simple OS detection
        const userAgent = navigator.userAgent || '';
        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isMobile = isAndroid || isIOS;

        const fallbackUrl = isAndroid ? androidStoreUrl : iosStoreUrl;

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
    const transContent = currentLang !== 'de' ? data[currentLang] || null : null;

    const handleSelect = (index: number) => {
        if (showResult) return;
        setSelected(index);
        setShowResult(true);
        markQuestionSolved(id);
        recordQuestionAttempt(id, index === correctIndex);
        recordHabitAttempt();
    };

    const isCorrect = selected === correctIndex;
    const progressPercent = Math.min(100, Math.round((questionPosition / questionTotal) * 100));

    const handleToggleFavorite = () => {
        setFavorite(toggleFavorite(id));
    };

    const navigateToQuestion = (targetId: number) => {
        window.location.href = getPath(`${currentLang}/frage/${targetId}`);
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return;

            const activeElement = document.activeElement as HTMLElement | null;
            const tagName = activeElement?.tagName?.toLowerCase() || '';
            const isEditable =
                activeElement?.isContentEditable ||
                tagName === 'input' ||
                tagName === 'textarea' ||
                tagName === 'select';
            if (isEditable) return;

            const key = event.key.toLowerCase();

            if (/^[1-4]$/.test(key) && !showResult) {
                const optionIndex = Number(key) - 1;
                if (optionIndex >= 0 && optionIndex < 4) {
                    event.preventDefault();
                    handleSelect(optionIndex);
                }
                return;
            }

            if (event.key === 'ArrowLeft' && prevId) {
                event.preventDefault();
                navigateToQuestion(prevId);
                return;
            }

            if (event.key === 'ArrowRight' && nextId) {
                event.preventDefault();
                navigateToQuestion(nextId);
                return;
            }

            if (key === 'f') {
                event.preventDefault();
                handleToggleFavorite();
                return;
            }

            if (key === 'g') {
                event.preventDefault();
                jumpInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [correctIndex, currentLang, id, nextId, prevId, showResult]);

    const handleJumpSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parsed = Number.parseInt(jumpValue, 10);
        const maxQuestion = questionTotal;

        if (!Number.isInteger(parsed) || parsed < 1 || parsed > maxQuestion) {
            setJumpError(
                jumpErrorLabel
                    .replace('{min}', '1')
                    .replace('{max}', String(maxQuestion))
            );
            return;
        }

        setJumpError('');
        navigateToQuestion(parsed);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>
                            {progressLabel}: <strong className="text-gray-900">{questionPosition}</strong> / {questionTotal}
                        </span>
                        <span className="font-semibold text-gray-900">{progressPercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                </div>

                {/* Question Header */}
                <div className="mb-6">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-xl font-bold text-gray-900 leading-relaxed">
                            <span className="text-blue-600 mr-2">#{id}</span>
                            {deContent.question}
                        </h1>
                        <button
                            type="button"
                            onClick={handleToggleFavorite}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                                favorite
                                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                                    : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            aria-label={
                                favorite
                                    ? favoriteRemoveLabel
                                    : favoriteAddLabel
                            }
                            aria-pressed={favorite}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z"
                                    strokeWidth={1.5}
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-xs font-semibold">
                                {favorite
                                    ? favoriteRemoveLabel
                                    : favoriteAddLabel}
                            </span>
                        </button>
                    </div>
                    {transContent && transContent.question && (
                        <h2 className="text-lg text-gray-600 mt-2 font-medium border-t border-gray-100 pt-2">
                            {transContent.question}
                        </h2>
                    )}
                </div>

                <div className="space-y-3" role="radiogroup" aria-label={deContent.question}>
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
                                type="button"
                                onClick={() => handleSelect(idx)}
                                className={`w-full text-left p-4 border rounded-xl transition-all duration-200 cursor-pointer ${extraClass}`}
                                disabled={showResult}
                                role="radio"
                                aria-checked={selected === idx}
                                aria-disabled={showResult}
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
                    <div
                        className={`mt-8 p-6 rounded-xl border text-center animate-fade-in ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}
                        role="status"
                        aria-live="polite"
                    >
                        <p className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? resultCorrectLabel : resultWrongLabel}
                        </p>
                        {!isCorrect && (
                            <p className="text-red-600 mb-4">
                                {correctAnswerLabel} <strong>{deContent.options[correctIndex]}</strong>
                            </p>
                        )}

                        <button
                            onClick={handlePracticeInApp}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            {practiceAppLabel}
                        </button>
                    </div>
                )}

                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        {shortcutsLabel}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-semibold">1-4</kbd>
                            {shortcutSelectLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-semibold">←</kbd>
                            {shortcutPrevLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-semibold">→</kbd>
                            {shortcutNextLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-semibold">F</kbd>
                            {shortcutFavoriteLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-semibold">G</kbd>
                            {jumpToLabel}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-2">
                {prevId ? (
                    <a
                        href={getPath(`${currentLang}/frage/${prevId}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        {prevLabel}
                    </a>
                ) : <div />}

                {nextId ? (
                    <a
                        href={getPath(`${currentLang}/frage/${nextId}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md group"
                    >
                        {nextLabel}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                ) : <div />}
            </div>

            <form onSubmit={handleJumpSubmit} className="mt-4 px-2">
                <label htmlFor="question-jump-input" className="block text-sm font-medium text-gray-700 mb-2">
                    {jumpToLabel}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        id="question-jump-input"
                        ref={jumpInputRef}
                        type="number"
                        min={1}
                        max={questionTotal}
                        value={jumpValue}
                        onChange={(event) => setJumpValue(event.target.value)}
                        placeholder={jumpPlaceholder}
                        className="w-full sm:w-52 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {jumpButtonLabel}
                    </button>
                </div>
                {jumpError && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                        {jumpError}
                    </p>
                )}
            </form>
        </div>
    );
}
