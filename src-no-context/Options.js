function Options({ questions, answer, dispatch }) {
  //console.log(questions);
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
           ${
             hasAnswer
               ? index === questions.correctOption
                 ? "correct"
                 : "wrong"
               : ""
           }`}
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
