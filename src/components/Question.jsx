import { useState } from "react";
import { useQuizContext } from "../store/quiz-context";
import QuestionTimer from "./QuestionTimer";
import { QUESTIONS } from "../Questions";
import Answers from "./Answers";

const Question = () => {
  const {activeQuestionIndex, selectAnswer, skipAnswer} = useQuizContext();
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  })

  let timer = 10000;
  if (answer.selectedAnswer) timer = 500;
  if (answer.isCorrect !== null) timer = 1000;

  function handleSelectAnswer(selectedAnswer) {
    setAnswer(prevAnswer => ({
      ...prevAnswer,
      selectedAnswer
    }))

    setTimeout(() => {
      const isCorrect = QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer;
      setAnswer({selectedAnswer, isCorrect})

      setTimeout(() => {
        selectAnswer(selectedAnswer)
      }, 2000);
    }, 1000);
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct': 'wrong';
  }else if (answer.selectedAnswer) {
    answerState = 'answered'
  }
  return (
     <div id="questions">
      <QuestionTimer key={timer} timeout={timer} onTimeout={!answer.selectedAnswer ? skipAnswer: null} mode={answerState} />

      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

      <Answers answers={QUESTIONS[activeQuestionIndex].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
    </div>
  );
};

export default Question;