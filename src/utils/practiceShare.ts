export type PracticeShareKind = 'question' | 'exam';
export type PracticeShareResult = 'native' | 'copied' | 'manual' | 'cancelled';

interface ShareApi {
    share?: (data: { title: string; url: string }) => Promise<void>;
    clipboard?: { writeText: (text: string) => Promise<void> };
}

export function buildPracticeShareUrl(canonicalUrl: string, kind: PracticeShareKind): string {
    const url = new URL(canonicalUrl);
    if (url.protocol !== 'https:') throw new Error('A public HTTPS URL is required for sharing.');
    url.search = '';
    url.hash = '';
    url.searchParams.set('utm_source', 'learner_share');
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', `${kind}_share`);
    return url.href;
}

export async function sharePracticeLink(api: ShareApi, title: string, url: string): Promise<PracticeShareResult> {
    if (typeof api.share === 'function') {
        try {
            await api.share({ title, url });
            return 'native';
        } catch (error) {
            if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
                return 'cancelled';
            }
        }
    }
    if (typeof api.clipboard?.writeText === 'function') {
        try {
            await api.clipboard.writeText(url);
            return 'copied';
        } catch {
            // A selectable link also works when clipboard permissions are unavailable.
        }
    }
    return 'manual';
}
