const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          authenticated: true,
          user: action.payload,
        };
      case "LOGIN_FAILURE":
        localStorage.removeItem("user");
        return {
          ...state,
          authenticated: false,
          user: null,
        };
      case "LOGOUT":
        localStorage.removeItem("user");
        return {
          ...state,
          authenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  