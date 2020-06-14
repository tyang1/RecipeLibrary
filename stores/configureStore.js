import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "../middleware/logger";
import { monitorReducerEnhancer } from "../enhancers/monitorReducers";
import { composeWithDevTools } from "redux-devtools-extension";

import { recipeMocks } from "../mock/recipes.js";
import { appReducer } from "../reducers/rootReducer";

const { top3Recipes, recentRecipes } = recipeMocks;

export function configureStore() {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(appReducer, undefined, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }
  return store;
}
