import { useEffect, useMemo, useState } from 'react';
import { getPath } from '../utils/navigation';
import { readFavoriteIds } from '../utils/favorites';
import { readLearningProgress, type LearningProgress } from '../utils/learningProgress';
import {
    clearQuestionStats,
    readQuestionStats,
    type QuestionStatsStore,
} from '../utils/questionStats';

interface Labels {
    title: string;
    subtitle: string;
    metricSolved: string;
    metricAttempts: string;
    metricAccuracy: string;
    metricFavorites: string;
    lastActivity: string;
    lastActivityNever: string;
    weakTitle: string;
    weakEmpty: string;
    openQuestion: string;
    clearStats: string;
    attemptsShort: string;
    wrongShort: string;
    topicTitle: string;
    topicSubtitle: string;
    topicSolved: string;
    topicAttempts: string;
    topicAccuracy: string;
    topicPolitik: string;
    topicGeschichte: string;
    topicGesellschaft: string;
    topicLand: string;
}

interface QuestionMeta {
    id: number;
    areaCode: string;
}

interface Props {
    lang: string;
    totalQuestions: number;
    questionMeta: QuestionMeta[];
    labels: Labels;
}

interface WeakQuestion {
    id: number;
    attempts: number;
    wrong: number;
    accuracy: number;
}

interface TopicInsight {
    areaCode: string;
    areaLabel: string;
    total: number;
    solved: number;
    solvedPercent: number;
    attempts: number;
    accuracy: number;
}

const defaultProgress: LearningProgress = {
    answeredIds: [],
    lastQuestionId: null,
    updatedAt: 0,
};

const defaultStats: QuestionStatsStore = {
    totalAttempts: 0,
    totalCorrect: 0,
    totalWrong: 0,
    lastAttemptAt: 0,
    byQuestion: {},
};

const localeMap: Record<string, string> = {
    de: 'de-DE',
    en: 'en-US',
    tr: 'tr-TR',
    ar: 'ar',
    ua: 'uk-UA',
    ru: 'ru-RU',
    pl: 'pl-PL',
    fa: 'fa-IR',
    ps: 'ps-AF',
    ro: 'ro-RO',
    it: 'it-IT',
    es: 'es-ES',
};

function formatDateTime(timestamp: number, lang: string): string {
    if (!timestamp) return '';

    const locale = localeMap[lang] || 'de-DE';
    try {
        return new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(timestamp));
    } catch {
        return new Date(timestamp).toLocaleString();
    }
}

