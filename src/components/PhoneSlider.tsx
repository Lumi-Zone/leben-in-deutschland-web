import React from 'react';
import { getPath } from '../utils/navigation';

interface PhoneSliderProps {
    lang?: string;
}

const LABELS = {
    de: {
        region: 'App-Screenshots',
        eyebrow: 'Die App im Überblick',
        title: 'So fühlt sich Lernen mit Plan an.',
        subtitle: 'Von der ersten Frage bis zur Prüfung: Entdecken Sie alle wichtigen Funktionen in einer ruhigen, klaren Lernumgebung.',
        highlights: ['300 offizielle Fragen', '13 Sprachen', 'Prüfung & Fortschritt'],
        swipeHint: 'Wischen zum Entdecken',
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
        eyebrow: 'Explore the app',
        title: 'A calmer way to prepare with a plan.',
        subtitle: 'From your first question to exam day, discover every essential feature in one clear learning space.',
        highlights: ['300 official questions', '13 languages', 'Exam & progress'],
        swipeHint: 'Swipe to explore',
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
        eyebrow: 'Uygulamayı keşfedin',
        title: 'Planlı ve sakin bir öğrenme deneyimi.',
        subtitle: 'İlk sorudan sınav gününe kadar ihtiyacınız olan tüm özellikleri sade bir öğrenme ortamında keşfedin.',
        highlights: ['300 resmî soru', '13 dil', 'Sınav ve ilerleme'],
        swipeHint: 'Keşfetmek için kaydırın',
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
        eyebrow: 'اكتشف التطبيق',
        title: 'طريقة أكثر هدوءًا للتعلّم وفق خطة.',
        subtitle: 'من السؤال الأول حتى يوم الاختبار، اكتشف كل الأدوات المهمة في مساحة تعلّم واضحة.',
        highlights: ['300 سؤال رسمي', '13 لغة', 'الاختبار والتقدم'],
        swipeHint: 'اسحب للاستكشاف',
        instructions: 'لقطات شاشة التطبيق. استخدم مفاتيح الأسهم وHome وEnd للتنقل. بعد اللقطة الأخيرة يعود التنقل إلى الأولى.',
        previous: 'لقطة الشاشة السابقة',
        next: 'لقطة الشاشة التالية',
        pagination: 'اختيار لقطة شاشة',
        slide: (index: number, total: number) => `لقطة شاشة التطبيق ${index} من ${total}`,
        goTo: (index: number, total: number) => `عرض لقطة الشاشة ${index} من ${total}`,
        status: (index: number, total: number) => `لقطة الشاشة ${index} من ${total}`,
    },
};

const SCREENSHOT_NAMES = [
    '01-hero',
    '02-sprachen',
    '03-bundeslaender',
    '04-modi',
    '05-lernen',
    '06-anleitung',
    '07-themen',
    '08-fortschritt',
    '09-statistik',
    '10-dunkelmodus',
];

