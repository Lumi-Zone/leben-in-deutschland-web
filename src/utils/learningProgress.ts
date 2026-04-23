export interface LearningProgress {
    answeredIds: number[];
    lastQuestionId: number | null;
    updatedAt: number;
}

const STORAGE_KEY = 'lid_progress_v1';

const defaultProgress: LearningProgress = {
    answeredIds: [],
    lastQuestionId: null,
    updatedAt: 0,
};

export function readLearningProgress(): LearningProgress {
    if (typeof window === 'undefined') {
        return defaultProgress;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultProgress;

        const parsed = JSON.parse(raw) as Partial<LearningProgress>;
        const answeredIds = Array.isArray(parsed.answeredIds)
            ? Array.from(
                  new Set(
                      parsed.answeredIds
                          .map((value) => Number(value))
                          .filter((value) => Number.isInteger(value) && value > 0)
                  )
              )
            : [];

        return {
            answeredIds,
            lastQuestionId:
                typeof parsed.lastQuestionId === 'number' && parsed.lastQuestionId > 0
                    ? parsed.lastQuestionId
                    : null,
            updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : 0,
        };
    } catch {
        return defaultProgress;
    }
}

export function writeLearningProgress(progress: LearningProgress): void {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markQuestionSolved(questionId: number): LearningProgress {
    const current = readLearningProgress();
    const nextAnsweredIds = current.answeredIds.includes(questionId)
        ? current.answeredIds
        : [...current.answeredIds, questionId];

    const nextProgress: LearningProgress = {
        answeredIds: nextAnsweredIds,
        lastQuestionId: questionId,
        updatedAt: Date.now(),
    };

    writeLearningProgress(nextProgress);
    return nextProgress;
}
