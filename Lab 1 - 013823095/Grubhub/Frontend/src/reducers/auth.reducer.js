const initialAuthState = {
    isLoggedIn: false,
    userName: ""
  };
  
  export const authReducer = (state = { ...initialAuthState }, action) => {
    switch (action.type) {
      case "SET_USER_LOGGEDIN":
        return {
          ...state,
          isLoggedIn: action.userData.isLoggedIn,
          userName: action.userData.userName
        };
      case "SET_USER_PROFILE":
        return {
          ...state,
          isLoggedIn: action.userData.isLoggedIn,
          userName: action.userData.userName
        };
      default:
        return { ...state };
    }
  };
  