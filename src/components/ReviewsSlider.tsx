import React from 'react';
import { getReviews } from '../data/reviews';

interface ReviewsSliderProps {
    lang?: string;
}

export default function ReviewsSlider({ lang = 'de' }: ReviewsSliderProps) {
    const reviewsData = getReviews(lang);
    // Duplicate reviews for seamless infinite scroll
    const reviews = [...reviewsData, ...reviewsData];

    const titles: Record<string, { badge: string; heading: string }> = {
        de: { badge: "Was Nutzer sagen", heading: "Beliebt bei Lernenden" },
        en: { badge: "What users say", heading: "Loved by Learners" },
        tr: { badge: "Kullanıcılar ne diyor", heading: "Öğrenciler Tarafından Seviliyor" },
        ar: { badge: "ماذا يقول المستخدمون", heading: "محبوب من قبل المتعلمين" }
    };

    // Fallback title
    const t = titles[lang] || titles['en'];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-12 text-center">
                <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-2 rounded-full inline-block mb-6 uppercase tracking-widest">
                    {t.badge}
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{t.heading}</h2>
            </div>

            <div className="relative w-full pause-on-hover">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                {/* Marquee Track */}
                <div className="flex gap-6 animate-marquee w-max">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col shrink-0 hover:shadow-md transition-shadow"
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
