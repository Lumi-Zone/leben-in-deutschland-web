import React from 'react';
import { getPath } from '../utils/navigation';

const MOCKUPS = [
    getPath('mockups/m1.png'),
    getPath('mockups/m2.png'),
    getPath('mockups/m3.png'),
    getPath('mockups/m4.png'),
    getPath('mockups/m5.png'),
    getPath('mockups/m6.png'),
    getPath('mockups/m7.png'),
    getPath('mockups/m8.png'),
    getPath('mockups/m9.png'),
    getPath('mockups/m10.png'),
];

export default function PhoneSlider() {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const centerSetStart = MOCKUPS.length;
    const trackId = 'phone-slider-track';

    // Triple the data for infinite scroll: [Clones, Real, Clones]
    const sliders = [...MOCKUPS, ...MOCKUPS, ...MOCKUPS];

    // Initialize to middle set
    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return undefined;

        const initTimer = window.setTimeout(() => {
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }, 50);

        return () => {
            window.clearTimeout(initTimer);
        };
    }, []);

    const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

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

        // Emergency Reset
        if (scrollLeft < 50 || scrollLeft > scrollWidth - 50) {
            container.scrollTo({
                left: oneSetWidth + (scrollLeft % oneSetWidth),
                behavior: 'instant' as any
            });
            return;
        }

        // Debounced Reset for smooth loop
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            const currentSet = Math.floor(scrollLeft / oneSetWidth);

            // If we are not in the center set (index 1)
            if (currentSet !== 1) {
                const offsetInSet = scrollLeft % oneSetWidth;
                container.scrollTo({
                    left: oneSetWidth + offsetInSet,
                    behavior: 'instant' as any
                });
            }
        }, 150);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollAmount = 300; // Approx one card

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
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-gray-100/80 bg-white py-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] group" role="region" aria-label="App screenshots carousel">
            {/* Buttons (Desktop) */}
            <div className="hidden md:block">
                <button
                    type="button"
                    onClick={() => scroll('left')}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous screenshot"
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
                    aria-label="Next screenshot"
                    aria-controls={trackId}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Scrolling Container */}
            <div
                id={trackId}
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-label="Scrollable app screenshots. Use left and right arrow keys."
                className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-132px)] sm:px-[calc(50vw-138px)] md:px-28 lg:px-32 pb-4 scrollbar-hide snap-always"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sliders.map((src, index) => {
                    // Start position is set to the middle set; prioritize only those initially visible slides.
                    const isInitiallyVisible = index >= centerSetStart && index < centerSetStart + 3;
                    const isPrioritySlide = index === centerSetStart;
                    return (
                    <div
                        key={index}
                        className="relative w-[264px] sm:w-[280px] md:w-[320px] h-[540px] sm:h-[560px] md:h-[640px] shrink-0 transform transition-transform duration-300 hover:scale-[1.015] flex items-center justify-center snap-center snap-always"
                    >
                        <img
                            src={src}
                            alt={`App Screenshot ${index + 1}`}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading={isInitiallyVisible ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={isPrioritySlide ? 'high' : 'auto'}
                            width="320"
                            height="640"
                        />
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
