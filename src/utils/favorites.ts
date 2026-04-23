const STORAGE_KEY = 'lid_favorites_v1';

function normalizeIds(value: unknown): number[] {
    if (!Array.isArray(value)) return [];

    return Array.from(
        new Set(
            value
                .map((item) => Number(item))
                .filter((item) => Number.isInteger(item) && item > 0)
        )
    );
}

export function readFavoriteIds(): number[] {
    if (typeof window === 'undefined') return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return normalizeIds(JSON.parse(raw));
    } catch {
        return [];
    }
}

function writeFavoriteIds(ids: number[]): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function isQuestionFavorite(questionId: number): boolean {
    return readFavoriteIds().includes(questionId);
}

export function toggleFavorite(questionId: number): boolean {
    const current = readFavoriteIds();
    const exists = current.includes(questionId);

    const next = exists
        ? current.filter((id) => id !== questionId)
        : [...current, questionId].sort((a, b) => a - b);

    writeFavoriteIds(next);
    return !exists;
}

export function removeFavorite(questionId: number): number[] {
    const next = readFavoriteIds().filter((id) => id !== questionId);
    writeFavoriteIds(next);
    return next;
}

export function clearFavorites(): void {
    writeFavoriteIds([]);
}
