const { recipeMocks } = require("../mock/recipes.js");
const { LOADING_DATA } = require("../constants/actions");
//app state: loginState, topRecipes, recentRecipes
//redux
const { createStore } = require("redux");

const { top3Recipes, recentRecipes } = recipeMocks;

const initialStates = {
  isLoading: false,
  top3Recipes: top3Recipes,
  recentRecipes: recentRecipes,
};

const defaultState = {
  isLoading: true,
  top3Recipes: [],
  recentRecipes: [],
};

//action creator
export const loadRecipes = () => {
  return {
    type: LOADING_DATA,
    payload: top3Recipes,
  };
};

export function appReducer(state = defaultState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_DATA:
      return {
        ...state,
        top3Recipes: payload,
      };
    default:
      return state;
  }
}

export const store = createStore(appReducer, defaultState);
