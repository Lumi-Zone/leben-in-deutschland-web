export interface LearningHabitStore {
    dailyGoal: number;
    dayAttempts: Record<string, number>;
    streakCurrent: number;
    streakBest: number;
    updatedAt: number;
}

const STORAGE_KEY = 'lid_habit_v1';
const DEFAULT_DAILY_GOAL = 10;
const MAX_DAILY_GOAL = 100;
const RETENTION_DAYS = 120;

const defaultStore: LearningHabitStore = {
    dailyGoal: DEFAULT_DAILY_GOAL,
    dayAttempts: {},
    streakCurrent: 0,
    streakBest: 0,
    updatedAt: 0,
};

function toDayKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDayKey(dayKey: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
    if (!match) return null;

    const year = Number(match[1]);
    const monthIndex = Number(match[2]) - 1;
    const day = Number(match[3]);

    if (!Number.isInteger(year) || !Number.isInteger(monthIndex) || !Number.isInteger(day)) {
        return null;
    }

    const parsed = new Date(year, monthIndex, day);
    if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day) {
        return null;
    }

    return parsed;
}

function sanitizeDayAttempts(value: unknown): Record<string, number> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return {};
    }

    const sanitized: Record<string, number> = {};

    Object.entries(value as Record<string, unknown>).forEach(([dayKey, attemptCount]) => {
        if (!parseDayKey(dayKey)) return;
        const parsedAttempts = Number(attemptCount);
        if (!Number.isFinite(parsedAttempts)) return;

        const normalized = Math.max(0, Math.floor(parsedAttempts));
        if (normalized <= 0) return;

        sanitized[dayKey] = normalized;
    });

    return sanitized;
}

function dayDiff(from: Date, to: Date): number {
    const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toMidnight = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((toMidnight.getTime() - fromMidnight.getTime()) / msPerDay);
}

function removeOldEntries(dayAttempts: Record<string, number>, referenceDate: Date): Record<string, number> {
    const filtered: Record<string, number> = {};

    Object.entries(dayAttempts).forEach(([dayKey, attempts]) => {
        const parsed = parseDayKey(dayKey);
        if (!parsed) return;

        const diff = dayDiff(parsed, referenceDate);
        if (diff < 0 || diff > RETENTION_DAYS) return;

        filtered[dayKey] = attempts;
    });

    return filtered;
}

function calculateCurrentStreak(dayAttempts: Record<string, number>, today: Date): number {
    let streak = 0;

    for (let offset = 0; offset <= RETENTION_DAYS; offset += 1) {
        const candidateDate = new Date(today);
        candidateDate.setDate(today.getDate() - offset);

        const key = toDayKey(candidateDate);
        if ((dayAttempts[key] || 0) > 0) {
            streak += 1;
        } else {
            break;
        }
    }

    return streak;
}

function calculateBestStreak(dayAttempts: Record<string, number>): number {
    const sortedDates = Object.keys(dayAttempts)
        .map((key) => parseDayKey(key))
        .filter((value): value is Date => Boolean(value))
        .sort((a, b) => a.getTime() - b.getTime());

    if (sortedDates.length === 0) return 0;

    let best = 1;
    let current = 1;

    for (let index = 1; index < sortedDates.length; index += 1) {
        const previous = sortedDates[index - 1];
        const currentDate = sortedDates[index];
        const diff = dayDiff(previous, currentDate);

        if (diff === 1) {
            current += 1;
        } else {
            current = 1;
        }

        if (current > best) {
            best = current;
        }
    }

    return best;
}

function normalizeStore(input: Partial<LearningHabitStore>): LearningHabitStore {
    const today = new Date();
    const dayAttempts = removeOldEntries(sanitizeDayAttempts(input.dayAttempts), today);
    const streakCurrent = calculateCurrentStreak(dayAttempts, today);
    const streakBest = Math.max(streakCurrent, calculateBestStreak(dayAttempts));

    return {
        dailyGoal: Math.min(
            MAX_DAILY_GOAL,
            Math.max(1, Math.floor(Number(input.dailyGoal) || DEFAULT_DAILY_GOAL))
        ),
        dayAttempts,
        streakCurrent,
        streakBest,
        updatedAt: Math.max(0, Number(input.updatedAt) || 0),
    };
}

function writeLearningHabits(store: LearningHabitStore): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function readLearningHabits(): LearningHabitStore {
    if (typeof window === 'undefined') return defaultStore;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultStore;
        return normalizeStore(JSON.parse(raw));
    } catch {
        return defaultStore;
    }
}

export function getTodayKey(date = new Date()): string {
    return toDayKey(date);
}

export function recordHabitAttempt(timestamp = Date.now()): LearningHabitStore {
    const now = new Date(timestamp);
    const key = toDayKey(now);

    const current = readLearningHabits();
    const next = normalizeStore({
        ...current,
        dayAttempts: {
            ...current.dayAttempts,
            [key]: (current.dayAttempts[key] || 0) + 1,
        },
        updatedAt: Date.now(),
    });

    writeLearningHabits(next);
    return next;
}

export function setDailyGoal(goal: number): LearningHabitStore {
    const current = readLearningHabits();
    const next = normalizeStore({
        ...current,
        dailyGoal: goal,
        updatedAt: Date.now(),
    });

    writeLearningHabits(next);
    return next;
}
