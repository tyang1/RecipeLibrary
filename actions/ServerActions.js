export default ServerActions = {
  //   recieveLoggedInState(state) {
  //     //dispatch the action and payload to store
  //     return state;
  //   },
  getTopRecipeView(state) {
    return state.top3Recipes.map((each) => each.sourceUrl);
  },
};
