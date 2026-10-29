interface AppLaunchOptions {
    appUrl: string;
    storeUrl: string;
    isMobile: boolean;
    onStoreRedirect: () => void;
}

export interface AppLaunchEnvironment {
    isHidden: () => boolean;
    navigate: (url: string) => void;
    open: (url: string) => void;
    delay: (callback: () => void, milliseconds: number) => () => void;
    onVisibilityChange: (callback: () => void) => () => void;
    onPageHide: (callback: () => void) => () => void;
}

function browserEnvironment(): AppLaunchEnvironment {
    return {
        isHidden: () => document.visibilityState === 'hidden',
        navigate: (url) => { window.location.href = url; },
        open: (url) => { window.open(url, '_blank', 'noopener'); },
        delay: (callback, milliseconds) => {
            const timer = window.setTimeout(callback, milliseconds);
            return () => window.clearTimeout(timer);
        },
        onVisibilityChange: (callback) => {
            document.addEventListener('visibilitychange', callback);
            return () => document.removeEventListener('visibilitychange', callback);
        },
        onPageHide: (callback) => {
            window.addEventListener('pagehide', callback);
            return () => window.removeEventListener('pagehide', callback);
        },
    };
}

/** Track a store exit attempt only when we actually attempt that navigation.
 * A backgrounded page may have opened the installed app; never count it as a
 * store exit or bounce it to the store when the visitor returns.
 */
export function launchAppOrStore(
    options: AppLaunchOptions,
    environment: AppLaunchEnvironment = browserEnvironment(),
): () => void {
    let finished = false;
    const cleanups: Array<() => void> = [];
    const cancel = () => {
        finished = true;
        cleanups.splice(0).forEach((cleanup) => cleanup());
    };
    const reportStoreRedirect = () => {
        // Analytics failure must never prevent navigation.
        try { options.onStoreRedirect(); } catch { /* no-op */ }
    };

    if (!options.isMobile) {
        reportStoreRedirect();
        environment.open(options.storeUrl);
        return cancel;
    }

    const fallback = () => {
        if (finished) return;
        if (environment.isHidden()) { cancel(); return; }
        cancel();
        reportStoreRedirect();
        environment.navigate(options.storeUrl);
    };
    cleanups.push(environment.onVisibilityChange(() => {
        if (environment.isHidden()) cancel();
    }));
    cleanups.push(environment.onPageHide(cancel));
    cleanups.push(environment.delay(fallback, 1200));

    try { environment.navigate(options.appUrl); } catch { fallback(); }
    return cancel;
}
