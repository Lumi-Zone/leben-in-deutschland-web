import { useEffect, useMemo, useState } from 'react';
import { getPath } from '../utils/navigation';
import { readLearningProgress, type LearningProgress } from '../utils/learningProgress';

interface Labels {
    title: string;
    subtitle: string;
    continueCta: string;
    startCta: string;
    solvedLabel: string;
    lastLabel: string;
    noProgress: string;
}

interface Props {
    lang: string;
    totalQuestions: number;
    labels: Labels;
}

const defaultProgress: LearningProgress = {
    answeredIds: [],
    lastQuestionId: null,
    updatedAt: 0,
};

export default function ContinueLearningCard({ lang, totalQuestions, labels }: Props) {
    const [progress, setProgress] = useState<LearningProgress>(defaultProgress);

    useEffect(() => {
        setProgress(readLearningProgress());
    }, []);

    const solvedCount = Math.min(progress.answeredIds.length, totalQuestions);
    const progressPercent = useMemo(() => {
        if (!totalQuestions) return 0;
        return Math.min(100, Math.round((solvedCount / totalQuestions) * 100));
    }, [solvedCount, totalQuestions]);

    const continueHref = getPath(`${lang}/frage/${progress.lastQuestionId ?? 1}`);
    const startHref = getPath(`${lang}/frage/1`);

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-cyan-50 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                                {labels.title}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {labels.subtitle}
                            </h3>
                            <p className="text-sm text-gray-600 mb-5">
                                {labels.solvedLabel}: <strong>{solvedCount}</strong> / {totalQuestions}
                            </p>

                            <div className="h-2.5 rounded-full bg-white/80 border border-blue-100 overflow-hidden mb-3">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="text-sm text-gray-600">
                                {progress.lastQuestionId ? (
                                    <>
                                        {labels.lastLabel}: <strong>#{progress.lastQuestionId}</strong>
                                    </>
                                ) : (
                                    labels.noProgress
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={continueHref}
                                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                {labels.continueCta}
                            </a>
                            <a
                                href={startHref}
                                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 font-semibold transition-colors"
                            >
                                {labels.startCta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
