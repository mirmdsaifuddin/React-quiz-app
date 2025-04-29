import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUES = 30;
const initialState = {
  questions: [],
  //loading,ready,error,active,finished
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsremaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DataFetch":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsremaining: state.questions.length * SECS_PER_QUES,
      };
    case "DataFailed":
      return { ...state, status: "error" };
    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        answer: null,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsremaining: state.secondsremaining - 1,
        status: state.secondsremaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("action unknown");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsremaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionLength = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  //console.log(maxPoints);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DataFetch", payload: data }))
      .catch((err) => dispatch({ type: "DataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={questionLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionLength={questionLength}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsremaining={secondsremaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionLength={questionLength}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
