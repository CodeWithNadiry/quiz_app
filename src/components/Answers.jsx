/* eslint-disable react-hooks/purity */
import { useRef } from "react";

const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {
  const shuffledAnswers = useRef(null);

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random () - 0.5);
  }
  return (
    <div id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }
        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClasses = answerState
        }

        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button>
          </li>
        )
      }) }
      
    </div>
  );
};

export default Answers;