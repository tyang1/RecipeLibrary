const test = require("tape");
const { store } = require("../stores/appStores");
const { appReducer, loadRecipes } = require("../stores/appStores");
const pipe = require("lodash/fp/pipe");

test("appReducer with no arguments", function (t) {
  const msg = "should return correct default state";
  const actual = appReducer();
  const expected = store.getState();
  t.same(actual, expected, msg);
  t.end();
});

test("action creator", function (t) {
  const actual = pipe(
    () => appReducer(undefined, loadRecipes()),
    (state) => {
      const rec = state;
      rec.isLoading = state.isLoading;
      rec.top3Recipes = !!state.top3Recipes.length;
      rec.recentRecipes = !state.recentRecipes.length;
      return state;
    }
  )();
  const expected = Object.assign({}, store.default.getState(), {
    isLoading: true,
    top3Recipes: true,
    recentRecipes: false,
  });
  t.same(actual, expected);
  t.end();
});
