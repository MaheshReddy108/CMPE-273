export const setUserSignedUp = userData => {
    return dispatch => {
      dispatch({ type: "SET_USER_LOGGEDIN", userData });
    };
  };
  