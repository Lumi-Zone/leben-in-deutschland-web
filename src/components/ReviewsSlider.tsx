import React from 'react';
import { getReviews } from '../data/reviews';

interface ReviewsSliderProps {
    lang?: string;
}

export default function ReviewsSlider({ lang = 'de' }: ReviewsSliderProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const reviewsData = getReviews(lang);

    // 5 sets for stability
    const reviews = [...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData];

    const titles: Record<string, { badge: string; heading: string }> = {
        de: { badge: "Was Nutzer sagen", heading: "Beliebt bei Lernenden" },
        en: { badge: "What users say", heading: "Loved by Learners" },
        tr: { badge: "Kullanıcılar ne diyor", heading: "Öğrenciler Tarafından Seviliyor" },
        ar: { badge: "ماذا يقول المستخدمون", heading: "محبوب من قبل المتعلمين" }
    };

    const t = titles[lang] || titles['en'];

    React.useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            requestAnimationFrame(() => {
                const singleSetWidth = container.scrollWidth / 5;
                container.scrollLeft = singleSetWidth * 2;
            });
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 5;

        const centerSetStart = oneSetWidth * 2;

        if (scrollLeft >= centerSetStart + oneSetWidth) {
            container.scrollLeft = scrollLeft - oneSetWidth;
        }
        else if (scrollLeft <= centerSetStart - oneSetWidth) {
            container.scrollLeft = scrollLeft + oneSetWidth;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollAmount = 350; // Approx one card width

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden group relative">
            <div className="container mx-auto px-4 mb-12 text-center">
                <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-2 rounded-full inline-block mb-6 uppercase tracking-widest">
                    {t.badge}
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{t.heading}</h2>
            </div>

            {/* Buttons (Desktop) */}
            <div className="hidden md:block">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-8 top-1/2 mt-8 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous review"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-8 top-1/2 mt-8 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Next review"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks (Hidden on mobile, reduced on desktop) */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                {/* Scrolling Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-32 pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col shrink-0 hover:shadow-md transition-shadow snap-center"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-yellow-400 text-sm mb-1">
                                        {"★".repeat(review.rating)}
                                    </div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{review.title}</h3>
                                </div>
                                <span className="text-xs text-gray-400 shrink-0">{review.date}</span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-6">
                                {review.text}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                    {review.author.slice(0, 2)}
                                </div>
                                <span className="text-sm font-medium text-gray-900 truncate">
                                    {review.author}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
