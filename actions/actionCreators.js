import { LOADING_DATA } from "../constants/actions";
import { recipeMocks } from "../mock/recipes";
import fetch from "cross-fetch";

// const { top3Recipes } = recipeMocks;

export function loadRecipes() {
  //call the server API to fetch the top3Recipes
  return (dispatch) => {
    return fetch(`http://localhost:3000/app/home/me/recipes`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: LOADING_DATA,
          payload: data[0].recommendedRecipes,
        })
      );
  };
}
