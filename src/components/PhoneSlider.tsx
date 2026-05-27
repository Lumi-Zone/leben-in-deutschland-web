import React from 'react';
import { getPath } from '../utils/navigation';

interface PhoneSliderProps {
    lang?: string;
}

const LABELS = {
    de: {
        region: 'App-Screenshots',
        instructions: 'App-Screenshots. Mit den Pfeiltasten, Home und Ende navigieren. Nach dem letzten Screenshot beginnt es wieder beim ersten.',
        previous: 'Vorheriger Screenshot',
        next: 'Naechster Screenshot',
        pagination: 'Screenshot auswaehlen',
        slide: (index: number, total: number) => `App-Screenshot ${index} von ${total}`,
        goTo: (index: number, total: number) => `Screenshot ${index} von ${total} anzeigen`,
        status: (index: number, total: number) => `Screenshot ${index} von ${total}`,
    },
    en: {
        region: 'App screenshots',
        instructions: 'App screenshots. Use arrow keys, Home and End to navigate. After the last screenshot, navigation returns to the first.',
        previous: 'Previous screenshot',
        next: 'Next screenshot',
        pagination: 'Choose screenshot',
        slide: (index: number, total: number) => `App screenshot ${index} of ${total}`,
        goTo: (index: number, total: number) => `Show screenshot ${index} of ${total}`,
        status: (index: number, total: number) => `Screenshot ${index} of ${total}`,
    },
    tr: {
        region: 'Uygulama ekran goruntuleri',
        instructions: 'Uygulama ekran goruntuleri. Yon tuslari, Home ve End ile gezinin. Son ekrandan sonra ilk ekrana doner.',
        previous: 'Onceki ekran goruntusu',
        next: 'Sonraki ekran goruntusu',
        pagination: 'Ekran goruntusu sec',
        slide: (index: number, total: number) => `Uygulama ekran goruntusu ${index} / ${total}`,
        goTo: (index: number, total: number) => `${index} / ${total} ekran goruntusunu goster`,
        status: (index: number, total: number) => `Ekran goruntusu ${index} / ${total}`,
    },
    ar: {
        region: 'لقطات شاشة التطبيق',
        instructions: 'لقطات شاشة التطبيق. استخدم مفاتيح الأسهم وHome وEnd للتنقل. بعد اللقطة الأخيرة يعود التنقل إلى الأولى.',
        previous: 'لقطة الشاشة السابقة',
        next: 'لقطة الشاشة التالية',
        pagination: 'اختيار لقطة شاشة',
        slide: (index: number, total: number) => `لقطة شاشة التطبيق ${index} من ${total}`,
        goTo: (index: number, total: number) => `عرض لقطة الشاشة ${index} من ${total}`,
        status: (index: number, total: number) => `لقطة الشاشة ${index} من ${total}`,
    },
};

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

const INITIAL_SLIDE_INDEX = 2;
const LOOP_COPY_COUNT = 3;
const CENTER_COPY_INDEX = 1;
const RECENTER_DISTANCE_THRESHOLD = 4;
const useSafeLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function getCenteredScrollLeft(container: HTMLDivElement, targetSlide: HTMLElement) {
    return targetSlide.offsetLeft - (container.clientWidth - targetSlide.offsetWidth) / 2;
}

function getLoopedIndex(index: number, total: number) {
    if (total <= 0) return 0;

    return ((index % total) + total) % total;
}

function getCenterVirtualIndex(index: number, total: number) {
    return total * CENTER_COPY_INDEX + getLoopedIndex(index, total);
}

