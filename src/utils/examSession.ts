import type { QuestionSessionItem } from './questions';

function sample<T>(items: T[], count: number, random: () => number): T[] {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

// A practice test uses 30 general questions and 3 from one chosen state.
export function buildExamSession(pool: QuestionSessionItem[], stateName: string, random = Math.random): QuestionSessionItem[] {
    if (!stateName) return [];
    const general = pool.filter((question) => !question.stateName);
    const state = pool.filter((question) => question.stateName === stateName);
    if (general.length < 30 || state.length < 3) return [];
    return [...sample(general, 30, random), ...sample(state, 3, random)];
}
