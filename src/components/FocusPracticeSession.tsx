import { useCallback, useEffect, useMemo, useState } from 'react';
import { getPath } from '../utils/navigation';
import { markQuestionSolved } from '../utils/learningProgress';
import { recordHabitAttempt } from '../utils/learningHabits';
import { readQuestionStats, recordQuestionAttempt } from '../utils/questionStats';

interface FocusQuestion {
    id: number;
    questionDe: string;
    questionLocalized: string;
    optionsDe: string[];
    optionsLocalized: string[];
    correctIndex: number;
}

interface Labels {
    title: string;
    subtitle: string;
    start: string;
    empty: string;
    questions: string;
    answered: string;
    previous: string;
    next: string;
    finish: string;
    resultTitle: string;
    score: string;
    restart: string;
    reviewQuestion: string;
    correct: string;
    wrong: string;
    correctAnswer: string;
}

interface Props {
    lang: string;
    pool: FocusQuestion[];
    labels: Labels;
    maxQuestions?: number;
}

const DEFAULT_MAX_QUESTIONS = 25;

function buildSession(pool: FocusQuestion[], maxQuestions: number): FocusQuestion[] {
    const stats = readQuestionStats();
    const rank = Object.entries(stats.byQuestion)
        .map(([id, stat]) => {
            const parsedId = Number(id);
            const attempts = Math.max(0, Number(stat.attempts) || 0);
            const wrong = Math.max(0, Number(stat.wrong) || 0);
            const correct = Math.max(0, Number(stat.correct) || 0);
            const accuracy = attempts > 0 ? correct / attempts : 0;

            return {
                id: parsedId,
                attempts,
                wrong,
                accuracy,
            };
        })
        .filter((entry) => Number.isInteger(entry.id) && entry.id > 0 && entry.wrong > 0)
        .sort((a, b) => {
            if (b.wrong !== a.wrong) return b.wrong - a.wrong;
            if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
            if (b.attempts !== a.attempts) return b.attempts - a.attempts;
            return a.id - b.id;
        })
        .slice(0, Math.max(1, maxQuestions))
        .map((entry) => entry.id);

    if (rank.length === 0) return [];

    const indexById = new Map<number, FocusQuestion>();
    pool.forEach((question) => {
        indexById.set(question.id, question);
    });

    return rank
        .map((id) => indexById.get(id))
        .filter((question): question is FocusQuestion => Boolean(question));
}

