import type questionsData from '../data/questions.json';
import type { SupportedLang } from '../types/language';

export type QuestionRecord = (typeof questionsData)[number];

type DynamicQuestionRecord = QuestionRecord & Record<string, unknown>;

const OPTION_NUMBERS = [1, 2, 3, 4] as const;

export interface QuestionTranslationContent {
    question: string;
    options: string[];
}

export type QuestionTranslations = {
    de: QuestionTranslationContent;
} & Partial<Record<SupportedLang, QuestionTranslationContent>>;

export interface QuestionSessionItem {
    id: number;
    questionDe: string;
    questionLocalized: string;
    optionsDe: string[];
    optionsLocalized: string[];
    correctIndex: number;
}

function readText(question: DynamicQuestionRecord, key: string): string {
    const value = question[key];
    return typeof value === 'string' ? value : '';
}

function readOption(question: DynamicQuestionRecord, optionNumber: (typeof OPTION_NUMBERS)[number], lang: SupportedLang): string {
    const localized = readText(question, `a${optionNumber}_${lang}`);
    if (localized) return localized;
    return readText(question, `a${optionNumber}_de`);
}

function readGermanOptions(question: DynamicQuestionRecord): string[] {
    return OPTION_NUMBERS.map((optionNumber) => readText(question, `a${optionNumber}_de`));
}

export function parseCorrectIndex(solution: string): number {
    const normalized = solution.trim().toLowerCase();
    const first = normalized.charAt(0);
    const computed = first ? first.charCodeAt(0) - 97 : -1;
    if (computed >= 0 && computed < OPTION_NUMBERS.length) return computed;
    return 0;
}

export function getLocalizedQuestionText(question: QuestionRecord, lang: SupportedLang): string {
    const dynamicQuestion = question as DynamicQuestionRecord;
    const localized = readText(dynamicQuestion, `q_${lang}`);
    return localized || question.q_de || '';
}

export function buildQuestionTranslations(
    question: QuestionRecord,
    lang: SupportedLang
): QuestionTranslations {
    const dynamicQuestion = question as DynamicQuestionRecord;

    const german: QuestionTranslationContent = {
        question: question.q_de || '',
        options: readGermanOptions(dynamicQuestion),
    };

    const localized: QuestionTranslationContent = {
        question: getLocalizedQuestionText(question, lang),
        options: OPTION_NUMBERS.map((optionNumber) => readOption(dynamicQuestion, optionNumber, lang)),
    };

    const translations: QuestionTranslations = {
        de: german,
    };

    if (lang !== 'de') {
        translations[lang] = localized;
    }

    return translations;
}

export function buildQuestionSessionItem(
    question: QuestionRecord,
    lang: SupportedLang
): QuestionSessionItem {
    const dynamicQuestion = question as DynamicQuestionRecord;

    return {
        id: question.id,
        questionDe: question.q_de || '',
        questionLocalized: getLocalizedQuestionText(question, lang),
        optionsDe: readGermanOptions(dynamicQuestion),
        optionsLocalized: OPTION_NUMBERS.map((optionNumber) =>
            readOption(dynamicQuestion, optionNumber, lang)
        ),
        correctIndex: parseCorrectIndex(question.solution || ''),
    };
}

export function buildQuestionSessionPool(
    questions: QuestionRecord[],
    lang: SupportedLang
): QuestionSessionItem[] {
    return questions.map((question) => buildQuestionSessionItem(question, lang));
}