export default function PhoneSlider({ lang = 'de' }: PhoneSliderProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const animationFrameRef = React.useRef<number | null>(null);
    const activeVirtualIndexRef = React.useRef(getCenterVirtualIndex(INITIAL_SLIDE_INDEX, MOCKUPS.length));
    const [activeIndex, setActiveIndex] = React.useState(INITIAL_SLIDE_INDEX);
    const trackId = 'phone-slider-track';
    const instructionsId = 'phone-slider-instructions';
    const statusId = 'phone-slider-status';
    const sliders = MOCKUPS;
    const loopedSliders = React.useMemo(() => Array.from({ length: LOOP_COPY_COUNT }, () => sliders).flat(), [sliders]);
    const canLoop = sliders.length > 1;
    const labels = LABELS[lang as keyof typeof LABELS] || LABELS.de;

    const updateScrollState = React.useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const slides = Array.from(container.children) as HTMLElement[];
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let closestVirtualIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            const distance = Math.abs(slideCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestVirtualIndex = index;
            }
        });

        const closestOriginalIndex = getLoopedIndex(closestVirtualIndex, sliders.length);
        const centerVirtualIndex = getCenterVirtualIndex(closestOriginalIndex, sliders.length);
        const shouldRecenter =
            closestDistance <= RECENTER_DISTANCE_THRESHOLD &&
            (closestVirtualIndex < sliders.length || closestVirtualIndex >= sliders.length * 2);

        if (shouldRecenter) {
            const centerSlide = slides[centerVirtualIndex];

            if (centerSlide) {
                container.scrollLeft = getCenteredScrollLeft(container, centerSlide);
                activeVirtualIndexRef.current = centerVirtualIndex;
            }
        } else {
            activeVirtualIndexRef.current = closestVirtualIndex;
        }

        setActiveIndex(closestOriginalIndex);
    }, [sliders.length]);

    const scheduleScrollStateUpdate = React.useCallback(() => {
        if (animationFrameRef.current !== null) return;

        animationFrameRef.current = window.requestAnimationFrame(() => {
            animationFrameRef.current = null;
            updateScrollState();
        });
    }, [updateScrollState]);

    useSafeLayoutEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return undefined;

        const initialVirtualIndex = getCenterVirtualIndex(INITIAL_SLIDE_INDEX, sliders.length);
        const targetSlide = container.children[initialVirtualIndex] as HTMLElement | undefined;
        if (!targetSlide) return undefined;

        activeVirtualIndexRef.current = initialVirtualIndex;
        container.scrollLeft = getCenteredScrollLeft(container, targetSlide);
        updateScrollState();

        return undefined;
    }, [sliders.length, updateScrollState]);

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return undefined;

        updateScrollState();
        window.addEventListener('resize', scheduleScrollStateUpdate);

        let resizeObserver: ResizeObserver | undefined;
        if ('ResizeObserver' in window) {
            resizeObserver = new ResizeObserver(scheduleScrollStateUpdate);
            resizeObserver.observe(container);
        }

        return () => {
            window.removeEventListener('resize', scheduleScrollStateUpdate);
            resizeObserver?.disconnect();

            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [scheduleScrollStateUpdate, updateScrollState]);

    const getScrollBehavior = (): ScrollBehavior => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return 'auto';
        }

        return 'smooth';
    };

    const scrollToVirtualIndex = React.useCallback((virtualIndex: number, behavior?: ScrollBehavior) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const normalizedVirtualIndex =
            virtualIndex < 0 || virtualIndex >= loopedSliders.length
                ? getCenterVirtualIndex(virtualIndex, sliders.length)
                : virtualIndex;
        const targetOriginalIndex = getLoopedIndex(normalizedVirtualIndex, sliders.length);
        const targetSlide = container.children[normalizedVirtualIndex] as HTMLElement | undefined;
        if (!targetSlide) return;

        const centeredLeft = getCenteredScrollLeft(container, targetSlide);
        container.scrollTo({
            left: centeredLeft,
            behavior: behavior ?? getScrollBehavior(),
        });
        activeVirtualIndexRef.current = normalizedVirtualIndex;
        setActiveIndex(targetOriginalIndex);
        scheduleScrollStateUpdate();
    }, [loopedSliders.length, scheduleScrollStateUpdate, sliders.length]);

    const scrollToIndex = React.useCallback((index: number, behavior?: ScrollBehavior) => {
        scrollToVirtualIndex(getCenterVirtualIndex(index, sliders.length), behavior);
    }, [scrollToVirtualIndex, sliders.length]);

    const scroll = (direction: 'left' | 'right') => {
        scrollToVirtualIndex(activeVirtualIndexRef.current + (direction === 'left' ? -1 : 1));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scroll('left');
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scroll('right');
        } else if (event.key === 'Home') {
            event.preventDefault();
            scrollToIndex(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            scrollToIndex(sliders.length - 1);
        }
    };

    return (
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-gray-100/80 bg-white/95 py-5 md:py-7 shadow-[0_20px_48px_-34px_rgba(15,23,42,0.45)] group" role="region" aria-roledescription="carousel" aria-label={labels.region}>
            <p id={instructionsId} className="sr-only">{labels.instructions}</p>
            <div id={statusId} role="status" aria-live="polite" className="sr-only">
                {labels.status(activeIndex + 1, sliders.length)}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent md:w-28" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent md:w-28" aria-hidden="true" />

            <div className="hidden md:block">
                <button
                    type="button"
                    onClick={() => scroll('left')}
                    disabled={!canLoop}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label={labels.previous}
                    aria-controls={trackId}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => scroll('right')}
                    disabled={!canLoop}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label={labels.next}
                    aria-controls={trackId}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <div
                id={trackId}
                ref={scrollContainerRef}
                onScroll={scheduleScrollStateUpdate}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-describedby={`${instructionsId} ${statusId}`}
                aria-label={labels.region}
                className="relative z-0 flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory px-[calc(50%-132px)] sm:px-[calc(50%-140px)] md:px-[calc(50%-160px)] pb-5 pt-1 scrollbar-hide snap-always focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {loopedSliders.map((src, index) => {
                    const originalIndex = getLoopedIndex(index, sliders.length);
                    const initialVirtualIndex = getCenterVirtualIndex(INITIAL_SLIDE_INDEX, sliders.length);
                    const isCenterCopy = index >= sliders.length && index < sliders.length * 2;
                    const isInitiallyVisible = Math.abs(index - initialVirtualIndex) <= 1;
                    const isPrioritySlide = index === initialVirtualIndex;
                    const isActive = originalIndex === activeIndex;
                    return (
                    <div
                        key={`${src}-${index}`}
                        role={isCenterCopy ? 'group' : undefined}
                        aria-hidden={isCenterCopy ? undefined : 'true'}
                        aria-roledescription={isCenterCopy ? 'slide' : undefined}
                        aria-label={isCenterCopy ? labels.slide(originalIndex + 1, sliders.length) : undefined}
                        aria-current={isCenterCopy && isActive ? 'true' : undefined}
                        className={`relative w-[264px] sm:w-[280px] md:w-[320px] h-[540px] sm:h-[560px] md:h-[640px] shrink-0 transform transition-all duration-300 flex items-center justify-center snap-center snap-always ${isActive ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-75 hover:opacity-100 hover:scale-[0.99]'}`}
                    >
                        <img
                            src={src}
                            alt={isCenterCopy ? labels.slide(originalIndex + 1, sliders.length) : ''}
                            className={`w-full h-full object-contain transition-[filter] duration-300 ${isActive ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}
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

            <div className="relative z-20 mt-1 flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:justify-between md:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => scroll('left')}
                        disabled={!canLoop}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                        aria-label={labels.previous}
                        aria-controls={trackId}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <span className="min-w-14 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-bold text-gray-700" aria-hidden="true">
                        {activeIndex + 1}/{sliders.length}
                    </span>

                    <button
                        type="button"
                        onClick={() => scroll('right')}
                        disabled={!canLoop}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                        aria-label={labels.next}
                        aria-controls={trackId}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <nav className="flex max-w-full flex-wrap items-center justify-center gap-2" aria-label={labels.pagination}>
                    {sliders.map((src, index) => (
                        <button
                            key={`dot-${src}`}
                            type="button"
                            onClick={() => scrollToIndex(index)}
                            className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${index === activeIndex ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={labels.goTo(index + 1, sliders.length)}
                            aria-current={index === activeIndex ? 'true' : undefined}
                            aria-controls={trackId}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}
