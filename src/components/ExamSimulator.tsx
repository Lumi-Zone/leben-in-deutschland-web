import { useEffect, useMemo, useRef, useState } from 'react';
import { getPath } from '../utils/navigation';
import { markQuestionSolved } from '../utils/learningProgress';
import { recordQuestionAttempt } from '../utils/questionStats';
import { recordHabitAttempt } from '../utils/learningHabits';

interface ExamQuestion {
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
    timer: string;
    progress: string;
    previous: string;
    next: string;
    finish: string;
    answered: string;
    resultTitle: string;
    passed: string;
    failed: string;
    score: string;
    passRule: string;
    wrongAnswers: string;
    reviewQuestion: string;
    restart: string;
    noQuestions: string;
    noWrongAnswers: string;
}

interface Props {
    lang: string;
    pool: ExamQuestion[];
    labels: Labels;
    totalQuestions?: number;
    durationMinutes?: number;
    passThreshold?: number;
}

const DEFAULT_TOTAL_QUESTIONS = 33;
const DEFAULT_DURATION_MINUTES = 60;
const DEFAULT_PASS_THRESHOLD = 17;

function formatTime(totalSeconds: number): string {
    const safeSeconds = Math.max(0, totalSeconds);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function pickRandomQuestions(pool: ExamQuestion[], count: number): ExamQuestion[] {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function ExamSimulator({
    lang,
    pool,
    labels,
    totalQuestions = DEFAULT_TOTAL_QUESTIONS,
    durationMinutes = DEFAULT_DURATION_MINUTES,
    passThreshold = DEFAULT_PASS_THRESHOLD,
}: Props) {
    const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>(() =>
        pickRandomQuestions(pool, totalQuestions)
    );
    const [answers, setAnswers] = useState<number[]>(() =>
        new Array(Math.min(totalQuestions, pool.length)).fill(-1)
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
    const hasSavedResults = useRef(false);

    const answeredCount = useMemo(() => answers.filter((value) => value >= 0).length, [answers]);

    const score = useMemo(() => {
        return examQuestions.reduce((acc, question, index) => {
            return answers[index] === question.correctIndex ? acc + 1 : acc;
        }, 0);
    }, [answers, examQuestions]);

    const wrongQuestions = useMemo(() => {
        return examQuestions.filter((question, index) => answers[index] !== question.correctIndex);
    }, [answers, examQuestions]);

    const isPassed = score >= passThreshold;
    const progressPercent =
        examQuestions.length > 0 ? ((currentIndex + 1) / examQuestions.length) * 100 : 0;

    useEffect(() => {
        if (!started || finished) return;

        const timer = window.setInterval(() => {
            setSecondsLeft((previous) => {
                if (previous <= 1) {
                    window.clearInterval(timer);
                    setFinished(true);
                    return 0;
                }
                return previous - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [finished, started]);

    useEffect(() => {
        if (!started || !finished || hasSavedResults.current) return;

        answers.forEach((selectedAnswer, index) => {
            if (selectedAnswer < 0) return;
            const question = examQuestions[index];
            if (!question) return;

            const isCorrect = selectedAnswer === question.correctIndex;
            markQuestionSolved(question.id);
            recordQuestionAttempt(question.id, isCorrect);
            recordHabitAttempt();
        });

        hasSavedResults.current = true;
    }, [answers, examQuestions, finished, started]);

    const currentQuestion = examQuestions[currentIndex];

    const handleStart = () => {
        setStarted(true);
    };

    const handleSelect = (selectedIndex: number) => {
        if (finished) return;
        setAnswers((previous) => {
            const next = [...previous];
            next[currentIndex] = selectedIndex;
            return next;
        });
    };

    const handlePrevious = () => {
        setCurrentIndex((previous) => Math.max(0, previous - 1));
    };

    const handleNext = () => {
        setCurrentIndex((previous) => Math.min(examQuestions.length - 1, previous + 1));
    };

    const handleFinish = () => {
        setFinished(true);
    };

    const handleRestart = () => {
        const nextQuestions = pickRandomQuestions(pool, totalQuestions);
        setExamQuestions(nextQuestions);
        setAnswers(new Array(nextQuestions.length).fill(-1));
        setCurrentIndex(0);
        setSecondsLeft(durationMinutes * 60);
        setStarted(false);
        setFinished(false);
        hasSavedResults.current = false;
    };

    if (pool.length === 0) {
        return (
            <div className="max-w-2xl mx-auto bg-white border border-red-100 text-red-700 rounded-2xl p-6">
                {labels.noQuestions}
            </div>
        );
    }

    if (!started) {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{labels.title}</h2>
                <p className="text-gray-600 mb-6">{labels.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-sm">
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                        <div className="text-gray-500">{labels.progress}</div>
                        <div className="font-semibold text-gray-900">{examQuestions.length}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                        <div className="text-gray-500">{labels.timer}</div>
                        <div className="font-semibold text-gray-900">{durationMinutes} min</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                        <div className="text-gray-500">{labels.passRule}</div>
                        <div className="font-semibold text-gray-900">
                            {passThreshold} / {examQuestions.length}
                        </div>
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
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                isPassed
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {isPassed ? labels.passed : labels.failed}
                        </span>
                        <span className="text-gray-600">
                            {labels.score}: <strong className="text-gray-900">{score}</strong> /{' '}
                            {examQuestions.length}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-6">{labels.passRule}</p>
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
                        {labels.wrongAnswers} ({wrongQuestions.length})
                    </h3>
                    {wrongQuestions.length === 0 ? (
                        <p className="text-gray-600">{labels.noWrongAnswers}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {wrongQuestions.map((question) => (
                                <a
                                    key={question.id}
                                    href={getPath(`${lang}/frage/${question.id}`)}
                                    className="block rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:shadow-sm transition-all"
                                >
                                    <div className="text-xs text-blue-600 font-semibold mb-2">
                                        #{question.id}
                                    </div>
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
                        {labels.progress}: <strong className="text-gray-900">{currentIndex + 1}</strong> /{' '}
                        {examQuestions.length}
                    </div>
                    <div
                        className={`text-sm font-semibold ${
                            secondsLeft <= 300 ? 'text-red-600' : 'text-gray-900'
                        }`}
                    >
                        {labels.timer}: {formatTime(secondsLeft)}
                    </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    {labels.answered}: <strong className="text-gray-900">{answeredCount}</strong> /{' '}
                    {examQuestions.length}
                </p>
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
                        const isSelected = answers[currentIndex] === index;
                        const optionLocalized = currentQuestion.optionsLocalized[index];
                        return (
                            <button
                                key={`${currentQuestion.id}-${index}`}
                                type="button"
                                onClick={() => handleSelect(index)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${
                                    isSelected
                                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-300'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                                role="radio"
                                aria-checked={isSelected}
                            >
                                <div className="flex items-start">
                                    <span className="w-8 h-8 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 mr-4">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <div>
                                        <div className="font-medium text-gray-900">{optionDe}</div>
                                        {optionLocalized && optionLocalized !== optionDe && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                {optionLocalized}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        {labels.previous}
                    </button>

                    {currentIndex < examQuestions.length - 1 ? (
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
    );
}
