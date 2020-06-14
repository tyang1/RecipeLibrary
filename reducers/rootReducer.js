import { LOADING_DATA, AUTH_SUCCESS, TOKEN_SUCCESS } from "../actions/types";

const defaultState = {
  isLoading: true,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  top3Recipes: [],
  recentRecipes: [],
};

export function appReducer(state = defaultState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_DATA:
      return {
        ...state,
        top3Recipes: payload,
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
