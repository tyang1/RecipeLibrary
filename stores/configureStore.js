import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "../middleware/logger";
import { monitorReducerEnhancer } from "../enhancers/monitorReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "../reducers/rootReducer";

export function configureStore() {
  const middlewares = [logger, thunkMiddleware];
  //Think of applyMiddleware as a layer that redefines store.dispatch,
  //so it can abstract away how store treats different types of actions
  //e.g. store.dispatch(makeASandwichWithSecretSauce('Grandma'))
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(appReducer, undefined, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }
  return store;
}
