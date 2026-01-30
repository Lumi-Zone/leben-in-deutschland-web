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
    // Triple the array to ensure smooth looping even on wide screens
    const sliders = [...MOCKUPS, ...MOCKUPS, ...MOCKUPS];

    return (
        <div className="relative w-full overflow-hidden py-10 bg-white">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <div className="flex gap-8 animate-marquee-3 w-max will-change-transform">
                {sliders.map((src, index) => (
                    <div
                        key={index}
                        className="relative w-[320px] h-[640px] shrink-0 transform transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center"
                    >
                        <img
                            src={src}
                            alt={`App Screenshot ${index + 1}`}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading="eager"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
