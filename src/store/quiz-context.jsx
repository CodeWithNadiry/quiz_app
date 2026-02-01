import { createContext, useContext, useReducer } from "react";
import { QUESTIONS } from "../Questions";

const QuizContext = createContext({
  userAnswers: [],
  activeQuestionIndex: 0,
  quizIsComplete: false,
  selectAnswer: () => {},
  skipAnswer: () => {},
  resetQuiz: () => {},
});

function quizReducer(state, action) {
  switch (action.type) {
    case "select_answer":
      return [...state, action.payload];
    case "skip_answer":
      return [...state, null];
    case "reset_quiz":
      return [];
    default:
      return state;
  }
}

const QuizContextProvider = ({ children }) => {
  const [userAnswers, dispatchQuizAction] = useReducer(quizReducer, []);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const selectAnswer = (answer) => {
    dispatchQuizAction({ type: "select_answer", payload: answer });
  };

  const skipAnswer = () => {
    dispatchQuizAction({ type: "skip_answer" });
  };

  const resetQuiz = () => {
    dispatchQuizAction({ type: "reset_quiz" });
  };

  const ctxValue = {
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    selectAnswer,
    skipAnswer,
    resetQuiz,
  };

  return (
    <QuizContext.Provider value={ctxValue}>
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(QuizContext);
export default QuizContextProvider;