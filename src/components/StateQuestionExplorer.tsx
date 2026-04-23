import { useEffect, useMemo, useState } from 'react';
import { getPath } from '../utils/navigation';

interface StateQuestion {
    id: number;
    q_de: string;
    [key: string]: string | number | null | undefined;
}

interface Labels {
    searchPlaceholder: string;
    searchAriaLabel: string;
    sortLabel: string;
    sortDefault: string;
    sortIdAsc: string;
    sortIdDesc: string;
    viewLabel: string;
    viewGrid: string;
    viewList: string;
    clearSearch: string;
    results: string;
    emptyTitle: string;
    emptySubtitle: string;
}

interface Props {
    lang: string;
    stateName: string;
    questions: StateQuestion[];
    labels: Labels;
}

function getLocalizedQuestion(question: StateQuestion, lang: string): string {
    const localized = question[`q_${lang}`];
    if (typeof localized === 'string' && localized.trim().length > 0) {
        return localized;
    }
    return question.q_de;
}

export default function StateQuestionExplorer({ lang, stateName, questions, labels }: Props) {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'id-asc' | 'id-desc'>('default');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isQuerySynced, setIsQuerySynced] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialQuery = params.get('q') || '';
        const initialSort = params.get('sort');
        const initialView = params.get('view');

        setQuery(initialQuery);
        if (initialSort === 'id-asc' || initialSort === 'id-desc' || initialSort === 'default') {
            setSortBy(initialSort);
        }
        if (initialView === 'grid' || initialView === 'list') {
            setViewMode(initialView);
        }

        setIsQuerySynced(true);
    }, []);

    useEffect(() => {
        if (!isQuerySynced) return;

        const params = new URLSearchParams(window.location.search);
        if (query.trim()) params.set('q', query.trim());
        else params.delete('q');

        if (sortBy === 'default') params.delete('sort');
        else params.set('sort', sortBy);

        if (viewMode === 'grid') params.delete('view');
        else params.set('view', viewMode);

        const search = params.toString();
        const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}`;
        window.history.replaceState({}, '', nextUrl);
    }, [isQuerySynced, query, sortBy, viewMode]);

    const filteredQuestions = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        let result = questions.filter((question) => {
            if (!normalizedQuery) return true;
            const localized = getLocalizedQuestion(question, lang).toLowerCase();
            const german = question.q_de.toLowerCase();
            return localized.includes(normalizedQuery) || german.includes(normalizedQuery);
        });

        if (sortBy === 'id-asc') {
            result = [...result].sort((a, b) => a.id - b.id);
        } else if (sortBy === 'id-desc') {
            result = [...result].sort((a, b) => b.id - a.id);
        }

        return result;
    }, [lang, query, questions, sortBy]);

    const resultsText = labels.results
        .replace('{shown}', String(filteredQuestions.length))
        .replace('{total}', String(questions.length));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3">
                    <label className="relative block">
                        <span className="sr-only">{labels.searchAriaLabel}</span>
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                            />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={labels.searchPlaceholder}
                            aria-label={labels.searchAriaLabel}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="whitespace-nowrap font-medium">{labels.sortLabel}</span>
                        <select
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value as 'default' | 'id-asc' | 'id-desc')
                            }
                            className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                        >
                            <option value="default">{labels.sortDefault}</option>
                            <option value="id-asc">{labels.sortIdAsc}</option>
                            <option value="id-desc">{labels.sortIdDesc}</option>
                        </select>
                    </label>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="whitespace-nowrap font-medium">{labels.viewLabel}</span>
                        <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                aria-pressed={viewMode === 'grid'}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {labels.viewGrid}
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                aria-pressed={viewMode === 'list'}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {labels.viewList}
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setQuery('');
                            setSortBy('default');
                            setViewMode('grid');
                        }}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {labels.clearSearch}
                    </button>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                    {resultsText}
                    <span className="ml-2 text-gray-400">•</span>
                    <span className="ml-2 text-gray-500">{stateName}</span>
                </div>
            </div>

            {filteredQuestions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{labels.emptyTitle}</h3>
                    <p className="text-gray-600">{labels.emptySubtitle}</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuestions.map((question) => {
                        const qTitle = getLocalizedQuestion(question, lang);
                        return (
                            <a
                                key={question.id}
                                href={getPath(`${lang}/frage/${question.id}`)}
                                className="block group"
                            >
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all h-full flex flex-col group-hover:-translate-y-0.5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                                            #{question.id}
                                        </span>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                            {stateName}
                                        </span>
                                    </div>
                                    <h2 className="text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-4 leading-relaxed">
                                        {qTitle}
                                    </h2>
                                </div>
                            </a>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredQuestions.map((question) => {
                        const qTitle = getLocalizedQuestion(question, lang);
                        return (
                            <a
                                key={question.id}
                                href={getPath(`${lang}/frage/${question.id}`)}
                                className="block rounded-2xl border border-gray-200 bg-white p-4 md:p-5 hover:border-blue-400 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                                            #{question.id}
                                        </div>
                                        <h2 className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                                            {qTitle}
                                        </h2>
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md shrink-0">
                                        {stateName}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
