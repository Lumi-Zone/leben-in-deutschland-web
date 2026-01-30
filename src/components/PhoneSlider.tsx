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

    // Triple the data for infinite scroll: [Clones, Real, Clones]
    const sliders = [...MOCKUPS, ...MOCKUPS, ...MOCKUPS];

    // Initialize to middle set
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            // Slight delay to ensure layout is done
            setTimeout(() => {
                const singleSetWidth = container.scrollWidth / 3;
                container.scrollLeft = singleSetWidth;
            }, 50);
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 3;
        const tolerance = 10;

        if (scrollLeft >= 2 * oneSetWidth - tolerance) {
            container.scrollTo({
                left: scrollLeft - oneSetWidth,
                behavior: 'instant' as any
            });
        }
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
        const scrollAmount = 300; // Approx one card

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative w-full py-10 bg-white group">
            {/* Buttons (Desktop) */}
            <div className="hidden md:block">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous screenshot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Next screenshot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Gradient Masks */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-140px)] md:px-32 pb-4 scrollbar-hide snap-always"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sliders.map((src, index) => (
                    <div
                        key={index}
                        className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] shrink-0 transform transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center snap-center snap-always"
                    >
                        <img
                            src={src}
                            alt={`App Screenshot ${index + 1}`}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading={index < 3 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
