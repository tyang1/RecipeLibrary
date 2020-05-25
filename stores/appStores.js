import { useState, useContext, useEffect, useReduce } from "react";
import recipesMock from "../mock/recipes.js";
//app state: loginState, topRecipes, recentRecipes
//redux
import { createStore } from "redux";

const { top3Recipes, recentRecipes } = recipesMock;

const initialStates = {
  isLoggedIn: false,
  top3Recipes: top3Recipes,
  recentRecipes: recentRecipes,
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGGED_IN_SUCCESSFULLY":
      return {
        ...state,
        isLoggedIn: true,
      };
  }
  return state;
}
// let appState = new AppState();

const store = createStore(appReducer, initialStates);

console.log(store.getState());
export default store;
