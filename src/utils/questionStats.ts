export interface QuestionLevelStat {
    attempts: number;
    correct: number;
    wrong: number;
    lastAttemptAt: number;
}

export interface QuestionStatsStore {
    totalAttempts: number;
    totalCorrect: number;
    totalWrong: number;
    lastAttemptAt: number;
    byQuestion: Record<string, QuestionLevelStat>;
}

const STORAGE_KEY = 'lid_question_stats_v1';

const defaultStats: QuestionStatsStore = {
    totalAttempts: 0,
    totalCorrect: 0,
    totalWrong: 0,
    lastAttemptAt: 0,
    byQuestion: {},
};

function sanitizeStats(input: Partial<QuestionStatsStore>): QuestionStatsStore {
    const byQuestion: Record<string, QuestionLevelStat> = {};

    if (input.byQuestion && typeof input.byQuestion === 'object') {
        Object.entries(input.byQuestion).forEach(([id, stat]) => {
            const parsedId = Number(id);
            if (!Number.isInteger(parsedId) || parsedId <= 0 || !stat) return;

            const attempts = Number((stat as QuestionLevelStat).attempts) || 0;
            const correct = Number((stat as QuestionLevelStat).correct) || 0;
            const wrong = Number((stat as QuestionLevelStat).wrong) || 0;
            const lastAttemptAt = Number((stat as QuestionLevelStat).lastAttemptAt) || 0;

            byQuestion[String(parsedId)] = {
                attempts: Math.max(0, attempts),
                correct: Math.max(0, correct),
                wrong: Math.max(0, wrong),
                lastAttemptAt: Math.max(0, lastAttemptAt),
            };
        });
    }

    return {
        totalAttempts: Math.max(0, Number(input.totalAttempts) || 0),
        totalCorrect: Math.max(0, Number(input.totalCorrect) || 0),
        totalWrong: Math.max(0, Number(input.totalWrong) || 0),
        lastAttemptAt: Math.max(0, Number(input.lastAttemptAt) || 0),
        byQuestion,
    };
}

export function readQuestionStats(): QuestionStatsStore {
    if (typeof window === 'undefined') return defaultStats;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultStats;
        return sanitizeStats(JSON.parse(raw));
    } catch {
        return defaultStats;
    }
}

function writeQuestionStats(stats: QuestionStatsStore): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordQuestionAttempt(questionId: number, isCorrect: boolean): QuestionStatsStore {
    const current = readQuestionStats();
    const key = String(questionId);
    const existing = current.byQuestion[key] || {
        attempts: 0,
        correct: 0,
        wrong: 0,
        lastAttemptAt: 0,
    };
    const now = Date.now();

    const nextByQuestion = {
        ...current.byQuestion,
        [key]: {
            attempts: existing.attempts + 1,
            correct: existing.correct + (isCorrect ? 1 : 0),
            wrong: existing.wrong + (isCorrect ? 0 : 1),
            lastAttemptAt: now,
        },
    };

    const next: QuestionStatsStore = {
        totalAttempts: current.totalAttempts + 1,
        totalCorrect: current.totalCorrect + (isCorrect ? 1 : 0),
        totalWrong: current.totalWrong + (isCorrect ? 0 : 1),
        lastAttemptAt: now,
        byQuestion: nextByQuestion,
    };

    writeQuestionStats(next);
    return next;
}

export function clearQuestionStats(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStats));
}