const INITIAL_SLIDE_INDEX = 0;
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
    const activeVirtualIndexRef = React.useRef(getCenterVirtualIndex(INITIAL_SLIDE_INDEX, SCREENSHOT_NAMES.length));
    const [activeIndex, setActiveIndex] = React.useState(INITIAL_SLIDE_INDEX);
    const trackId = 'phone-slider-track';
    const instructionsId = 'phone-slider-instructions';
    const statusId = 'phone-slider-status';
    const screenshotLocale = lang === 'en' ? 'en' : lang === 'tr' ? 'tr' : 'de';
    const sliders = React.useMemo(
        () => SCREENSHOT_NAMES.map((name) => getPath(`app-screenshots/${screenshotLocale}/${name}`)),
        [screenshotLocale],
    );
    const loopedSliders = React.useMemo(() => Array.from({ length: LOOP_COPY_COUNT }, () => sliders).flat(), [sliders]);
    const canLoop = sliders.length > 1;
    const labels = LABELS[lang as keyof typeof LABELS] || LABELS.en;

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
        <section className="group relative isolate w-full overflow-hidden rounded-[2rem] border border-[#ded5c7] bg-[#f8f4ee] py-6 shadow-[0_30px_80px_-48px_rgba(53,40,30,0.5)] md:rounded-[2.75rem] md:py-9" role="region" aria-roledescription="carousel" aria-label={labels.region}>
            <p id={instructionsId} className="sr-only">{labels.instructions}</p>
            <div id={statusId} role="status" aria-live="polite" className="sr-only">
                {labels.status(activeIndex + 1, sliders.length)}
            </div>

            <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#efdca3]/65 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 top-20 -z-10 h-80 w-80 rounded-full bg-[#e9d6e5]/70 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-64 w-96 rounded-full bg-[#dce7dc]/75 blur-3xl" aria-hidden="true" />

            <header className="relative z-20 mx-auto mb-6 grid max-w-6xl gap-6 px-5 text-left sm:px-8 md:mb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12">
                <div className="max-w-2xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d9cbb8] bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#705c45] shadow-sm backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c59136]" aria-hidden="true" />
                        {labels.eyebrow}
                    </div>
                    <h2 className="font-serif text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-[#241f1a] sm:text-4xl md:text-5xl">
                        {labels.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6d6258] sm:text-base">
                        {labels.subtitle}
                    </p>
                </div>

                <ul className="grid gap-2 text-sm font-semibold text-[#4a4037] sm:grid-cols-3 lg:grid-cols-1" aria-label={labels.eyebrow}>
                    {labels.highlights.map((highlight: string, index: number) => (
                        <li key={highlight} className="flex items-center gap-2 rounded-full border border-[#ded4c7] bg-white/65 px-3 py-2 shadow-sm backdrop-blur">
                            <span className={`h-2 w-2 shrink-0 rounded-full ${index === 0 ? 'bg-[#cf796e]' : index === 1 ? 'bg-[#8aa4b2]' : 'bg-[#87996f]'}`} aria-hidden="true" />
                            {highlight}
                        </li>
                    ))}
                </ul>
            </header>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f8f4ee] via-[#f8f4ee]/75 to-transparent sm:w-16 md:w-28" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f8f4ee] via-[#f8f4ee]/75 to-transparent sm:w-16 md:w-28" aria-hidden="true" />

            <div className="hidden md:block">
                <button
                    type="button"
                    onClick={() => scroll('left')}
                    disabled={!canLoop}
                    className="absolute left-5 top-[62%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8ccbc] bg-[#fffdf9]/95 text-[#332a22] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f5a45] disabled:cursor-not-allowed disabled:opacity-40 lg:left-9"
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
                    className="absolute right-5 top-[62%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8ccbc] bg-[#fffdf9]/95 text-[#332a22] shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f5a45] disabled:cursor-not-allowed disabled:opacity-40 lg:right-9"
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
                className="relative z-0 flex gap-4 overflow-x-auto snap-x snap-mandatory px-[calc(50%-123px)] pb-6 pt-2 scrollbar-hide snap-always focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#6f5a45] sm:gap-6 sm:px-[calc(50%-138px)] md:gap-8 md:px-[calc(50%-155px)]"
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
                            className={`relative aspect-[1290/2796] w-[246px] shrink-0 transform snap-center snap-always overflow-hidden rounded-[1.7rem] border border-white/70 bg-white shadow-[0_24px_50px_-24px_rgba(52,40,29,0.6)] transition-all duration-500 sm:w-[276px] md:w-[310px] ${isActive ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-60 hover:scale-[0.97] hover:opacity-90'}`}
                        >
                            <picture className="block h-full w-full">
                                <source
                                    type="image/avif"
                                    srcSet={`${src}-323.avif 323w, ${src}-645.avif 645w`}
                                    sizes="(min-width: 768px) 310px, (min-width: 640px) 276px, 246px"
                                />
                                <source
                                    type="image/webp"
                                    srcSet={`${src}-323.webp 323w, ${src}-645.webp 645w`}
                                    sizes="(min-width: 768px) 310px, (min-width: 640px) 276px, 246px"
                                />
                                <img
                                    src={`${src}.png`}
                                    alt={isCenterCopy ? labels.slide(originalIndex + 1, sliders.length) : ''}
                                    className="h-full w-full object-cover"
                                    loading={isInitiallyVisible ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchPriority={isPrioritySlide ? 'high' : 'auto'}
                                    width="645"
                                    height="1398"
                                />
                            </picture>
                        </div>
                    );
                })}
            </div>

            <div className="relative z-20 flex flex-col items-center justify-center gap-4 px-5 md:flex-row md:justify-between md:px-10 lg:px-12">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => scroll('left')}
                        disabled={!canLoop}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8ccbc] bg-[#fffdf9] text-[#332a22] shadow-sm transition-all hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f5a45] disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                        aria-label={labels.previous}
                        aria-controls={trackId}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <span className="min-w-14 rounded-full border border-[#d8ccbc] bg-white/70 px-3 py-1.5 text-center text-xs font-bold text-[#5c4c3d]" aria-hidden="true">
                        {activeIndex + 1}/{sliders.length}
                    </span>

                    <button
                        type="button"
                        onClick={() => scroll('right')}
                        disabled={!canLoop}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8ccbc] bg-[#fffdf9] text-[#332a22] shadow-sm transition-all hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f5a45] disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                        aria-label={labels.next}
                        aria-controls={trackId}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col items-center gap-2 md:items-end">
                    <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b7b6b] md:block">{labels.swipeHint}</span>
                    <nav className="flex max-w-full flex-wrap items-center justify-center gap-2" aria-label={labels.pagination}>
                        {sliders.map((src, index) => (
                            <button
                                key={`dot-${src}`}
                                type="button"
                                onClick={() => scrollToIndex(index)}
                                className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f5a45] ${index === activeIndex ? 'w-8 bg-[#3f352c]' : 'w-2 bg-[#cfc3b4] hover:bg-[#a99885]'}`}
                                aria-label={labels.goTo(index + 1, sliders.length)}
                                aria-current={index === activeIndex ? 'true' : undefined}
                                aria-controls={trackId}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}
