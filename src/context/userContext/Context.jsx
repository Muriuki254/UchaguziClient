import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  authenticated: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

