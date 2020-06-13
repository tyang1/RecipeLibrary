const { LOADING_DATA } = require("../constants/actions");

const defaultState = {
  isLoading: true,
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
    default:
      return state;
  }
}
