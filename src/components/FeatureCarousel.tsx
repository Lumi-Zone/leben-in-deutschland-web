import React from 'react';
import { getPath } from '../utils/navigation';
import { ui } from '../i18n/ui';

interface FeatureCarouselProps {
    lang?: string;
}

export default function FeatureCarousel({ lang = 'de' }: FeatureCarouselProps) {
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

    // Duplicate enough times to ensure smooth scrolling and "2 at once" look.
    // If we want 2 items visible, and seamless loop, 2 sets (6 items) is the minimum for the 50% marquee.
    // However, to ensure no whitespace on wide screens (if 6 items < screen width), we might want more.
    // 3 cards * 400px = 1200px. Standard screen is 1920. 6 cards = 2400px. Should be enough.
    // Let's use 4 sets (12 items) to be safe and use 'marquee-4' (25%) or 'marquee-2' (50%).
    // Standard 'animate-marquee' moves 50%. So we need 2 sets of content.
    // If we have 2 sets: [A, B, C] [A, B, C]. 
    // Animation moves from 0 to -50% (start of second A).
    // This works perfectly if the total width is sufficient.
    const features = [...baseFeatures, ...baseFeatures, ...baseFeatures, ...baseFeatures]; // 4 sets just to be safe and full

    return (
        <div className="w-full overflow-hidden py-10 bg-white group">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee Track
                We use animate-marquee-4 if we have 4 sets and want to scroll 1 set length?
                Actually, standard animate-marquee moves 50%.
                If we have 4 sets: [1,2,3,4]. Moving 50% moves past [1,2]. 
                This is a valid loop if [1,2] identical to [3,4].
                So 4 sets is really 2 "meta-sets" of 2 sets.
                Yes, it works.
            */}
            <div className="flex gap-8 animate-marquee w-max hover:[animation-play-state:paused] will-change-transform">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="w-[85vw] md:w-[600px] lg:w-[650px] shrink-0 bg-[#FFFBF4] rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center transition-transform hover:scale-[1.01]"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                            {t(feature.titleKey)}
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-md">
                            {t(feature.descKey)}
                        </p>

                        <div className="relative w-[280px] md:w-[320px] aspect-[1/2]">
                            <img
                                src={feature.image}
                                alt={t(feature.titleKey)}
                                className="w-full h-full object-contain drop-shadow-2xl"
                                loading="eager"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
