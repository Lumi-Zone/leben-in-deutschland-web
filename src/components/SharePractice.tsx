import { useId, useState } from 'react';
import { shareCopy } from '../i18n/share';
import type { SupportedLang } from '../types/language';
import { trackEvent } from '../utils/analytics';
import { buildPracticeShareUrl, sharePracticeLink, type PracticeShareKind } from '../utils/practiceShare';

interface Props {
    lang: string;
    canonicalUrl: string;
    kind: PracticeShareKind;
    questionId?: number;
}

export default function SharePractice({ lang, canonicalUrl, kind, questionId }: Props) {
    const copy = shareCopy[lang as SupportedLang] ?? shareCopy.de;
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
    const linkId = useId();
    const url = buildPracticeShareUrl(canonicalUrl, kind);
    const label = kind === 'question' ? copy.question : copy.exam;

    async function handleShare() {
        if (busy) return;
        setBusy(true);
        setStatus('idle');
        const payload = { lang, kind, question_id: questionId };
        trackEvent('practice-share-click', payload);
        try {
            const result = await sharePracticeLink(navigator, label, url);
            trackEvent('practice-share-result', { ...payload, method: result });
            if (result === 'copied' || result === 'manual') setStatus(result);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="min-w-0 max-w-full" data-practice-share={kind}>
            <button type="button" onClick={handleShare} disabled={busy}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4" />
                    <circle cx="6" cy="12" r="3" /><circle cx="18" cy="5" r="3" /><circle cx="18" cy="19" r="3" />
                </svg>
                {label}
            </button>
            <div role="status" aria-live="polite" className="text-sm text-emerald-800">
                {status === 'copied' && <p className="mt-2">{copy.copied}</p>}
                {status === 'manual' && (
                    <div className="mt-2 max-w-sm">
                        <p className="mb-2">{copy.manual}</p>
                        <label htmlFor={linkId} className="sr-only">{copy.link}</label>
                        <input id={linkId} type="text" readOnly value={url} dir="ltr" onFocus={(event) => event.currentTarget.select()}
                            className="w-full min-w-0 rounded-lg border border-emerald-200 bg-white p-2 text-gray-900" />
                    </div>
                )}
            </div>
        </div>
    );
}
