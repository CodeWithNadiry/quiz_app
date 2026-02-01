import { useQuizContext } from "../store/quiz-context";
import Question from "./Question";
import Summary from "./Summary";
const Quiz = () => {
  const { userAnswers, activeQuestionIndex, quizIsComplete } = useQuizContext();

  return (
    <div id="quiz">
      {quizIsComplete ? <Summary userAnswers={userAnswers} /> : <Question key={activeQuestionIndex} />}
    </div>
  );
};

export default Quiz;