export default function FocusPracticeSession({
    lang,
    pool,
    labels,
    maxQuestions = DEFAULT_MAX_QUESTIONS,
}: Props) {
    const [sessionQuestions, setSessionQuestions] = useState<FocusQuestion[]>([]);
    const [answers, setAnswers] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const refreshSession = useCallback(() => {
        const nextSession = buildSession(pool, maxQuestions);
        setSessionQuestions(nextSession);
        setAnswers(new Array(nextSession.length).fill(-1));
        setCurrentIndex(0);
        setStarted(false);
        setFinished(false);
    }, [maxQuestions, pool]);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const answeredCount = useMemo(() => answers.filter((value) => value >= 0).length, [answers]);

    const score = useMemo(() => {
        return sessionQuestions.reduce((total, question, index) => {
            return answers[index] === question.correctIndex ? total + 1 : total;
        }, 0);
    }, [answers, sessionQuestions]);

    const wrongQuestions = useMemo(() => {
        return sessionQuestions.filter((question, index) => {
            const selected = answers[index];
            return selected >= 0 && selected !== question.correctIndex;
        });
    }, [answers, sessionQuestions]);

    if (sessionQuestions.length === 0) {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{labels.title}</h2>
                <p className="text-gray-600">{labels.empty}</p>
            </div>
        );
    }

    const currentQuestion = sessionQuestions[currentIndex];
    const selectedAnswer = answers[currentIndex];
    const isAnswered = selectedAnswer >= 0;
    const isCorrect = isAnswered && selectedAnswer === currentQuestion.correctIndex;
    const progressPercent =
        sessionQuestions.length > 0
            ? Math.round(((currentIndex + 1) / sessionQuestions.length) * 100)
            : 0;

    const handleStart = () => {
        setStarted(true);
    };

    const handleSelect = (optionIndex: number) => {
        if (!started || finished || isAnswered) return;

        setAnswers((previous) => {
            const next = [...previous];
            next[currentIndex] = optionIndex;
            return next;
        });

        const answerCorrect = optionIndex === currentQuestion.correctIndex;
        recordQuestionAttempt(currentQuestion.id, answerCorrect);
        recordHabitAttempt();
        markQuestionSolved(currentQuestion.id);
    };

    const handlePrevious = () => {
        setCurrentIndex((previous) => Math.max(0, previous - 1));
    };

    const handleNext = () => {
        setCurrentIndex((previous) => Math.min(sessionQuestions.length - 1, previous + 1));
    };

    const handleFinish = () => {
        setFinished(true);
    };

    const handleRestart = () => {
        refreshSession();
    };

    if (!started) {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{labels.title}</h2>
                <p className="text-gray-600 mb-8">{labels.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                        <div className="text-gray-500">{labels.questions}</div>
                        <div className="font-semibold text-gray-900">{sessionQuestions.length}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                        <div className="text-gray-500">{labels.answered}</div>
                        <div className="font-semibold text-gray-900">0</div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                    {labels.start}
                </button>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{labels.resultTitle}</h2>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-gray-600">
                            {labels.score}: <strong className="text-gray-900">{score}</strong> / {sessionQuestions.length}
                        </span>
                        <span className="text-gray-600">
                            {labels.answered}: <strong className="text-gray-900">{answeredCount}</strong>
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRestart}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {labels.restart}
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-5">
                        {labels.reviewQuestion} ({wrongQuestions.length})
                    </h3>
                    {wrongQuestions.length === 0 ? (
                        <p className="text-gray-600">{labels.correct}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {wrongQuestions.map((question) => (
                                <a
                                    key={question.id}
                                    href={getPath(`${lang}/frage/${question.id}`)}
                                    className="block rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:shadow-sm transition-all"
                                >
                                    <div className="text-xs text-blue-600 font-semibold mb-2">#{question.id}</div>
                                    <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                                        {question.questionLocalized || question.questionDe}
                                    </p>
                                    <span className="text-sm font-semibold text-blue-600">
                                        {labels.reviewQuestion} →
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 mb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="text-sm text-gray-600">
                        {labels.questions}: <strong className="text-gray-900">{currentIndex + 1}</strong> / {sessionQuestions.length}
                    </div>
                    <div className="text-sm text-gray-600">
                        {labels.answered}: <strong className="text-gray-900">{answeredCount}</strong> / {sessionQuestions.length}
                    </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-2">
                    <span className="text-blue-600 mr-2">#{currentQuestion.id}</span>
                    {currentQuestion.questionDe}
                </h2>
                {currentQuestion.questionLocalized && currentQuestion.questionLocalized !== currentQuestion.questionDe && (
                    <p className="text-gray-600 mb-6 border-t border-gray-100 pt-3">
                        {currentQuestion.questionLocalized}
                    </p>
                )}

                <div className="space-y-3" role="radiogroup" aria-label={`Question ${currentQuestion.id} options`}>
                    {currentQuestion.optionsDe.map((optionDe, index) => {
                        const optionLocalized = currentQuestion.optionsLocalized[index];

                        let optionClass = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
                        if (isAnswered) {
                            if (index === currentQuestion.correctIndex) {
                                optionClass = 'border-green-500 bg-green-50 ring-1 ring-green-300';
                            } else if (index === selectedAnswer) {
                                optionClass = 'border-red-500 bg-red-50 ring-1 ring-red-300';
                            }
                        }

                        return (
                            <button
                                key={`${currentQuestion.id}-${index}`}
                                type="button"
                                onClick={() => handleSelect(index)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${optionClass}`}
                                disabled={isAnswered}
                                role="radio"
                                aria-checked={selectedAnswer === index}
                                aria-disabled={isAnswered}
                            >
                                <div className="flex items-start">
                                    <span className="w-8 h-8 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 mr-4">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <div>
                                        <div className="font-medium text-gray-900">{optionDe}</div>
                                        {optionLocalized && optionLocalized !== optionDe && (
                                            <div className="text-sm text-gray-500 mt-1">{optionLocalized}</div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div
                        className={`mt-6 rounded-xl border px-4 py-3 text-sm ${isCorrect ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}
                        role="status"
                        aria-live="polite"
                    >
                        <p className="font-semibold mb-1">{isCorrect ? labels.correct : labels.wrong}</p>
                        {!isCorrect && (
                            <p>
                                {labels.correctAnswer}: <strong>{currentQuestion.optionsDe[currentQuestion.correctIndex]}</strong>
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        {labels.previous}
                    </button>

                    <div className="flex items-center gap-2">
                        {currentIndex < sessionQuestions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                            >
                                {labels.next}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleFinish}
                                className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                            >
                                {labels.finish}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
