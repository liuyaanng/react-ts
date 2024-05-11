interface State {
  isRunning: boolean;
  elapsedTime: number;
  records: number[];
}

interface Action {
  type: "START" | "STOP" | "RESET" | "RECORD" | "TICK" | "PAUSE";
}

const StopWatchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "STOP":
      return { ...state, isRunning: false };
    case "RESET":
      return { ...state, elapsedTime: 0, records: [] };
    case "RECORD":
      return { ...state, records: [...state.records, state.elapsedTime] };
    case "TICK":
      return { ...state, elapsedTime: state.elapsedTime + 0.01 };
    default:
      return state;
  }
};

export default StopWatchReducer;
