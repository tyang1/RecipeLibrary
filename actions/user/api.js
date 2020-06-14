import { LOADING_DATA } from "../types";
import { recipeMocks } from "../../mock/recipes";
import fetch from "cross-fetch";

// const { top3Recipes } = recipeMocks;

export function loadRecipes() {
  //call the server API to fetch the top3Recipes
  // return (dispatch) => {
  //   const res = await fetch(`http://localhost:3000/app/home/me/recipes`);
  //   if (res.status >= 400) {
  //     throw new Error("Bad response from server");
  //   }
  //   let data = await res.json();
  //   dispatch({
  //         type: LOADING_DATA,
  //         payload: data[0].recommendedRecipes,
  //       }
  // };
}
