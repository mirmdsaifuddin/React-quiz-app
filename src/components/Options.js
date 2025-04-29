import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  //console.log(questions);
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : index===answer?"user":"wrong"
              : ""
          }` }
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}


export default Options;
