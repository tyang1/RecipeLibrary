import {
  LOADING_DATA,
  GET_RECOMMENDED,
  AUTH_SUCCESS,
  TOKEN_SUCCESS,
} from "../actions/types";

import { recipeMocks } from "../mock/recipes.js";
const { top3Recipes, recentRecipes } = recipeMocks;

function getStorageItem(item) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(item);
  }
  return null;
}

const defaultState = {
  isLoading: true,
  token: getStorageItem("token"),
  isAuthenticated: false,
  top3Recipes: [],
  recentRecipes,
};

export function appReducer(state = defaultState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    // case GET_RECENT_RECIPES:
    //   return {
    //     ...state,
    //     recentRecipes: payload || state.recentRecipes,
    //     isLoading: false,
    //   };
    case TOKEN_SUCCESS:
      return {
        ...state,
        token: payload,
        isLoading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: payload,
        isLoading: false,
      };
    case GET_RECOMMENDED:
      return {
        ...state,
        top3Recipes: payload || state.top3Recipes,
      };
    default:
      return state;
  }
}
