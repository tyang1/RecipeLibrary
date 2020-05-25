import React from "react";
import { connect } from "react-redux";
import TopItems from "./TopItems.jsx";

function RecipeItems({ top3Recipes, recentRecipes }) {
  const [value, setValue] = React.useState({ top3Recipes, recentRecipes });
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <div>
      <TopItems
        value={{ ...top3Recipes }}
        selectHandler={handleChange}
        number={3}
        title="Recently Viewed Recipes"
      />
      <TopItems
        value={{ ...recentRecipes }}
        selectHandler={handleChange}
        number={3}
        title="Most Popular Recipes"
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
