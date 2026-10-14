import { BAMF_QUESTION_CATALOG } from './seoLandingContent';
import de from './questionContent/de.json';
import en from './questionContent/en.json';
import tr from './questionContent/tr.json';

// Per-question explanations live in questionContent/<lang>.json, keyed by question id.
// Each entry has the short explanation (summary, whyCorrect) shown here and the
// longer sections read by questionDeepDives.ts.
export type ExplanationLanguage = 'de' | 'en' | 'tr';
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
  sourceName: string;
  sourceUrl: string;
  reviewedAt: string;
  isFallback: boolean;
}

export const questionContent: Record<ExplanationLanguage, Record<string, QuestionContent | undefined>> = { de, en, tr };

const sourceName: Record<ExplanationLanguage, string> = {
  de: 'Offizieller BAMF-Fragenkatalog',
  en: 'Official BAMF question catalogue',
  tr: 'Resmî BAMF soru kataloğu',
};

export const explanationLabels: Record<ExplanationLanguage, { title: string; why: string; source: string; reviewed: string; fallback: string }> = {
  de: { title: 'Kurz erklärt', why: 'Warum ist das richtig?', source: 'Quelle', reviewed: 'Geprüft', fallback: '' },
  en: { title: 'Quick explanation', why: 'Why is this correct?', source: 'Source', reviewed: 'Reviewed', fallback: '' },
  tr: { title: 'Kısa açıklama', why: 'Bu cevap neden doğru?', source: 'Kaynak', reviewed: 'Kontrol tarihi', fallback: '' },
};

export function getQuestionExplanation(id: number, lang: string): QuestionExplanation | undefined {
  const selectedLang: ExplanationLanguage = lang === 'en' || lang === 'tr' ? lang : 'de';
  const content = questionContent[selectedLang][id];
  if (!content) return undefined;
  return {
    summary: content.summary,
    whyCorrect: content.whyCorrect,
    sourceName: sourceName[selectedLang],
    sourceUrl: BAMF_QUESTION_CATALOG,
    reviewedAt: '2026-10-08',
    isFallback: !['de', 'en', 'tr'].includes(lang),
  };
}
