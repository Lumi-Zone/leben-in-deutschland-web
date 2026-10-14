import { questionContent, type LegalBasis } from './questionExplanations';

// Longer sections under the short explanation: background, why the other options
// are wrong, a memory tip and the legal basis. The text lives in
// questionContent/<lang>.json next to the short explanation.
export type { LegalBasis };
export interface QuestionDeepDive {
  background: string;
  otherOptions: string;
  memoryTip: string;
  legalBasis: LegalBasis[];
}

type DeepDiveLanguage = 'de' | 'en' | 'tr';

export const deepDiveLabels: Record<DeepDiveLanguage, { background: string; otherOptions: string; memoryTip: string; legalBasis: string }> = {
  de: { background: 'Hintergrund', otherOptions: 'Warum sind die anderen Antworten falsch?', memoryTip: 'Merkhilfe', legalBasis: 'Gesetzliche Grundlage' },
  en: { background: 'Background', otherOptions: 'Why are the other answers wrong?', memoryTip: 'Memory tip', legalBasis: 'Legal basis' },
  tr: { background: 'Arka plan', otherOptions: 'Diğer cevaplar neden yanlış?', memoryTip: 'Akılda tutma ipucu', legalBasis: 'Yasal dayanak' },
};

export function getQuestionDeepDive(id: number, lang: string): QuestionDeepDive | undefined {
  if (lang !== 'de' && lang !== 'en' && lang !== 'tr') return undefined;
  const content = questionContent[lang][id];
  if (!content) return undefined;
  const { background, otherOptions, memoryTip, legalBasis } = content;
  return { background, otherOptions, memoryTip, legalBasis };
}
