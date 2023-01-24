import React from "react";
const loggedIn = localStorage.getItem("loggedIn");
const savedData = JSON.parse(loggedIn);

const initialState = savedData ||{
  user: {},
  token: "",
};


const actions = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case actions.LOGOUT:
      return {
        user: {},
        token: "",
      };
    default:
      return state;
  }
};

export const StateContext = React.createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    state,
    setUser: ({ user, token }) => {
      dispatch({ type: actions.SET_USER, user, token });
    },
    logout: () => {
      dispatch({ type: actions.LOGOUT });
    },
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
