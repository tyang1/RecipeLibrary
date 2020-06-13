export const logger = (state) => (next) => (action) => {
  console.log("dispatching action", action);
  const newValue = next(action); //sync
  console.log("next state", state.getState());
  return newValue;
};


