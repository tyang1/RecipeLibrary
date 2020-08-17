import { AUTH_SUCCESS, TOKEN_SUCCESS, GET_RECOMMENDED } from "../types";
import fetch from "cross-fetch";

function setFetchWithXAuthToken(token) {
  return async (url, options) => {
    // fetch = async (url, options) => {
    const optionHeaders = options.headers;
    return await fetch(url, {
      ...options,
      headers: { ...optionHeaders, "x-auth-token": token },
    });
  };
  // };
}

export function setToken(token) {
  return async (dispatch) => {
    fetch = await setFetchWithXAuthToken(token);
    return dispatch({
      type: TOKEN_SUCCESS,
      payload: token,
    });
  };
}

export async function initRecipeApp(store) {
  await store.dispatch(setAuth()).then(() => {
    store.dispatch(getProfile());
  });
}

export function setAuth() {
  return async (dispatch) => {
    let res = await fetch("http://localhost:3000/app/home/me");
    if (res.status >= 400) {
      // throw new Error("Bad response from server");
      return Promise.resolve(
        dispatch({
          type: AUTH_SUCCESS,
          payload: false,
        })
      );
    } else {
      const { token } = await res.json();
      console.log("here is the token", token);
      return Promise.all([
        dispatch(setToken(token)),
        dispatch({
          type: AUTH_SUCCESS,
          payload: true,
        }),
      ]);
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    try {
      console.log("getProfile");
      let res = await fetch("http://localhost:3000/app/home/me/profile");
      let profile = await res.json();
      console.log("get recipes after auth", profile);
      return dispatch({
        type: GET_RECOMMENDED,
        payload: profile.recommendedRecipes,
      });
    } catch (err) {
      console.log("error when fetching recommended recipes", err);
    }
    //fetch the recipes from the user databased
  };
}
