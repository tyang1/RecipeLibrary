import { LOADING_DATA } from "../constants/actions";
import { recipeMocks } from "../mock/recipes";

const { top3Recipes } = recipeMocks;

export function loadRecipes() {
  //call the server API to fetch the top3Recipes
  return (dispatch) => {
    
  }
  
  // return {
  //   type: LOADING_DATA,
  //   payload: top3Recipes,
  // };
}
