import { useEffect, useMemo, useState } from 'react';
import {
    getTodayKey,
    readLearningHabits,
    setDailyGoal,
    type LearningHabitStore,
} from '../utils/learningHabits';

interface Labels {
    title: string;
    subtitle: string;
    todayAttempts: string;
    dailyGoal: string;
    currentStreak: string;
    bestStreak: string;
    goalMet: string;
    goalRemaining: string;
    setGoal: string;
    days: string;
    attempts: string;
    quick5: string;
    quick10: string;
    quick20: string;
}

interface Props {
    labels: Labels;
}

const defaultHabits: LearningHabitStore = {
    dailyGoal: 10,
    dayAttempts: {},
    streakCurrent: 0,
    streakBest: 0,
    updatedAt: 0,
};

const quickGoals = [5, 10, 20];

export default function StudyHabitCard({ labels }: Props) {
    const [habitStore, setHabitStore] = useState<LearningHabitStore>(defaultHabits);

    useEffect(() => {
        setHabitStore(readLearningHabits());
    }, []);

    const todayAttempts = habitStore.dayAttempts[getTodayKey()] || 0;
    const goalPercent =
        habitStore.dailyGoal > 0
            ? Math.min(100, Math.round((todayAttempts / habitStore.dailyGoal) * 100))
            : 0;

    const remainingAttempts = Math.max(0, habitStore.dailyGoal - todayAttempts);

    const statusText = useMemo(() => {
        if (remainingAttempts === 0) {
            return labels.goalMet;
        }

        return `${remainingAttempts} ${labels.goalRemaining}`;
    }, [labels.goalMet, labels.goalRemaining, remainingAttempts]);

    const setGoalAndRefresh = (goal: number) => {
        setHabitStore(setDailyGoal(goal));
    };

    return (
        <section className="max-w-5xl mx-auto mb-6">
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 shadow-sm p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-5">
                    <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
                            {labels.title}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{labels.subtitle}</h2>
                        <p className="text-sm text-gray-600">{statusText}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 mr-1">
                            {labels.setGoal}
                        </span>
                        {quickGoals.map((goal) => {
                            const isActive = habitStore.dailyGoal === goal;
                            const label = goal === 5 ? labels.quick5 : goal === 10 ? labels.quick10 : labels.quick20;

                            return (
                                <button
                                    key={goal}
                                    type="button"
                                    onClick={() => setGoalAndRefresh(goal)}
                                    aria-pressed={isActive}
                                    className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                                        isActive
                                            ? 'border-indigo-300 bg-indigo-600 text-white'
                                            : 'border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-xl border border-indigo-100 bg-white/80 px-4 py-3 mb-5">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">
                            {labels.todayAttempts}: <strong className="text-gray-900">{todayAttempts}</strong> {labels.attempts}
                        </span>
                        <span className="font-semibold text-indigo-700">{goalPercent}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-indigo-50 overflow-hidden border border-indigo-100">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all"
                            style={{ width: `${goalPercent}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{labels.dailyGoal}</p>
                        <p className="text-2xl font-bold text-gray-900">{habitStore.dailyGoal}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{labels.currentStreak}</p>
                        <p className="text-2xl font-bold text-gray-900">{habitStore.streakCurrent}</p>
                        <p className="text-xs text-gray-500 mt-1">{labels.days}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{labels.bestStreak}</p>
                        <p className="text-2xl font-bold text-gray-900">{habitStore.streakBest}</p>
                        <p className="text-xs text-gray-500 mt-1">{labels.days}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
