function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React quiz</h2>
      <h3>{numQuestion} questions to test your react mastery</h3>
      <button className="btn btn" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
