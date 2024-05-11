import React, { useReducer, useRef, useEffect } from "react";
import StopWatchReducer from "../hooks/StopWatchReducer";

const StopWatch = () => {
  const initState = {
    isRunning: false,
    elapsedTime: 0,
    records: [],
  };
  const [state, dispatch] = useReducer(StopWatchReducer, initState);
  const intervalRef = useRef<NodeJS.Timeout>();

  const handleStart = () => {
    dispatch({ type: "START" });
  };

  const handleStop = () => {
    dispatch({ type: "STOP" });
  };

  const handleRecord = () => {
    dispatch({ type: "RECORD" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  // Effect for starting, pausing, and resetting the timer
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.isRunning]);

  return (
    <div className="flex justify-center h-full w-full mt-10 flex-col items-center gap-10">
      <div className="text-2xl border rounded-lg border-slate-400 text-purple-400 text-center w-52 h-20 items-center flex justify-center">
        Time: {state.elapsedTime.toFixed(2)}
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <button className="border p-5 rounded-2xl" onClick={handleStart}>
          start
        </button>
        <button className="border p-5 rounded-2xl" onClick={handleStop}>
          stop
        </button>
        <button className="border p-5 rounded-2xl" onClick={handleRecord}>
          record
        </button>
        <button className="border p-5 rounded-2xl" onClick={handleReset}>
          reset
        </button>
      </div>
      <div className="text-center">
        <ul>
          {state.records.map((record, index) => (
            <li key={index}> {`${index + 1}: ${record.toFixed(2)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StopWatch;
