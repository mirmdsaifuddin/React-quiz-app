import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { questionLength, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome To The React quiz</h2>
      <h3>{questionLength} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
