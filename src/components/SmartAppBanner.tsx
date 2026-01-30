import React, { useState, useEffect } from 'react';

export default function SmartAppBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        // Check if banner was closed previously
        const isClosed = localStorage.getItem('smart-banner-closed');
        if (isClosed) return;

        // Detect User Agent
        const ua = navigator.userAgent.toLowerCase();
        const isAndroidDevice = ua.includes('android');
        const isIOS = /iphone|ipad|ipod/.test(ua);

        // On iOS, Safari handles it via meta tag. 
        // We only show this custom banner on Android or other mobile devices (that are not iOS Safari).
        // OR if we want to force it even on iOS Chrome/Firefox.
        // For now, let's target Android primarily.
        if (isAndroidDevice) {
            setIsAndroid(true);
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('smart-banner-closed', 'true');
    };

    const handleOpen = () => {
        if (isAndroid) {
            // Try to open app via potential scheme (optional, if they have one)
            // window.location.href = 'einbuergerungapp://open'; 

            // Fallback to Play Store
            window.location.href = 'https://play.google.com/store/apps/details?id=com.einbuergerungapp';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-white shadow-md p-3 flex items-center gap-3 border-b border-gray-200 animate-slideDown">
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <div className="w-12 h-12 rounded-xl bg-purple-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                <img src="/favicon.svg" alt="App Icon" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate">Leben in Deutschland 2026</h3>
                <p className="text-xs text-gray-500 truncate">Lumi-Zone</p>
                <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
            </div>

            <button
                onClick={handleOpen}
                className="bg-purple-600 text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-purple-700 transition"
            >
                ÖFFNEN
            </button>

            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
