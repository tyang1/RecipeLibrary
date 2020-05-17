import React from "react";
import TopItems from "./TopItems.jsx";

const styles = {};

export default function MyRecipe() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <TopItems
        value={value}
        hoverChange={handleChange}
        number={3}
        title="Recently Viewed Recipes"
      />
      <TopItems
        value={value}
        hoverChange={handleChange}
        number={3}
        title="Most Popular Recipes"
      />
    </div>
  );
}
