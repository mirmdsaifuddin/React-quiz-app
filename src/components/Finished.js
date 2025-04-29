import { useQuiz } from "../context/QuizContext";

function Finished() {
  const { points, maxPoints, highScore, dispatch } = useQuiz();
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored<strong> {points} </strong>out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highest: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Finished;
