import { useEffect, useMemo, useState } from 'react';
import { getPath } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

interface Labels {
    title: string;
    subtitle: string;
    learn: string;
    exam: string;
    progress: string;
    continueLearn: string;
    dismiss: string;
}

interface Props {
    lang: string;
    labels: Labels;
}

const DISMISS_KEY = 'lid_onboarding_dismissed_v1';

export default function OnboardingStarter({ lang, labels }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const dismissed = window.localStorage.getItem(DISMISS_KEY) === '1';
            setVisible(!dismissed);
        } catch {
            setVisible(true);
        }
    }, []);

    const routes = useMemo(
        () => ({
            learn: getPath(`${lang}/frage/1`),
            exam: getPath(`${lang}/exam`),
            progress: getPath(`${lang}/progress`),
        }),
        [lang]
    );

    const dismiss = () => {
        try {
            window.localStorage.setItem(DISMISS_KEY, '1');
        } catch {
            // no-op
        }
        trackEvent('onboarding-dismissed', { lang });
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <section className="container mx-auto px-4 pb-10 md:pb-12">
            <div className="premium-panel p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                        <span className="chip mb-2">01 • 02 • 03</span>
                        <h2 className="section-heading">{labels.title}</h2>
                        <p className="section-subtitle">{labels.subtitle}</p>
                    </div>
                    <button
                        type="button"
                        onClick={dismiss}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        aria-label={labels.dismiss}
                    >
                        {labels.dismiss}
                    </button>
                </div>

                <div className="onboarding-grid mb-5">
                    <div className="premium-panel-soft p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">1 / 3</p>
                        <h3 className="text-base font-bold text-slate-900 mb-2">{labels.learn}</h3>
                        <div className="ui-progress-track">
                            <div className="ui-progress-fill" style={{ width: '33%' }} />
                        </div>
                    </div>

                    <div className="premium-panel-soft p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 mb-1">2 / 3</p>
                        <h3 className="text-base font-bold text-slate-900 mb-2">{labels.exam}</h3>
                        <div className="ui-progress-track">
                            <div className="ui-progress-fill" style={{ width: '66%' }} />
                        </div>
                    </div>

                    <div className="premium-panel-soft p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">3 / 3</p>
                        <h3 className="text-base font-bold text-slate-900 mb-2">{labels.progress}</h3>
                        <div className="ui-progress-track">
                            <div className="ui-progress-fill" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <a
                        href={routes.learn}
                        onClick={() => trackEvent('onboarding-cta-click', { lang, destination: 'learn' })}
                        className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        {labels.continueLearn}
                    </a>
                    <a
                        href={routes.exam}
                        onClick={() => trackEvent('onboarding-cta-click', { lang, destination: 'exam' })}
                        className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                    >
                        {labels.exam}
                    </a>
                    <a
                        href={routes.progress}
                        onClick={() => trackEvent('onboarding-cta-click', { lang, destination: 'progress' })}
                        className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                    >
                        {labels.progress}
                    </a>
                </div>
            </div>
        </section>
    );
}
