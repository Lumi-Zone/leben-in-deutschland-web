import { useState } from 'react';
import type { QuestionSessionItem } from '../utils/questions';
import { getPath } from '../utils/navigation';
import { markQuestionSolved } from '../utils/learningProgress';
import { recordQuestionAttempt } from '../utils/questionStats';
import { recordHabitAttempt } from '../utils/learningHabits';
import { trackEvent } from '../utils/analytics';

interface Props {
  question: QuestionSessionItem;
  lang: string;
  labels: { title: string; correct: string; wrong: string; answer: string; next: string };
}

export default function HomePractice({ question, lang, labels }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  function answer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    markQuestionSolved(question.id);
    recordQuestionAttempt(question.id, index === question.correctIndex);
    recordHabitAttempt();
    trackEvent('question-answered', { lang, question_id: question.id, selected_index: index, correct: index === question.correctIndex, location: 'home-hero' });
  }
  return (
    <div className="home-practice">
      <div className="practice-topline"><span><i aria-hidden="true" />{labels.title}</span><span>01 / 300</span></div>
      <div className="practice-track" aria-hidden="true"><span /></div>
      <p className="practice-topic">Leben in Deutschland</p>
      <h2>{question.questionLocalized}</h2>
      <div className="practice-options" role="group" aria-label={question.questionLocalized}>
        {question.optionsLocalized.map((option, index) => {
          const correct = selected !== null && index === question.correctIndex;
          const wrong = selected === index && !correct;
          return <button key={index} type="button" onClick={() => answer(index)} disabled={selected !== null} className={`practice-option ${correct ? 'is-correct' : ''} ${wrong ? 'is-wrong' : ''}`}>
            <span className="option-letter" aria-hidden="true">{correct ? '✓' : wrong ? '×' : String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </button>;
        })}
      </div>
      <div className="practice-feedback" aria-live="polite" aria-atomic="true">
        {selected !== null && <p>{selected === question.correctIndex ? labels.correct : `${labels.wrong} ${labels.answer} ${question.optionsLocalized[question.correctIndex]}`}</p>}
      </div>
      <a className="practice-next" href={getPath(`${lang}/frage/${selected === null ? question.id : question.id + 1}`)}>{labels.next}<span aria-hidden="true">↗</span></a>
    </div>
  );
}
