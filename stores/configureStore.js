import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "../middleware/logger";
import { monitorReducerEnhancer } from "../enhancers/monitorReducers";

import { recipeMocks } from "../mock/recipes.js";
import { appReducer } from "../reducers/rootReducer";

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

export function configureStore() {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(appReducer, defaultState, composedEnhancers);
  return store;
}
