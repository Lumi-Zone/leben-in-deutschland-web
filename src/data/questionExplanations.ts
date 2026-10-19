import { BAMF_QUESTION_CATALOG } from './seoLandingContent';
import de from './questionContent/de.json';
import en from './questionContent/en.json';
import tr from './questionContent/tr.json';
import ar from './questionContent/ar.json';
import fa from './questionContent/fa.json';

// Per-question explanations live in questionContent/<lang>.json, keyed by question id.
// Each entry has the short explanation (summary, whyCorrect) shown here and the
// longer sections read by questionDeepDives.ts.
type FullExplanationLanguage = 'de' | 'en' | 'tr';
export type ExplanationLanguage = FullExplanationLanguage | 'ar' | 'fa';
export interface LegalBasis { label: string; url: string }
export interface QuestionContent {
  summary: string;
  whyCorrect: string;
  background: string;
  otherOptions: string;
  memoryTip: string;
  legalBasis: LegalBasis[];
}
interface ExplanationText { summary: string; whyCorrect: string }
export interface QuestionExplanation extends ExplanationText {
  language: ExplanationLanguage;
  sourceName: string;
  sourceUrl: string;
  reviewedAt: string;
  isFallback: boolean;
}

export const questionContent: Record<FullExplanationLanguage, Record<string, QuestionContent | undefined>> = { de, en, tr };

// A short-explanation pilot; longer sections remain available in DE/EN/TR.
const localizedExplanations: Record<'ar' | 'fa', Record<string, ExplanationText | undefined>> = { ar, fa };

const sourceName: Record<ExplanationLanguage, string> = {
  de: 'Offizieller BAMF-Fragenkatalog',
  en: 'Official BAMF question catalogue',
  tr: 'Resmî BAMF soru kataloğu',
  ar: 'كتالوج أسئلة BAMF الرسمي',
  fa: 'فهرست رسمی پرسش‌های BAMF',
};

export const explanationLabels: Record<ExplanationLanguage, { title: string; why: string; source: string; reviewed: string; fallback: string }> = {
  de: { title: 'Kurz erklärt', why: 'Warum ist das richtig?', source: 'Quelle', reviewed: 'Geprüft', fallback: '' },
  en: { title: 'Quick explanation', why: 'Why is this correct?', source: 'Source', reviewed: 'Reviewed', fallback: '' },
  tr: { title: 'Kısa açıklama', why: 'Bu cevap neden doğru?', source: 'Kaynak', reviewed: 'Kontrol tarihi', fallback: '' },
  ar: { title: 'شرح مختصر', why: 'لماذا هذه الإجابة صحيحة؟', source: 'المصدر', reviewed: 'تاريخ المراجعة', fallback: '' },
  fa: { title: 'توضیح کوتاه', why: 'چرا این پاسخ درست است؟', source: 'منبع', reviewed: 'تاریخ بررسی', fallback: '' },
};

export function getQuestionExplanation(id: number, lang: string): QuestionExplanation | undefined {
  if (lang === 'ar' || lang === 'fa') {
    const content = localizedExplanations[lang][id];
    if (!content) return undefined;
    return {
      ...content,
      language: lang,
      sourceName: sourceName[lang],
      sourceUrl: BAMF_QUESTION_CATALOG,
      reviewedAt: '2026-10-16',
      isFallback: false,
    };
  }
  const selectedLang: FullExplanationLanguage = lang === 'en' || lang === 'tr' ? lang : 'de';
  const content = questionContent[selectedLang][id];
  if (!content) return undefined;
  return {
    summary: content.summary,
    whyCorrect: content.whyCorrect,
    language: selectedLang,
    sourceName: sourceName[selectedLang],
    sourceUrl: BAMF_QUESTION_CATALOG,
    reviewedAt: '2026-10-08',
    isFallback: !['de', 'en', 'tr'].includes(lang),
  };
}
