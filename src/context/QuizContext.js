import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "DataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsremaining: state.questions.length * SECS_PER_QUES,
      };

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

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsremaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionLength = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  //console.log(maxPoints);

  useEffect(function () {
    fetch(`${process.env.PUBLIC_URL}/questions.json`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "DataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsremaining,
        questionLength,
        maxPoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("you are accessing QuizContext Outside the Provider");
  return context;
}
export { QuizProvider, useQuiz };
