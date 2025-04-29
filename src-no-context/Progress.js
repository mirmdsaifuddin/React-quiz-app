function Progress({ index, maxPoints, questionLength, points, answer }) {
  return (
    <header className="progress">
      <progress max={questionLength} value={index + Number(answer !== null)} />
      <p>
        Question<strong>{index + 1}</strong>/{questionLength}
      </p>
      <p>
        {points}
        <strong>/{maxPoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
