export const LOGIN_START = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LOGIN_SUCCESS = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LOGIN_FAILURE = () => ({
  type: "LOGIN_FAILURE",
});
export const LOGOUT = () => ({
  type: "LOGOUT",
});
