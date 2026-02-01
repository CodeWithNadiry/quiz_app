import { QUESTIONS } from "../Questions";

const Summary = ({ userAnswers }) => {
  const total = userAnswers.length || QUESTIONS.length; // safe total

  const skippedAnswers = userAnswers.filter(answer => answer === null);

  const correctAnswers = userAnswers.filter((answer, index) => {
    const question = QUESTIONS[index];
    if (!question) return false; // safety check
    return answer === question.answers[0];
  });

  const skippedShare = Math.round((skippedAnswers.length / total) * 100);
  const correctShare = Math.round((correctAnswers.length / total) * 100);
  const wrongShare = Math.max(0, 100 - skippedShare - correctShare); // never negative or NaN

  return (
    <div id="summary">
      <h2>Quiz Summary</h2>
      <div id="summary-stats">
        <p><span className="number">{skippedShare}%</span> Skipped</p>
        <p><span className="number">{correctShare}%</span> Correct</p>
        <p><span className="number">{wrongShare}%</span> Incorrect</p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          const question = QUESTIONS[index];
          if (!question) return null; // safety

          let answerClass = "user-answer";
          if (answer === null) answerClass += " skipped";
          else if (answer === question.answers[0]) answerClass += " correct";
          else answerClass += " wrong";

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{question.text}</p>
              <p className={answerClass}>{answer || "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;