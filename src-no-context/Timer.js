import { useEffect } from "react";

function Timer({ dispatch, secondsremaining }) {
  const min = Math.floor(secondsremaining / 60);
  const sec = secondsremaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
        console.log("tick");
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 ? 0 : min}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