export default function ProgressInsights({ lang, totalQuestions, questionMeta, labels }: Props) {
    const [progress, setProgress] = useState<LearningProgress>(defaultProgress);
    const [stats, setStats] = useState<QuestionStatsStore>(defaultStats);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        setProgress(readLearningProgress());
        setStats(readQuestionStats());
        setFavoriteCount(readFavoriteIds().length);
    }, []);

    const solvedCount = Math.min(progress.answeredIds.length, totalQuestions);
    const accuracyPercent =
        stats.totalAttempts > 0
            ? Math.round((stats.totalCorrect / stats.totalAttempts) * 100)
            : 0;

    const lastActivityText = useMemo(() => {
        const lastTimestamp = Math.max(progress.updatedAt, stats.lastAttemptAt);
        if (!lastTimestamp) return labels.lastActivityNever;
        return formatDateTime(lastTimestamp, lang);
    }, [lang, labels.lastActivityNever, progress.updatedAt, stats.lastAttemptAt]);

    const weakQuestions = useMemo<WeakQuestion[]>(() => {
        return Object.entries(stats.byQuestion)
            .map(([id, value]) => {
                const attempts = Math.max(0, value.attempts || 0);
                const wrong = Math.max(0, value.wrong || 0);
                const accuracy = attempts > 0 ? Math.round(((attempts - wrong) / attempts) * 100) : 0;

                return {
                    id: Number(id),
                    attempts,
                    wrong,
                    accuracy,
                };
            })
            .filter((entry) => Number.isInteger(entry.id) && entry.id > 0 && entry.wrong > 0 && entry.attempts >= 2)
            .sort((a, b) => {
                if (b.wrong !== a.wrong) return b.wrong - a.wrong;
                if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
                if (b.attempts !== a.attempts) return b.attempts - a.attempts;
                return a.id - b.id;
            })
            .slice(0, 8);
    }, [stats.byQuestion]);

    const topicInsights = useMemo<TopicInsight[]>(() => {
        const topicOrder = [
            { areaCode: 'politik', areaLabel: labels.topicPolitik },
            { areaCode: 'geschichte', areaLabel: labels.topicGeschichte },
            { areaCode: 'gesellschaft', areaLabel: labels.topicGesellschaft },
            { areaCode: 'land', areaLabel: labels.topicLand },
        ];

        const idsByArea = questionMeta.reduce<Record<string, Set<number>>>((acc, item) => {
            if (!acc[item.areaCode]) acc[item.areaCode] = new Set<number>();
            acc[item.areaCode].add(item.id);
            return acc;
        }, {});

        const answeredSet = new Set(progress.answeredIds);

        return topicOrder.map(({ areaCode, areaLabel }) => {
            const areaIds = idsByArea[areaCode] || new Set<number>();
            const total = areaIds.size;
            let solved = 0;
            let attempts = 0;
            let wrong = 0;

            areaIds.forEach((questionId) => {
                if (answeredSet.has(questionId)) solved += 1;
                const questionStat = stats.byQuestion[String(questionId)];
                if (questionStat) {
                    attempts += Math.max(0, questionStat.attempts || 0);
                    wrong += Math.max(0, questionStat.wrong || 0);
                }
            });

            const solvedPercent = total > 0 ? Math.round((solved / total) * 100) : 0;
            const accuracy = attempts > 0 ? Math.round(((attempts - wrong) / attempts) * 100) : 0;

            return {
                areaCode,
                areaLabel,
                total,
                solved,
                solvedPercent,
                attempts,
                accuracy,
            };
        });
    }, [
        labels.topicGesellschaft,
        labels.topicGeschichte,
        labels.topicLand,
        labels.topicPolitik,
        progress.answeredIds,
        questionMeta,
        stats.byQuestion,
    ]);

    const handleClearStats = () => {
        clearQuestionStats();
        setStats(defaultStats);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{labels.title}</h2>
                        <p className="text-gray-600 mt-1">{labels.subtitle}</p>
                    </div>
                    {stats.totalAttempts > 0 && (
                        <button
                            type="button"
                            onClick={handleClearStats}
                            className="inline-flex items-center px-4 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                            {labels.clearStats}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                        <p className="text-xs uppercase tracking-wide font-semibold text-blue-700 mb-1">{labels.metricSolved}</p>
                        <p className="text-2xl font-bold text-blue-900">{solvedCount}</p>
                        <p className="text-sm text-blue-700/80">/ {totalQuestions}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                        <p className="text-xs uppercase tracking-wide font-semibold text-cyan-700 mb-1">{labels.metricAttempts}</p>
                        <p className="text-2xl font-bold text-cyan-900">{stats.totalAttempts}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                        <p className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-1">{labels.metricAccuracy}</p>
                        <p className="text-2xl font-bold text-emerald-900">{accuracyPercent}%</p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                        <p className="text-xs uppercase tracking-wide font-semibold text-amber-700 mb-1">{labels.metricFavorites}</p>
                        <p className="text-2xl font-bold text-amber-900">{favoriteCount}</p>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{labels.lastActivity}:</span> {lastActivityText}
                </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{labels.topicTitle}</h3>
                <p className="text-gray-600 mb-5">{labels.topicSubtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topicInsights.map((topic) => (
                        <div key={topic.areaCode} className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-semibold text-gray-900">{topic.areaLabel}</p>
                                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">
                                    {topic.solvedPercent}%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-3">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                                    style={{ width: `${topic.solvedPercent}%` }}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white border border-gray-200">
                                    {labels.topicSolved}: {topic.solved}/{topic.total}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white border border-gray-200">
                                    {labels.topicAttempts}: {topic.attempts}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white border border-gray-200">
                                    {labels.topicAccuracy}: {topic.accuracy}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{labels.weakTitle}</h3>

                {weakQuestions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                        {labels.weakEmpty}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {weakQuestions.map((question) => (
                            <a
                                key={question.id}
                                href={getPath(`${lang}/frage/${question.id}`)}
                                className="rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <p className="text-sm font-semibold text-blue-700">#{question.id}</p>
                                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-red-50 text-red-700 border border-red-100">
                                        {question.accuracy}%
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 border border-gray-200">
                                        {labels.attemptsShort}: {question.attempts}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-50 border border-red-100 text-red-700">
                                        {labels.wrongShort}: {question.wrong}
                                    </span>
                                </div>

                                <span className="text-sm font-semibold text-blue-600">{labels.openQuestion} →</span>
                            </a>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
