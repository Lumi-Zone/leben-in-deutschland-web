import { useEffect, useState } from 'react';
import { getPath } from '../utils/navigation';
import { clearFavorites, readFavoriteIds, removeFavorite } from '../utils/favorites';

interface Labels {
    title: string;
    subtitle: string;
    empty: string;
    remove: string;
    clearAll: string;
    gotoQuestion: string;
}

interface Props {
    lang: string;
    labels: Labels;
}

export default function FavoritesList({ lang, labels }: Props) {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        setFavoriteIds(readFavoriteIds());
    }, []);

    const handleRemove = (id: number) => {
        setFavoriteIds(removeFavorite(id));
    };

    const handleClearAll = () => {
        clearFavorites();
        setFavoriteIds([]);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{labels.title}</h2>
                        <p className="text-gray-600 mt-1">{labels.subtitle}</p>
                    </div>
                    {favoriteIds.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="inline-flex items-center px-4 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                            {labels.clearAll}
                        </button>
                    )}
                </div>

                {favoriteIds.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                        {labels.empty}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {favoriteIds.map((id) => (
                            <div
                                key={id}
                                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
                            >
                                <a
                                    href={getPath(`${lang}/frage/${id}`)}
                                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
                                >
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-700 text-xs">
                                        #
                                    </span>
                                    {labels.gotoQuestion} {id}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(id)}
                                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    {labels.remove}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
