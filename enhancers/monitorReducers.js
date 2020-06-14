const round = (number) => Math.round(number * 100) / 100;

export const monitorReducerEnhancer = (createStore) => (
  reducer,
  initialState,
  enhancer
) => {
  const monitorEnhancer = (state, action) => {
    const start = typeof performance !== "undefined" && performance.now();
    const newState = reducer(state, action);
    const end = typeof performance !== "undefined" && performance.now();
    const diff = round(end - start);

    console.log("reducer process time:", diff);

    return newState;
  };
  return createStore(monitorEnhancer, initialState, enhancer);
};
