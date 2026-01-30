import React, { useRef } from 'react';
import { getPath } from '../utils/navigation';
import { ui } from '../i18n/ui';

interface FeatureCarouselProps {
    lang?: string;
}

export default function FeatureCarousel({ lang = 'de' }: FeatureCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Get translations
    const t = (key: keyof typeof ui['de']) => {
        // @ts-ignore
        return ui[lang]?.[key] || ui['de'][key];
    };

    const baseFeatures = [
        {
            titleKey: 'features.learn.title' as const,
            descKey: 'features.learn.desc' as const,
            image: getPath('mockups/m1.png'),
        },
        {
            titleKey: 'features.practice.title' as const,
            descKey: 'features.practice.desc' as const,
            image: getPath('mockups/m2.png'),
        },
        {
            titleKey: 'features.exam.title' as const,
            descKey: 'features.exam.desc' as const,
            image: getPath('mockups/m3.png'),
        }
    ];

    // Triple the data for infinite scroll buffer: [Clones, Real, Clones]
    const features = [...baseFeatures, ...baseFeatures, ...baseFeatures];

    // Initialize scroll to middle set
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 3;

        // Tolerance to prevent jitter
        const tolerance = 10;

        // If we've scrolled into the third set (end buffer), jump back to middle
        if (scrollLeft >= 2 * oneSetWidth - tolerance) {
            container.scrollTo({
                left: scrollLeft - oneSetWidth,
                behavior: 'instant' as any
            });
        }
        // If we've scrolled into the first set (start buffer), jump forward to middle
        else if (scrollLeft <= oneSetWidth - tolerance) {
            container.scrollTo({
                left: scrollLeft + oneSetWidth,
                behavior: 'instant' as any
            });
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth; // One screen width

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="w-full py-10 bg-white relative group">
            {/* Navigation Buttons (Desktop) */}
            <div className="hidden md:block">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Gradient Masks - REMOVED as requested */}

            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-4 scrollbar-hide items-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="w-[85vw] md:w-[450px] lg:w-[500px] shrink-0 bg-[#FFFBF4] rounded-[2rem] p-6 md:p-10 flex flex-col items-center text-center snap-center transition-transform hover:scale-[1.01] border border-gray-100"
                    >
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                            {t(feature.titleKey)}
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg mb-6 max-w-sm">
                            {t(feature.descKey)}
                        </p>

                        <div className="relative w-[240px] md:w-[280px] aspect-[1/2]">
                            <img
                                src={feature.image}
                                alt={t(feature.titleKey)}
                                className="w-full h-full object-contain drop-shadow-2xl"
                                loading={idx < 3 ? "eager" : "lazy"}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
