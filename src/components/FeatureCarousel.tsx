import React, { useRef } from 'react';

interface FeatureItem {
    title: string;
    description: string;
    image: string;
}

interface FeatureCarouselProps {
    items: FeatureItem[];
}

export default function FeatureCarousel({ items }: FeatureCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const centerSetStart = items.length;
    const trackId = 'feature-carousel-track';

    // Triple the data for infinite scroll buffer: [Clones, Real, Clones]
    const features = [...items, ...items, ...items];

    // Initialize scroll to middle set
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        return () => {
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 3;

        // Emergency Reset: If very close to the absolute edge (Start of Set 1 or End of Set 3), jump immediately
        // Set 1 ends at oneSetWidth. Set 3 starts at 2 * oneSetWidth.
        if (scrollLeft < 50 || scrollLeft > scrollWidth - 50) {
            container.scrollTo({
                left: oneSetWidth + (scrollLeft % oneSetWidth),
                behavior: 'instant' as any
            });
            return;
        }

        // Debounced Reset: Wait for scroll to stop before jumping back to center
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            // Check if we are in the buffer zones (Set 1 or Set 3)
            // Center set is Set 2 (from oneSetWidth to 2*oneSetWidth)
            const currentSet = Math.floor(scrollLeft / oneSetWidth);

            if (currentSet !== 1) { // If not in the middle set (index 1)
                // Calculate precise offset within the set
                const offsetInSet = scrollLeft % oneSetWidth;

                // Jump to the corresponding position in the middle set (Set 2)
                container.scrollTo({
                    left: oneSetWidth + offsetInSet,
                    behavior: 'instant' as any
                });
            }
        }, 150); // 150ms debounce
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scroll('left');
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scroll('right');
        }
    };

    return (
        <div className="w-full py-6 bg-white relative group overflow-hidden rounded-[2rem] border border-gray-100/80 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]" role="region" aria-label="Feature carousel">
            {/* Navigation Buttons (Desktop) */}
            <div className="hidden md:block">
                <button
                    type="button"
                    onClick={() => scroll('left')}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous slide"
                    aria-controls={trackId}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => scroll('right')}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Next slide"
                    aria-controls={trackId}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Scroll Container */}
            <div
                id={trackId}
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-label="Scrollable feature cards. Use left and right arrow keys."
                className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-12 lg:px-16 pb-4 scrollbar-hide items-center snap-always"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {features.map((feature, idx) => {
                    const isInitiallyVisible = idx >= centerSetStart && idx < centerSetStart + 3;
                    const isPriorityCard = idx === centerSetStart;

                    return (
                        <div
                            key={idx}
                            className="w-[85vw] md:w-[450px] lg:w-[500px] shrink-0 bg-[#FFFBF4] rounded-[2rem] p-6 md:p-10 flex flex-col items-center text-center snap-center snap-always transition-transform hover:scale-[1.01] border border-gray-100"
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-base md:text-lg mb-6 max-w-sm">
                                {feature.description}
                            </p>

                            <div className="relative w-[240px] md:w-[280px] aspect-[1/2]">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                    loading={isInitiallyVisible ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchPriority={isPriorityCard ? 'high' : 'auto'}
                                    width="280"
                                    height="560"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
