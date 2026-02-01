import { useState } from "react";
import Quiz from "./components/Quiz";
import { useQuizContext } from "./store/quiz-context";

const App = () => {
  const { resetQuiz } = useQuizContext();
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    resetQuiz();
    setQuizStarted(true);
  };

  const handleResetQuiz = () => {
    resetQuiz();
    setQuizStarted(false);
  };

  return (
    <div>
      <header>
        <img src="quiz-logo.png" alt="Quiz Logo" />
        <h1>ReactQuiz</h1>
      </header>

      <div className="quiz-buttons">
        {!quizStarted && (
          <button className="start-btn" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        )}
        <button className="reset-btn" onClick={handleResetQuiz}>
          Reset Quiz
        </button>
      </div>

      <main>
        {quizStarted && <Quiz />}
        {!quizStarted && (
          <p className="start-text">Click "Start Quiz" to begin!</p>
        )}
      </main>
    </div>
  );
};

export default App;
