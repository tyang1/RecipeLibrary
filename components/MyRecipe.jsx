import React from "react";
import { connect } from "react-redux";
import TopItems from "./TopItems.jsx";

function RecipeItems({ top3Recipes, recentRecipes }) {
  console.log("recipeItems", top3Recipes);
  const [value, setValue] = React.useState({ top3Recipes, recentRecipes });
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <div>
      <TopItems
        value={top3Recipes}
        selectHandler={handleChange}
        number={3}
        title="Most Popular Recipes"
      />
      <TopItems
        value={recentRecipes}
        selectHandler={handleChange}
        number={3}
        title="Recently Viewed Recipes"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { top3Recipes, recentRecipes } = state;
  return {
    top3Recipes: top3Recipes,
    recentRecipes: recentRecipes,
  };
};

const MyRecipe = connect(mapStateToProps)(RecipeItems);
export default MyRecipe;
