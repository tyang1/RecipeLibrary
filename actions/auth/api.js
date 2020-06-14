import { AUTH_SUCCESS, TOKEN_SUCCESS } from "../types";
import fetch from "cross-fetch";

function setFetchWithXAuthToken(token) {
  return async (url, options) => {
    const optionHeaders = options.headers;
    await fetch(url, {
      ...options,
      headers: { ...optionHeaders, "x-auth-token": token },
    });
  };
}

export function setToken(token) {
  return (dispatch) => {
    setFetchWithXAuthToken(token);
    dispatch({
      type: TOKEN_SUCCESS,
      payload: token,
    });
  };
}
export function setAuth() {
  return async (dispatch) => {
    let res = await fetch("http://localhost:3000/app/home/me");
    if (res.status >= 400) {
      // throw new Error("Bad response from server");
      dispatch({
        type: AUTH_SUCCESS,
        payload: false,
      });
    } else {
      const { token } = await res.json();
      console.log("here is the token", token);
      dispatch(setToken(token));
      dispatch({
        type: AUTH_SUCCESS,
        payload: true,
      });
    }
  };
}
