const test = require("tape");
const { configureStore } = require("../../stores/configureStore");
const { appReducer } = require("../../reducers/rootReducer");
const { loadRecipes } = require("../../actions/user/api");

const pipe = require("lodash/fp/pipe");

let store = configureStore();

test("appReducer with no arguments", function (t) {
  const msg = "should return correct default state";
  const actual = appReducer();
  const expected = store.getState();
  t.same(actual, expected, msg);
  t.end();
});

test("action creator", function (t) {
  const actual = pipe(
    () => appReducer(undefined, store.dispatch(loadRecipes())),
    (state) => {
      const rec = state;
      rec.isLoading = state.isLoading;
      rec.top3Recipes = !state.top3Recipes.length;
      rec.recentRecipes = !!state.recentRecipes.length;
      return state;
    }
  )();
  const expected = Object.assign({}, store.getState(), {
    isLoading: false,
    top3Recipes: false,
    recentRecipes: true,
  });
  t.same(actual, expected);
  t.end();
});
