export const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

/**
 * Strips the BASE_URL from a given path to get the app-relative path.
 * e.g. /my-app/de/support -> /de/support
 */
export function getAppRelativePath(pathname: string): string {
    const base = BASE_URL;
    // If base is just "/", return path as is
    if (base === '/') return pathname;

    // If path starts with base, strip it
    if (pathname.startsWith(base)) {
        return '/' + pathname.slice(base.length);
    }
    // Handle case without trailing slash in pathname if needed (unlikely if base ends with slash)
    const baseNoSlash = base.slice(0, -1);
    if (pathname === baseNoSlash) return '/';

    if (pathname.startsWith(baseNoSlash + '/')) { // double check
        return '/' + pathname.slice(baseNoSlash.length + 1);
    }

    return pathname;
}

/**
 * Prepends BASE_URL to a relative path.
 * e.g. /de/support -> /my-app/de/support
 * e.g. logos/logo.png -> /my-app/logos/logo.png
 */
export function getPath(path: string): string {
    const p = path.startsWith('/') ? path.slice(1) : path;
    const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
    return `${base}${p}`;
}

/**
 * Generates the URL for switching language, preserving current route.
 */
export function getLanguageSwitchUrl(currentPath: string, targetLang: string, supportedLanguages: readonly string[]): string {
    const relativePath = getAppRelativePath(currentPath);
    const segments = relativePath.split('/').filter(Boolean);

    // Check if first segment is a language
    if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
        segments[0] = targetLang;
    } else {
        // If no language prefix currently, prepend it (or if it's the root)
        segments.unshift(targetLang);
    }

    return getPath(segments.join('/'));
}
