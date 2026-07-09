import { useEffect, useReducer } from "react";

const STORAGE_KEY = "parental-legacy-results";

function savedResultsReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.payload;
    case "save": {
      const next = [action.payload, ...state.filter((item) => item.dob !== action.payload.dob)].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    }
    case "delete": {
      const next = state.filter((item) => item.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    }
    default:
      return state;
  }
}

export function useSavedResults() {
  const [savedResults, dispatchSavedResults] = useReducer(savedResultsReducer, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    dispatchSavedResults({ type: "load", payload: stored });
  }, []);

  function saveResult(result) {
    if (!result) return;
    dispatchSavedResults({
      type: "save",
      payload: { ...result, id: `${result.dob}-${Date.now()}` },
    });
  }

  function deleteResult(id) {
    dispatchSavedResults({ type: "delete", payload: id });
  }

  return { savedResults, saveResult, deleteResult };
}
