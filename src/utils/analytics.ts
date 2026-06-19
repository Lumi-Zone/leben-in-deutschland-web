type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, data?: Record<string, string | number | boolean>) => void;
        };
    }
}

export function trackEvent(eventName: string, data: AnalyticsPayload = {}) {
    if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') return;

    const payload = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== null && value !== undefined)
    ) as Record<string, string | number | boolean>;

    try {
        if (Object.keys(payload).length > 0) {
            window.umami.track(eventName, payload);
        } else {
            window.umami.track(eventName);
        }
    } catch {
        // Analytics should never block the learning flow.
    }
}
