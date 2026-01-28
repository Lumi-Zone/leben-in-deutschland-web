import React from 'react';

const MOCKUPS = [
    '/mockups/m1.png',
    '/mockups/m2.png',
    '/mockups/m3.png',
    '/mockups/m4.png',
    '/mockups/m5.png',
    '/mockups/m6.png',
    '/mockups/m7.png',
    '/mockups/m8.png',
    '/mockups/m9.png',
    '/mockups/m10.png',
];

export default function PhoneSlider() {
    // Duplicate the array to create a seamless loop
    const sliders = [...MOCKUPS, ...MOCKUPS];

    return (
        <div className="relative w-full overflow-hidden py-10 pause-on-hover">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <div className="flex gap-8 animate-marquee w-max">
                {sliders.map((src, index) => (
                    <div
                        key={index}
                        className="relative w-[320px] h-[640px] shrink-0 transform transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center"
                    >
                        <img
                            src={src}
                            alt={`App Screenshot ${index + 1}`}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
