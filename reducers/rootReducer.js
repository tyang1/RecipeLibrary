import {
  LOADING_DATA,
  GET_RECOMMENDED,
  AUTH_SUCCESS,
  TOKEN_SUCCESS,
} from "../actions/types";

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
  recentRecipes: [],
};

export function appReducer(state = defaultState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case GET_RECOMMENDED:
      return {
        ...state,
        recentRecipes: payload,
        isLoading: false,
      };
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
    default:
      return state;
  }
}
